"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Trash2, RefreshCw, Clock, Shield } from "lucide-react";
import { useNotifications } from '@/contexts/NotificationContext';
import { useNotificationTriggers } from '@/hooks/useNotificationTriggers';
import { toast } from "@/components/ui/use-toast";

export function NotificationManagement() {
  const { notifications, clearAllNotifications } = useNotifications();
  const { triggerCourseRecommendation } = useNotificationTriggers();

  const clearSpamTimers = () => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('last_') && key.endsWith('_notification')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    toast({
      title: "Spam Protection Reset",
      description: "Notification cooldowns have been cleared. You may receive new notifications immediately.",
    });
  };

  const testCourseNotification = () => {
    triggerCourseRecommendation(8, 'your updated skills', true);
    toast({
      title: "Test Notification Sent",
      description: "A course recommendation notification has been triggered.",
    });
  };

  const getNotificationStats = () => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.read).length;
    const byType = notifications.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return { total, unread, byType };
  };

  const stats = getNotificationStats();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#6C63FF]" />
          Notification Management
        </CardTitle>
        <CardDescription>
          Manage your notifications and spam protection settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[#6C63FF]">{stats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.unread}</div>
            <div className="text-xs text-gray-600">Unread</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(stats.byType).length}
            </div>
            <div className="text-xs text-gray-600">Types</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {stats.byType.course_recommendation || 0}
            </div>
            <div className="text-xs text-gray-600">Course Recs</div>
          </div>
        </div>

        {/* Notification Types Breakdown */}
        {Object.keys(stats.byType).length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-900">Notification Types</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byType).map(([type, count]) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {type.replace('_', ' ')}: {count}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Spam Protection Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Spam Protection Active</h4>
              <p className="text-sm text-blue-700 mt-1">
                We automatically prevent duplicate notifications with cooldown periods:
              </p>
              <ul className="text-xs text-blue-600 mt-2 space-y-1">
                <li>• Course recommendations: 5 minutes</li>
                <li>• Career milestones: 10 minutes</li>
                <li>• Resume analysis: 2 minutes</li>
                <li>• Profile updates: 2 hours</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Management Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-900">Quick Actions</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={clearAllNotifications}
              className="flex items-center gap-2"
              disabled={notifications.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              Clear All Notifications
            </Button>
            
            <Button
              variant="outline"
              onClick={clearSpamTimers}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Cooldowns
            </Button>
            
            <Button
              variant="outline"
              onClick={testCourseNotification}
              className="flex items-center gap-2 bg-[#6C63FF] text-white hover:bg-[#5B54E6]"
            >
              <Bell className="h-4 w-4" />
              Test Notification
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <strong>Tip:</strong> If you're receiving too many notifications, you can:
          <br />• Adjust notification preferences in the settings above
          <br />• Clear all notifications to start fresh
          <br />• Reset cooldowns if you want to receive new notifications immediately
        </div>
      </CardContent>
    </Card>
  );
}
