"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  BookOpen,
  FileText,
  Home,
  LogOut,
  Map,
  Settings,
  User,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast"; // Adjust path if needed

const menuItems = [
  {
    title: "Dashboard Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Resume Analyzer",
    url: "/dashboard/resume-analyzer",
    icon: FileText,
  },
  {
    title: "Course Explorer",
    url: "/dashboard/course-explorer",
    icon: BookOpen,
  },
  {
    title: "Career Roadmap",
    url: "/dashboard/career-roadmap",
    icon: Map,
  },
  {
    title: "Career Form",
    url: "/dashboard/career-form",
    icon: User,
  },
  {
    title: "Insights & Analytics",
    url: "/dashboard/insights",
    icon: BarChart3,
  },
  {
    title: "Profile & Skills",
    url: "/dashboard/profile",
    icon: User,
  },
];

const supportItems = [
  {
    title: "Support",
    url: "/dashboard/support",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Inside component

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });

    router.push("/login"); // Redirect to login page
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#6C63FF] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CP</span>
          </div>
          <span className="text-lg font-bold text-gray-900 group-data-[collapsible=icon]:hidden">
            Career-Path AI
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              tooltip="Logout"
            >
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full text-start focus:outline-none"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
