"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Star,
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Calendar,
  Users,
  Zap,
  Brain,
  Trophy,
  Rocket,
  MapPin,
  TrendingDown,
  AlertCircle,
  Plus,
  ChevronRight,
  Filter,
  Search,
  Download,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { downloadCareerPDF } from "@/app/utils/recommendationPdf";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState<
    "immediate" | "shortTerm" | "longTerm"
  >("immediate");
  const [expandedCareer, setExpandedCareer] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [userName, setUserName] = useState("");

  const handleDownloadPDF = async () => {
    if (!recommendations) return;

    setDownloading(true);

    try {
      // Prepare data for PDF
      const pdfData =
        recommendations.topRecommendations?.map((rec: any) => ({
          career: rec.title,
          score: parseInt(rec.match) || 85,
          description: rec.description,
          skills: rec.requiredSkills || [],
          salaryRange: rec.salaryRange,
          jobGrowth: rec.growthOutlook,
          education: "Based on your profile",
          topCompanies: [], // Add if available
        })) || [];

      // Call the PDF generation function
      downloadCareerPDF(pdfData, userName);

      // Reset downloading state after a delay
      setTimeout(() => {
        setDownloading(false);
      }, 1500);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
      setDownloading(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("careerRecommendations");
    if (stored) {
      setRecommendations(JSON.parse(stored));
    }
    setIsVisible(true);
  }, []);

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              No Recommendations Found
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Complete the career form to get personalized AI-powered career
              recommendations
            </p>
            <Link href="/dashboard/career-form">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
              >
                <Rocket className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Start Career Assessment
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const timeframeData = {
    immediate: {
      title: "Next 30 Days",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: Clock,
      actions: recommendations.actionPlan?.immediate || [],
    },
    shortTerm: {
      title: "3-6 Months",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: Calendar,
      actions: recommendations.actionPlan?.shortTerm || [],
    },
    longTerm: {
      title: "1-2 Years",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: Trophy,
      actions: recommendations.actionPlan?.longTerm || [],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Link
              href="/dashboard/career-form"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors p-2 -ml-2 rounded-lg hover:bg-purple-50"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">
                  AI Recommendations
                </h1>
                <p className="text-xs text-gray-600">
                  Personalized career insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleDownloadPDF}
        disabled={downloading}
        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
        size="sm"
      >
        {downloading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Generating...</span>
            <span className="sm:hidden">...</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </>
        )}
      </Button>

      {/* Main Content */}
      <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Mobile Title (hidden on desktop) */}
          <div className="sm:hidden text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              Your Career Path
            </h1>
            <p className="text-sm text-gray-600">AI-powered recommendations</p>
          </div>

          {/* Career Analysis Summary - Enhanced Mobile */}
          <Card
            className={`border-0 shadow-xl bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 hover:shadow-2xl transition-all duration-500 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            <CardHeader className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    Your Career Analysis
                  </CardTitle>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {recommendations.summary}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Top Career Recommendations - Mobile Optimized */}
          <Card
            className={`border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ${
              isVisible ? "animate-slideInLeft" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-md">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                    Top Career Matches
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Personalized recommendations based on your profile
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4 sm:space-y-6">
                {recommendations.topRecommendations?.map(
                  (career: any, index: number) => {
                    const isExpanded = expandedCareer === index;

                    return (
                      <div
                        key={index}
                        className="group border-0 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Career Header - Mobile First */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                {career.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md">
                                  {career.match} Match
                                </Badge>
                                {index === 0 && (
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                    Best Match
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                              {career.description}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedCareer(isExpanded ? null : index)
                            }
                            className="self-start sm:self-center p-2"
                          >
                            <ChevronRight
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </Button>
                        </div>

                        {/* Quick Stats - Mobile Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                          <div className="flex items-center gap-2 sm:gap-3 p-3 bg-white/70 rounded-lg border border-gray-200">
                            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-600">
                                Salary Range
                              </p>
                              <p className="text-sm sm:text-base font-semibold text-gray-900">
                                {career.salaryRange}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 p-3 bg-white/70 rounded-lg border border-gray-200">
                            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-600">
                                Growth Outlook
                              </p>
                              <p className="text-sm sm:text-base font-medium text-gray-900 line-clamp-1">
                                {career.growthOutlook}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content - Mobile Optimized */}
                        {isExpanded && (
                          <div className="space-y-4 border-t border-gray-200 pt-4 animate-fadeIn">
                            {/* Required Skills */}
                            <div>
                              <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-3 flex items-center gap-2">
                                <Target className="h-4 w-4 text-purple-600" />
                                Required Skills
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {career.requiredSkills?.map(
                                  (skill: string, idx: number) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs sm:text-sm hover:bg-purple-50 hover:border-purple-300 transition-colors cursor-default"
                                    >
                                      {skill}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Next Steps */}
                            <div>
                              <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-3 flex items-center gap-2">
                                <Rocket className="h-4 w-4 text-blue-600" />
                                Next Steps
                              </h4>
                              <div className="space-y-2">
                                {career.nextSteps?.map(
                                  (step: string, idx: number) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                                    >
                                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                      <p className="text-sm sm:text-base text-blue-900 leading-relaxed">
                                        {step}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Plan - Mobile-First Design */}
          <Card
            className={`border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ${
              isVisible ? "animate-slideInRight" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 sm:p-2.5 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl shadow-md">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      Your Action Plan
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Step-by-step roadmap to success
                    </p>
                  </div>
                </div>

                {/* Mobile Timeframe Selector */}
                <div className="sm:hidden w-full">
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    {Object.entries(timeframeData).map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => setActiveTimeframe(key as any)}
                        className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                          activeTimeframe === key
                            ? "bg-white shadow-sm text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {data.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 pt-0">
              {/* Desktop Grid Layout */}
              <div className="hidden sm:grid sm:grid-cols-3 gap-4 lg:gap-6">
                {Object.entries(timeframeData).map(([key, data]) => (
                  <div
                    key={key}
                    className={`p-4 lg:p-6 rounded-xl border-2 ${data.borderColor} ${data.bgColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <data.icon className={`h-5 w-5 ${data.color}`} />
                      <h3
                        className={`font-bold text-sm lg:text-base ${data.color}`}
                      >
                        {data.title}
                      </h3>
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                      {data.actions.map((action: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle
                            className={`h-3 w-3 lg:h-4 lg:w-4 ${data.color} mt-0.5 flex-shrink-0`}
                          />
                          <p className="text-xs lg:text-sm text-gray-800 leading-relaxed">
                            {action}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Single Panel */}
              <div className="sm:hidden">
                <div
                  className={`p-4 rounded-xl border-2 ${timeframeData[activeTimeframe].borderColor} ${timeframeData[activeTimeframe].bgColor}`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    {(() => {
                      const Icon = timeframeData[activeTimeframe].icon;
                      return (
                        <Icon
                          className={`h-5 w-5 ${timeframeData[activeTimeframe].color}`}
                        />
                      );
                    })()}
                    <h3
                      className={`font-bold ${timeframeData[activeTimeframe].color}`}
                    >
                      {timeframeData[activeTimeframe].title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {timeframeData[activeTimeframe].actions.map(
                      (action: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-white/70 rounded-lg"
                        >
                          <CheckCircle
                            className={`h-4 w-4 ${timeframeData[activeTimeframe].color} mt-0.5 flex-shrink-0`}
                          />
                          <p className="text-sm text-gray-800 leading-relaxed">
                            {action}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call-to-Action - Mobile Optimized */}
          <Card
            className={`border-2 border-dashed border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 shadow-xl hover:shadow-2xl transition-all duration-500 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    Ready to Start Your Journey?
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    Take the first step towards your dream career. Your
                    personalized roadmap is waiting!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex-1 sm:flex-initial"
                  >
                    <Rocket className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Start Learning
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-purple-300 hover:bg-purple-50 flex-1 sm:flex-initial"
                  >
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    View Courses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-8 sm:h-0" />
    </div>
  );
}
