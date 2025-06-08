import { AppSidebar } from "@/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="mt-6" />
      <main className="w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
