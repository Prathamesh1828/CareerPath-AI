"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis,
  ReferenceLine,
} from "recharts"
import { TrendingUp, Download, Target, Zap, Brain, Eye } from "lucide-react"
import { useState, useEffect } from "react"

const skillsCoverageData = [
  { skill: "JavaScript", coverage: 90, demand: 95, growth: 15, jobs: 1250 },
  { skill: "React", coverage: 85, demand: 88, growth: 20, jobs: 980 },
  { skill: "HTML/CSS", coverage: 95, demand: 80, growth: 5, jobs: 1100 },
  { skill: "TypeScript", coverage: 40, demand: 85, growth: 35, jobs: 750 },
  { skill: "Node.js", coverage: 60, demand: 75, growth: 25, jobs: 650 },
  { skill: "Python", coverage: 30, demand: 70, growth: 30, jobs: 890 },
  { skill: "Vue.js", coverage: 25, demand: 45, growth: 18, jobs: 320 },
  { skill: "Angular", coverage: 35, demand: 50, growth: -5, jobs: 280 },
]

const resumeScoreData = [
  { month: "Jan", score: 65, applications: 8, interviews: 1, offers: 0 },
  { month: "Feb", score: 70, applications: 12, interviews: 2, offers: 0 },
  { month: "Mar", score: 75, applications: 15, interviews: 4, offers: 1 },
  { month: "Apr", score: 78, applications: 18, interviews: 5, offers: 1 },
  { month: "May", score: 82, applications: 20, interviews: 7, offers: 2 },
  { month: "Jun", score: 85, applications: 22, interviews: 8, offers: 3 },
]

const applicationSuccessData = [
  { name: "Applications Sent", value: 95, color: "#6C63FF" },
  { name: "Responses", value: 28, color: "#4F46E5" },
  { name: "Interviews", value: 18, color: "#3B82F6" },
  { name: "Final Rounds", value: 8, color: "#10B981" },
  { name: "Offers", value: 5, color: "#F59E0B" },
]

const marketTrendsData = [
  { technology: "React", growth: 15, jobs: 1250, salary: 95000, difficulty: 7 },
  { technology: "TypeScript", growth: 25, jobs: 890, salary: 105000, difficulty: 8 },
  { technology: "Next.js", growth: 35, jobs: 650, salary: 110000, difficulty: 8 },
  { technology: "Vue.js", growth: 8, jobs: 420, salary: 85000, difficulty: 6 },
  { technology: "Angular", growth: -5, jobs: 380, salary: 90000, difficulty: 7 },
  { technology: "Node.js", growth: 20, jobs: 980, salary: 100000, difficulty: 7 },
  { technology: "Python", growth: 30, jobs: 1100, salary: 115000, difficulty: 6 },
]

const skillRadarData = [
  { skill: "Frontend", current: 85, target: 95, market: 90 },
  { skill: "Backend", current: 60, target: 80, market: 75 },
  { skill: "Database", current: 70, target: 85, market: 80 },
  { skill: "DevOps", current: 40, target: 70, market: 65 },
  { skill: "Testing", current: 55, target: 75, market: 70 },
  { skill: "Design", current: 45, target: 60, market: 55 },
]

const salaryBenchmarkData = [
  { experience: "0-1", current: 65000, market: 70000, target: 75000 },
  { experience: "1-3", current: 85000, market: 90000, target: 95000 },
  { experience: "3-5", current: 105000, market: 115000, target: 125000 },
  { experience: "5-7", current: 125000, market: 140000, target: 150000 },
  { experience: "7+", current: 145000, market: 165000, target: 180000 },
]

const competitorAnalysisData = [
  { name: "You", skills: 78, experience: 3.5, salary: 85000, applications: 95 },
  { name: "Peer Avg", skills: 72, experience: 3.2, salary: 82000, applications: 120 },
  { name: "Top 10%", skills: 92, experience: 4.1, salary: 115000, applications: 45 },
  { name: "Market Avg", skills: 68, experience: 2.8, salary: 75000, applications: 150 },
]

