// components/LectureList.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle2, Clock } from "lucide-react";
import { courseService } from "@/app/services/courseService";

interface Lecture {
  id: string;
  title: string;
  duration: number;
  videoUrl?: string;
  completed: boolean;
  order: number;
}

interface LectureListProps {
  courseId: string;
  userId: string;
  lectures: Lecture[];
  onProgressUpdate?: (progress: number) => void;
}

export const LectureList: React.FC<LectureListProps> = ({
  courseId,
  userId,
  lectures: initialLectures,
  onProgressUpdate,
}) => {
  const [lectures, setLectures] = useState<Lecture[]>(initialLectures);
  const [loading, setLoading] = useState(false);

  // Calculate progress
  const calculateProgress = () => {
    const completed = lectures.filter((l) => l.completed).length;
    const total = lectures.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const progress = calculateProgress();

  // Handle lecture completion toggle
  const handleLectureToggle = async (lectureId: string, completed: boolean) => {
    try {
      setLoading(true);

      // Update in backend
      await courseService.updateLectureCompletion(
        userId,
        courseId,
        lectureId,
        completed
      );

      // Update local state
      setLectures((prev) =>
        prev.map((lecture) =>
          lecture.id === lectureId ? { ...lecture, completed } : lecture
        )
      );

      // Notify parent component
      const newProgress = calculateProgress();
      if (onProgressUpdate) {
        onProgressUpdate(newProgress);
      }
    } catch (error) {
      console.error("Error updating lecture completion:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format duration (minutes to hours:minutes)
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Course Progress</span>
              <span className="text-muted-foreground">
                {lectures.filter((l) => l.completed).length} / {lectures.length}{" "}
                lectures completed
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">
              {progress}% complete
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Lecture List */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Course Content</h3>
        <div className="space-y-2">
          {lectures
            .sort((a, b) => a.order - b.order)
            .map((lecture, index) => (
              <Card
                key={lecture.id}
                className={`transition-all ${
                  lecture.completed
                    ? "border-green-500 bg-green-50/50 dark:bg-green-950/20"
                    : "hover:border-primary"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Lecture Number */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>

                    {/* Lecture Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2">
                            {lecture.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{formatDuration(lecture.duration)}</span>
                          </div>
                        </div>

                        {/* Completion Checkbox */}
                        <div className="flex items-center gap-2">
                          {lecture.completed && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                          <Checkbox
                            checked={lecture.completed}
                            onCheckedChange={(checked) =>
                              handleLectureToggle(
                                lecture.id,
                                checked as boolean
                              )
                            }
                            disabled={loading}
                            className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                          />
                        </div>
                      </div>

                      {/* Video URL - Optional */}
                      {lecture.videoUrl && (
                        <a
                          href={lecture.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline"
                        >
                          <Play className="w-3 h-3" />
                          Watch Lecture
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Empty State */}
      {lectures.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>No lectures available for this course yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LectureList;
