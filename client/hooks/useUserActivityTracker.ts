"use client";

import { useNotificationTriggers } from './useNotificationTriggers';
import { useEffect, useCallback } from 'react';

interface UserActivity {
  type: 'profile_update' | 'resume_upload' | 'course_bookmark' | 'skill_add' | 'goal_set' | 'page_visit';
  data?: any;
  timestamp: Date;
}

interface UserProgress {
  profileCompleteness: number;
  skillsCount: number;
  goalsCount: number;
  resumeUploaded: boolean;
  coursesBookmarked: number;
  lastActivity: Date;
}

export const useUserActivityTracker = () => {
  const {
    triggerProfileIncomplete,
    triggerSkillDevelopment,
    triggerCareerMilestone,
    triggerCourseRecommendation,
    triggerProfileView,
    triggerSystemUpdate
  } = useNotificationTriggers();

  // Track user activity
  const trackActivity = useCallback((activity: UserActivity) => {
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    activities.push({
      ...activity,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 activities
    if (activities.length > 100) {
      activities.splice(0, activities.length - 100);
    }
    
    localStorage.setItem('userActivities', JSON.stringify(activities));
    
    // Check for milestones and trigger notifications
    checkMilestones(activity);
  }, []);

  // Calculate user progress
  const calculateProgress = useCallback((): UserProgress => {
    const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
    const skills = JSON.parse(localStorage.getItem('userSkills') || '[]');
    const goals = JSON.parse(localStorage.getItem('careerGoals') || '[]');
    const bookmarks = JSON.parse(localStorage.getItem('courseBookmarks') || '[]');
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    
    // Calculate profile completeness
    const requiredFields = ['name', 'email', 'currentRole', 'experience'];
    const completedFields = requiredFields.filter(field => profileData[field]);
    const profileCompleteness = Math.round((completedFields.length / requiredFields.length) * 100);
    
    return {
      profileCompleteness,
      skillsCount: skills.length,
      goalsCount: goals.length,
      resumeUploaded: !!localStorage.getItem('resumeUploaded'),
      coursesBookmarked: bookmarks.length,
      lastActivity: activities.length > 0 ? new Date(activities[activities.length - 1].timestamp) : new Date()
    };
  }, []);

  // Check for milestones and trigger notifications
  const checkMilestones = useCallback((activity: UserActivity) => {
    const progress = calculateProgress();
    const milestones = JSON.parse(localStorage.getItem('achievedMilestones') || '[]');
    
    // Profile completion milestones
    if (progress.profileCompleteness === 100 && !milestones.includes('profile_complete')) {
      triggerCareerMilestone('Complete Profile', 100);
      milestones.push('profile_complete');
    } else if (progress.profileCompleteness >= 75 && !milestones.includes('profile_75')) {
      triggerCareerMilestone('75% Profile Complete', 75);
      milestones.push('profile_75');
    } else if (progress.profileCompleteness >= 50 && !milestones.includes('profile_50')) {
      triggerCareerMilestone('50% Profile Complete', 50);
      milestones.push('profile_50');
    }
    
    // Skills milestones
    if (progress.skillsCount >= 10 && !milestones.includes('skills_10')) {
      triggerSkillDevelopment('10 Skills Added');
      milestones.push('skills_10');
    } else if (progress.skillsCount >= 5 && !milestones.includes('skills_5')) {
      triggerSkillDevelopment('5 Skills Added');
      milestones.push('skills_5');
    }
    
    // Course interaction milestones
    if (progress.coursesBookmarked >= 10 && !milestones.includes('bookmarks_10')) {
      triggerCareerMilestone('Course Explorer', 100);
      milestones.push('bookmarks_10');
    } else if (progress.coursesBookmarked >= 5 && !milestones.includes('bookmarks_5')) {
      triggerCourseRecommendation(5, 'your bookmarked courses');
      milestones.push('bookmarks_5');
    }
    
    // Resume upload milestone
    if (progress.resumeUploaded && !milestones.includes('resume_uploaded')) {
      triggerCareerMilestone('Resume Uploaded', 100);
      milestones.push('resume_uploaded');
    }
    
    // Check for incomplete profile
    if (progress.profileCompleteness < 100) {
      const missingFields = [];
      const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
      if (!profileData.name) missingFields.push('Name');
      if (!profileData.currentRole) missingFields.push('Current Role');
      if (!profileData.experience) missingFields.push('Experience Level');
      if (!progress.resumeUploaded) missingFields.push('Resume');
      
      if (missingFields.length > 0) {
        // Only trigger if it's been more than 1 hour since last incomplete profile notification
        const lastIncompleteNotification = localStorage.getItem('lastIncompleteProfileNotification');
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        
        if (!lastIncompleteNotification || parseInt(lastIncompleteNotification) < oneHourAgo) {
          triggerProfileIncomplete(missingFields);
          localStorage.setItem('lastIncompleteProfileNotification', Date.now().toString());
        }
      }
    }
    
    localStorage.setItem('achievedMilestones', JSON.stringify(milestones));
  }, [calculateProgress, triggerCareerMilestone, triggerSkillDevelopment, triggerCourseRecommendation, triggerProfileIncomplete]);

  // Track page visits for engagement
  const trackPageVisit = useCallback((page: string) => {
    trackActivity({
      type: 'page_visit',
      data: { page },
      timestamp: new Date()
    });
  }, [trackActivity]);

  // Track profile updates
  const trackProfileUpdate = useCallback((field: string, value: any) => {
    trackActivity({
      type: 'profile_update',
      data: { field, value },
      timestamp: new Date()
    });
  }, [trackActivity]);

  // Track skill additions
  const trackSkillAdd = useCallback((skill: string) => {
    trackActivity({
      type: 'skill_add',
      data: { skill },
      timestamp: new Date()
    });
  }, [trackActivity]);

  // Track goal setting
  const trackGoalSet = useCallback((goal: string) => {
    trackActivity({
      type: 'goal_set',
      data: { goal },
      timestamp: new Date()
    });
  }, [trackActivity]);

  // Track course bookmarking
  const trackCourseBookmark = useCallback((courseId: string, courseName: string) => {
    trackActivity({
      type: 'course_bookmark',
      data: { courseId, courseName },
      timestamp: new Date()
    });
  }, [trackActivity]);

  // Track resume upload
  const trackResumeUpload = useCallback((fileName: string) => {
    localStorage.setItem('resumeUploaded', 'true');
    trackActivity({
      type: 'resume_upload',
      data: { fileName },
      timestamp: new Date()
    });
  }, [trackActivity]);

  // Simulate profile views (in a real app, this would come from backend)
  useEffect(() => {
    const simulateProfileViews = () => {
      const lastViewSimulation = localStorage.getItem('lastProfileViewSimulation');
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      
      if (!lastViewSimulation || parseInt(lastViewSimulation) < oneDayAgo) {
        const viewTypes = ['recruiter', 'employer', 'peer'] as const;
        const randomType = viewTypes[Math.floor(Math.random() * viewTypes.length)];
        
        // Only trigger if profile is at least 50% complete
        const progress = calculateProgress();
        if (progress.profileCompleteness >= 50) {
          triggerProfileView(randomType);
          localStorage.setItem('lastProfileViewSimulation', Date.now().toString());
        }
      }
    };

    // Check for profile views every 6 hours
    const interval = setInterval(simulateProfileViews, 6 * 60 * 60 * 1000);
    
    // Check immediately on mount
    simulateProfileViews();
    
    return () => clearInterval(interval);
  }, [calculateProgress, triggerProfileView]);

  return {
    trackActivity,
    trackPageVisit,
    trackProfileUpdate,
    trackSkillAdd,
    trackGoalSet,
    trackCourseBookmark,
    trackResumeUpload,
    calculateProgress,
    checkMilestones
  };
};
