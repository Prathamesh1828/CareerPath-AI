"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
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
} from "recharts";
import {
  TrendingUp,
  Download,
  Target,
  Zap,
  Brain,
  Eye,
  Smartphone,
  Monitor,
  BarChart3,
  PieChart,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Users,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trophy,
  Lightbulb,
  Rocket,
  TrendingDown,
  Plus,
  Minus,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const skillsCoverageData = [
  { skill: "JavaScript", coverage: 90, demand: 95, growth: 15, jobs: 1250 },
  { skill: "React", coverage: 85, demand: 88, growth: 20, jobs: 980 },
  { skill: "HTML/CSS", coverage: 95, demand: 80, growth: 5, jobs: 1100 },
  { skill: "TypeScript", coverage: 40, demand: 85, growth: 35, jobs: 750 },
  { skill: "Node.js", coverage: 60, demand: 75, growth: 25, jobs: 650 },
  { skill: "Python", coverage: 30, demand: 70, growth: 30, jobs: 890 },
  { skill: "Vue.js", coverage: 25, demand: 45, growth: 18, jobs: 320 },
  { skill: "Angular", coverage: 35, demand: 50, growth: -5, jobs: 280 },
];

const resumeScoreData = [
  { month: "Jan", score: 65, applications: 8, interviews: 1, offers: 0 },
  { month: "Feb", score: 70, applications: 12, interviews: 2, offers: 0 },
  { month: "Mar", score: 75, applications: 15, interviews: 4, offers: 1 },
  { month: "Apr", score: 78, applications: 18, interviews: 5, offers: 1 },
  { month: "May", score: 82, applications: 20, interviews: 7, offers: 2 },
  { month: "Jun", score: 85, applications: 22, interviews: 8, offers: 3 },
];

const applicationSuccessData = [
  { name: "Applications Sent", value: 95, color: "#6C63FF" },
  { name: "Responses", value: 28, color: "#4F46E5" },
  { name: "Interviews", value: 18, color: "#3B82F6" },
  { name: "Final Rounds", value: 8, color: "#10B981" },
  { name: "Offers", value: 5, color: "#F59E0B" },
];

const marketTrendsData = [
  { technology: "React", growth: 15, jobs: 1250, salary: 95000, difficulty: 7 },
  {
    technology: "TypeScript",
    growth: 25,
    jobs: 890,
    salary: 105000,
    difficulty: 8,
  },
  {
    technology: "Next.js",
    growth: 35,
    jobs: 650,
    salary: 110000,
    difficulty: 8,
  },
  { technology: "Vue.js", growth: 8, jobs: 420, salary: 85000, difficulty: 6 },
  {
    technology: "Angular",
    growth: -5,
    jobs: 380,
    salary: 90000,
    difficulty: 7,
  },
  {
    technology: "Node.js",
    growth: 20,
    jobs: 980,
    salary: 100000,
    difficulty: 7,
  },
  {
    technology: "Python",
    growth: 30,
    jobs: 1100,
    salary: 115000,
    difficulty: 6,
  },
];

const skillRadarData = [
  { skill: "Frontend", current: 85, target: 95, market: 90 },
  { skill: "Backend", current: 60, target: 80, market: 75 },
  { skill: "Database", current: 70, target: 85, market: 80 },
  { skill: "DevOps", current: 40, target: 70, market: 65 },
  { skill: "Testing", current: 55, target: 75, market: 70 },
  { skill: "Design", current: 45, target: 60, market: 55 },
];

const salaryBenchmarkData = [
  { experience: "0-1", current: 65000, market: 70000, target: 75000 },
  { experience: "1-3", current: 85000, market: 90000, target: 95000 },
  { experience: "3-5", current: 105000, market: 115000, target: 125000 },
  { experience: "5-7", current: 125000, market: 140000, target: 150000 },
  { experience: "7+", current: 145000, market: 165000, target: 180000 },
];

const competitorAnalysisData = [
  { name: "You", skills: 78, experience: 3.5, salary: 85000, applications: 95 },
  {
    name: "Peer Avg",
    skills: 72,
    experience: 3.2,
    salary: 82000,
    applications: 120,
  },
  {
    name: "Top 10%",
    skills: 92,
    experience: 4.1,
    salary: 115000,
    applications: 45,
  },
  {
    name: "Market Avg",
    skills: 68,
    experience: 2.8,
    salary: 75000,
    applications: 150,
  },
];

export default function InsightsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months");
  const [activeTab, setActiveTab] = useState("skills");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    resumeScore: 0,
    skillMatch: 0,
    applicationSuccess: 0,
    marketAlignment: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedValues({
        resumeScore: 85,
        skillMatch: 78,
        applicationSuccess: 26.7,
        marketAlignment: 82,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <p className="font-semibold text-gray-900 text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              style={{ color: entry.color }}
              className="text-xs sm:text-sm"
            >
              {entry.name}: {entry.value}
              {entry.name.includes("Salary") && "$"}
              {entry.name.includes("Growth") && "%"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Analytics
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Career insights & market positioning
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Desktop Controls */}
              <div className="hidden md:flex items-center gap-2">
                <Select
                  value={selectedTimeframe}
                  onValueChange={setSelectedTimeframe}
                >
                  <SelectTrigger className="w-32 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] hover:from-[#5B54E6] hover:to-[#4F46E5] text-white shadow-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2"
              >
                {showMobileMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Controls Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-3 p-3 bg-gray-50 rounded-lg space-y-3">
              <Select
                value={selectedTimeframe}
                onValueChange={setSelectedTimeframe}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] text-white">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Enhanced Key Metrics - Mobile Grid */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            {[
              {
                title: "Resume Score",
                shortTitle: "Score",
                value: animatedValues.resumeScore,
                change: "+8 points",
                icon: TrendingUp,
                color: "text-[#6C63FF]",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
                trend: "up",
              },
              {
                title: "Skill Match Rate",
                shortTitle: "Skills",
                value: animatedValues.skillMatch,
                change: "Above avg",
                icon: Target,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                trend: "up",
              },
              {
                title: "Application Success",
                shortTitle: "Success",
                value: animatedValues.applicationSuccess,
                change: "18/67 apps",
                icon: Zap,
                color: "text-green-600",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                trend: "up",
              },
              {
                title: "Market Alignment",
                shortTitle: "Market",
                value: animatedValues.marketAlignment,
                change: "Trending",
                icon: Brain,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200",
                trend: "up",
              },
            ].map((metric, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${metric.bgColor} border ${metric.borderColor}`}
              >
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div
                      className={`p-1.5 sm:p-2 rounded-lg bg-white/70 shadow-sm`}
                    >
                      <metric.icon
                        className={`h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 ${metric.color}`}
                      />
                    </div>
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                    )}
                  </div>

                  <div
                    className={`text-lg sm:text-xl lg:text-2xl font-bold ${metric.color} mb-1 sm:mb-2`}
                  >
                    {metric.title.includes("Success")
                      ? `${metric.value}%`
                      : metric.value}
                    {metric.title.includes("Score") && "/100"}
                    {metric.title.includes("Rate") && "%"}
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                    <span className="sm:hidden">{metric.shortTitle}</span>
                    <span className="hidden sm:inline">{metric.title}</span>
                  </p>

                  <p
                    className={`text-xs ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    } mb-2`}
                  >
                    {metric.change}
                  </p>

                  <Progress
                    value={
                      metric.title.includes("Success")
                        ? metric.value
                        : metric.value > 100
                        ? 100
                        : metric.value
                    }
                    className="h-1.5 sm:h-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile-First Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className={`space-y-4 ${
              isVisible ? "animate-slideInLeft" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            {/* Mobile Tab Selector */}
            <div className="md:hidden">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full h-12 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skills">📊 Skills Analysis</SelectItem>
                  <SelectItem value="progress">📈 Progress Tracking</SelectItem>
                  <SelectItem value="applications">
                    🎯 Application Stats
                  </SelectItem>
                  <SelectItem value="market">🔥 Market Trends</SelectItem>
                  <SelectItem value="radar">⚡ Skill Radar</SelectItem>
                  <SelectItem value="benchmark">🏆 Benchmarking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Tab List */}
            <div className="hidden md:block overflow-x-auto">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-12 bg-gray-100 rounded-xl p-1">
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <Brain className="h-4 w-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Skills Analysis</span>
                  <span className="lg:hidden">Skills</span>
                </TabsTrigger>
                <TabsTrigger
                  value="progress"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <TrendingUp className="h-4 w-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Progress</span>
                  <span className="lg:hidden">Progress</span>
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <Target className="h-4 w-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Applications</span>
                  <span className="lg:hidden">Apps</span>
                </TabsTrigger>
                <TabsTrigger
                  value="market"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <Rocket className="h-4 w-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Market</span>
                  <span className="lg:hidden">Market</span>
                </TabsTrigger>
                <TabsTrigger
                  value="radar"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <Zap className="h-4 w-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Radar</span>
                  <span className="lg:hidden">Radar</span>
                </TabsTrigger>
                <TabsTrigger
                  value="benchmark"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <Trophy className="h-4 w-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Benchmark</span>
                  <span className="lg:hidden">Bench</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Skills Analysis Tab - Mobile Optimized */}
            <TabsContent value="skills" className="space-y-4">
              {/* Chart Container - Mobile Responsive */}
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                        Skills vs Market Demand
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-gray-600 mt-1">
                        Your coverage compared to market requirements
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800 text-xs">
                        Live Data
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="h-64 sm:h-80 lg:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={skillsCoverageData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="skill"
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          fontSize={12}
                          interval={0}
                        />
                        <YAxis fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="coverage"
                          fill="#6C63FF"
                          name="Your Coverage %"
                          radius={[2, 2, 0, 0]}
                        />
                        <Bar
                          dataKey="demand"
                          fill="#E5E7EB"
                          name="Market Demand %"
                          radius={[2, 2, 0, 0]}
                        />
                        <Line
                          type="monotone"
                          dataKey="growth"
                          stroke="#10B981"
                          name="Growth %"
                          strokeWidth={2}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Summary Cards - Mobile Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-green-600 flex items-center gap-2 text-sm sm:text-base">
                      <div className="p-1.5 bg-green-200 rounded-lg">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      Strong Skills
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Skills above market demand
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
                    {skillsCoverageData
                      .filter((skill) => skill.coverage > skill.demand)
                      .slice(0, 4)
                      .map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 sm:p-3 bg-white/70 rounded-lg shadow-sm"
                        >
                          <span className="text-xs sm:text-sm font-medium">
                            {skill.skill}
                          </span>
                          <Badge className="bg-green-200 text-green-800 text-xs">
                            +{skill.coverage - skill.demand}%
                          </Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-red-50 to-pink-50">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-red-600 flex items-center gap-2 text-sm sm:text-base">
                      <div className="p-1.5 bg-red-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      Skill Gaps
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Priority improvement areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
                    {skillsCoverageData
                      .filter((skill) => skill.coverage < skill.demand)
                      .sort(
                        (a, b) =>
                          b.demand - b.coverage - (a.demand - a.coverage)
                      )
                      .slice(0, 4)
                      .map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 sm:p-3 bg-white/70 rounded-lg shadow-sm"
                        >
                          <span className="text-xs sm:text-sm font-medium">
                            {skill.skill}
                          </span>
                          <Badge className="bg-red-200 text-red-800 text-xs">
                            -{skill.demand - skill.coverage}%
                          </Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-cyan-50 sm:col-span-2 lg:col-span-1">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-blue-600 flex items-center gap-2 text-sm sm:text-base">
                      <div className="p-1.5 bg-blue-200 rounded-lg">
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      Trending Skills
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      High-growth opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
                    {[...skillsCoverageData]
                      .sort((a, b) => b.growth - a.growth)
                      .slice(0, 4)
                      .map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 sm:p-3 bg-white/70 rounded-lg shadow-sm"
                        >
                          <span className="text-xs sm:text-sm font-medium">
                            {skill.skill}
                          </span>
                          <Badge className="bg-blue-200 text-blue-800 text-xs">
                            +{skill.growth}%
                          </Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Progress Tracking Tab - Mobile Optimized */}
            <TabsContent value="progress" className="space-y-4">
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                    Career Progress Timeline
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Multi-metric improvement tracking over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="h-64 sm:h-80 lg:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={resumeScoreData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis yAxisId="left" fontSize={12} />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          fontSize={12}
                        />
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
                        <Bar
                          yAxisId="right"
                          dataKey="applications"
                          fill="#10B981"
                          name="Applications"
                          radius={[2, 2, 0, 0]}
                        />
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

            {/* Applications Tab - Mobile Optimized */}
            <TabsContent value="applications" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
                      Application Funnel
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Journey breakdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="h-48 sm:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={applicationSuccessData}
                          layout="horizontal"
                          margin={{ top: 10, right: 10, left: 60, bottom: 10 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis type="number" fontSize={12} />
                          <YAxis
                            dataKey="name"
                            type="category"
                            width={60}
                            fontSize={10}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar
                            dataKey="value"
                            fill="#6C63FF"
                            radius={[0, 2, 2, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-blue-50">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
                      Success Metrics
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Key performance indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium">
                            Response Rate
                          </span>
                          <span className="text-base sm:text-lg font-bold text-blue-600">
                            29.5%
                          </span>
                        </div>
                        <Progress value={29.5} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium">
                            Interview Conversion
                          </span>
                          <span className="text-base sm:text-lg font-bold text-green-600">
                            64.3%
                          </span>
                        </div>
                        <Progress value={64.3} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium">
                            Offer Rate
                          </span>
                          <span className="text-base sm:text-lg font-bold text-purple-600">
                            27.8%
                          </span>
                        </div>
                        <Progress value={27.8} className="h-2" />
                      </div>
                    </div>

                    <div className="pt-4 border-t text-center">
                      <div className="text-xl sm:text-2xl font-bold text-[#6C63FF] mb-1">
                        5.3%
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">
                        Overall Success Rate
                      </p>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Above Average
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Market Trends Tab - Mobile Optimized */}
            <TabsContent value="market" className="space-y-4">
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                    Technology Market Analysis
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Trends, salaries, and opportunities overview
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="h-64 sm:h-80 lg:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        data={marketTrendsData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="growth"
                          name="Growth Rate"
                          unit="%"
                          fontSize={12}
                        />
                        <YAxis
                          dataKey="salary"
                          name="Average Salary"
                          unit="$"
                          fontSize={12}
                        />
                        <ZAxis
                          dataKey="jobs"
                          range={[50, 400]}
                          name="Job Count"
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
                                  <p className="font-semibold text-sm">
                                    {data.technology}
                                  </p>
                                  <p className="text-xs">
                                    Growth: {data.growth}%
                                  </p>
                                  <p className="text-xs">
                                    Salary: ${data.salary.toLocaleString()}
                                  </p>
                                  <p className="text-xs">Jobs: {data.jobs}</p>
                                  <p className="text-xs">
                                    Difficulty: {data.difficulty}/10
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Scatter dataKey="salary" fill="#6C63FF" />
                        <ReferenceLine
                          x={0}
                          stroke="#666"
                          strokeDasharray="3 3"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skill Radar Tab - Mobile Optimized */}
            <TabsContent value="radar" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
                      Skill Radar
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Multi-dimensional skill profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={skillRadarData}
                          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                        >
                          <PolarGrid />
                          <PolarAngleAxis dataKey="skill" fontSize={12} />
                          <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            fontSize={10}
                          />
                          <Radar
                            name="Current Level"
                            dataKey="current"
                            stroke="#6C63FF"
                            fill="#6C63FF"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                          <Radar
                            name="Target Level"
                            dataKey="target"
                            stroke="#10B981"
                            fill="#10B981"
                            fillOpacity={0.1}
                            strokeWidth={2}
                          />
                          <Radar
                            name="Market Average"
                            dataKey="market"
                            stroke="#F59E0B"
                            fill="none"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
                      Development Priorities
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Recommended focus areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                    {skillRadarData
                      .map((skill) => ({
                        ...skill,
                        gap: skill.target - skill.current,
                        marketGap: skill.market - skill.current,
                      }))
                      .sort((a, b) => b.gap - a.gap)
                      .map((skill, index) => (
                        <div
                          key={index}
                          className="p-3 sm:p-4 border rounded-lg hover:shadow-md transition-shadow bg-white/70"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-sm">
                              {skill.skill}
                            </h4>
                            <Badge
                              variant={
                                skill.gap > 20
                                  ? "destructive"
                                  : skill.gap > 10
                                  ? "secondary"
                                  : "default"
                              }
                              className="text-xs"
                            >
                              {skill.gap > 20
                                ? "High Priority"
                                : skill.gap > 10
                                ? "Medium"
                                : "Low"}
                            </Badge>
                          </div>
                          <div className="space-y-1 sm:space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Current: {skill.current}%</span>
                              <span>Target: {skill.target}%</span>
                              <span>Market: {skill.market}%</span>
                            </div>
                            <Progress
                              value={skill.current}
                              className="h-1.5 sm:h-2"
                            />
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Benchmarking Tab - Mobile Optimized */}
            <TabsContent value="benchmark" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
                      Salary Benchmark
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Compare with market standards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={salaryBenchmarkData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis dataKey="experience" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar
                            dataKey="current"
                            fill="#6C63FF"
                            name="Your Salary"
                            radius={[2, 2, 0, 0]}
                          />
                          <Bar
                            dataKey="market"
                            fill="#10B981"
                            name="Market Average"
                            radius={[2, 2, 0, 0]}
                          />
                          <Bar
                            dataKey="target"
                            fill="#F59E0B"
                            name="Target Salary"
                            radius={[2, 2, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
                      Competitive Analysis
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Compare with peers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                          data={competitorAnalysisData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="skills"
                            name="Skills Score"
                            unit="%"
                            fontSize={12}
                          />
                          <YAxis
                            dataKey="salary"
                            name="Salary"
                            unit="$"
                            fontSize={12}
                          />
                          <ZAxis
                            dataKey="applications"
                            range={[50, 400]}
                            name="Applications"
                          />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
                                    <p className="font-semibold text-sm">
                                      {data.name}
                                    </p>
                                    <p className="text-xs">
                                      Skills: {data.skills}%
                                    </p>
                                    <p className="text-xs">
                                      Experience: {data.experience} years
                                    </p>
                                    <p className="text-xs">
                                      Salary: ${data.salary.toLocaleString()}
                                    </p>
                                    <p className="text-xs">
                                      Applications: {data.applications}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
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
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-8 sm:h-0" />
    </div>
  );
}
