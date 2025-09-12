"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Download, CheckCircle, AlertCircle, XCircle, User, Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"
import { generateResumePDF } from "@/lib/pdf-generator"

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

export default function ResumeAnalyzerPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setIsAnalyzing(true)
      setError(null)
      
      try {
        const formData = new FormData()
        formData.append('resume', file)
        
        const response = await fetch('/api/analyze-resume', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          throw new Error('Failed to analyze resume')
        }
        
        const data = await response.json()
        setAnalysisData(data)
      } catch (err) {
        console.error('Error:', err)
        setError('Failed to analyze resume. Please try again.')
      } finally {
        setIsAnalyzing(false)
      }
    }
  }

  const handleNewUpload = () => {
    setUploadedFile(null)
    setAnalysisData(null)
    setError(null)
    setIsAnalyzing(false)
  }

  const handleDownloadReport = () => {
    if (analysisData && uploadedFile) {
      try {
        generateResumePDF(analysisData, uploadedFile.name);
      } catch (error) {
        console.error('Error generating PDF:', error);
        setError('Failed to generate PDF report. Please try again.');
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <CheckCircle className="h-5 w-5 text-green-600" />
      case "good": return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "needs_improvement": return <XCircle className="h-5 w-5 text-red-600" />
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "excellent": return "default"
      case "good": return "secondary"
      case "needs_improvement": return "destructive"
      default: return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Resume Analyzer</h1>
        <p className="text-gray-600">Upload your resume for AI-powered analysis and improvement suggestions</p>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-800">
              <XCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!uploadedFile ? (
        <Card className="border-2 border-dashed border-gray-300 hover:border-[#6C63FF] transition-colors">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Resume</h3>
            <p className="text-gray-600 mb-4 text-center">Drag and drop your resume here, or click to browse</p>
            <p className="text-sm text-gray-500 mb-4">Supports PDF, DOC, and DOCX files up to 10MB</p>
            
            <Button 
              className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white"
              onClick={() => document.getElementById('resume-upload')?.click()}
            >
              Choose File
            </Button>
            
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* File Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#6C63FF]" />
                Uploaded Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleNewUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6C63FF] mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold mb-2">Analyzing Your Resume with AI</h3>
                  <p className="text-gray-600">Our Gemini AI is parsing your resume and generating insights...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {analysisData && !isAnalyzing && (
            <div className="space-y-6">
              {/* Personal Info */}
              {analysisData.personalInfo.name && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-[#6C63FF]" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{analysisData.personalInfo.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{analysisData.personalInfo.email || 'Not found'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{analysisData.personalInfo.phone || 'Not found'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{analysisData.personalInfo.location || 'Not found'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Overall Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Overall Resume Score</span>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {analysisData.overallScore}/100
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    AI-powered analysis of your resume's overall effectiveness
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={analysisData.overallScore} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Needs Work</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <Tabs defaultValue="sections" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="sections">Sections</TabsTrigger>
                  <TabsTrigger value="keywords">Keywords</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                  <TabsTrigger value="ats">ATS Score</TabsTrigger>
                  <TabsTrigger value="report">Report</TabsTrigger>
                </TabsList>

                <TabsContent value="sections" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(analysisData.sections).map(([section, data]) => (
                      <Card key={section}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base capitalize flex items-center justify-between">
                            {section.replace("_", " ")}
                            {getStatusIcon(data.status)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Score</span>
                              <span className="font-medium">{data.score}/100</span>
                            </div>
                            <Progress value={data.score} className="h-2" />
                            <Badge
                              variant={getStatusVariant(data.status) as any}
                              className="text-xs"
                            >
                              {data.status.replace("_", " ")}
                            </Badge>
                            <p className="text-sm text-gray-600">{data.feedback}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="keywords" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Keywords Found ({analysisData.keywords.present.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.keywords.present.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600 flex items-center gap-2">
                          <XCircle className="h-5 w-5" />
                          Missing Keywords ({analysisData.keywords.missing.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.keywords.missing.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="suggestions" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analysisData.strengths.map((strength, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-green-900">{strength}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-blue-600 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5" />
                          Improvement Areas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analysisData.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-blue-900">{suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="ats" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>ATS Compatibility Score</span>
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                          {analysisData.atsCompatibility.score}/100
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        How well your resume works with Applicant Tracking Systems
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={analysisData.atsCompatibility.score} className="h-3 mb-4" />
                      
                      {analysisData.atsCompatibility.issues.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-red-600">ATS Issues to Address:</h4>
                          {analysisData.atsCompatibility.issues.map((issue, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                              <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-red-900">{issue}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="report" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Download Analysis Report</CardTitle>
                      <CardDescription>Get a comprehensive PDF report of your AI resume analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-2">Report includes:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Overall score: {analysisData.overallScore}/100</li>
                            <li>• Section-by-section analysis</li>
                            <li>• ATS compatibility: {analysisData.atsCompatibility.score}/100</li>
                            <li>• Keyword optimization recommendations</li>
                            <li>• {analysisData.suggestions.length} improvement suggestions</li>
                            <li>• {analysisData.strengths.length} identified strengths</li>
                          </ul>
                        </div>
                        <Button 
                          className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white"
                          onClick={handleDownloadReport}
                        >
                          <Download className="h-4 w-4 mr-2" />
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
  )
}
