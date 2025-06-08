import {
  LayoutDashboard,
  HelpCircle,
  FileText,
  PenSquare,
  ExternalLink,
  Users,
  BookOpenText,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { IMAGES } from "@/assets/index.ts";
import { useMemo } from "react";

export function AppSidebar() {
  const { state } = useSidebar();

  const collapsed = useMemo(() => state === "collapsed", [state]);

  return (
    <Sidebar collapsible="icon" className="!border-r-0 shadow-lg">
      <SidebarContent>
        <div className={`flex w-max items-center gap-4 px-4`}>
          <img
            src={IMAGES.avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-md object-contain"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold leading-6 tracking-normal text-[#005B86]">
                ABC Company
              </h1>
              <p className="text-base font-normal leading-6 tracking-normal text-[#005B86]">
                Lisa Rose
              </p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <SidebarGroup className="p-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { icon: LayoutDashboard, label: "Overview", path: "/overview" },
                { icon: HelpCircle, label: "Inquiries", path: "/inquiries" },
                { icon: FileText, label: "Estimator", path: "/estimator" },
                { icon: PenSquare, label: "Projects", path: "/projects" },
              ].map((item, index) => (
                <SidebarMenuItem key={index} className="h-12">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex text-[#7C7C7C]  items-center gap-3 hover:bg-[#D3D3D3] p-3 rounded-lg  ${
                        isActive ? "text-primary bg-[#D3D3D3]" : ""
                      }`
                    }
                  >
                    <item.icon className={`${collapsed ? "w-full" : ""}`} />
                    {!collapsed && (
                      <span className="font-medium text-base">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="flex-1" />
        <SidebarGroup className="pl-3">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="h-12">
                <NavLink
                  to={"/user-management"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-[#7C7C7C] hover:bg-[#D3D3D3] p-3 rounded-lg  ${
                      isActive ? "text-primary bg-[#D3D3D3]" : ""
                    }`
                  }
                >
                  <Users className={`${collapsed ? "w-full" : ""}`} />
                  {!collapsed && (
                    <span className="font-medium text-base">
                      Administrations
                    </span>
                  )}
                </NavLink>
              </SidebarMenuItem>

              <SidebarMenuItem className="h-12">
                <NavLink
                  to={"/documentation"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-[#7C7C7C] hover:bg-[#D3D3D3] p-3 rounded-lg  ${
                      isActive ? "text-primary bg-[#D3D3D3]" : ""
                    }`
                  }
                >
                  <BookOpenText className={`${collapsed ? "w-full" : ""}`} />
                  {!collapsed && (
                    <span className="font-medium text-base">Documentation</span>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          <div className="py-4 flex items-center justify-between">
            <div className={`px-4`}>
              <img
                src={!collapsed ? IMAGES.logo : IMAGES.logoNoText}
                alt="River Flow"
                className="h-6 w-full object-contain"
              />
            </div>
            {!collapsed && <ExternalLink size={20} className=" text-primary" />}
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
