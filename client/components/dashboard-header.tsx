"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Bell, Settings, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function DashboardHeader() {
  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch profile image from localStorage
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }

    // Fetch user details from API and localStorage
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          // Check if profileData exists in localStorage (edited data)
          const storedProfileData = localStorage.getItem("profileData");
          if (storedProfileData) {
            try {
              const parsedProfileData = JSON.parse(storedProfileData);
              // Merge API data with localStorage data, prioritizing localStorage
              setUser({
                ...data.user,
                name: parsedProfileData.name || data.user.name,
                email: parsedProfileData.email || data.user.email,
              });
            } catch (e) {
              setUser(data.user);
            }
          } else {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error("Fetch User Error:", error);
      }
    };

    fetchUserDetails();

    // Listen for profile updates
    const handleStorageChange = () => {
      const updatedImage = localStorage.getItem("profileImage");
      if (updatedImage) {
        setProfileImage(updatedImage);
      }
      
      // Also update user data when profileData changes
      const storedProfileData = localStorage.getItem("profileData");
      if (storedProfileData) {
        try {
          const parsedProfileData = JSON.parse(storedProfileData);
          setUser((prevUser: any) => ({
            ...prevUser,
            name: parsedProfileData.name || prevUser?.name,
            email: parsedProfileData.email || prevUser?.email,
          }));
        } catch (e) {
          console.error("Error parsing profileData:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Check for updates from same window
    const checkForUpdates = setInterval(() => {
      const updatedImage = localStorage.getItem("profileImage");
      setProfileImage((prevImage) => {
        if (updatedImage !== prevImage) {
          return updatedImage || "";
        }
        return prevImage;
      });
      
      // Check for profileData updates
      const storedProfileData = localStorage.getItem("profileData");
      if (storedProfileData) {
        try {
          const parsedProfileData = JSON.parse(storedProfileData);
          setUser((prevUser: any) => {
            // Only update if data has changed
            if (!prevUser || prevUser?.name !== parsedProfileData.name || prevUser?.email !== parsedProfileData.email) {
              return {
                ...prevUser,
                name: parsedProfileData.name || prevUser?.name || "",
                email: parsedProfileData.email || prevUser?.email || "",
              };
            }
            return prevUser;
          });
        } catch (e) {
          console.error("Error parsing profileData in interval:", e);
        }
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(checkForUpdates);
    };
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  return (
    <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-3 sm:px-4 lg:px-6 bg-white">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex flex-1 items-center justify-between">
        <div className="hidden sm:block">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-600">Manage your career development</p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              <span className="hidden sm:inline">3</span>
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage src={profileImage || "/placeholder.svg?height=40&width=40"} alt="User" />
                  <AvatarFallback className="bg-[#6C63FF] text-white text-xs sm:text-sm">
                    {user ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 sm:w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || ""}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
