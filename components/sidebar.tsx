import {
  Archive,
  ClipboardList,
  Home,
  Monitor,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/auth";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    roles: ["Admin", "User", "Supplier"],
  },
  {
    title: "Monitoring",
    url: "/monitoring",
    icon: Monitor,
    roles: ["Admin", "User"],
  },
  {
    title: "Outstanding PO",
    url: "/outstanding",
    icon: Package,
    roles: ["Admin", "User", "Supplier"],
  },
  {
    title: "FPA",
    url: "/fpa",
    icon: ClipboardList,
    roles: ["Admin", "User", "Supplier"],
  },
  {
    title: "Purchase Order",
    url: "/po",
    icon: ShoppingCart,
    roles: ["Admin", "User"],
  },
  {
    title: "Archive",
    url: "/archive",
    icon: Archive,
    roles: ["Admin", "User", "Supplier"],
  },
  {
    title: "Supplier",
    url: "/supplier",
    icon: Users2,
    roles: ["User", "Admin"],
  },
  {
    title: "Settings",
    url: "/setting",
    icon: Settings,
    roles: ["Admin"],
  },
];

export async function AppSidebar() {
  const session = await auth();
  const userRole = session?.user?.role || "user";
  const filteredItems = items.filter((item) => item.roles.includes(userRole));
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} prefetch={true}>
                      <item.icon strokeWidth={3} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
