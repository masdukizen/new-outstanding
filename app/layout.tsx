import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "Procurement. App",
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en">
      {session ? (
        <body>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 min-w-0">
              <Header />
              <main className="flex-1 min-w-0 overflow-hidden p-4">
                <Providers>{children}</Providers>
              </main>
            </div>
          </SidebarProvider>
          <Toaster />
        </body>
      ) : (
        <body>
          {children}
          <Toaster />
        </body>
      )}
    </html>
  );
}
