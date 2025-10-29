"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface NotificationPreferences {
  careerProgress: boolean;
  courseRecommendations: boolean;
  resumeAnalysis: boolean;
  aiInsights: boolean;
  profileUpdates: boolean;
  systemUpdates: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const defaultPreferences: NotificationPreferences = {
  careerProgress: true,
  courseRecommendations: true,
  resumeAnalysis: true,
  aiInsights: true,
  profileUpdates: false,
  systemUpdates: true,
  emailNotifications: true,
  pushNotifications: true,
};

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem('notificationPreferences');
    if (saved) {
      try {
        const parsedPreferences = JSON.parse(saved);
        setPreferences({ ...defaultPreferences, ...parsedPreferences });
      } catch (error) {
        console.error('Error loading notification preferences:', error);
      }
    }
  }, []);

  const handlePreferenceChange = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const savePreferences = () => {
    try {
      localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
      setHasChanges(false);
      toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated.",
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save notification preferences.",
        variant: "destructive",
      });
    }
  };

  const resetToDefaults = () => {
    setPreferences(defaultPreferences);
    setHasChanges(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#6C63FF]" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Choose which notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Types */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-900">Notification Types</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="career-progress">Career Progress</Label>
                <p className="text-xs text-gray-500">
                  Milestones, skill development, and roadmap updates
                </p>
              </div>
              <Switch
                id="career-progress"
                checked={preferences.careerProgress}
                onCheckedChange={(checked) => handlePreferenceChange('careerProgress', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="course-recommendations">Course Recommendations</Label>
                <p className="text-xs text-gray-500">
                  New courses, enrollment deadlines, and personalized suggestions
                </p>
              </div>
              <Switch
                id="course-recommendations"
                checked={preferences.courseRecommendations}
                onCheckedChange={(checked) => handlePreferenceChange('courseRecommendations', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="resume-analysis">Resume Analysis</Label>
                <p className="text-xs text-gray-500">
                  Analysis completion, ATS scores, and optimization tips
                </p>
              </div>
              <Switch
                id="resume-analysis"
                checked={preferences.resumeAnalysis}
                onCheckedChange={(checked) => handlePreferenceChange('resumeAnalysis', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ai-insights">AI Insights</Label>
                <p className="text-xs text-gray-500">
                  Weekly reports, market trends, and salary updates
                </p>
              </div>
              <Switch
                id="ai-insights"
                checked={preferences.aiInsights}
                onCheckedChange={(checked) => handlePreferenceChange('aiInsights', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profile-updates">Profile Updates</Label>
                <p className="text-xs text-gray-500">
                  Profile views, completion reminders, and visibility alerts
                </p>
              </div>
              <Switch
                id="profile-updates"
                checked={preferences.profileUpdates}
                onCheckedChange={(checked) => handlePreferenceChange('profileUpdates', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system-updates">System Updates</Label>
                <p className="text-xs text-gray-500">
                  New features, maintenance alerts, and important announcements
                </p>
              </div>
              <Switch
                id="system-updates"
                checked={preferences.systemUpdates}
                onCheckedChange={(checked) => handlePreferenceChange('systemUpdates', checked)}
              />
            </div>
          </div>
        </div>

        {/* Delivery Methods */}
        <div className="space-y-4 border-t pt-4">
          <h4 className="font-medium text-sm text-gray-900">Delivery Methods</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-xs text-gray-500">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">In-App Notifications</Label>
                <p className="text-xs text-gray-500">
                  Show notifications in the application
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={preferences.pushNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            disabled={!hasChanges}
          >
            Reset to Defaults
          </Button>
          
          <Button
            onClick={savePreferences}
            disabled={!hasChanges}
            className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
