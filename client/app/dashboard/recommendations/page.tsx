"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("careerRecommendations");
    if (stored) {
      setRecommendations(JSON.parse(stored));
    }
  }, []);

  if (!recommendations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>No recommendations found. Please complete the career form first.</p>
            <Link href="/dashboard/career-form">
              <Button className="mt-4">Go to Career Form</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/dashboard/career-form"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Form
        </Link>

        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Your Career Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{recommendations.summary}</p>
            </CardContent>
          </Card>

          {/* Top Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Top Career Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendations.topRecommendations?.map((career: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">{career.title}</h3>
                      <Badge variant="secondary">{career.match} Match</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{career.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <h4 className="font-medium mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {career.requiredSkills?.map((skill: string, idx: number) => (
                            <Badge key={idx} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="font-medium">Growth Outlook:</span>
                        </div>
                        <p className="text-sm text-gray-600">{career.growthOutlook}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="font-medium">Salary Range: </span>
                      <span className="ml-1">{career.salaryRange}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Next Steps:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {career.nextSteps?.map((step: string, idx: number) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Your Action Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">Immediate (Next 30 days)</h3>
                  <ul className="space-y-1">
                    {recommendations.actionPlan?.immediate?.map((action: string, idx: number) => (
                      <li key={idx} className="text-sm">• {action}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-blue-600">Short Term (3-6 months)</h3>
                  <ul className="space-y-1">
                    {recommendations.actionPlan?.shortTerm?.map((action: string, idx: number) => (
                      <li key={idx} className="text-sm">• {action}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-purple-600">Long Term (1-2 years)</h3>
                  <ul className="space-y-1">
                    {recommendations.actionPlan?.longTerm?.map((action: string, idx: number) => (
                      <li key={idx} className="text-sm">• {action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
