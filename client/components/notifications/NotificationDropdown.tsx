"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bell, X, CheckCheck, Trash2 } from "lucide-react";
import { useNotifications, Notification } from "@/contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "career_progress":
      return "🎯";
    case "course_recommendation":
      return "📚";
    case "resume_analysis":
      return "📄";
    case "ai_insight":
      return "💡";
    case "system":
      return "⚙️";
    case "profile_update":
      return "👤";
    default:
      return "🔔";
  }
};

const getPriorityColor = (priority: Notification["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

export function NotificationDropdown() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  } = useNotifications();

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 sm:h-10 sm:w-10"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 sm:w-96" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-6 px-2 text-xs"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllNotifications}
                className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            {notifications.map((notification, index) => (
              <DropdownMenuItem
                key={notification.id}
                className="p-0 focus:bg-gray-50"
                asChild
              >
                <div className="w-full">
                  {notification.actionUrl ? (
                    <Link
                      href={notification.actionUrl}
                      className="flex items-start gap-3 p-3 w-full hover:bg-gray-50 transition-colors"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <NotificationContent notification={notification} />
                    </Link>
                  ) : (
                    <div
                      className="flex items-start gap-3 p-3 w-full hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <NotificationContent notification={notification} />
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        )}

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/notifications"
                className="text-center text-sm text-[#6C63FF] hover:text-[#5B54E6] font-medium"
              >
                View all notifications
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationContent({ notification }: { notification: Notification }) {
  return (
    <>
      <div className="flex-shrink-0 relative">
        <div className="text-lg">
          {notification.icon || getNotificationIcon(notification.type)}
        </div>
        {!notification.read && (
          <div
            className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${getPriorityColor(
              notification.priority
            )}`}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p
            className={`text-sm font-medium truncate ${
              !notification.read ? "text-gray-900" : "text-gray-600"
            }`}
          >
            {notification.title}
          </p>
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </span>
        </div>

        <p
          className={`text-xs line-clamp-2 ${
            !notification.read ? "text-gray-700" : "text-gray-500"
          }`}
        >
          {notification.message}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-auto">
            {notification.type.replace("_", " ")}
          </Badge>
          {notification.priority === "high" && (
            <Badge
              variant="destructive"
              className="text-xs px-1.5 py-0.5 h-auto"
            >
              High Priority
            </Badge>
          )}
        </div>
      </div>
    </>
  );
}
