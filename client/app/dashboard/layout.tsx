"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { NotificationProvider } from "@/contexts/NotificationContext"
import { ProfileTracker } from "@/components/ProfileTracker"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotificationProvider>
      <ProfileTracker />
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <main className="flex-1 p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </NotificationProvider>
  )
}
