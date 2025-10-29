"use client";

import { useEffect } from 'react';
import { useUserActivityTracker } from '@/hooks/useUserActivityTracker';

export function ProfileTracker() {
  const { trackProfileUpdate, trackSkillAdd, trackGoalSet, trackPageVisit } = useUserActivityTracker();

  useEffect(() => {
    // Listen for profile data changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'profileData' && e.newValue) {
        try {
          const newData = JSON.parse(e.newValue);
          const oldData = e.oldValue ? JSON.parse(e.oldValue) : {};
          
          // Check what changed and track accordingly
          Object.keys(newData).forEach(key => {
            if (newData[key] !== oldData[key]) {
              trackProfileUpdate(key, newData[key]);
            }
          });
        } catch (error) {
          console.error('Error tracking profile changes:', error);
        }
      }
      
      if (e.key === 'userSkills' && e.newValue) {
        try {
          const newSkills = JSON.parse(e.newValue);
          const oldSkills = e.oldValue ? JSON.parse(e.oldValue) : [];
          
          // Find newly added skills
          const addedSkills = newSkills.filter((skill: string) => !oldSkills.includes(skill));
          addedSkills.forEach((skill: string) => {
            trackSkillAdd(skill);
          });
        } catch (error) {
          console.error('Error tracking skill changes:', error);
        }
      }
      
      if (e.key === 'careerGoals' && e.newValue) {
        try {
          const newGoals = JSON.parse(e.newValue);
          const oldGoals = e.oldValue ? JSON.parse(e.oldValue) : [];
          
          // Find newly added goals
          const addedGoals = newGoals.filter((goal: string) => !oldGoals.includes(goal));
          addedGoals.forEach((goal: string) => {
            trackGoalSet(goal);
          });
        } catch (error) {
          console.error('Error tracking goal changes:', error);
        }
      }
    };

    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes in the same window by polling
    let lastProfileData = localStorage.getItem('profileData');
    let lastSkills = localStorage.getItem('userSkills');
    let lastGoals = localStorage.getItem('careerGoals');
    
    const checkForChanges = () => {
      const currentProfileData = localStorage.getItem('profileData');
      const currentSkills = localStorage.getItem('userSkills');
      const currentGoals = localStorage.getItem('careerGoals');
      
      if (currentProfileData !== lastProfileData) {
        handleStorageChange({
          key: 'profileData',
          newValue: currentProfileData,
          oldValue: lastProfileData
        } as StorageEvent);
        lastProfileData = currentProfileData;
      }
      
      if (currentSkills !== lastSkills) {
        handleStorageChange({
          key: 'userSkills',
          newValue: currentSkills,
          oldValue: lastSkills
        } as StorageEvent);
        lastSkills = currentSkills;
      }
      
      if (currentGoals !== lastGoals) {
        handleStorageChange({
          key: 'careerGoals',
          newValue: currentGoals,
          oldValue: lastGoals
        } as StorageEvent);
        lastGoals = currentGoals;
      }
    };
    
    const interval = setInterval(checkForChanges, 2000); // Check every 2 seconds
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [trackProfileUpdate, trackSkillAdd, trackGoalSet]);

  // Track page navigation
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const page = path.split('/').pop() || 'dashboard';
      trackPageVisit(page);
    };

    // Track initial page
    handleRouteChange();

    // Listen for navigation changes (for client-side routing)
    window.addEventListener('popstate', handleRouteChange);
    
    // For Next.js router changes, we'd need to use router events
    // This is a basic implementation for direct navigation
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [trackPageVisit]);

  return null; // This component doesn't render anything
}
