"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Star, ExternalLink, Bookmark, Search } from "lucide-react"
import { useState } from "react"

const mockCourses = [
  {
    id: 1,
    title: "Complete React Developer Course",
    platform: "Udemy",
    instructor: "John Smith",
    rating: 4.8,
    duration: "40 hours",
    level: "Intermediate",
    price: "$89.99",
    skills: ["React", "JavaScript", "Redux"],
    description: "Master React from basics to advanced concepts with hands-on projects",
    isBookmarked: false,
    isRecommended: true,
  },
  {
    id: 2,
    title: "TypeScript Fundamentals",
    platform: "Coursera",
    instructor: "Microsoft",
    rating: 4.6,
    duration: "25 hours",
    level: "Beginner",
    price: "Free",
    skills: ["TypeScript", "JavaScript"],
    description: "Learn TypeScript fundamentals and advanced features",
    isBookmarked: true,
    isRecommended: true,
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    platform: "Pluralsight",
    instructor: "Sarah Johnson",
    rating: 4.7,
    duration: "35 hours",
    level: "Advanced",
    price: "$29/month",
    skills: ["Node.js", "Express", "MongoDB"],
    description: "Build scalable backend applications with Node.js",
    isBookmarked: false,
    isRecommended: false,
  },
  {
    id: 4,
    title: "Next.js Full Stack Development",
    platform: "Udemy",
    instructor: "Tech Academy",
    rating: 4.9,
    duration: "50 hours",
    level: "Advanced",
    price: "$119.99",
    skills: ["Next.js", "React", "Full Stack"],
    description: "Build modern full-stack applications with Next.js",
    isBookmarked: false,
    isRecommended: true,
  },
]

export default function CourseExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [bookmarkedCourses, setBookmarkedCourses] = useState<number[]>([2])

  const toggleBookmark = (courseId: number) => {
    setBookmarkedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId],
    )
  }

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel
    const matchesPlatform =
      selectedPlatform === "all" || course.platform.toLowerCase() === selectedPlatform.toLowerCase()

    return matchesSearch && matchesLevel && matchesPlatform
  })

  const recommendedCourses = filteredCourses.filter((course) => course.isRecommended)
  const bookmarkedCoursesData = filteredCourses.filter((course) => bookmarkedCourses.includes(course.id))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Course Explorer</h1>
        <p className="text-gray-600">Discover courses tailored to your career goals and skill gaps</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-[#6C63FF]" />
            Search & Filter Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search courses, skills, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="udemy">Udemy</SelectItem>
                <SelectItem value="coursera">Coursera</SelectItem>
                <SelectItem value="pluralsight">Pluralsight</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Courses ({filteredCourses.length})</TabsTrigger>
          <TabsTrigger value="recommended">AI Recommended ({recommendedCourses.length})</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked ({bookmarkedCoursesData.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isBookmarked={bookmarkedCourses.includes(course.id)}
                onToggleBookmark={() => toggleBookmark(course.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-medium text-purple-900 mb-2">🤖 AI Recommendations</h3>
            <p className="text-sm text-purple-700">
              These courses are recommended based on your profile gaps and career goals as a Frontend Developer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isBookmarked={bookmarkedCourses.includes(course.id)}
                onToggleBookmark={() => toggleBookmark(course.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-4">
          {bookmarkedCoursesData.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookmarked Courses</h3>
                <p className="text-gray-600">Start bookmarking courses you're interested in!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedCoursesData.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isBookmarked={true}
                  onToggleBookmark={() => toggleBookmark(course.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CourseCard({
  course,
  isBookmarked,
  onToggleBookmark,
}: {
  course: any
  isBookmarked: boolean
  onToggleBookmark: () => void
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2 mb-2">{course.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>{course.platform}</span>
              <span>•</span>
              <span>{course.instructor}</span>
            </div>
            {course.isRecommended && (
              <Badge className="bg-purple-100 text-purple-800 text-xs mb-2">AI Recommended</Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleBookmark}
            className={`ml-2 ${isBookmarked ? "text-[#6C63FF]" : "text-gray-400"}`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>

        <div className="flex flex-wrap gap-1">
          {course.skills.map((skill: string) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{course.duration}</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-lg font-semibold text-[#6C63FF]">{course.price}</div>
          <Button size="sm" className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white">
            <ExternalLink className="h-4 w-4 mr-2" />
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
