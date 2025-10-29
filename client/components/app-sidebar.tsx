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
  Users,
  User,
  HelpCircle,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const mainNavigationItems = [
  {
    title: "Dashboard Home",
    url: "/dashboard",
    icon: Home,
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

const extendableFeatures = [
  {
    title: "Resume Analyzer",
    url: "/dashboard/resume-analyzer",
    icon: FileText,
    badge: "AI",
  },
  {
    title: "Counselor Chat",
    url: "/dashboard/counselor",
    icon: MessageSquare,
    badge: "New",
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
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });

    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">CP</span>
          </div>
          <span className="text-lg font-bold text-gray-900 group-data-[collapsible=icon]:hidden">
            Career-Path AI
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="hover:bg-blue-50 hover:text-[#6C63FF] transition-colors"
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

        {/* Extendable Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-purple-600 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Extendable Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {extendableFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center justify-between space-x-2 w-full"
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            item.badge === "AI"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-green-100 text-green-700"
                          } group-data-[collapsible=icon]:hidden`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="hover:bg-gray-50 transition-colors"
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
              className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
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
