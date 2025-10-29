// components/CourseProgressBar.tsx
"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

interface CourseProgressBarProps {
  completedLectures: number;
  totalLectures: number;
  progress?: number;
  showPercentage?: boolean;
  showDetails?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning";
}

export const CourseProgressBar: React.FC<CourseProgressBarProps> = ({
  completedLectures,
  totalLectures,
  progress,
  showPercentage = true,
  showDetails = true,
  size = "md",
  variant = "default",
}) => {
  // Calculate progress percentage
  const progressPercentage =
    progress !== undefined
      ? progress
      : totalLectures > 0
      ? Math.round((completedLectures / totalLectures) * 100)
      : 0;

  // Determine height based on size
  const heightClass = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }[size];

  // Determine color based on variant and progress
  const getProgressColor = () => {
    if (variant === "success" || progressPercentage === 100) {
      return "bg-green-500";
    }
    if (variant === "warning" || progressPercentage < 30) {
      return "bg-yellow-500";
    }
    return "bg-blue-500";
  };

  return (
    <div className="w-full space-y-2">
      {/* Progress Bar */}
      <div className="relative">
        <Progress
          value={progressPercentage}
          className={`${heightClass} ${getProgressColor()}`}
        />
      </div>

      {/* Details Section */}
      {(showPercentage || showDetails) && (
        <div className="flex items-center justify-between text-sm">
          {showDetails && (
            <div className="flex items-center gap-2">
              {progressPercentage === 100 ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Circle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-gray-600">
                {completedLectures} / {totalLectures} lectures completed
              </span>
            </div>
          )}

          {showPercentage && (
            <span
              className={`font-semibold ${
                progressPercentage === 100 ? "text-green-600" : "text-blue-600"
              }`}
            >
              {progressPercentage}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Circular Progress Bar Variant
interface CircularProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  showPercentage = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-500 ${
            progress === 100 ? "text-green-500" : "text-blue-500"
          }`}
        />
      </svg>
      {showPercentage && (
        <span className="absolute text-xl font-bold">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};

export default CourseProgressBar;