export default function InsightsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [animatedValues, setAnimatedValues] = useState({
    resumeScore: 0,
    skillMatch: 0,
    applicationSuccess: 0,
    marketAlignment: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        resumeScore: 85,
        skillMatch: 78,
        applicationSuccess: 26.7,
        marketAlignment: 82,
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
              {entry.name.includes("Salary") && "$"}
              {entry.name.includes("Growth") && "%"}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics Dashboard</h1>
          <p className="text-gray-600">Deep insights into your career progress and market positioning</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] hover:from-[#5B54E6] hover:to-[#4F46E5] text-white hover-lift">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Resume Score",
            value: animatedValues.resumeScore,
            change: "+8 points this month",
            icon: TrendingUp,
            color: "text-[#6C63FF]",
            bgColor: "bg-purple-50",
            trend: "up",
          },
          {
            title: "Skill Match Rate",
            value: animatedValues.skillMatch,
            change: "Above industry average",
            icon: Target,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            trend: "up",
          },
          {
            title: "Application Success",
            value: animatedValues.applicationSuccess,
            change: "18/67 applications",
            icon: Zap,
            color: "text-green-600",
            bgColor: "bg-green-50",
            trend: "up",
          },
          {
            title: "Market Alignment",
            value: animatedValues.marketAlignment,
            change: "Skills trending up",
            icon: Brain,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            trend: "up",
          },
        ].map((metric, index) => (
          <Card key={index} className="hover-lift transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.color} mb-2`}>
                {metric.title.includes("Success") ? `${metric.value}%` : metric.value}
                {metric.title.includes("Score") && "/100"}
                {metric.title.includes("Rate") && "%"}
              </div>
              <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>{metric.change}</p>
              <Progress
                value={metric.title.includes("Success") ? metric.value : metric.value > 100 ? 100 : metric.value}
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Charts */}
      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="applications">Application Stats</TabsTrigger>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
          <TabsTrigger value="radar">Skill Radar</TabsTrigger>
          <TabsTrigger value="benchmark">Benchmarking</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Skills Coverage vs Market Demand</CardTitle>
                <CardDescription>Interactive comparison of your skills with market requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={skillsCoverageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="coverage" fill="#6C63FF" name="Your Coverage %" />
                      <Bar dataKey="demand" fill="#E5E7EB" name="Market Demand %" />
                      <Line type="monotone" dataKey="growth" stroke="#10B981" name="Growth %" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Skill-Job Opportunity Matrix</CardTitle>
                <CardDescription>Bubble chart showing skill coverage vs job opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={skillsCoverageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="coverage" name="Your Coverage" unit="%" />
                      <YAxis dataKey="jobs" name="Job Opportunities" />
                      <ZAxis dataKey="growth" range={[50, 400]} name="Growth" unit="%" />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                                <p className="font-semibold">{data.skill}</p>
                                <p>Coverage: {data.coverage}%</p>
                                <p>Jobs: {data.jobs}</p>
                                <p>Growth: {data.growth}%</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Scatter dataKey="jobs" fill="#6C63FF" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Strong Skills
                </CardTitle>
                <CardDescription>Skills where you exceed market demand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {skillsCoverageData
                  .filter((skill) => skill.coverage > skill.demand)
                  .map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <Badge className="bg-green-100 text-green-800">
                        +{skill.coverage - skill.demand}% above demand
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Skill Gaps
                </CardTitle>
                <CardDescription>Priority areas for improvement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {skillsCoverageData
                  .filter((skill) => skill.coverage < skill.demand)
                  .sort((a, b) => b.demand - b.coverage - (a.demand - a.coverage))
                  .slice(0, 4)
                  .map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <Badge className="bg-red-100 text-red-800">-{skill.demand - skill.coverage}% gap</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Skills
                </CardTitle>
                <CardDescription>High-growth opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {(skillsCoverageData ? [...skillsCoverageData] : [])
                  .sort((a, b) => b.growth - a.growth)
                  .slice(0, 4)
                  .map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <Badge className="bg-blue-100 text-blue-800">+{skill.growth}% growth</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Career Progress Timeline</CardTitle>
              <CardDescription>Track your improvement across multiple metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={resumeScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="score"
                      fill="#6C63FF"
                      fillOpacity={0.3}
                      stroke="#6C63FF"
                      strokeWidth={3}
                      name="Resume Score"
                    />
                    <Bar yAxisId="right" dataKey="applications" fill="#10B981" name="Applications" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="interviews"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      name="Interviews"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="offers"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="Offers"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Application Funnel Analysis</CardTitle>
                <CardDescription>Detailed breakdown of your job application journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationSuccessData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" fill="#6C63FF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Success Rate Metrics</CardTitle>
                <CardDescription>Key performance indicators for your job search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Response Rate</span>
                    <span className="text-lg font-bold text-blue-600">29.5%</span>
                  </div>
                  <Progress value={29.5} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Interview Conversion</span>
                    <span className="text-lg font-bold text-green-600">64.3%</span>
                  </div>
                  <Progress value={64.3} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Offer Rate</span>
                    <span className="text-lg font-bold text-purple-600">27.8%</span>
                  </div>
                  <Progress value={27.8} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6C63FF]">5.3%</div>
                    <p className="text-sm text-gray-600">Overall Success Rate</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">Above Average</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Technology Market Analysis</CardTitle>
              <CardDescription>Comprehensive view of technology trends, salaries, and opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={marketTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="growth" name="Growth Rate" unit="%" />
                    <YAxis dataKey="salary" name="Average Salary" unit="$" />
                    <ZAxis dataKey="jobs" range={[50, 400]} name="Job Count" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-semibold">{data.technology}</p>
                              <p>Growth: {data.growth}%</p>
                              <p>Salary: ${data.salary.toLocaleString()}</p>
                              <p>Jobs: {data.jobs}</p>
                              <p>Difficulty: {data.difficulty}/10</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter dataKey="salary" fill="#6C63FF" />
                    <ReferenceLine x={0} stroke="#666" strokeDasharray="3 3" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Skill Assessment Radar</CardTitle>
                <CardDescription>Multi-dimensional view of your skill profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skillRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Current Level" dataKey="current" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.3} />
                      <Radar name="Target Level" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                      <Radar
                        name="Market Average"
                        dataKey="market"
                        stroke="#F59E0B"
                        fill="none"
                        strokeDasharray="5 5"
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Skill Development Priorities</CardTitle>
                <CardDescription>Recommended focus areas based on market gaps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillRadarData
                  .map((skill) => ({
                    ...skill,
                    gap: skill.target - skill.current,
                    marketGap: skill.market - skill.current,
                  }))
                  .sort((a, b) => b.gap - a.gap)
                  .map((skill, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{skill.skill}</h4>
                        <Badge variant={skill.gap > 20 ? "destructive" : skill.gap > 10 ? "secondary" : "default"}>
                          {skill.gap > 20 ? "High Priority" : skill.gap > 10 ? "Medium Priority" : "Low Priority"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current: {skill.current}%</span>
                          <span>Target: {skill.target}%</span>
                          <span>Market: {skill.market}%</span>
                        </div>
                        <Progress value={skill.current} className="h-2" />
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benchmark" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Salary Benchmarking</CardTitle>
                <CardDescription>Compare your compensation with market standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryBenchmarkData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="experience" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="current" fill="#6C63FF" name="Your Salary" />
                      <Bar dataKey="market" fill="#10B981" name="Market Average" />
                      <Bar dataKey="target" fill="#F59E0B" name="Target Salary" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <CardDescription>See how you stack up against your peers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={competitorAnalysisData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skills" name="Skills Score" unit="%" />
                      <YAxis dataKey="salary" name="Salary" unit="$" />
                      <ZAxis dataKey="applications" range={[50, 400]} name="Applications" />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                                <p className="font-semibold">{data.name}</p>
                                <p>Skills: {data.skills}%</p>
                                <p>Experience: {data.experience} years</p>
                                <p>Salary: ${data.salary.toLocaleString()}</p>
                                <p>Applications: {data.applications}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Scatter dataKey="salary" fill="#6C63FF" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
