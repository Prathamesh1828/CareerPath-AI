"use client";

import { useNotifications } from '@/contexts/NotificationContext';

export const useNotificationTriggers = () => {
  const { addNotification } = useNotifications();

  // Anti-spam mechanism - check if notification type was recently triggered
  const canTriggerNotification = (type: string, cooldownMinutes: number = 5): boolean => {
    const lastTriggerKey = `last_${type}_notification`;
    const lastTrigger = localStorage.getItem(lastTriggerKey);
    const cooldownMs = cooldownMinutes * 60 * 1000;
    
    if (lastTrigger && (Date.now() - parseInt(lastTrigger)) < cooldownMs) {
      return false;
    }
    
    localStorage.setItem(lastTriggerKey, Date.now().toString());
    return true;
  };

  // Check if notification type is enabled
  const isNotificationEnabled = (type: string): boolean => {
    try {
      const preferences = JSON.parse(localStorage.getItem('notificationPreferences') || '{}');
      const defaultEnabled = true; // Default to enabled if no preference set
      
      switch (type) {
        case 'career_progress':
          return preferences.careerProgress ?? defaultEnabled;
        case 'course_recommendation':
          return preferences.courseRecommendations ?? defaultEnabled;
        case 'resume_analysis':
          return preferences.resumeAnalysis ?? defaultEnabled;
        case 'ai_insight':
          return preferences.aiInsights ?? defaultEnabled;
        case 'profile_update':
          return preferences.profileUpdates ?? false; // Default to disabled for profile updates
        case 'system':
          return preferences.systemUpdates ?? defaultEnabled;
        default:
          return defaultEnabled;
      }
    } catch (error) {
      console.error('Error checking notification preferences:', error);
      return true; // Default to enabled on error
    }
  };

  // Career Progress Notifications
  const triggerCareerMilestone = (milestone: string, progress: number) => {
    if (!isNotificationEnabled('career_progress')) return;
    if (!canTriggerNotification('career_milestone', 10)) return; // 10 minute cooldown
    
    addNotification({
      type: 'career_progress',
      title: 'Career Milestone Achieved!',
      message: `You've reached ${milestone}. You're now ${progress}% complete with your career roadmap.`,
      priority: 'high',
      actionUrl: '/dashboard/career-roadmap',
      icon: '🎯'
    });
  };

  const triggerSkillDevelopment = (skill: string) => {
    if (!isNotificationEnabled('career_progress')) return;
    if (!canTriggerNotification('skill_development', 15)) return; // 15 minute cooldown
    
    addNotification({
      type: 'career_progress',
      title: 'Skill Development Progress!',
      message: `Great job! You've made progress in ${skill}. Keep building your expertise.`,
      priority: 'medium',
      actionUrl: '/dashboard/skills',
      icon: '📈'
    });
  };

  // Course Recommendations
  const triggerCourseRecommendation = (courseCount: number, category?: string, forceNotify: boolean = false) => {
    if (!isNotificationEnabled('course_recommendation')) return;
    
    // Allow forced notifications (e.g., when user changes preferences) or check cooldown
    if (!forceNotify && !canTriggerNotification('course_recommendation', 5)) return; // 5 minute cooldown
    
    // If forced, still update the cooldown timer
    if (forceNotify) {
      localStorage.setItem('last_course_recommendation_notification', Date.now().toString());
    }
    
    addNotification({
      type: 'course_recommendation',
      title: 'New Course Recommendations',
      message: `We found ${courseCount} new courses${category ? ` in ${category}` : ''} that match your career goals.`,
      priority: 'medium',
      actionUrl: '/dashboard/course-explorer',
      icon: '📚'
    });
  };

  // Resume Analysis Notifications
  const triggerResumeAnalysisComplete = (score: number) => {
    if (!isNotificationEnabled('resume_analysis')) return;
    if (!canTriggerNotification('resume_analysis', 2)) return; // 2 minute cooldown
    
    const message = score >= 80 
      ? `Excellent! Your resume scored ${score}/100. You're ready to apply!`
      : score >= 60
      ? `Good progress! Your resume scored ${score}/100. Check our suggestions for improvement.`
      : `Your resume scored ${score}/100. Let's work on improving it together.`;
    
    addNotification({
      type: 'resume_analysis',
      title: 'Resume Analysis Complete',
      message,
      priority: score >= 80 ? 'high' : 'medium',
      actionUrl: '/dashboard/resume-analyzer',
      icon: '📄'
    });
  };

  const triggerResumeOptimization = (suggestions: string[]) => {
    if (!isNotificationEnabled('resume_analysis')) return;
    if (!canTriggerNotification('resume_optimization', 5)) return; // 5 minute cooldown
    
    addNotification({
      type: 'resume_analysis',
      title: 'Resume Optimization Tips',
      message: `We have ${suggestions.length} suggestions to improve your resume's ATS compatibility.`,
      priority: 'medium',
      actionUrl: '/dashboard/resume-analyzer',
      icon: '💡'
    });
  };

  // AI Insights
  const triggerAIInsight = (insight: string) => {
    if (!isNotificationEnabled('ai_insight')) return;
    if (!canTriggerNotification('ai_insight', 30)) return; // 30 minute cooldown
    
    addNotification({
      type: 'ai_insight',
      title: 'New AI Insight Available',
      message: insight,
      priority: 'low',
      actionUrl: '/dashboard/insights',
      icon: '🤖'
    });
  };

  // Profile Updates
  const triggerProfileView = (viewerType: 'recruiter' | 'employer' | 'peer') => {
    if (!isNotificationEnabled('profile_update')) return;
    if (!canTriggerNotification('profile_view', 60)) return; // 1 hour cooldown
    
    const messages = {
      recruiter: 'A recruiter viewed your profile. Make sure it\'s up to date!',
      employer: 'An employer checked out your profile. Great visibility!',
      peer: 'Someone from your network viewed your profile.'
    };
    
    addNotification({
      type: 'profile_update',
      title: 'Profile View',
      message: messages[viewerType],
      priority: viewerType === 'recruiter' ? 'high' : 'low',
      actionUrl: '/dashboard/profile',
      icon: '👁️'
    });
  };

  const triggerProfileIncomplete = (missingFields: string[]) => {
    if (!isNotificationEnabled('profile_update')) return;
    if (!canTriggerNotification('profile_incomplete', 120)) return; // 2 hour cooldown
    
    addNotification({
      type: 'profile_update',
      title: 'Complete Your Profile',
      message: `Your profile is missing: ${missingFields.join(', ')}. Complete it to get better recommendations.`,
      priority: 'medium',
      actionUrl: '/dashboard/profile',
      icon: '⚠️'
    });
  };

  // System Updates
  const triggerSystemUpdate = (feature: string) => {
    if (!isNotificationEnabled('system')) return;
    if (!canTriggerNotification('system_update', 1440)) return; // 24 hour cooldown
    
    addNotification({
      type: 'system',
      title: 'New Feature Available',
      message: `Check out our new ${feature} feature to enhance your career journey!`,
      priority: 'low',
      actionUrl: '/dashboard',
      icon: '✨'
    });
  };

  return {
    triggerCareerMilestone,
    triggerSkillDevelopment,
    triggerCourseRecommendation,
    triggerResumeAnalysisComplete,
    triggerResumeOptimization,
    triggerAIInsight,
    triggerProfileView,
    triggerProfileIncomplete,
    triggerSystemUpdate
  };
};
