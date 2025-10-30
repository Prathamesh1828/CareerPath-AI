"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Zap,
  Target,
  TrendingUp,
  Award,
  Sparkles,
  RefreshCw,
  ArrowUpRight,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { generateResumePDF } from "@/lib/pdf-generator";
import { useNotificationTriggers } from "@/hooks/useNotificationTriggers";
import { useUserActivityTracker } from "@/hooks/useUserActivityTracker";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface SectionAnalysis {
  score: number;
  status: "excellent" | "good" | "needs_improvement";
  feedback: string;
}

interface AnalysisData {
  personalInfo: PersonalInfo;
  overallScore: number;
  sections: {
    contact: SectionAnalysis;
    summary: SectionAnalysis;
    experience: SectionAnalysis;
    education: SectionAnalysis;
    skills: SectionAnalysis;
  };
  keywords: {
    present: string[];
    missing: string[];
  };
  suggestions: string[];
  atsCompatibility: {
    score: number;
    issues: string[];
  };
  strengths: string[];
  weaknesses: string[];
}

// Helper function to calculate skills matched percentage
const calculateSkillsMatchedPercentage = (keywords: any) => {
  if (!keywords) return 0;
  const present = keywords.present?.length || 0;
  const missing = keywords.missing?.length || 0;
  const total = present + missing;
  return total > 0 ? Math.round((present / total) * 100) : 0;
};

