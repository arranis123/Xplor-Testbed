import { 
  LayoutDashboard, 
  FolderOpen, 
  Globe, 
  BarChart3, 
  Camera, 
  Settings,
  ChevronRight,
  Home
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "All Spaces", url: "/spaces", icon: FolderOpen },
  { title: "Public & Unlisted Spaces", url: "/public-spaces", icon: Globe },
  { title: "Statistics", url: "/statistics", icon: BarChart3 },
  { title: "Capture Services", url: "/capture-services", icon: Camera },
  { title: "Settings", url: "/settings", icon: Settings },
];

const originalItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Gigs", url: "/gigs", icon: FolderOpen },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium border-r-2 border-xplor-yellow" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  return (
    <Sidebar className="border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-xplor-yellow rounded flex items-center justify-center">
            <span className="text-xplor-black font-bold text-sm">X</span>
          </div>
          {open && (
            <span className="font-semibold text-lg text-sidebar-foreground">Xplor</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {/* Original navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {originalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Matterport-style navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wider mb-2">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {open && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          <ChevronRight className="h-3 w-3 opacity-50" />
                        </>
                      )}
                    </NavLink>
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