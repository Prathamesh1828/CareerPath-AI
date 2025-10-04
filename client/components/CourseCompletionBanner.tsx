// components/CourseCompletionBanner.tsx
"use client";

import React from "react";
import { CheckCircle, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CourseCompletionBannerProps {
  completedLectures: number;
  totalLectures: number;
  courseName?: string;
  progressPercentage?: number;
  showCongrats?: boolean;
}

export const CourseCompletionBanner: React.FC<CourseCompletionBannerProps> = ({
  completedLectures,
  totalLectures,
  courseName,
  progressPercentage,
  showCongrats = false,
}) => {
  const calculatedProgress =
    progressPercentage ??
    (totalLectures > 0
      ? Math.round((completedLectures / totalLectures) * 100)
      : 0);

  const isCompleted = completedLectures === totalLectures && totalLectures > 0;

  if (isCompleted && showCongrats) {
    return (
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Award className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">
                🎉 Congratulations! Course Completed!
              </h3>
              <p className="text-white/90">
                You've successfully completed {courseName || "this course"}.
                Keep up the great work!
              </p>
            </div>
            <CheckCircle className="w-12 h-12" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none shadow-lg mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6" />
            <div>
              <h3 className="text-lg font-semibold">Course Progress</h3>
              {courseName && (
                <p className="text-sm text-white/80">{courseName}</p>
              )}
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-white/20 text-white border-none px-4 py-1"
          >
            {completedLectures} / {totalLectures} Lectures
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>{calculatedProgress}% Complete</span>
            <span className="text-white/80">
              {totalLectures - completedLectures} lectures remaining
            </span>
          </div>
          <Progress value={calculatedProgress} className="h-3 bg-white/20" />
        </div>

        {calculatedProgress >= 75 && calculatedProgress < 100 && (
          <p className="text-sm text-white/90 mt-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Almost there! Just a few more lectures to go.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCompletionBanner;