export default function ResumeAnalyzerPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { triggerResumeAnalysisComplete, triggerResumeOptimization } = useNotificationTriggers();
  const { trackResumeUpload, trackPageVisit } = useUserActivityTracker();

  // Track page visit on component mount
  useEffect(() => {
    trackPageVisit('resume-analyzer');
  }, [trackPageVisit]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("resume", file);

        const response = await fetch("/api/analyze-resume", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.hint || "Failed to analyze resume"
          );
        }

        setAnalysisData(data);
        
        // Store resume analysis data in localStorage for dashboard
        const resumeAnalysisData = {
          resumeScore: data.overallScore || 0,
          atsScore: data.atsCompatibility?.score || 0,
          skillsMatched: data.keywords?.present?.length || 0,
          totalSkills: (data.keywords?.present?.length || 0) + (data.keywords?.missing?.length || 0),
          skillsMatchedPercentage: calculateSkillsMatchedPercentage(data.keywords),
          strengths: data.strengths || [],
          weaknesses: data.weaknesses || [],
          suggestions: data.suggestions || [],
          lastUpdated: new Date().toISOString(),
          fileName: file.name,
          personalInfo: data.personalInfo || {}
        };
        
        localStorage.setItem("resumeAnalysisData", JSON.stringify(resumeAnalysisData));
        
        // Trigger dashboard update
        localStorage.setItem("resumeAnalysisUpdated", Date.now().toString());
        
        // Dispatch custom event for real-time updates
        window.dispatchEvent(new CustomEvent('resumeAnalysisComplete', { 
          detail: resumeAnalysisData 
        }));
      
        // Track resume upload and trigger notifications
        trackResumeUpload(file.name);
        
        // Trigger notifications based on analysis results
        if (data.overallScore) {
          triggerResumeAnalysisComplete(data.overallScore);
          
          if (data.suggestions && data.suggestions.length > 0) {
            triggerResumeOptimization(data.suggestions);
          }
        }
    } catch (err) {
        console.error("Error:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to analyze resume. Please try again.";
        setError(errorMessage);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleNewUpload = () => {
    setUploadedFile(null);
    setAnalysisData(null);
    setError(null);
    setIsAnalyzing(false);
  };

  const handleDownloadReport = () => {
    if (analysisData && uploadedFile) {
      try {
        generateResumePDF(analysisData, uploadedFile.name);
      } catch (error) {
        console.error("Error generating PDF:", error);
        setError("Failed to generate PDF report. Please try again.");
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />;
      case "good":
        return (
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
        );
      case "needs_improvement":
        return <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "excellent":
        return "default";
      case "good":
        return "secondary";
      case "needs_improvement":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section - Enhanced Mobile Layout */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-gradient-to-r from-[#6C63FF] to-purple-600 rounded-lg">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-2">
                AI Resume Analyzer
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Upload your resume for AI-powered analysis and improvement
                suggestions
              </p>
            </div>
          </div>
        </div>

        {/* Error Display - Enhanced Mobile */}
        {error && (
          <Card className="border-red-200 bg-gradient-to-r from-red-50 to-red-100 shadow-md">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-red-200 rounded-full">
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-red-800 mb-1">Error</h4>
                  <p className="text-sm sm:text-base text-red-700">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Section - Enhanced Responsive Design */}
        {!uploadedFile ? (
          <Card className="border-2 border-dashed border-gray-300 hover:border-[#6C63FF] transition-all duration-300 hover:shadow-lg hover:bg-gray-50/50">
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="p-4 sm:p-6 bg-gradient-to-r from-[#6C63FF]/10 to-purple-600/10 rounded-full mb-4 sm:mb-6 mx-auto w-fit">
                    <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-[#6C63FF]" />
                  </div>
                  <div className="absolute -top-1 -right-1 p-1 bg-yellow-400 rounded-full">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-700" />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                    Upload Your Resume
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                    Drag and drop your resume here, or click to browse and get
                    instant AI-powered insights
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-gray-500">
                    <Badge variant="outline" className="bg-white">
                      PDF
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      DOC
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      DOCX
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      Up to 10MB
                    </Badge>
                  </div>

                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#6C63FF] to-purple-600 hover:from-[#5B54E6] hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() =>
                      document.getElementById("resume-upload")?.click()
                    }
                  >
                    <Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>

              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* File Info - Enhanced Mobile Layout */}
            <Card className="shadow-md border-0 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-[#6C63FF]/10 rounded-lg">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[#6C63FF]" />
                  </div>
                  Uploaded Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base text-gray-900 truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB •
                      Uploaded successfully
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNewUpload}
                    className="w-full sm:w-auto hover:bg-gray-50"
                  >
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Upload New
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Progress - Enhanced Animation */}
            {isAnalyzing && (
              <Card className="shadow-md border-0">
                <CardContent className="p-6 sm:p-8 lg:p-12">
                  <div className="text-center space-y-4 sm:space-y-6">
                    <div className="relative mx-auto w-fit">
                      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-gray-200 border-t-[#6C63FF] mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-[#6C63FF] animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Analyzing Your Resume with AI
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                        Our advanced AI is parsing your resume and generating
                        personalized insights...
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#6C63FF] rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-[#6C63FF] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#6C63FF] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Results - Enhanced Responsive Layout */}
            {analysisData && !isAnalyzing && (
              <div className="space-y-4 sm:space-y-6">
                {/* Personal Info - Enhanced Mobile Display */}
                {analysisData.personalInfo.name && (
                  <Card className="shadow-md border-0 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </div>
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                          <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="font-medium text-sm sm:text-base truncate">
                            {analysisData.personalInfo.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                          <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-600 truncate">
                            {analysisData.personalInfo.email || "Not found"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                          <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-600 truncate">
                            {analysisData.personalInfo.phone || "Not found"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                          <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-600 truncate">
                            {analysisData.personalInfo.location || "Not found"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Overall Score - Enhanced Visual Design */}
                <Card className="shadow-md border-0 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-white to-purple-50/30">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div>
                        <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
                          Overall Resume Score
                          <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-1">
                          AI-powered analysis of your resume's overall
                          effectiveness
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-center sm:items-end gap-1">
                        <Badge
                          variant="secondary"
                          className="text-lg sm:text-xl px-3 sm:px-4 py-1 sm:py-2 font-bold"
                        >
                          {analysisData.overallScore}/100
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <ArrowUpRight className="h-3 w-3" />
                          <span>Good score</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-3 sm:space-y-4">
                      <Progress
                        value={analysisData.overallScore}
                        className="h-3 sm:h-4"
                      />
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Needs Work (0-40)
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Good (41-70)
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Excellent (71-100)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Mobile-First Tabs */}
                <Tabs defaultValue="sections" className="space-y-4">
                  <div className="overflow-x-auto">
                    <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-gray-100 rounded-lg">
                      <TabsTrigger
                        value="sections"
                        className="text-xs sm:text-sm py-2 sm:py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        <FileCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden sm:inline">Sections</span>
                        <span className="sm:hidden">Sect</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="keywords"
                        className="text-xs sm:text-sm py-2 sm:py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden sm:inline">Keywords</span>
                        <span className="sm:hidden">Keys</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="suggestions"
                        className="text-xs sm:text-sm py-2 sm:py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden sm:inline">Suggestions</span>
                        <span className="sm:hidden">Tips</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="ats"
                        className="text-xs sm:text-sm py-2 sm:py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden sm:inline">ATS Score</span>
                        <span className="sm:hidden">ATS</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="report"
                        className="text-xs sm:text-sm py-2 sm:py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden sm:inline">Report</span>
                        <span className="sm:hidden">PDF</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Sections Tab - Enhanced Mobile Layout */}
                  <TabsContent value="sections" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {Object.entries(analysisData.sections).map(
                        ([section, data]) => (
                          <Card
                            key={section}
                            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                          >
                            <CardHeader className="p-4 sm:p-5">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm sm:text-base capitalize flex items-center gap-2">
                                  <div className="p-1.5 bg-gray-100 rounded-lg">
                                    {getStatusIcon(data.status)}
                                  </div>
                                  {section.replace("_", " ")}
                                </CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-5 pt-0">
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Score</span>
                                  <span className="font-bold text-lg">
                                    {data.score}/100
                                  </span>
                                </div>
                                <Progress
                                  value={data.score}
                                  className="h-2 sm:h-2.5"
                                />
                                <Badge
                                  variant={getStatusVariant(data.status) as any}
                                  className="text-xs w-fit"
                                >
                                  {data.status.replace("_", " ")}
                                </Badge>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                  {data.feedback}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  </TabsContent>

                  {/* Keywords Tab - Enhanced Mobile Display */}
                  <TabsContent
                    value="keywords"
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-green-600 flex items-center gap-2 text-base sm:text-lg">
                            <div className="p-1.5 bg-green-100 rounded-lg">
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            Keywords Found (
                            {analysisData.keywords.present.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <div className="flex flex-wrap gap-2">
                            {analysisData.keywords.present.map(
                              (keyword, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-green-100 text-green-800 text-xs sm:text-sm"
                                >
                                  {keyword}
                                </Badge>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-red-600 flex items-center gap-2 text-base sm:text-lg">
                            <div className="p-1.5 bg-red-100 rounded-lg">
                              <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            Missing Keywords (
                            {analysisData.keywords.missing.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <div className="flex flex-wrap gap-2">
                            {analysisData.keywords.missing.map(
                              (keyword, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-red-100 text-red-800 text-xs sm:text-sm"
                                >
                                  {keyword}
                                </Badge>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Suggestions Tab - Enhanced Mobile Layout */}
                  <TabsContent
                    value="suggestions"
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-green-600 flex items-center gap-2 text-base sm:text-lg">
                            <div className="p-1.5 bg-green-100 rounded-lg">
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            Strengths ({analysisData.strengths.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <div className="space-y-3">
                            {analysisData.strengths.map((strength, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-3 p-3 sm:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm sm:text-base text-green-900 leading-relaxed">
                                  {strength}
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-blue-600 flex items-center gap-2 text-base sm:text-lg">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            Improvement Areas ({analysisData.suggestions.length}
                            )
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <div className="space-y-3">
                            {analysisData.suggestions.map(
                              (suggestion, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-3 p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                                >
                                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <p className="text-sm sm:text-base text-blue-900 leading-relaxed">
                                    {suggestion}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* ATS Tab - Enhanced Mobile Display */}
                  <TabsContent value="ats" className="space-y-4 sm:space-y-6">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                          <div>
                            <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
                              <div className="p-1.5 bg-orange-100 rounded-lg">
                                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                              </div>
                              ATS Compatibility Score
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base mt-1">
                              How well your resume works with Applicant Tracking
                              Systems
                            </CardDescription>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-lg sm:text-xl px-3 sm:px-4 py-1 sm:py-2 font-bold"
                          >
                            {analysisData.atsCompatibility.score}/100
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-4 sm:space-y-6">
                          <div>
                            <Progress
                              value={analysisData.atsCompatibility.score}
                              className="h-3 sm:h-4 mb-2"
                            />
                            <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                              <span>Poor ATS compatibility</span>
                              <span>Excellent ATS compatibility</span>
                            </div>
                          </div>

                          {analysisData.atsCompatibility.issues.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium text-red-600 text-sm sm:text-base flex items-center gap-2">
                                <XCircle className="h-4 w-4" />
                                ATS Issues to Address:
                              </h4>
                              <div className="space-y-2 sm:space-y-3">
                                {analysisData.atsCompatibility.issues.map(
                                  (issue, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start space-x-3 p-3 sm:p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                    >
                                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                      <p className="text-sm sm:text-base text-red-900 leading-relaxed">
                                        {issue}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Report Tab - Enhanced Mobile Layout */}
                  <TabsContent
                    value="report"
                    className="space-y-4 sm:space-y-6"
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                          <div className="p-1.5 bg-purple-100 rounded-lg">
                            <Download className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                          </div>
                          Download Analysis Report
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                          Get a comprehensive PDF report of your AI resume
                          analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-4 sm:space-y-6">
                          <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border">
                            <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
                              <Award className="h-4 w-4 text-purple-600" />
                              Report includes:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                Overall score: {analysisData.overallScore}/100
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                Section-by-section analysis
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                ATS compatibility:{" "}
                                {analysisData.atsCompatibility.score}/100
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                Keyword optimization tips
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                {analysisData.suggestions.length} improvement
                                suggestions
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                {analysisData.strengths.length} identified
                                strengths
                              </div>
                            </div>
                          </div>
                          <Button
                            size="lg"
                            className="w-full sm:w-auto bg-gradient-to-r from-[#6C63FF] to-purple-600 hover:from-[#5B54E6] hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            onClick={handleDownloadReport}
                          >
                            <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                            Download PDF Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
