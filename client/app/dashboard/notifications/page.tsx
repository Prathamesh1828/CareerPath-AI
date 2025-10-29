"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCheck, Trash2, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNotifications, Notification } from "@/contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useState } from "react";

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'career_progress':
      return '🎯';
    case 'course_recommendation':
      return '📚';
    case 'resume_analysis':
      return '📄';
    case 'ai_insight':
      return '💡';
    case 'system':
      return '⚙️';
    case 'profile_update':
      return '👤';
    default:
      return '🔔';
  }
};

const getPriorityColor = (priority: Notification['priority']) => {
  switch (priority) {
    case 'high':
      return 'border-l-red-500 bg-red-50';
    case 'medium':
      return 'border-l-yellow-500 bg-yellow-50';
    case 'low':
      return 'border-l-blue-500 bg-blue-50';
    default:
      return 'border-l-gray-500 bg-gray-50';
  }
};

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  } = useNotifications();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'unread' && !notification.read) ||
                         (filterType === 'read' && notification.read);
    
    return matchesSearch && matchesFilter;
  });

  const groupedNotifications = {
    today: filteredNotifications.filter(n => 
      new Date(n.timestamp).toDateString() === new Date().toDateString()
    ),
    yesterday: filteredNotifications.filter(n => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return new Date(n.timestamp).toDateString() === yesterday.toDateString();
    }),
    older: filteredNotifications.filter(n => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return new Date(n.timestamp) < twoDaysAgo;
    })
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-6 w-6 text-[#6C63FF]" />
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay updated with your career progress and recommendations
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="flex items-center gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all read ({unreadCount})
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllNotifications}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={filterType} onValueChange={(value) => setFilterType(value as any)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || filterType !== 'all' ? 'No matching notifications' : 'No notifications yet'}
            </h3>
            <p className="text-gray-600">
              {searchQuery || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'When you have new updates, they\'ll appear here.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Today */}
          {groupedNotifications.today.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Today</h2>
              <div className="space-y-2">
                {groupedNotifications.today.map((notification, index) => (
                  <NotificationCard
                    key={`${notification.id}-${index}`}
                    notification={notification}
                    onNotificationClick={handleNotificationClick}
                    onRemove={removeNotification}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Yesterday */}
          {groupedNotifications.yesterday.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Yesterday</h2>
              <div className="space-y-2">
                {groupedNotifications.yesterday.map((notification, index) => (
                  <NotificationCard
                    key={`${notification.id}-yesterday-${index}`}
                    notification={notification}
                    onNotificationClick={handleNotificationClick}
                    onRemove={removeNotification}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Older */}
          {groupedNotifications.older.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Older</h2>
              <div className="space-y-2">
                {groupedNotifications.older.map((notification, index) => (
                  <NotificationCard
                    key={`${notification.id}-older-${index}`}
                    notification={notification}
                    onNotificationClick={handleNotificationClick}
                    onRemove={removeNotification}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationCard({ 
  notification, 
  onNotificationClick, 
  onRemove 
}: { 
  notification: Notification;
  onNotificationClick: (notification: Notification) => void;
  onRemove: (id: string) => void;
}) {
  const CardWrapper = notification.actionUrl ? Link : 'div';
  const cardProps = notification.actionUrl ? { href: notification.actionUrl } : {};

  return (
    <Card className={`border-l-4 ${getPriorityColor(notification.priority)} hover:shadow-md transition-shadow group`}>
      <CardWrapper {...cardProps} onClick={() => onNotificationClick(notification)}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-2xl flex-shrink-0 relative">
                {notification.icon || getNotificationIcon(notification.type)}
                {!notification.read && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-[#6C63FF] rounded-full" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-medium truncate ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </span>
                </div>
                
                <p className={`text-sm mb-3 ${!notification.read ? 'text-gray-700' : 'text-gray-500'}`}>
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {notification.type.replace('_', ' ')}
                    </Badge>
                    {notification.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">
                        High Priority
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemove(notification.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </CardWrapper>
    </Card>
  );
}
