"use client";

import React, { useState, useEffect } from "react";
import CourseProgressBar from "./CourseProgressBar";
import CourseCompletionBanner from "./CourseCompletionBanner";
import courseProgressService from "@/app/services/courseProgressService";
import {
  ExternalLink,
  Star,
  Loader,
  BookOpen,
  CheckCircle2,
  Circle,
} from "lucide-react";

interface CourseSectionProps {
  course: any;
  userId: string;
  onProgressUpdate?: () => void;
}

const CourseSection: React.FC<CourseSectionProps> = ({
  course,
  userId,
  onProgressUpdate,
}) => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  // Check if course has sections/lectures
  const hasSections =
    course?.sections &&
    Array.isArray(course.sections) &&
    course.sections.length > 0;
  const totalLectures = hasSections
    ? course.sections.reduce(
        (sum: number, section: any) => sum + (section.lectures?.length || 0),
        0
      )
    : 0;

  useEffect(() => {
    console.log("🔄 CourseSection mounted:", {
      courseId: course.id || course._id,
      courseName: course.title || course.name,
      hasSections,
      totalLectures,
    });
    loadProgress();
  }, [course, userId]);

  const loadProgress = async () => {
    try {
      setLoading(true);

      if (!userId || userId === "undefined" || userId.length !== 24) {
        console.error("❌ Invalid userId format:", userId);
        setLoading(false);
        return;
      }

      // For courses without sections, check if marked as complete
      const courseId = course.id || course._id;
      const localProgress = localStorage.getItem(
        `course_${courseId}_completed`
      );

      if (localProgress) {
        const data = JSON.parse(localProgress);
        setCompleted(data.completed || false);
        setProgress(data.completed ? 100 : 0);
      }

      console.log(
        "✅ Progress loaded for course:",
        course.title || course.name
      );
    } catch (error) {
      console.error("❌ Error loading progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      setMarking(true);
      const courseId = course.id || course._id;

      // Toggle completion
      const newCompleted = !completed;
      setCompleted(newCompleted);
      setProgress(newCompleted ? 100 : 0);

      // Save to localStorage
      localStorage.setItem(
        `course_${courseId}_completed`,
        JSON.stringify({
          completed: newCompleted,
          completedAt: new Date().toISOString(),
          courseName: course.title || course.name,
        })
      );

      // Notify parent
      if (onProgressUpdate) {
        onProgressUpdate();
      }

      console.log(
        `✅ Course ${newCompleted ? "completed" : "unmarked"}:`,
        course.title || course.name
      );
    } catch (error) {
      console.error("Error marking course complete:", error);
    } finally {
      setMarking(false);
    }
  };

  const handleDownloadCertificate = () => {
    alert("Certificate download feature coming soon!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 bg-white rounded-xl shadow-lg mb-6">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="ml-3 text-gray-600">Loading course...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow border-2 border-gray-100">
      {/* Course Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-1 flex-1">
                  {course.title || course.name}
                </h2>
                {completed && (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                {course.platform && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                    {course.platform}
                  </span>
                )}
                {course.duration && (
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> {course.duration}
                  </span>
                )}
                {course.rating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                  </span>
                )}
                {course.level && (
                  <span
                    className={`px-3 py-1 rounded-full font-medium text-xs ${
                      course.level === "Beginner"
                        ? "bg-green-50 text-green-700"
                        : course.level === "Intermediate"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {course.level}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {course.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-3 ml-15">
              {course.description}
            </p>
          )}

          {/* Skills */}
          {course.skills && course.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 ml-15">
              <span className="text-xs font-semibold text-gray-500">
                Skills:
              </span>
              {course.skills.slice(0, 5).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
              {course.skills.length > 5 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                  +{course.skills.length - 5} more
                </span>
              )}
            </div>
          )}

          {/* Phase Info */}
          {course.phaseTitle && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium ml-15">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              Phase: {course.phaseTitle}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          {course.url && (
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Start Course
            </a>
          )}

          <button
            onClick={handleMarkComplete}
            disabled={marking}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all font-medium ${
              completed
                ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {marking ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : completed ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                Mark Complete
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-6 space-y-4">
        {/* Progress Bar */}
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Course Progress
            </span>
            <span
              className={`text-2xl font-bold ${
                completed ? "text-green-600" : "text-blue-600"
              }`}
            >
              {progress}%
            </span>
          </div>

          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                completed
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : "bg-gradient-to-r from-blue-500 to-purple-600"
              }`}
              style={{ width: `${progress}%` }}
            >
              {progress > 0 && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>{completed ? "Course completed! 🎉" : "Keep learning!"}</span>
            {!completed && <span>Click "Mark Complete" when finished</span>}
          </div>
        </div>

        {/* Completion Banner */}
        {completed && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">🎉 Congratulations!</h3>
                <p className="text-sm text-white/90">
                  You've completed this course. Ready for the next challenge?
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Banner for external courses */}
        {!hasSections && !completed && (
          <div className="p-4 bg-blue-50 border-2 border-blue-100 rounded-lg">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">📚 External Course:</span> This
              course is hosted externally. Click "Start Course" to begin
              learning on {course.platform || "the platform"}.
            </p>
          </div>
        )}
      </div>

      {/* Course Stats */}
      {(course.isFree !== undefined || course.price !== undefined) && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
          {course.isFree && (
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
              Free
            </span>
          )}
          {course.price !== undefined && course.price > 0 && (
            <span className="text-gray-700 font-semibold">${course.price}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSection;
