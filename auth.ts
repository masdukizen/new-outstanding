import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { signInFormSchema } from "./lib/auth-schema";
import { compareSync } from "bcrypt-ts";
import type { Adapter } from "next-auth/adapters";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateField = signInFormSchema.safeParse(credentials);
        if (!validateField.success) return null;

        const { email, password } = validateField.data;

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        if (!user || !user.password) throw Error("User not found");
        const passwordVerify = compareSync(password, user.password);
        if (!passwordVerify) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user.role || "User";
      const { pathname } = nextUrl;
      const protectedRoutes = [
        /^\/(dashboard|fpa|archive|outstanding)(\/.*)?$/,
      ];
      const protectedSupplier = [/^\/(supplier|monitoring|po|setting)(\/.*)?$/];

      const isProtected = protectedRoutes.some((route) => route.test(pathname));
      const isProtectedSupplier = protectedSupplier.some((route) =>
        route.test(pathname)
      );

      if (isLoggedIn && pathname === "/")
        return Response.redirect(new URL("/dashboard", nextUrl));

      if (!isLoggedIn && isProtected && isProtectedSupplier)
        return Response.redirect(new URL("/", nextUrl));

      if (isLoggedIn && userRole === "Supplier" && isProtectedSupplier)
        return Response.redirect(new URL("/dashboard", nextUrl));

      if (isLoggedIn && userRole !== "Admin" && pathname.startsWith("/setting"))
        return Response.redirect(new URL("/dashboard", nextUrl));

      if (
        isLoggedIn &&
        userRole !== "Supplier" &&
        pathname.startsWith("/ordered_items")
      )
        return Response.redirect(new URL("/dashboard", nextUrl));

      return !!auth;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "__Secure-authjs.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
      },
    },
  },
  // cookies: {
  //   sessionToken: {
  //     name: "__Secure-authjs.session-token", // Nama cookie
  //     options: {
  //       httpOnly: true, // Cookie hanya bisa diakses oleh server
  //       secure: process.env.NODE_ENV === "production", // Hanya di produksi menggunakan HTTPS
  //       sameSite: "none", // Harus None untuk cookie lintas domain
  //     },
  //   },
  // },
});
