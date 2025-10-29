"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Star,
  ExternalLink,
  Bookmark,
  Search,
  Loader2,
  Users,
  Filter,
  RefreshCw,
  Brain,
  Target,
  Sparkles,
  ChevronDown,
  X,
  TrendingUp,
  Award,
  Play,
  BookOpen,
  Zap,
  ArrowUpRight,
  Grid3X3,
  List,
  Settings,
  DollarSign,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useNotificationTriggers } from "@/hooks/useNotificationTriggers";
import { useUserActivityTracker } from "@/hooks/useUserActivityTracker";

// User Profile for AI Recommendations (can be customized based on user selection)
const userProfile = {
  currentRole: "Frontend Developer",
  experience: "Intermediate",
  skills: ["React", "JavaScript", "CSS", "HTML"],
  careerGoals: ["Full Stack Development", "React Native", "Node.js"],
  preferredPlatforms: ["Udemy", "Coursera"],
  budget: "medium",
  timeCommitment: "part-time",
  learningStyle: "project-based",
};

// Comprehensive mock course data for all developer types
// This array contains a comprehensive list of mock course data, combining the
// three sets provided by the user (IDs 1-73) plus 27 new diverse courses
// across multiple platforms (IDs 74-100). Total courses: 100.

const mockCourses = [
  {
    id: 1,
    title: "React - The Complete Guide 2024 (incl. React Router & Redux)",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.7,
    reviewCount: 163000,
    duration: "48 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["React", "Redux", "React Router", "Hooks"],
    description:
      "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    students: 450000,
    projects: 8,
    aiScore: 94,
  },
  {
    id: 2,
    title: "Modern React with Redux",
    platform: "Coursera",
    instructor: "Stephen Grider",
    rating: 4.6,
    reviewCount: 32000,
    duration: "40 total hours",
    level: "Intermediate",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["React", "Redux", "JavaScript", "ES6"],
    description:
      "Master React and Redux with this comprehensive course covering modern patterns and best practices.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-10-03",
    certificateOffered: true,
    thumbnail:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/",
    courseUrl: "https://www.coursera.org/learn/modern-react-redux/",
    students: 120000,
    projects: 6,
    aiScore: 90,
  },
  {
    id: 3,
    title: "React Basics",
    platform: "Coursera",
    instructor: "Meta",
    rating: 4.7,
    reviewCount: 7400,
    duration: "25 total hours",
    level: "Beginner",
    price: 700,
    originalPrice: 3750,
    discount: 81,
    currency: "INR",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    description:
      "Learn React fundamentals from Meta's expert instructors and build interactive user interfaces.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-30",
    certificateOffered: true,
    thumbnail:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/meta-react",
    courseUrl: "https://www.coursera.org/learn/react-basics",
    students: 85000,
    projects: 5,
    aiScore: 88,
  },
  {
    id: 4,
    title: "Advanced React",
    platform: "Coursera",
    instructor: "Meta",
    rating: 4.6,
    reviewCount: 4100,
    duration: "28 total hours",
    level: "Advanced",
    price: 700,
    originalPrice: 3750,
    discount: 81,
    currency: "INR",
    skills: ["React", "Jest", "TypeScript", "API Design"],
    description:
      "Take your React skills to the next level with advanced patterns, testing, and TypeScript integration.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/meta-advanced",
    courseUrl: "https://www.coursera.org/learn/advanced-react",
    students: 42000,
    projects: 7,
    aiScore: 91,
  },
  {
    id: 5,
    title: "React JS - Complete Guide for Frontend Developers",
    platform: "Pluralsight",
    instructor: "Cory House",
    rating: 4.5,
    reviewCount: 8300,
    duration: "12 total hours",
    level: "Intermediate",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["React", "Components", "Hooks", "State Management"],
    description:
      "Build scalable React applications with best practices and industry-standard patterns.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-11-10",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/react-complete-guide",
    courseUrl: "https://www.pluralsight.com/courses/react-js-complete-guide",
    students: 17000,
    projects: 3,
    aiScore: 85,
  },
  {
    id: 6,
    title: "Learn React",
    platform: "Scrimba",
    instructor: "Bob Ziroll",
    rating: 4.7,
    reviewCount: 8900,
    duration: "15 total hours",
    level: "Beginner",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["React", "JSX", "Components", "Props"],
    description:
      "Interactive React course with hands-on coding exercises and real-world projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-07-12",
    certificateOffered: true,
    thumbnail: "https://scrimba.com/assets/react-course-thumbnail.jpg",
    courseUrl: "https://scrimba.com/learn/learnreact",
    students: 65000,
    projects: 4,
    aiScore: 87,
  },
  {
    id: 7,
    title: "React Full Course for Free",
    platform: "YouTube",
    instructor: "Bro Code",
    rating: 4.8,
    reviewCount: 15200,
    duration: "4.7 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["React", "useState", "useEffect", "useContext"],
    description:
      "Complete React tutorial covering everything from basics to advanced hooks and concepts.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-01-15",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/CgkZ7MvWUAA/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=CgkZ7MvWUAA",
    students: 380000,
    projects: 5,
    aiScore: 82,
  },
  {
    id: 8,
    title: "Become a Professional React Developer",
    platform: "Scrimba",
    instructor: "Bob Ziroll & Team",
    rating: 4.7,
    reviewCount: 5600,
    duration: "35 total hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 2799,
    discount: 75,
    currency: "INR",
    skills: ["React", "TypeScript", "Performance Tuning", "Routing"],
    description:
      "Master professional React development with TypeScript, performance optimization, and advanced patterns.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-10-01",
    certificateOffered: true,
    thumbnail: "https://scrimba.com/assets/professional-react-course.jpg",
    courseUrl: "https://scrimba.com/learn/professionalreact",
    students: 28000,
    projects: 8,
    aiScore: 89,
  },
  {
    id: 9,
    title: "React Essentials",
    platform: "LinkedIn Learning",
    instructor: "Eve Porcello",
    rating: 4.6,
    reviewCount: 9500,
    duration: "5 total hours",
    level: "Beginner",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["React", "Hooks", "State", "Props"],
    description:
      "Quick-start guide to React covering essential concepts and modern hooks-based development.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-07-12",
    certificateOffered: true,
    thumbnail: "https://media.licdn.com/dms/image/react-essentials",
    courseUrl: "https://www.linkedin.com/learning/react-js-essential-training",
    students: 30000,
    projects: 3,
    aiScore: 83,
  },
  {
    id: 10,
    title: "React Crash Course 2024",
    platform: "Scaler Academy",
    instructor: "Anshuman Singh",
    rating: 4.7,
    reviewCount: 3800,
    duration: "18 total hours",
    level: "Beginner",
    price: 699,
    originalPrice: 2450,
    discount: 72,
    currency: "INR",
    skills: ["React", "JSX", "Hooks", "Components"],
    description:
      "Fast-paced crash course covering React fundamentals and practical application development.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-10-12",
    certificateOffered: true,
    thumbnail: "https://static.scaler.com/react-crash-course.jpg",
    courseUrl: "https://www.scaler.com/academy/react-crash-course/",
    students: 8500,
    projects: 2,
    aiScore: 80,
  },
  {
    id: 11,
    title: "The Complete JavaScript Course 2024",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.7,
    reviewCount: 178000,
    duration: "69 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["JavaScript", "ES6", "DOM", "Async Programming"],
    description:
      "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-25",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/851712_fc61_6.jpg",
    courseUrl: "https://www.udemy.com/course/the-complete-javascript-course/",
    students: 680000,
    projects: 10,
    aiScore: 95,
  },
  {
    id: 12,
    title: "JavaScript - The Complete Guide 2024",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    reviewCount: 45000,
    duration: "52 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["JavaScript", "ES6+", "OOP", "Functional Programming"],
    description:
      "Modern JavaScript from the beginning - all the way up to expert level! THE must-have course.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-10-08",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2508942_11d3_3.jpg",
    courseUrl:
      "https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/",
    students: 195000,
    projects: 12,
    aiScore: 93,
  },
  {
    id: 13,
    title: "JavaScript Algorithms and Data Structures",
    platform: "freeCodeCamp",
    instructor: "freeCodeCamp Team",
    rating: 4.8,
    reviewCount: 95000,
    duration: "300 total hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["JavaScript", "Algorithms", "Data Structures", "ES6"],
    description:
      "Learn JavaScript fundamentals, ES6, algorithms, data structures, and prepare for technical interviews.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-20",
    certificateOffered: true,
    thumbnail:
      "https://cdn.freecodecamp.org/platform/javascript-algorithms.jpg",
    courseUrl:
      "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    students: 1200000,
    projects: 5,
    aiScore: 91,
  },
  {
    id: 14,
    title: "Modern JavaScript From The Beginning",
    platform: "Udemy",
    instructor: "Brad Traversy",
    rating: 4.7,
    reviewCount: 38000,
    duration: "21.5 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["JavaScript", "DOM Manipulation", "Fetch API", "ES6"],
    description:
      "Learn and build projects with pure JavaScript - no frameworks or libraries!",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-07-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1463348_52a4_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/modern-javascript-from-the-beginning/",
    students: 152000,
    projects: 10,
    aiScore: 89,
  },
  {
    id: 15,
    title: "JavaScript Programming Full Course",
    platform: "YouTube",
    instructor: "Programming with Mosh",
    rating: 4.8,
    reviewCount: 42000,
    duration: "6 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["JavaScript", "Variables", "Functions", "Objects"],
    description:
      "Complete JavaScript tutorial for beginners covering all fundamentals in a single comprehensive video.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-03-10",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
    students: 890000,
    projects: 3,
    aiScore: 86,
  },
  {
    id: 16,
    title: "JavaScript and TypeScript Complete Course",
    platform: "Pluralsight",
    instructor: "Brice Wilson",
    rating: 4.5,
    reviewCount: 6700,
    duration: "8 total hours",
    level: "Intermediate",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["JavaScript", "TypeScript", "ES6", "Modules"],
    description:
      "Comprehensive guide to JavaScript and TypeScript for modern web development.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/javascript-typescript",
    courseUrl:
      "https://www.pluralsight.com/courses/javascript-typescript-complete",
    students: 24000,
    projects: 4,
    aiScore: 84,
  },
  {
    id: 17,
    title: "Learn JavaScript",
    platform: "Codecademy",
    instructor: "Codecademy Team",
    rating: 4.7,
    reviewCount: 52000,
    duration: "20 total hours",
    level: "Beginner",
    price: 439,
    originalPrice: 1759,
    discount: 75,
    currency: "INR",
    skills: ["JavaScript", "Conditionals", "Functions", "Arrays"],
    description:
      "Interactive JavaScript course with hands-on projects and real-world applications.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-01",
    certificateOffered: true,
    thumbnail: "https://www.codecademy.com/resources/learn-javascript.jpg",
    courseUrl: "https://www.codecademy.com/learn/introduction-to-javascript",
    students: 450000,
    projects: 8,
    aiScore: 88,
  },
  {
    id: 18,
    title: "Advanced JavaScript Concepts",
    platform: "Udemy",
    instructor: "Andrei Neagoie",
    rating: 4.7,
    reviewCount: 22000,
    duration: "25 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["JavaScript", "Closures", "Prototypes", "Async/Await"],
    description:
      "Learn advanced JavaScript concepts including closures, prototypes, OOP, and functional programming.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2508192_99b4.jpg",
    courseUrl: "https://www.udemy.com/course/advanced-javascript-concepts/",
    students: 89000,
    projects: 6,
    aiScore: 90,
  },
  {
    id: 19,
    title: "JavaScript: Understanding the Weird Parts",
    platform: "Udemy",
    instructor: "Anthony Alicea",
    rating: 4.6,
    reviewCount: 35000,
    duration: "11.5 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: [
      "JavaScript",
      "Scope",
      "Execution Context",
      "Prototypal Inheritance",
    ],
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, and more!",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-06-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/364426_2991_5.jpg",
    courseUrl: "https://www.udemy.com/course/understand-javascript/",
    students: 178000,
    projects: 3,
    aiScore: 87,
  },
  {
    id: 20,
    title: "JavaScript for Beginners",
    platform: "Coursera",
    instructor: "University of California, Davis",
    rating: 4.6,
    reviewCount: 8900,
    duration: "32 total hours",
    level: "Beginner",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["JavaScript", "Web Development", "Programming Basics", "DOM"],
    description:
      "Learn JavaScript from scratch with hands-on exercises and real-world projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/javascript-beginners",
    courseUrl: "https://www.coursera.org/learn/javascript-basics",
    students: 67000,
    projects: 7,
    aiScore: 85,
  },
  {
    id: 21,
    title: "Understanding TypeScript",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.7,
    reviewCount: 38000,
    duration: "15 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["TypeScript", "JavaScript", "Type Annotations", "Interfaces"],
    description:
      "Master TypeScript and supercharge your JavaScript development with this comprehensive course.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/947098_02ec.jpg",
    courseUrl: "https://www.udemy.com/course/understanding-typescript/",
    students: 142000,
    projects: 5,
    aiScore: 92,
  },
  {
    id: 22,
    title: "The Ultimate TypeScript Course",
    platform: "Code with Mosh",
    instructor: "Mosh Hamedani",
    rating: 4.8,
    reviewCount: 12500,
    duration: "5 total hours",
    level: "Beginner",
    price: 899,
    originalPrice: 3599,
    discount: 75,
    currency: "INR",
    skills: ["TypeScript", "JavaScript", "Type System", "Generics"],
    description:
      "Learn TypeScript from scratch with hands-on exercises and real-world projects.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail: "https://codewithmosh.com/assets/typescript-course.jpg",
    courseUrl: "https://codewithmosh.com/p/the-ultimate-typescript",
    students: 58000,
    projects: 6,
    aiScore: 90,
  },
  {
    id: 23,
    title: "Learn TypeScript",
    platform: "Codecademy",
    instructor: "Codecademy Team",
    rating: 4.6,
    reviewCount: 8900,
    duration: "10 total hours",
    level: "Intermediate",
    price: 439,
    originalPrice: 1759,
    discount: 75,
    currency: "INR",
    skills: ["TypeScript", "Type System", "Interfaces", "Generics"],
    description:
      "Master TypeScript with interactive lessons and practical projects to enhance JavaScript development.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://www.codecademy.com/resources/learn-typescript.jpg",
    courseUrl: "https://www.codecademy.com/learn/learn-typescript",
    students: 72000,
    projects: 7,
    aiScore: 87,
  },
  {
    id: 24,
    title: "TypeScript for Professionals",
    platform: "edX",
    instructor: "Microsoft",
    rating: 4.5,
    reviewCount: 5600,
    duration: "18 total hours",
    level: "Advanced",
    price: 700,
    originalPrice: 3750,
    discount: 81,
    currency: "INR",
    skills: ["TypeScript", "Advanced Types", "Decorators", "Modules"],
    description:
      "Advanced TypeScript course covering enterprise patterns and professional development practices.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-23",
    certificateOffered: true,
    thumbnail: "https://www.edx.org/static/typescript-professionals.jpg",
    courseUrl: "https://www.edx.org/course/typescript-professionals",
    students: 34000,
    projects: 4,
    aiScore: 89,
  },
  {
    id: 25,
    title: "TypeScript Fundamentals",
    platform: "Pluralsight",
    instructor: "Dan Wahlin",
    rating: 4.6,
    reviewCount: 7200,
    duration: "6 total hours",
    level: "Beginner",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["TypeScript", "JavaScript", "ES6", "Type Checking"],
    description:
      "Learn TypeScript fundamentals and how to integrate it into JavaScript projects effectively.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-30",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/typescript-fundamentals",
    courseUrl: "https://www.pluralsight.com/courses/typescript-fundamentals",
    students: 45000,
    projects: 3,
    aiScore: 85,
  },
  {
    id: 26,
    title: "TypeScript Crash Course",
    platform: "YouTube",
    instructor: "Traversy Media",
    rating: 4.7,
    reviewCount: 18000,
    duration: "1.5 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["TypeScript", "Basic Types", "Interfaces", "Classes"],
    description:
      "Quick and comprehensive TypeScript crash course covering all essential concepts.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-05-20",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/BCg4U1FzODs/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=BCg4U1FzODs",
    students: 425000,
    projects: 1,
    aiScore: 81,
  },
  {
    id: 27,
    title: "Learn TypeScript - Full Tutorial",
    platform: "Boot.dev",
    instructor: "Lane Wagner",
    rating: 4.7,
    reviewCount: 3200,
    duration: "12 total hours",
    level: "Intermediate",
    price: 599,
    originalPrice: 2399,
    discount: 75,
    currency: "INR",
    skills: ["TypeScript", "Type Challenges", "Advanced Types", "Generics"],
    description:
      "Master TypeScript through real-world type challenges and practical exercises.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-21",
    certificateOffered: true,
    thumbnail: "https://boot.dev/assets/typescript-course.jpg",
    courseUrl: "https://www.boot.dev/courses/learn-typescript",
    students: 15000,
    projects: 8,
    aiScore: 86,
  },
  {
    id: 28,
    title: "TypeScript Deep Dive",
    platform: "Frontend Masters",
    instructor: "Mike North",
    rating: 4.8,
    reviewCount: 4500,
    duration: "9 total hours",
    level: "Advanced",
    price: 1199,
    originalPrice: 4799,
    discount: 75,
    currency: "INR",
    skills: [
      "TypeScript",
      "Advanced Patterns",
      "Type Guards",
      "Conditional Types",
    ],
    description:
      "Deep dive into advanced TypeScript concepts and patterns for professional development.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-07-18",
    certificateOffered: true,
    thumbnail: "https://frontendmasters.com/assets/typescript-deep-dive.jpg",
    courseUrl: "https://frontendmasters.com/courses/typescript-deep-dive/",
    students: 28000,
    projects: 5,
    aiScore: 91,
  },
  {
    id: 29,
    title: "TypeScript: The Big Picture",
    platform: "Pluralsight",
    instructor: "Brice Wilson",
    rating: 4.5,
    reviewCount: 3800,
    duration: "3 total hours",
    level: "Beginner",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["TypeScript", "JavaScript", "Type Safety", "Tooling"],
    description:
      "Introduction to TypeScript covering why and how to use it in modern development.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-06-25",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/typescript-big-picture",
    courseUrl: "https://www.pluralsight.com/courses/typescript-big-picture",
    students: 22000,
    projects: 2,
    aiScore: 83,
  },
  {
    id: 30,
    title: "TypeScript in Practice",
    platform: "Coursera",
    instructor: "Johns Hopkins University",
    rating: 4.6,
    reviewCount: 2900,
    duration: "16 total hours",
    level: "Intermediate",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["TypeScript", "React", "Node.js", "Full Stack"],
    description:
      "Practical TypeScript course covering full-stack development with React and Node.js.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-05",
    certificateOffered: true,
    thumbnail: "https://d3njjcbhbojbot.cloudfront.net/api/typescript-practice",
    courseUrl: "https://www.coursera.org/learn/typescript-in-practice",
    students: 18000,
    projects: 6,
    aiScore: 88,
  },
  {
    id: 31,
    title: "HTML and CSS for Beginners - Build a Website & Launch ONLINE",
    platform: "Udemy",
    instructor: "Edwin Diaz",
    rating: 4.5,
    reviewCount: 42000,
    duration: "12 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["HTML", "CSS", "Web Design", "Responsive Design"],
    description:
      "Learn HTML5 and CSS3 by building real-world websites from scratch with modern techniques.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-12",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/437398_46c3_10.jpg",
    courseUrl:
      "https://www.udemy.com/course/html-and-css-for-beginners-crash-course-learn-fast-easy/",
    students: 165000,
    projects: 4,
    aiScore: 84,
  },
  {
    id: 32,
    title: "Build Responsive Real-World Websites with HTML and CSS",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.7,
    reviewCount: 88000,
    duration: "37.5 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["HTML", "CSS", "Flexbox", "CSS Grid"],
    description:
      "Learn modern HTML5 and CSS3 from scratch, and build real-world projects with flexbox and grid.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1026604_790b_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/",
    students: 325000,
    projects: 3,
    aiScore: 91,
  },
  {
    id: 33,
    title: "HTML5 and CSS Fundamentals",
    platform: "edX",
    instructor: "W3C",
    rating: 4.6,
    reviewCount: 15000,
    duration: "20 total hours",
    level: "Beginner",
    price: 700,
    originalPrice: 3750,
    discount: 81,
    currency: "INR",
    skills: ["HTML", "CSS", "Web Standards", "Accessibility"],
    description:
      "Learn HTML5 and CSS fundamentals from W3C, the organization that develops web standards.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-04-08",
    certificateOffered: true,
    thumbnail: "https://www.edx.org/static/html5-css-fundamentals.jpg",
    courseUrl: "https://www.edx.org/course/html5-and-css-fundamentals",
    students: 98000,
    projects: 5,
    aiScore: 88,
  },
  {
    id: 34,
    title: "Modern HTML & CSS From The Beginning (Including Sass)",
    platform: "Udemy",
    instructor: "Brad Traversy",
    rating: 4.6,
    reviewCount: 35000,
    duration: "21 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["HTML", "CSS", "Sass", "Flexbox"],
    description:
      "Build modern responsive websites & UI projects using HTML5, CSS3, Sass, Flexbox & CSS Grid.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-07-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1463348_52a4_3.jpg",
    courseUrl:
      "https://www.udemy.com/course/modern-html-css-from-the-beginning/",
    students: 142000,
    projects: 10,
    aiScore: 87,
  },
  {
    id: 35,
    title: "HTML & CSS Tutorial and Projects Course",
    platform: "Udemy",
    instructor: "John Smilga",
    rating: 4.7,
    reviewCount: 18000,
    duration: "34.5 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["HTML", "CSS", "Flexbox", "Grid"],
    description:
      "Master HTML and CSS by building 15+ real-world projects from scratch with modern techniques.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/3237190_0b84.jpg",
    courseUrl:
      "https://www.udemy.com/course/in-depth-html-css-course-build-responsive-websites/",
    students: 68000,
    projects: 15,
    aiScore: 89,
  },
  {
    id: 36,
    title: "Responsive Web Design Certification",
    platform: "freeCodeCamp",
    instructor: "freeCodeCamp Team",
    rating: 4.8,
    reviewCount: 120000,
    duration: "300 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["HTML", "CSS", "Flexbox", "Grid"],
    description:
      "Learn HTML and CSS by building 5 projects and earning a free certification.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail:
      "https://cdn.freecodecamp.org/platform/responsive-web-design.jpg",
    courseUrl: "https://www.freecodecamp.org/learn/responsive-web-design/",
    students: 2500000,
    projects: 5,
    aiScore: 90,
  },
  {
    id: 37,
    title: "HTML, CSS, and Javascript for Web Developers",
    platform: "Coursera",
    instructor: "Johns Hopkins University",
    rating: 4.7,
    reviewCount: 85000,
    duration: "40 total hours",
    level: "Beginner",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    description:
      "Learn the basics of HTML, CSS, and JavaScript to build interactive web applications.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail: "https://d3njjcbhbojbot.cloudfront.net/api/html-css-javascript",
    courseUrl:
      "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
    students: 450000,
    projects: 5,
    aiScore: 92,
  },
  {
    id: 38,
    title: "HTML and CSS Full Course for Beginners",
    platform: "YouTube",
    instructor: "Dave Gray",
    rating: 4.8,
    reviewCount: 28000,
    duration: "11 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["HTML", "CSS", "Web Design", "Forms"],
    description:
      "Complete HTML and CSS course covering all fundamentals with practical examples.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-06-15",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/mJgBOIoGihA/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=mJgBOIoGihA",
    students: 650000,
    projects: 8,
    aiScore: 85,
  },
  {
    id: 39,
    title: "Learn HTML & CSS",
    platform: "Codecademy",
    instructor: "Codecademy Team",
    rating: 4.6,
    reviewCount: 95000,
    duration: "15 total hours",
    level: "Beginner",
    price: 439,
    originalPrice: 1759,
    discount: 75,
    currency: "INR",
    skills: ["HTML", "CSS", "Web Layout", "Typography"],
    description:
      "Interactive HTML and CSS course with hands-on projects to build real websites.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-02",
    certificateOffered: true,
    thumbnail: "https://www.codecademy.com/resources/learn-html-css.jpg",
    courseUrl: "https://www.codecademy.com/learn/learn-html",
    students: 680000,
    projects: 4,
    aiScore: 86,
  },
  {
    id: 40,
    title: "Advanced CSS and Sass: Flexbox, Grid, Animations",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.8,
    reviewCount: 52000,
    duration: "28 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["CSS", "Sass", "Flexbox", "Grid"],
    description:
      "Master modern CSS including Flexbox, Grid, Sass, and advanced techniques with real projects.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-30",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1026604_790b_4.jpg",
    courseUrl: "https://www.udemy.com/course/advanced-css-and-sass/",
    students: 198000,
    projects: 3,
    aiScore: 93,
  },
  {
    id: 41,
    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.7,
    reviewCount: 72000,
    duration: "42 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    description:
      "Master Node.js by building a real-world RESTful API and web app with authentication, testing, and more.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1041150_e6a3_3.jpg",
    courseUrl: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
    students: 285000,
    projects: 8,
    aiScore: 94,
  },
  {
    id: 42,
    title: "The Complete Node.js Developer Course",
    platform: "Udemy",
    instructor: "Andrew Mead",
    rating: 4.7,
    reviewCount: 95000,
    duration: "35 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Node.js", "Express.js", "MongoDB", "Socket.io"],
    description:
      "Learn Node.js by building real-world applications including REST APIs, web apps, and real-time apps.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/922484_52a1_8.jpg",
    courseUrl:
      "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/",
    students: 412000,
    projects: 10,
    aiScore: 92,
  },
  {
    id: 43,
    title: "Node.js - The Complete Guide (MVC, REST APIs, GraphQL)",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    reviewCount: 42000,
    duration: "40 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Node.js", "Express.js", "MongoDB", "GraphQL"],
    description:
      "Master Node.js, build REST APIs with Node.js, GraphQL APIs, add authentication, and more!",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1879018_95b6_2.jpg",
    courseUrl: "https://www.udemy.com/course/nodejs-the-complete-guide/",
    students: 168000,
    projects: 12,
    aiScore: 91,
  },
  {
    id: 44,
    title: "Node.js API Masterclass With Express & MongoDB",
    platform: "Udemy",
    instructor: "Brad Traversy",
    rating: 4.7,
    reviewCount: 28000,
    duration: "12 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    description:
      "Build an extensive RESTful API using Node.js, Express, and MongoDB with authentication.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-07-25",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2374922_47f4.jpg",
    courseUrl: "https://www.udemy.com/course/nodejs-api-masterclass/",
    students: 95000,
    projects: 1,
    aiScore: 89,
  },
  {
    id: 45,
    title: "Server-side Development with NodeJS, Express and MongoDB",
    platform: "Coursera",
    instructor: "The Hong Kong University",
    rating: 4.7,
    reviewCount: 18000,
    duration: "32 total hours",
    level: "Intermediate",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["Node.js", "Express.js", "MongoDB", "REST"],
    description:
      "Learn server-side development with Node.js, Express framework, and MongoDB database.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-12",
    certificateOffered: true,
    thumbnail:
      "https://d3njjcbhbojbot.cloudfront.net/api/nodejs-express-mongodb",
    courseUrl: "https://www.coursera.org/learn/server-side-nodejs",
    students: 125000,
    projects: 4,
    aiScore: 90,
  },
  {
    id: 46,
    title: "Node.js for Beginners - Complete Course",
    platform: "YouTube",
    instructor: "Mosh Hamedani",
    rating: 4.8,
    reviewCount: 35000,
    duration: "3 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Node.js", "NPM", "Modules", "File System"],
    description:
      "Complete Node.js tutorial for beginners covering fundamentals and building your first app.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-04-18",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/TlB_eWDSMt4/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
    students: 785000,
    projects: 2,
    aiScore: 85,
  },
  {
    id: 47,
    title: "Learn Node.js",
    platform: "Codecademy",
    instructor: "Codecademy Team",
    rating: 4.6,
    reviewCount: 12000,
    duration: "12 total hours",
    level: "Intermediate",
    price: 439,
    originalPrice: 1759,
    discount: 75,
    currency: "INR",
    skills: ["Node.js", "Express.js", "HTTP", "Modules"],
    description:
      "Interactive Node.js course teaching server-side JavaScript and backend development.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-08",
    certificateOffered: true,
    thumbnail: "https://www.codecademy.com/resources/learn-nodejs.jpg",
    courseUrl: "https://www.codecademy.com/learn/learn-node-js",
    students: 95000,
    projects: 5,
    aiScore: 86,
  },
  {
    id: 48,
    title: "Node.js Microservices",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.8,
    reviewCount: 15000,
    duration: "54 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Node.js", "Express.js", "Docker", "Kubernetes"],
    description:
      "Build, deploy, and scale an E-Commerce app using Microservices built with Node and React.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2887338_4ddb_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/microservices-with-node-js-and-react/",
    students: 58000,
    projects: 1,
    aiScore: 93,
  },
  {
    id: 49,
    title: "Node.js: Getting Started",
    platform: "Pluralsight",
    instructor: "Samer Buna",
    rating: 4.6,
    reviewCount: 9500,
    duration: "5 total hours",
    level: "Beginner",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["Node.js", "NPM", "Async Programming", "Modules"],
    description:
      "Introduction to Node.js covering core concepts and building your first applications.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-06-30",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/nodejs-getting-started",
    courseUrl: "https://www.pluralsight.com/courses/nodejs-getting-started",
    students: 48000,
    projects: 3,
    aiScore: 84,
  },
  {
    id: 50,
    title: "RESTful Web Services with Node.js and Express",
    platform: "LinkedIn Learning",
    instructor: "Emmanuel Henri",
    rating: 4.5,
    reviewCount: 7200,
    duration: "3.5 total hours",
    level: "Intermediate",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["Node.js", "Express.js", "REST APIs", "HTTP"],
    description:
      "Learn to build RESTful web services using Node.js and Express framework.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-05",
    certificateOffered: true,
    thumbnail: "https://media.licdn.com/dms/image/nodejs-express-restful",
    courseUrl:
      "https://www.linkedin.com/learning/building-restful-web-apis-with-node-js-and-express",
    students: 38000,
    projects: 2,
    aiScore: 87,
  },
  {
    id: 51,
    title: "Express.js Essential Training",
    platform: "LinkedIn Learning",
    instructor: "Daniel Khan",
    rating: 4.6,
    reviewCount: 5800,
    duration: "4 total hours",
    level: "Intermediate",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["Express.js", "Node.js", "Middleware", "Routing"],
    description:
      "Master Express.js framework for building robust server-side applications with Node.js.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-07-20",
    certificateOffered: true,
    thumbnail: "https://media.licdn.com/dms/image/expressjs-essential",
    courseUrl: "https://www.linkedin.com/learning/express-essential-training",
    students: 32000,
    projects: 3,
    aiScore: 85,
  },
  {
    id: 52,
    title: "Building REST APIs with Express",
    platform: "Pluralsight",
    instructor: "Daniel Stern",
    rating: 4.5,
    reviewCount: 4200,
    duration: "6 total hours",
    level: "Intermediate",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["Express.js", "REST APIs", "Node.js", "MongoDB"],
    description:
      "Learn to build production-ready REST APIs using Express.js and best practices.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/building-rest-apis-express",
    courseUrl: "https://www.pluralsight.com/courses/building-rest-apis-express",
    students: 25000,
    projects: 4,
    aiScore: 86,
  },
  {
    id: 53,
    title: "Complete Express.js Course",
    platform: "YouTube",
    instructor: "freeCodeCamp",
    rating: 4.7,
    reviewCount: 8900,
    duration: "8 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Express.js", "Node.js", "REST APIs", "Middleware"],
    description:
      "Comprehensive Express.js tutorial covering routing, middleware, and building APIs.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-05-12",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
    students: 245000,
    projects: 3,
    aiScore: 83,
  },
  {
    id: 54,
    title: "Express.js Fundamentals",
    platform: "Udemy",
    instructor: "Brad Schiff",
    rating: 4.6,
    reviewCount: 3500,
    duration: "9 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Express.js", "Node.js", "MVC", "Templates"],
    description:
      "Learn Express.js from scratch and build scalable Node.js applications.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-06-18",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/expressjs-fundamentals.jpg",
    courseUrl: "https://www.udemy.com/course/expressjs-fundamentals/",
    students: 18000,
    projects: 2,
    aiScore: 82,
  },
  {
    id: 55,
    title: "Express Web Application Development",
    platform: "Packt",
    instructor: "Hage Yaaph",
    rating: 4.4,
    reviewCount: 2100,
    duration: "7 total hours",
    level: "Intermediate",
    price: 799,
    originalPrice: 3199,
    discount: 75,
    currency: "INR",
    skills: ["Express.js", "Node.js", "Authentication", "Security"],
    description:
      "Build secure and scalable web applications using Express.js with best practices.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-07-08",
    certificateOffered: true,
    thumbnail: "https://static.packt.com/express-web-app-development.jpg",
    courseUrl:
      "https://www.packtpub.com/course/express-web-application-development",
    students: 12000,
    projects: 3,
    aiScore: 81,
  },
  {
    id: 56,
    title: "Express and MongoDB REST API",
    platform: "Udemy",
    instructor: "Robert Bunch",
    rating: 4.5,
    reviewCount: 4800,
    duration: "10 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Express.js", "MongoDB", "REST APIs", "JWT"],
    description:
      "Build production-ready REST APIs with Express.js and MongoDB including authentication.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/express-mongodb-rest.jpg",
    courseUrl: "https://www.udemy.com/course/express-mongodb-rest-api/",
    students: 22000,
    projects: 1,
    aiScore: 84,
  },
  {
    id: 57,
    title: "Modern Express.js Applications",
    platform: "Frontend Masters",
    instructor: "Scott Moss",
    rating: 4.7,
    reviewCount: 3200,
    duration: "5 total hours",
    level: "Advanced",
    price: 1199,
    originalPrice: 4799,
    discount: 75,
    currency: "INR",
    skills: ["Express.js", "Node.js", "GraphQL", "TypeScript"],
    description:
      "Advanced Express.js patterns and best practices for building modern APIs.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-02",
    certificateOffered: true,
    thumbnail: "https://frontendmasters.com/assets/modern-express-apps.jpg",
    courseUrl: "https://frontendmasters.com/courses/modern-express/",
    students: 15000,
    projects: 4,
    aiScore: 88,
  },
  {
    id: 58,
    title: "Express.js Course - Build RESTful APIs",
    platform: "Scrimba",
    instructor: "Per Harald Borgen",
    rating: 4.6,
    reviewCount: 2800,
    duration: "6 total hours",
    level: "Beginner",
    price: 399,
    originalPrice: 1599,
    discount: 75,
    currency: "INR",
    skills: ["Express.js", "REST APIs", "CRUD", "Middleware"],
    description:
      "Interactive Express.js course with hands-on coding exercises and projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-07-25",
    certificateOffered: true,
    thumbnail: "https://scrimba.com/assets/express-rest-apis.jpg",
    courseUrl: "https://scrimba.com/learn/expressjs",
    students: 18000,
    projects: 3,
    aiScore: 83,
  },
  {
    id: 59,
    title: "Complete Express.js Bootcamp",
    platform: "Educative",
    instructor: "Educative Team",
    rating: 4.5,
    reviewCount: 1900,
    duration: "12 total hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 2799,
    discount: 75,
    currency: "INR",
    skills: ["Express.js", "Node.js", "Testing", "Deployment"],
    description:
      "Text-based interactive Express.js bootcamp with hands-on exercises and projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-22",
    certificateOffered: true,
    thumbnail: "https://www.educative.io/cdn-cgi/express-bootcamp.jpg",
    courseUrl: "https://www.educative.io/courses/complete-expressjs-bootcamp",
    students: 14000,
    projects: 5,
    aiScore: 85,
  },
  {
    id: 60,
    title: "Express.js Security Best Practices",
    platform: "Udemy",
    instructor: "Neil Rowe",
    rating: 4.6,
    reviewCount: 2500,
    duration: "5 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Express.js", "Security", "Authentication", "Authorization"],
    description:
      "Learn to secure Express.js applications with best practices and industry standards.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/express-security.jpg",
    courseUrl: "https://www.udemy.com/course/expressjs-security/",
    students: 11000,
    projects: 2,
    aiScore: 87,
  },
  {
    id: 61,
    title: "Python for Everybody Specialization",
    platform: "Coursera",
    instructor: "Charles Severance (University of Michigan)",
    rating: 4.8,
    reviewCount: 185000,
    duration: "64 total hours",
    level: "Beginner",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["Python", "Data Structures", "Web Scraping", "Databases"],
    description:
      "Learn Python programming from scratch with one of the most popular courses on Coursera.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail: "https://d3njjcbhbojbot.cloudfront.net/api/python-for-everybody",
    courseUrl: "https://www.coursera.org/specializations/python",
    students: 2100000,
    projects: 5,
    aiScore: 95,
  },
  {
    id: 62,
    title: "Complete Python Bootcamp: Go from Zero to Hero",
    platform: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.6,
    reviewCount: 485000,
    duration: "22 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Python", "OOP", "Decorators", "Generators"],
    description:
      "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/567828_67d0.jpg",
    courseUrl: "https://www.udemy.com/course/complete-python-bootcamp/",
    students: 1850000,
    projects: 3,
    aiScore: 93,
  },
  {
    id: 63,
    title: "Python for Data Science and Machine Learning Bootcamp",
    platform: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.6,
    reviewCount: 128000,
    duration: "25 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Python", "Pandas", "NumPy", "Machine Learning"],
    description:
      "Learn how to use Python for Data Science and Machine Learning with NumPy, Pandas, Matplotlib, and more!",
    isBookmarked: false,
    isRecommended: true,
    category: "Data Science",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/903744_8eb2.jpg",
    courseUrl:
      "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
    students: 485000,
    projects: 10,
    aiScore: 92,
  },
  {
    id: 64,
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    platform: "Udemy",
    instructor: "Dr. Angela Yu",
    rating: 4.7,
    reviewCount: 298000,
    duration: "60 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Python", "Web Development", "Automation", "Game Development"],
    description:
      "Master Python by building 100 projects in 100 days. Learn data science, automation, web apps, games and more!",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-25",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg",
    courseUrl: "https://www.udemy.com/course/100-days-of-code/",
    students: 892000,
    projects: 100,
    aiScore: 96,
  },
  {
    id: 65,
    title: "Python Programming Masterclass",
    platform: "Udemy",
    instructor: "Tim Buchalka",
    rating: 4.5,
    reviewCount: 68000,
    duration: "52 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Python", "OOP", "File Handling", "Databases"],
    description:
      "Learn Python from beginner to advanced with comprehensive coverage of Python 3.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/629302_8a2d_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/python-the-complete-python-developer-course/",
    students: 285000,
    projects: 12,
    aiScore: 89,
  },
  {
    id: 66,
    title: "Python for Beginners - Learn Programming from Scratch",
    platform: "Udemy",
    instructor: "Mosh Hamedani",
    rating: 4.5,
    reviewCount: 42000,
    duration: "6 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Python", "Programming Basics", "Control Flow", "Functions"],
    description:
      "Learn Python fundamentals with hands-on exercises and real-world projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-07-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2195144_e073_3.jpg",
    courseUrl:
      "https://www.udemy.com/course/python-for-beginners-learn-programming-from-scratch/",
    students: 168000,
    projects: 3,
    aiScore: 87,
  },
  {
    id: 67,
    title: "Python Full Course for Beginners",
    platform: "YouTube",
    instructor: "Bro Code",
    rating: 4.8,
    reviewCount: 78000,
    duration: "12 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Python", "Data Types", "Functions", "Modules"],
    description:
      "Complete Python tutorial for absolute beginners covering all fundamentals.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-02-18",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/XKHEtdqhLK8/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=XKHEtdqhLK8",
    students: 1850000,
    projects: 5,
    aiScore: 88,
  },
  {
    id: 68,
    title: "Automate the Boring Stuff with Python Programming",
    platform: "Udemy",
    instructor: "Al Sweigart",
    rating: 4.6,
    reviewCount: 112000,
    duration: "9.5 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Python", "Automation", "Web Scraping", "Excel"],
    description:
      "A practical programming course for office workers, academics, and administrators who want to improve their productivity.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-05",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/543600_64d1_4.jpg",
    courseUrl: "https://www.udemy.com/course/automate/",
    students: 435000,
    projects: 20,
    aiScore: 91,
  },
  {
    id: 69,
    title: "Learn Python Programming",
    platform: "Codecademy",
    instructor: "Codecademy Team",
    rating: 4.7,
    reviewCount: 125000,
    duration: "25 total hours",
    level: "Beginner",
    price: 439,
    originalPrice: 1759,
    discount: 75,
    currency: "INR",
    skills: ["Python", "Syntax", "Control Flow", "Data Structures"],
    description:
      "Interactive Python course with hands-on coding exercises and projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail: "https://www.codecademy.com/resources/learn-python.jpg",
    courseUrl: "https://www.codecademy.com/learn/learn-python-3",
    students: 890000,
    projects: 4,
    aiScore: 90,
  },
  {
    id: 70,
    title: "Scientific Computing with Python",
    platform: "freeCodeCamp",
    instructor: "freeCodeCamp Team",
    rating: 4.7,
    reviewCount: 52000,
    duration: "300 total hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Python", "NumPy", "Matplotlib", "Algorithms"],
    description:
      "Learn Python fundamentals and build 5 scientific computing projects to earn certification.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-18",
    certificateOffered: true,
    thumbnail:
      "https://cdn.freecodecamp.org/platform/scientific-computing-python.jpg",
    courseUrl:
      "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
    students: 485000,
    projects: 5,
    aiScore: 89,
  },
  {
    id: 71,
    title: "Django for Beginners - Build 3 Projects",
    platform: "Udemy",
    instructor: "Nick Walter",
    rating: 4.5,
    reviewCount: 22000,
    duration: "18 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Django", "Python", "Web Development", "Databases"],
    description:
      "Learn Django by building three complete projects from scratch including blog, portfolio, and more.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2194524_acc7.jpg",
    courseUrl:
      "https://www.udemy.com/course/django-for-beginners-build-projects/",
    students: 85000,
    projects: 3,
    aiScore: 86,
  },
  {
    id: 72,
    title: "Python and Django Full Stack Web Developer Bootcamp",
    platform: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.5,
    reviewCount: 118000,
    duration: "32 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Django", "Python", "HTML", "CSS", "JavaScript"],
    description:
      "Learn to build websites with HTML, CSS, Bootstrap, JavaScript, jQuery, Python 3, and Django!",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/822444_a6db.jpg",
    courseUrl:
      "https://www.udemy.com/course/python-and-django-full-stack-web-developer-bootcamp/",
    students: 442000,
    projects: 8,
    aiScore: 91,
  },
  {
    id: 73,
    title: "Django Tutorial for Beginners - Build Powerful Backends",
    platform: "YouTube",
    instructor: "Programming with Mosh",
    rating: 4.8,
    reviewCount: 28000,
    duration: "4.7 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Django", "Python", "REST APIs", "Models"],
    description:
      "Complete Django tutorial covering everything from basics to building a full e-commerce application.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-06-27",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/rHux0gMZ3Eg/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=rHux0gMZ3Eg",
    students: 685000,
    projects: 1,
    aiScore: 90,
  },
  {
    id: 74,
    title: "Django 4 - Build Your First Python & Django Application",
    platform: "Udemy",
    instructor: "Tim Buchalka",
    rating: 4.6,
    reviewCount: 15000,
    duration: "23 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Django", "Python", "PostgreSQL", "Authentication"],
    description:
      "Learn Django 4 by building a fully functional web application with real-world features.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/django-4-course.jpg",
    courseUrl: "https://www.udemy.com/course/django-4-build-application/",
    students: 62000,
    projects: 1,
    aiScore: 88,
  },
  {
    id: 75,
    title: "Django REST Framework - Build Web APIs with Python",
    platform: "Udemy",
    instructor: "Bharath Thippireddy",
    rating: 4.5,
    reviewCount: 12000,
    duration: "14 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Django", "REST APIs", "Python", "Authentication"],
    description:
      "Master Django REST Framework by building powerful web APIs with authentication and permissions.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-07-30",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/django-rest-framework.jpg",
    courseUrl: "https://www.udemy.com/course/django-rest-framework/",
    students: 48000,
    projects: 5,
    aiScore: 87,
  },
  {
    id: 76,
    title: "Python Django - The Practical Guide",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    reviewCount: 8500,
    duration: "28 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Django", "Python", "Forms", "File Upload"],
    description:
      "Learn Django from scratch and build production-ready web applications with best practices.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/django-practical-guide.jpg",
    courseUrl:
      "https://www.udemy.com/course/python-django-the-practical-guide/",
    students: 35000,
    projects: 6,
    aiScore: 89,
  },
  {
    id: 77,
    title: "Django with React | Full Stack Course",
    platform: "YouTube",
    instructor: "Tech With Tim",
    rating: 4.7,
    reviewCount: 12000,
    duration: "5.5 total hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Django", "React", "REST APIs", "Full Stack"],
    description:
      "Build a full-stack application combining Django REST framework backend with React frontend.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-04-20",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/JD-age0BPVo/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=JD-age0BPVo",
    students: 285000,
    projects: 1,
    aiScore: 85,
  },
  {
    id: 78,
    title: "Build a Backend REST API with Python & Django",
    platform: "Udemy",
    instructor: "Mark Winterbottom",
    rating: 4.5,
    reviewCount: 28000,
    duration: "11 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Django", "REST APIs", "Docker", "AWS"],
    description:
      "Learn to build, test and deploy a REST API using Django REST Framework and AWS.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-18",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/django-backend-rest-api.jpg",
    courseUrl: "https://www.udemy.com/course/django-python-advanced/",
    students: 92000,
    projects: 1,
    aiScore: 88,
  },
  {
    id: 79,
    title: "Django Core | A Reference Guide",
    platform: "Udemy",
    instructor: "Justin Mitchel",
    rating: 4.4,
    reviewCount: 6200,
    duration: "26 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Django", "Python", "Models", "Views"],
    description:
      "Comprehensive Django reference covering models, views, forms, and advanced concepts.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-07-12",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/django-core-reference.jpg",
    courseUrl: "https://www.udemy.com/course/django-core/",
    students: 28000,
    projects: 10,
    aiScore: 84,
  },
  {
    id: 80,
    title: "Django Web Development with Python",
    platform: "LinkedIn Learning",
    instructor: "Nick Walter",
    rating: 4.5,
    reviewCount: 8900,
    duration: "4.5 total hours",
    level: "Beginner",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["Django", "Python", "Templates", "URL Routing"],
    description:
      "Learn Django fundamentals and build web applications with Python.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-08",
    certificateOffered: true,
    thumbnail: "https://media.licdn.com/dms/image/django-web-development",
    courseUrl: "https://www.linkedin.com/learning/django-essential-training",
    students: 45000,
    projects: 2,
    aiScore: 83,
  },
  {
    id: 81,
    title: "Java Programming Masterclass",
    platform: "Udemy",
    instructor: "Tim Buchalka",
    rating: 4.6,
    reviewCount: 175000,
    duration: "80 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Java", "OOP", "Collections", "Multithreading"],
    description:
      "Learn Java In This Course And Become a Computer Programmer. Obtain valuable Core Java Skills And Java Certification.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/533682_c10c_4.jpg",
    courseUrl:
      "https://www.udemy.com/course/java-the-complete-java-developer-course/",
    students: 785000,
    projects: 15,
    aiScore: 94,
  },
  {
    id: 82,
    title: "Java Programming for Complete Beginners",
    platform: "Udemy",
    instructor: "in28Minutes Official",
    rating: 4.6,
    reviewCount: 62000,
    duration: "25 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Java", "Object-Oriented Programming", "Eclipse", "JUnit"],
    description:
      "Learn Java programming from scratch with hands-on exercises and real-world projects.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1242764_f6c7_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/java-programming-tutorial-for-beginners/",
    students: 245000,
    projects: 8,
    aiScore: 91,
  },
  {
    id: 83,
    title: "Java Programming and Software Engineering Fundamentals",
    platform: "Coursera",
    instructor: "Duke University",
    rating: 4.6,
    reviewCount: 42000,
    duration: "96 total hours",
    level: "Beginner",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["Java", "Software Design", "Algorithms", "Problem Solving"],
    description:
      "Learn Java programming and software engineering fundamentals from Duke University.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail:
      "https://d3njjcbhbojbot.cloudfront.net/api/java-programming-duke",
    courseUrl: "https://www.coursera.org/specializations/java-programming",
    students: 325000,
    projects: 5,
    aiScore: 92,
  },
  {
    id: 84,
    title: "Java Full Course",
    platform: "YouTube",
    instructor: "Bro Code",
    rating: 4.8,
    reviewCount: 95000,
    duration: "12 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Java", "OOP", "Data Structures", "GUI"],
    description:
      "Complete Java programming course for beginners covering all essential concepts.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-03-25",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/xk4_1vDrzzo/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=xk4_1vDrzzo",
    students: 2150000,
    projects: 5,
    aiScore: 89,
  },
  {
    id: 85,
    title: "Complete Java Masterclass",
    platform: "Udemy",
    instructor: "Tim Buchalka & Goran Lochert",
    rating: 4.5,
    reviewCount: 88000,
    duration: "97 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Java", "JavaFX", "Spring Framework", "Android"],
    description:
      "Comprehensive Java course from basics to advanced with Spring Framework and Android development.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1243860_c6ec.jpg",
    courseUrl:
      "https://www.udemy.com/course/java-the-complete-java-developer-course-2/",
    students: 342000,
    projects: 20,
    aiScore: 90,
  },
  {
    id: 86,
    title: "Object Oriented Programming in Java",
    platform: "Coursera",
    instructor: "University of California, San Diego",
    rating: 4.7,
    reviewCount: 15000,
    duration: "28 total hours",
    level: "Intermediate",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["Java", "OOP", "Design Patterns", "Algorithms"],
    description:
      "Learn object-oriented programming principles and design patterns with Java.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail: "https://d3njjcbhbojbot.cloudfront.net/api/java-oop-ucsd",
    courseUrl: "https://www.coursera.org/learn/object-oriented-java",
    students: 98000,
    projects: 6,
    aiScore: 88,
  },
  {
    id: 87,
    title: "Java Programming: Solving Problems with Software",
    platform: "Coursera",
    instructor: "Duke University",
    rating: 4.6,
    reviewCount: 22000,
    duration: "16 total hours",
    level: "Beginner",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["Java", "Problem Solving", "Data Processing", "Files"],
    description:
      "Learn to code in Java and improve your programming and problem-solving skills.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-20",
    certificateOffered: true,
    thumbnail:
      "https://d3njjcbhbojbot.cloudfront.net/api/java-solving-problems",
    courseUrl: "https://www.coursera.org/learn/java-programming",
    students: 142000,
    projects: 4,
    aiScore: 87,
  },
  {
    id: 88,
    title: "Java In-Depth: Become a Complete Java Engineer",
    platform: "Udemy",
    instructor: "Dheeru Mundluru",
    rating: 4.7,
    reviewCount: 12000,
    duration: "54 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Java", "Concurrency", "JVM", "Performance"],
    description:
      "Deep dive into Java covering advanced topics including JVM internals, concurrency, and performance.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/java-in-depth.jpg",
    courseUrl:
      "https://www.udemy.com/course/java-in-depth-become-a-complete-java-engineer/",
    students: 48000,
    projects: 12,
    aiScore: 93,
  },
  {
    id: 89,
    title: "Java Fundamentals",
    platform: "Pluralsight",
    instructor: "Jim Wilson",
    rating: 4.6,
    reviewCount: 28000,
    duration: "12 total hours",
    level: "Beginner",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["Java", "Classes", "Methods", "Exceptions"],
    description:
      "Learn Java fundamentals covering classes, methods, data types, and exception handling.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-07-30",
    certificateOffered: false,
    thumbnail: "https://pluralsight.imgix.net/course-images/java-fundamentals",
    courseUrl:
      "https://www.pluralsight.com/courses/java-fundamentals-core-platform",
    students: 125000,
    projects: 5,
    aiScore: 86,
  },
  {
    id: 90,
    title: "Learn Java",
    platform: "Codecademy",
    instructor: "Codecademy Team",
    rating: 4.6,
    reviewCount: 45000,
    duration: "30 total hours",
    level: "Beginner",
    price: 439,
    originalPrice: 1759,
    discount: 75,
    currency: "INR",
    skills: ["Java", "OOP", "Data Structures", "Inheritance"],
    description:
      "Interactive Java programming course with hands-on exercises and projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail: "https://www.codecademy.com/resources/learn-java.jpg",
    courseUrl: "https://www.codecademy.com/learn/learn-java",
    students: 385000,
    projects: 7,
    aiScore: 85,
  },
  {
    id: 91,
    title: "Spring Boot: Mastering the Fundamentals",
    platform: "Code with Mosh",
    instructor: "Mosh Hamedani",
    rating: 4.8,
    reviewCount: 8500,
    duration: "6 total hours",
    level: "Beginner",
    price: 899,
    originalPrice: 3599,
    discount: 75,
    currency: "INR",
    skills: ["Spring Boot", "Java", "Spring Data JPA", "Dependency Injection"],
    description:
      "Master Spring Boot fundamentals with hands-on exercises and best practices.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-02-23",
    certificateOffered: true,
    thumbnail: "https://codewithmosh.com/assets/spring-boot-fundamentals.jpg",
    courseUrl: "https://codewithmosh.com/p/spring-boot-fundamentals",
    students: 42000,
    projects: 5,
    aiScore: 92,
  },
  {
    id: 92,
    title: "Spring Boot Tutorial for Beginners",
    platform: "YouTube",
    instructor: "Code with Mosh",
    rating: 4.8,
    reviewCount: 18000,
    duration: "2.5 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Spring Boot", "Java", "REST APIs", "Spring MVC"],
    description:
      "Complete Spring Boot tutorial covering everything from basics to building REST APIs.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-02-25",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/gJrjgg1KVL4/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=gJrjgg1KVL4",
    students: 485000,
    projects: 1,
    aiScore: 89,
  },
  {
    id: 93,
    title: "Spring Boot 0 to 100 Cohort",
    platform: "Coding Shuttle",
    instructor: "Coding Shuttle Team",
    rating: 4.7,
    reviewCount: 4200,
    duration: "48 total hours",
    level: "All Levels",
    price: 999,
    originalPrice: 3999,
    discount: 75,
    currency: "INR",
    skills: ["Spring Boot", "Spring Data JPA", "Spring Security", "REST APIs"],
    description:
      "Comprehensive Spring Boot course from zero to production-ready applications.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-04-06",
    certificateOffered: true,
    thumbnail: "https://www.codingshuttle.com/spring-boot-cohort.jpg",
    courseUrl:
      "https://www.codingshuttle.com/courses/java-spring-boot-0-to-100",
    students: 18000,
    projects: 12,
    aiScore: 91,
  },
  {
    id: 94,
    title: "Spring Boot Course Online with Certificate",
    platform: "Scaler Academy",
    instructor: "Arnav Gupta",
    rating: 4.7,
    reviewCount: 3100,
    duration: "28 total hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 2799,
    discount: 75,
    currency: "INR",
    skills: ["Spring Boot", "Microservices", "Spring Security", "Hibernate"],
    description:
      "Learn Spring Boot and build production-ready microservices with security and database integration.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-02-06",
    certificateOffered: true,
    thumbnail: "https://static.scaler.com/spring-boot-course.jpg",
    courseUrl:
      "https://www.scaler.com/topics/course/java-spring-boot-blogging-app/",
    students: 22000,
    projects: 1,
    aiScore: 88,
  },
  {
    id: 95,
    title: "Master Spring Boot 3 & Spring Framework 6",
    platform: "Udemy",
    instructor: "in28Minutes Official",
    rating: 4.6,
    reviewCount: 52000,
    duration: "40 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Spring Boot", "Spring Framework", "JPA", "Microservices"],
    description:
      "Master Spring Boot 3, Spring Framework 6, REST APIs, JPA, Hibernate, and Microservices.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/spring-boot-3.jpg",
    courseUrl:
      "https://www.udemy.com/course/spring-boot-and-spring-framework-tutorial-for-beginners/",
    students: 185000,
    projects: 15,
    aiScore: 93,
  },
  {
    id: 96,
    title: "Spring Boot and Angular Full Stack Development",
    platform: "Udemy",
    instructor: "Chad Darby",
    rating: 4.6,
    reviewCount: 38000,
    duration: "45 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Spring Boot", "Angular", "Full Stack", "REST APIs"],
    description:
      "Build a full-stack application with Spring Boot backend and Angular frontend.",
    isBookmarked: false,
    isRecommended: false,
    category: "Full Stack Development",
    language: "English",
    lastUpdated: "2024-08-20",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/spring-boot-angular.jpg",
    courseUrl: "https://www.udemy.com/course/spring-boot-and-angular/",
    students: 142000,
    projects: 8,
    aiScore: 90,
  },
  {
    id: 97,
    title: "Spring Boot Microservices and Spring Cloud",
    platform: "Udemy",
    instructor: "in28Minutes Official",
    rating: 4.5,
    reviewCount: 28000,
    duration: "22 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Spring Boot", "Microservices", "Spring Cloud", "Docker"],
    description:
      "Master Microservices and Spring Cloud with Spring Boot, Docker, and Kubernetes.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-08",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/spring-microservices.jpg",
    courseUrl:
      "https://www.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/",
    students: 95000,
    projects: 6,
    aiScore: 92,
  },
  {
    id: 98,
    title: "Spring Boot REST API Development",
    platform: "Udemy",
    instructor: "Bharath Thippireddy",
    rating: 4.5,
    reviewCount: 18000,
    duration: "16 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Spring Boot", "REST APIs", "Spring Data JPA", "MySQL"],
    description:
      "Build RESTful web services with Spring Boot, JPA, Hibernate, and MySQL.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-07-25",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/spring-boot-rest-api.jpg",
    courseUrl: "https://www.udemy.com/course/spring-boot-rest-api/",
    students: 68000,
    projects: 5,
    aiScore: 87,
  },
  {
    id: 99,
    title: "Spring Boot and Hibernate for Beginners",
    platform: "Udemy",
    instructor: "Chad Darby",
    rating: 4.6,
    reviewCount: 42000,
    duration: "41 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Spring Boot", "Hibernate", "Spring MVC", "Spring Security"],
    description:
      "Complete Spring Boot and Hibernate course including MVC, REST APIs, and Security.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-30",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/spring-hibernate.jpg",
    courseUrl: "https://www.udemy.com/course/spring-hibernate-tutorial/",
    students: 158000,
    projects: 10,
    aiScore: 89,
  },
  {
    id: 100,
    title: "Spring Boot Testing Masterclass",
    platform: "Udemy",
    instructor: "Philip Starritt",
    rating: 4.7,
    reviewCount: 8200,
    duration: "12 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Spring Boot", "JUnit", "Mockito", "Integration Testing"],
    description:
      "Master testing in Spring Boot applications with JUnit, Mockito, and integration tests.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/spring-boot-testing.jpg",
    courseUrl: "https://www.udemy.com/course/spring-boot-testing/",
    students: 32000,
    projects: 4,
    aiScore: 88,
  },
  {
    id: 101,
    title: "C++ Programming Course - Beginner to Advanced",
    platform: "Udemy",
    instructor: "Abdul Bari",
    rating: 4.6,
    reviewCount: 58000,
    duration: "31 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["C++", "Data Structures", "Algorithms", "OOP"],
    description:
      "Learn C++ programming from basics to advanced with data structures and algorithms.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/cpp-programming.jpg",
    courseUrl: "https://www.udemy.com/course/cpp-deep-dive/",
    students: 185000,
    projects: 12,
    aiScore: 92,
  },
  {
    id: 102,
    title: "Beginning C++ Programming - From Beginner to Beyond",
    platform: "Udemy",
    instructor: "Tim Buchalka & Frank Mitropoulos",
    rating: 4.6,
    reviewCount: 85000,
    duration: "44 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["C++", "Modern C++", "STL", "Object-Oriented Programming"],
    description:
      "Obtain Modern C++ Object-Oriented Programming (OOP) and STL skills needed for game, system, and application development.",
    isBookmarked: false,
    isRecommended: true,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1576854_9f8b_3.jpg",
    courseUrl:
      "https://www.udemy.com/course/beginning-c-plus-plus-programming/",
    students: 342000,
    projects: 15,
    aiScore: 93,
  },
  {
    id: 103,
    title: "C++ Tutorial for Complete Beginners",
    platform: "Udemy",
    instructor: "John Purcell",
    rating: 4.5,
    reviewCount: 62000,
    duration: "18 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["C++", "Classes", "Inheritance", "Pointers"],
    description:
      "Learn C++ from scratch with this comprehensive course for absolute beginners.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-07-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/805814_0b9c_2.jpg",
    courseUrl: "https://www.udemy.com/course/free-learn-c-tutorial-beginners/",
    students: 245000,
    projects: 8,
    aiScore: 88,
  },
  {
    id: 104,
    title: "C++ Full Course for Free",
    platform: "YouTube",
    instructor: "Bro Code",
    rating: 4.8,
    reviewCount: 68000,
    duration: "4 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["C++", "Variables", "Functions", "Classes"],
    description:
      "Complete C++ programming tutorial covering fundamentals and object-oriented concepts.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-01-20",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/ZzaPdXTrSb8/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=ZzaPdXTrSb8",
    students: 1450000,
    projects: 5,
    aiScore: 87,
  },
  {
    id: 105,
    title: "Unreal Engine C++ Developer Course",
    platform: "Udemy",
    instructor: "Ben Tristem & GameDev.tv Team",
    rating: 4.6,
    reviewCount: 78000,
    duration: "54 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["C++", "Unreal Engine", "Game Development", "Blueprint"],
    description:
      "Learn C++ game development by building games with Unreal Engine 5 from scratch.",
    isBookmarked: false,
    isRecommended: true,
    category: "Game Development",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/unreal-cpp-developer.jpg",
    courseUrl: "https://www.udemy.com/course/unrealcourse/",
    students: 285000,
    projects: 10,
    aiScore: 94,
  },
  {
    id: 106,
    title: "Advanced C++ Programming",
    platform: "Udemy",
    instructor: "John Purcell",
    rating: 4.5,
    reviewCount: 12000,
    duration: "16 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["C++", "Templates", "STL", "Move Semantics"],
    description:
      "Master advanced C++ concepts including templates, STL, and modern C++ features.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-05",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/advanced-cpp.jpg",
    courseUrl: "https://www.udemy.com/course/learn-advanced-c-programming/",
    students: 48000,
    projects: 6,
    aiScore: 89,
  },
  {
    id: 107,
    title: "C++ Fundamentals Including C++ 17",
    platform: "Pluralsight",
    instructor: "Kate Gregory",
    rating: 4.7,
    reviewCount: 18000,
    duration: "5 total hours",
    level: "Beginner",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["C++", "C++17", "Standard Library", "Basics"],
    description:
      "Learn C++ fundamentals including modern C++17 features and best practices.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-07-30",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/cpp-fundamentals.jpg",
    courseUrl: "https://www.pluralsight.com/courses/cplusplus-fundamentals-c17",
    students: 85000,
    projects: 4,
    aiScore: 86,
  },
  {
    id: 108,
    title: "Learn C++",
    platform: "Codecademy",
    instructor: "Codecademy Team",
    rating: 4.6,
    reviewCount: 28000,
    duration: "25 total hours",
    level: "Beginner",
    price: 439,
    originalPrice: 1759,
    discount: 75,
    currency: "INR",
    skills: ["C++", "Variables", "Loops", "Functions"],
    description:
      "Interactive C++ programming course with hands-on projects and exercises.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail: "https://www.codecademy.com/resources/learn-cpp.jpg",
    courseUrl: "https://www.codecademy.com/learn/learn-c-plus-plus",
    students: 185000,
    projects: 7,
    aiScore: 85,
  },
  {
    id: 109,
    title: "Modern C++ Concurrency",
    platform: "Udemy",
    instructor: "Kasun Liyanage",
    rating: 4.4,
    reviewCount: 5200,
    duration: "12 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["C++", "Multithreading", "Concurrency", "Thread Safety"],
    description:
      "Master C++ concurrency and multithreading with modern C++ features.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-08-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/cpp-concurrency.jpg",
    courseUrl: "https://www.udemy.com/course/modern-cpp-concurrency/",
    students: 22000,
    projects: 8,
    aiScore: 88,
  },
  {
    id: 110,
    title: "C++ Design Patterns",
    platform: "Udemy",
    instructor: "Dmitri Nesteruk",
    rating: 4.5,
    reviewCount: 8900,
    duration: "14 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: [
      "C++",
      "Design Patterns",
      "Software Architecture",
      "Best Practices",
    ],
    description:
      "Learn classic and modern design patterns in C++ with practical examples.",
    isBookmarked: false,
    isRecommended: false,
    category: "Programming",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/cpp-design-patterns.jpg",
    courseUrl: "https://www.udemy.com/course/patterns-cplusplus/",
    students: 38000,
    projects: 10,
    aiScore: 90,
  },
  {
    id: 111,
    title: "The Complete SQL Bootcamp",
    platform: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.7,
    reviewCount: 128000,
    duration: "9 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["SQL", "PostgreSQL", "Queries", "Database Design"],
    description:
      "Learn SQL quickly! Learn to read and write complex queries to a database using PostgreSQL.",
    isBookmarked: false,
    isRecommended: true,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-09-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/762616_7693_3.jpg",
    courseUrl: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
    students: 485000,
    projects: 8,
    aiScore: 93,
  },
  {
    id: 112,
    title: "SQL - MySQL for Data Analytics and Business Intelligence",
    platform: "Udemy",
    instructor: "365 Careers",
    rating: 4.6,
    reviewCount: 95000,
    duration: "11 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["SQL", "MySQL", "Data Analysis", "Business Intelligence"],
    description:
      "SQL that will get you hired - SQL for Business Analysis, Marketing, and Data Management.",
    isBookmarked: false,
    isRecommended: true,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-08-25",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1405632_7c3d.jpg",
    courseUrl:
      "https://www.udemy.com/course/sql-mysql-for-data-analytics-and-business-intelligence/",
    students: 368000,
    projects: 10,
    aiScore: 92,
  },
  {
    id: 113,
    title: "SQL for Data Science",
    platform: "Coursera",
    instructor: "University of California, Davis",
    rating: 4.6,
    reviewCount: 42000,
    duration: "16 total hours",
    level: "Beginner",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["SQL", "Data Science", "SQLite", "Data Analysis"],
    description:
      "Learn SQL fundamentals and use them to analyze data for data science applications.",
    isBookmarked: false,
    isRecommended: true,
    category: "Data Science",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://d3njjcbhbojbot.cloudfront.net/api/sql-data-science.jpg",
    courseUrl: "https://www.coursera.org/learn/sql-for-data-science",
    students: 285000,
    projects: 4,
    aiScore: 90,
  },
  {
    id: 114,
    title: "The Ultimate MySQL Bootcamp",
    platform: "Udemy",
    instructor: "Colt Steele",
    rating: 4.6,
    reviewCount: 72000,
    duration: "20 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["SQL", "MySQL", "Database Design", "Stored Procedures"],
    description:
      "Go from SQL Beginner to Expert with MySQL database! Master SQL with real projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1082092_3aa6.jpg",
    courseUrl:
      "https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/",
    students: 285000,
    projects: 12,
    aiScore: 89,
  },
  {
    id: 115,
    title: "SQL for Beginners: Learn SQL using MySQL and Database Design",
    platform: "Udemy",
    instructor: "Tim Buchalka",
    rating: 4.5,
    reviewCount: 38000,
    duration: "12 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["SQL", "MySQL", "Database Normalization", "Joins"],
    description:
      "Learn SQL and database design with MySQL through hands-on exercises and projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-07-22",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/sql-beginners-mysql.jpg",
    courseUrl: "https://www.udemy.com/course/sql-for-beginners-course/",
    students: 142000,
    projects: 6,
    aiScore: 87,
  },
  {
    id: 116,
    title: "SQL Tutorial - Full Database Course for Beginners",
    platform: "YouTube",
    instructor: "freeCodeCamp",
    rating: 4.8,
    reviewCount: 85000,
    duration: "4 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["SQL", "MySQL", "Database Basics", "CRUD Operations"],
    description:
      "Complete SQL tutorial covering database fundamentals and MySQL with practical examples.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-03-12",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/HXV3zeQKqGY/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    students: 2150000,
    projects: 3,
    aiScore: 88,
  },
  {
    id: 117,
    title: "Advanced SQL: MySQL for Ecommerce & Web Analytics",
    platform: "Udemy",
    instructor: "John Pauler",
    rating: 4.7,
    reviewCount: 18000,
    duration: "10 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["SQL", "MySQL", "Analytics", "Complex Queries"],
    description:
      "Master advanced SQL queries for ecommerce and web analytics with real-world scenarios.",
    isBookmarked: false,
    isRecommended: true,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-09-08",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/advanced-sql-mysql.jpg",
    courseUrl:
      "https://www.udemy.com/course/advanced-sql-mysql-for-analytics-business-intelligence/",
    students: 68000,
    projects: 15,
    aiScore: 91,
  },
  {
    id: 118,
    title: "Learn SQL",
    platform: "Codecademy",
    instructor: "Codecademy Team",
    rating: 4.7,
    reviewCount: 95000,
    duration: "8 total hours",
    level: "Beginner",
    price: 439,
    originalPrice: 1759,
    discount: 75,
    currency: "INR",
    skills: ["SQL", "Queries", "Aggregation", "Tables"],
    description:
      "Interactive SQL course with hands-on practice manipulating and querying data.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail: "https://www.codecademy.com/resources/learn-sql.jpg",
    courseUrl: "https://www.codecademy.com/learn/learn-sql",
    students: 785000,
    projects: 5,
    aiScore: 86,
  },
  {
    id: 119,
    title: "SQL Fundamentals",
    platform: "Pluralsight",
    instructor: "Pinal Dave",
    rating: 4.6,
    reviewCount: 22000,
    duration: "6 total hours",
    level: "Beginner",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["SQL", "T-SQL", "Queries", "Joins"],
    description:
      "Learn SQL fundamentals including SELECT statements, joins, and query optimization.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-08-20",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/sql-fundamentals.jpg",
    courseUrl: "https://www.pluralsight.com/courses/sql-server-fundamentals",
    students: 125000,
    projects: 4,
    aiScore: 85,
  },
  {
    id: 120,
    title: "Master SQL For Data Science",
    platform: "Udemy",
    instructor: "Imtiaz Ahmad",
    rating: 4.5,
    reviewCount: 12000,
    duration: "13 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["SQL", "Data Analysis", "Window Functions", "CTEs"],
    description:
      "Master SQL for data science with advanced queries, window functions, and CTEs.",
    isBookmarked: false,
    isRecommended: false,
    category: "Data Science",
    language: "English",
    lastUpdated: "2024-08-30",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/master-sql-data-science.jpg",
    courseUrl: "https://www.udemy.com/course/master-sql-for-data-science/",
    students: 48000,
    projects: 8,
    aiScore: 88,
  },
  {
    id: 121,
    title: "MongoDB - The Complete Developer's Guide",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    reviewCount: 42000,
    duration: "17 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["MongoDB", "NoSQL", "Aggregation", "Indexes"],
    description:
      "Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Framework - All about MongoDB!",
    isBookmarked: false,
    isRecommended: true,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1906852_93c6.jpg",
    courseUrl:
      "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
    students: 158000,
    projects: 10,
    aiScore: 92,
  },
  {
    id: 122,
    title: "MongoDB University - MongoDB for Developers",
    platform: "MongoDB University",
    instructor: "MongoDB Team",
    rating: 4.7,
    reviewCount: 38000,
    duration: "21 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["MongoDB", "CRUD", "Data Modeling", "Aggregation Framework"],
    description:
      "Official MongoDB course covering fundamentals, CRUD operations, and aggregation.",
    isBookmarked: false,
    isRecommended: true,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-09-29",
    certificateOffered: true,
    thumbnail: "https://learn.mongodb.com/assets/mongodb-developers.jpg",
    courseUrl: "https://learn.mongodb.com/courses/mongodb-for-developers",
    students: 285000,
    projects: 6,
    aiScore: 91,
  },
  {
    id: 123,
    title: "MongoDB Essentials - Complete MongoDB Guide",
    platform: "Udemy",
    instructor: "John Thompson",
    rating: 4.5,
    reviewCount: 18000,
    duration: "12 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["MongoDB", "NoSQL Databases", "Schema Design", "Queries"],
    description:
      "Learn MongoDB from scratch including queries, aggregation, and schema design.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-08-20",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/mongodb-essentials.jpg",
    courseUrl: "https://www.udemy.com/course/mongodb-essentials/",
    students: 68000,
    projects: 5,
    aiScore: 87,
  },
  {
    id: 124,
    title: "MongoDB for SQL Experts",
    platform: "MongoDB University",
    instructor: "MongoDB Team",
    rating: 4.6,
    reviewCount: 8500,
    duration: "8 total hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["MongoDB", "NoSQL", "Migration", "Query Translation"],
    description:
      "Transition from SQL to MongoDB with comparisons and migration strategies.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-03-21",
    certificateOffered: true,
    thumbnail: "https://learn.mongodb.com/assets/mongodb-sql-experts.jpg",
    courseUrl: "https://learn.mongodb.com/courses/mongodb-for-sql-experts",
    students: 42000,
    projects: 3,
    aiScore: 88,
  },
  {
    id: 125,
    title: "The Complete MongoDB Course 2024",
    platform: "Udemy",
    instructor: "Bogdan Stashchuk",
    rating: 4.7,
    reviewCount: 12000,
    duration: "13 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["MongoDB", "Mongoose", "Node.js", "Express"],
    description:
      "Master MongoDB with Node.js, Express, and Mongoose for building modern applications.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/mongodb-complete-2024.jpg",
    courseUrl: "https://www.udemy.com/course/mongodb-complete/",
    students: 45000,
    projects: 8,
    aiScore: 90,
  },
  {
    id: 126,
    title: "MongoDB Crash Course",
    platform: "YouTube",
    instructor: "Traversy Media",
    rating: 4.7,
    reviewCount: 22000,
    duration: "1.5 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["MongoDB", "CRUD", "Compass", "Shell"],
    description:
      "Quick MongoDB crash course covering basics, CRUD operations, and MongoDB Compass.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-02-18",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/ofme2o29ngU/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=ofme2o29ngU",
    students: 685000,
    projects: 1,
    aiScore: 84,
  },
  {
    id: 127,
    title: "MongoDB Aggregation Framework",
    platform: "Udemy",
    instructor: "Bogdan Stashchuk",
    rating: 4.6,
    reviewCount: 5200,
    duration: "8 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["MongoDB", "Aggregation Pipeline", "Data Processing", "Analytics"],
    description:
      "Master MongoDB Aggregation Framework with real-world examples and projects.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/mongodb-aggregation.jpg",
    courseUrl: "https://www.udemy.com/course/mongodb-aggregation/",
    students: 22000,
    projects: 12,
    aiScore: 89,
  },
  {
    id: 128,
    title: "MongoDB Administration",
    platform: "LinkedIn Learning",
    instructor: "Kirsten Hunter",
    rating: 4.5,
    reviewCount: 6800,
    duration: "3 total hours",
    level: "Intermediate",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["MongoDB", "Administration", "Backup", "Security"],
    description:
      "Learn MongoDB administration including deployment, backup, and security.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-07-25",
    certificateOffered: true,
    thumbnail: "https://media.licdn.com/dms/image/mongodb-administration.jpg",
    courseUrl: "https://www.linkedin.com/learning/mongodb-essential-training",
    students: 32000,
    projects: 2,
    aiScore: 85,
  },
  {
    id: 129,
    title: "MongoDB with Node.js and Express",
    platform: "Udemy",
    instructor: "Rob Percival",
    rating: 4.5,
    reviewCount: 15000,
    duration: "10 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["MongoDB", "Node.js", "Express", "Mongoose"],
    description:
      "Build full-stack applications with MongoDB, Node.js, Express, and Mongoose.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/mongodb-nodejs-express.jpg",
    courseUrl: "https://www.udemy.com/course/mongodb-nodejs-express/",
    students: 58000,
    projects: 4,
    aiScore: 88,
  },
  {
    id: 130,
    title: "MongoDB Performance Tuning",
    platform: "Udemy",
    instructor: "Shyam Arjarapu",
    rating: 4.4,
    reviewCount: 3800,
    duration: "6 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["MongoDB", "Performance", "Indexing", "Optimization"],
    description:
      "Master MongoDB performance optimization, indexing strategies, and query tuning.",
    isBookmarked: false,
    isRecommended: false,
    category: "Databases",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/mongodb-performance.jpg",
    courseUrl: "https://www.udemy.com/course/mongodb-performance/",
    students: 18000,
    projects: 5,
    aiScore: 86,
  },
  {
    id: 131,
    title: "GraphQL by Example",
    platform: "Udemy",
    instructor: "Mirko Nasato",
    rating: 4.5,
    reviewCount: 8200,
    duration: "7 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["GraphQL", "Apollo", "Node.js", "React"],
    description:
      "Learn GraphQL with practical examples building real-world applications.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/graphql-by-example.jpg",
    courseUrl: "https://www.udemy.com/course/graphql-by-example/",
    students: 32000,
    projects: 5,
    aiScore: 87,
  },
  {
    id: 132,
    title: "The Modern GraphQL Bootcamp",
    platform: "Udemy",
    instructor: "Andrew Mead",
    rating: 4.7,
    reviewCount: 18000,
    duration: "23 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["GraphQL", "Node.js", "Apollo Server", "Prisma"],
    description:
      "Learn GraphQL by building real-world applications with Node.js, Apollo, and Prisma.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2498222_74a5.jpg",
    courseUrl: "https://www.udemy.com/course/graphql-bootcamp/",
    students: 68000,
    projects: 8,
    aiScore: 91,
  },
  {
    id: 133,
    title: "GraphQL Crash Course",
    platform: "YouTube",
    instructor: "Traversy Media",
    rating: 4.7,
    reviewCount: 15000,
    duration: "1.7 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["GraphQL", "Apollo Server", "Express", "React"],
    description:
      "Quick introduction to GraphQL covering queries, mutations, and Apollo Server.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-01-15",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/BcLNfwF04Kw/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=BcLNfwF04Kw",
    students: 425000,
    projects: 1,
    aiScore: 84,
  },
  {
    id: 134,
    title: "Complete Guide to GraphQL",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.6,
    reviewCount: 22000,
    duration: "13 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["GraphQL", "React", "Apollo Client", "Node.js"],
    description:
      "Master GraphQL from fundamentals to building production applications with React.",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1109926_b4f1.jpg",
    courseUrl: "https://www.udemy.com/course/graphql-with-react-course/",
    students: 85000,
    projects: 6,
    aiScore: 90,
  },
  {
    id: 135,
    title: "Full-Stack GraphQL Applications",
    platform: "Frontend Masters",
    instructor: "Scott Moss",
    rating: 4.7,
    reviewCount: 5200,
    duration: "7 total hours",
    level: "Advanced",
    price: 1199,
    originalPrice: 4799,
    discount: 75,
    currency: "INR",
    skills: ["GraphQL", "Apollo", "React", "Full Stack"],
    description:
      "Build full-stack GraphQL applications with Apollo Client and Server.",
    isBookmarked: false,
    isRecommended: false,
    category: "Full Stack Development",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail: "https://frontendmasters.com/assets/fullstack-graphql.jpg",
    courseUrl: "https://frontendmasters.com/courses/fullstack-graphql/",
    students: 22000,
    projects: 4,
    aiScore: 89,
  },
  {
    id: 136,
    title: "GraphQL with Node.js and MongoDB",
    platform: "Udemy",
    instructor: "Reed Barger",
    rating: 4.5,
    reviewCount: 6800,
    duration: "10 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["GraphQL", "Node.js", "MongoDB", "Express"],
    description:
      "Build GraphQL APIs with Node.js, Express, and MongoDB from scratch.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-07-30",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/graphql-nodejs-mongodb.jpg",
    courseUrl: "https://www.udemy.com/course/graphql-nodejs-mongodb/",
    students: 28000,
    projects: 3,
    aiScore: 86,
  },
  {
    id: 137,
    title: "Introduction to GraphQL",
    platform: "LinkedIn Learning",
    instructor: "Emmanuel Henri",
    rating: 4.6,
    reviewCount: 8900,
    duration: "2 total hours",
    level: "Beginner",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["GraphQL", "Queries", "Mutations", "Schema"],
    description:
      "Learn GraphQL fundamentals including queries, mutations, and schema design.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-10",
    certificateOffered: true,
    thumbnail: "https://media.licdn.com/dms/image/intro-graphql.jpg",
    courseUrl: "https://www.linkedin.com/learning/introduction-to-graphql",
    students: 45000,
    projects: 2,
    aiScore: 83,
  },
  {
    id: 138,
    title: "GraphQL API Development",
    platform: "Pluralsight",
    instructor: "Adhithi Ravichandran",
    rating: 4.5,
    reviewCount: 4200,
    duration: "4 total hours",
    level: "Intermediate",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: ["GraphQL", "API Design", "Apollo", "Resolvers"],
    description:
      "Learn to design and build GraphQL APIs with best practices and patterns.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-25",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/graphql-api-development.jpg",
    courseUrl: "https://www.pluralsight.com/courses/graphql-big-picture",
    students: 28000,
    projects: 3,
    aiScore: 85,
  },
  {
    id: 139,
    title: "Advanced GraphQL with Node.js",
    platform: "Udemy",
    instructor: "Laith Harb",
    rating: 4.4,
    reviewCount: 3500,
    duration: "8 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["GraphQL", "Advanced Patterns", "Subscriptions", "Caching"],
    description:
      "Master advanced GraphQL concepts including subscriptions, caching, and optimization.",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/advanced-graphql.jpg",
    courseUrl: "https://www.udemy.com/course/advanced-graphql-nodejs/",
    students: 15000,
    projects: 5,
    aiScore: 88,
  },
  {
    id: 140,
    title: "GraphQL with React and Apollo",
    platform: "Udemy",
    instructor: "Ben Awad",
    rating: 4.6,
    reviewCount: 9200,
    duration: "11 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["GraphQL", "React", "Apollo Client", "TypeScript"],
    description:
      "Build modern React applications with GraphQL and Apollo Client integration.",
    isBookmarked: false,
    isRecommended: false,
    category: "Full Stack Development",
    language: "English",
    lastUpdated: "2024-08-18",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/graphql-react-apollo.jpg",
    courseUrl: "https://www.udemy.com/course/graphql-react-apollo/",
    students: 38000,
    projects: 7,
    aiScore: 89,
  },
  {
    id: 141,
    title: "Tailwind CSS From Scratch",
    platform: "Udemy",
    instructor: "Brad Traversy",
    rating: 4.7,
    reviewCount: 28000,
    duration: "12 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: [
      "Tailwind CSS",
      "Utility-First CSS",
      "Responsive Design",
      "Components",
    ],
    description:
      "Learn Tailwind CSS by building real projects from scratch with modern workflows.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-18",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/tailwind-from-scratch.jpg",
    courseUrl: "https://www.udemy.com/course/tailwind-from-scratch/",
    students: 92000,
    projects: 5,
    aiScore: 91,
  },
  {
    id: 142,
    title: "Tailwind CSS v4 Full Course 2025",
    platform: "YouTube",
    instructor: "Dave Gray",
    rating: 4.8,
    reviewCount: 12000,
    duration: "5 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Tailwind CSS", "CSS Framework", "Utility Classes", "Dark Mode"],
    description:
      "Complete Tailwind CSS v4 course covering all features and best practices.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2025-02-20",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/6biMWgD6_JY/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=6biMWgD6_JY",
    students: 285000,
    projects: 3,
    aiScore: 90,
  },
  {
    id: 143,
    title: "Tailwind CSS Tutorial",
    platform: "Scrimba",
    instructor: "Victor Gonzalez",
    rating: 4.7,
    reviewCount: 8500,
    duration: "8 total hours",
    level: "Beginner",
    price: 399,
    originalPrice: 1599,
    discount: 75,
    currency: "INR",
    skills: ["Tailwind CSS", "HTML", "Responsive Design", "Flexbox"],
    description:
      "Interactive Tailwind CSS course with hands-on projects and real-world examples.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: true,
    thumbnail: "https://scrimba.com/assets/tailwind-tutorial.jpg",
    courseUrl: "https://scrimba.com/learn/tailwind",
    students: 48000,
    projects: 4,
    aiScore: 88,
  },
  {
    id: 144,
    title: "Tailwind CSS: A Practical Approach",
    platform: "Udemy",
    instructor: "John Smilga",
    rating: 4.6,
    reviewCount: 15000,
    duration: "14 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: [
      "Tailwind CSS",
      "Component Design",
      "Responsive Layouts",
      "CSS Grid",
    ],
    description:
      "Master Tailwind CSS by building 10+ projects with practical, real-world examples.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/tailwind-practical.jpg",
    courseUrl: "https://www.udemy.com/course/tailwind-css-practical/",
    students: 58000,
    projects: 10,
    aiScore: 89,
  },
  {
    id: 145,
    title: "Complete Tailwind CSS Course",
    platform: "Codecademy",
    instructor: "Codecademy Team",
    rating: 4.5,
    reviewCount: 6200,
    duration: "6 total hours",
    level: "Beginner",
    price: 439,
    originalPrice: 1759,
    discount: 75,
    currency: "INR",
    skills: ["Tailwind CSS", "Utility Classes", "Layout", "Typography"],
    description:
      "Learn Tailwind CSS fundamentals and build responsive websites with utility classes.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail: "https://www.codecademy.com/resources/tailwind-css.jpg",
    courseUrl: "https://www.codecademy.com/learn/learn-tailwind-css",
    students: 38000,
    projects: 3,
    aiScore: 85,
  },
  {
    id: 146,
    title: "Tailwind CSS Masterclass",
    platform: "Udemy",
    instructor: "Simon Vrachliotis",
    rating: 4.7,
    reviewCount: 9800,
    duration: "10 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: [
      "Tailwind CSS",
      "Custom Plugins",
      "Configuration",
      "Advanced Patterns",
    ],
    description:
      "Master Tailwind CSS including custom configurations, plugins, and advanced techniques.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/tailwind-masterclass.jpg",
    courseUrl: "https://www.udemy.com/course/tailwind-css-masterclass/",
    students: 42000,
    projects: 6,
    aiScore: 90,
  },
  {
    id: 147,
    title: "Tailwind CSS - Zero to Hero",
    platform: "YouTube",
    instructor: "Web Dev Simplified",
    rating: 4.6,
    reviewCount: 8200,
    duration: "2.5 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Tailwind CSS", "Setup", "Utility Classes", "Best Practices"],
    description:
      "Complete Tailwind CSS tutorial from installation to building production websites.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-04-10",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/tailwind-zero-hero/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=tailwind-zero-hero",
    students: 185000,
    projects: 2,
    aiScore: 84,
  },
  {
    id: 148,
    title: "Tailwind CSS for Designers",
    platform: "LinkedIn Learning",
    instructor: "James Williamson",
    rating: 4.5,
    reviewCount: 4500,
    duration: "3 total hours",
    level: "Beginner",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["Tailwind CSS", "Design Systems", "UI Components", "Prototyping"],
    description:
      "Learn Tailwind CSS from a designer's perspective with focus on UI development.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-07-25",
    certificateOffered: true,
    thumbnail: "https://media.licdn.com/dms/image/tailwind-designers.jpg",
    courseUrl:
      "https://www.linkedin.com/learning/tailwind-css-essential-training",
    students: 28000,
    projects: 4,
    aiScore: 86,
  },
  {
    id: 149,
    title: "Build Responsive Sites with Tailwind CSS",
    platform: "Udemy",
    instructor: "Gary Simon",
    rating: 4.6,
    reviewCount: 7200,
    duration: "9 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: [
      "Tailwind CSS",
      "Responsive Design",
      "Mobile-First",
      "Grid Layouts",
    ],
    description:
      "Master responsive web design with Tailwind CSS and mobile-first approach.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-20",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/tailwind-responsive.jpg",
    courseUrl: "https://www.udemy.com/course/tailwind-responsive-sites/",
    students: 32000,
    projects: 5,
    aiScore: 87,
  },
  {
    id: 150,
    title: "Tailwind CSS Components and Patterns",
    platform: "Pluralsight",
    instructor: "Thomas LeBlanc",
    rating: 4.5,
    reviewCount: 3800,
    duration: "4 total hours",
    level: "Intermediate",
    price: 950,
    originalPrice: 3950,
    discount: 76,
    currency: "INR",
    skills: [
      "Tailwind CSS",
      "Component Libraries",
      "Design Patterns",
      "Reusability",
    ],
    description:
      "Learn to create reusable components and patterns with Tailwind CSS.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-08",
    certificateOffered: false,
    thumbnail:
      "https://pluralsight.imgix.net/course-images/tailwind-components.jpg",
    courseUrl: "https://www.pluralsight.com/courses/tailwind-css-components",
    students: 22000,
    projects: 8,
    aiScore: 88,
  },
  {
    id: 151,
    title: "Next.js 14 & React - The Complete Guide",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.7,
    reviewCount: 42000,
    duration: "36 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Next.js", "React", "Server Components", "App Router"],
    description:
      "Master Next.js 14 with React - SSR, SSG, App Router, Server Actions, and more!",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-22",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/nextjs-14-complete.jpg",
    courseUrl: "https://www.udemy.com/course/nextjs-react-the-complete-guide/",
    students: 158000,
    projects: 10,
    aiScore: 94,
  },
  {
    id: 152,
    title: "Complete Next.js Developer",
    platform: "Zero To Mastery",
    instructor: "Andrei Neagoie",
    rating: 4.8,
    reviewCount: 18000,
    duration: "32 total hours",
    level: "Intermediate",
    price: 899,
    originalPrice: 3599,
    discount: 75,
    currency: "INR",
    skills: ["Next.js", "React", "TypeScript", "Full Stack"],
    description:
      "Become a Next.js expert by building production-ready applications with TypeScript.",
    isBookmarked: false,
    isRecommended: true,
    category: "Full Stack Development",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail: "https://zerotomastery.io/assets/nextjs-developer.jpg",
    courseUrl: "https://zerotomastery.io/courses/learn-next-js/",
    students: 68000,
    projects: 12,
    aiScore: 93,
  },
  {
    id: 153,
    title: "Next.js 14 Styling with Tailwind CSS",
    platform: "YouTube",
    instructor: "Code With Antonio",
    rating: 4.7,
    reviewCount: 9500,
    duration: "3.5 total hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Next.js", "Tailwind CSS", "Styling", "Components"],
    description:
      "Learn to style Next.js 14 applications with Tailwind CSS and modern techniques.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-03-03",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/E3FJdeIqWsw/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=E3FJdeIqWsw",
    students: 245000,
    projects: 1,
    aiScore: 88,
  },
  {
    id: 154,
    title: "Learn Next.js - Official Tutorial",
    platform: "Next.js",
    instructor: "Vercel Team",
    rating: 4.8,
    reviewCount: 52000,
    duration: "16 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Next.js", "React", "Routing", "Data Fetching"],
    description:
      "Official Next.js tutorial covering fundamentals and building your first application.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-12-31",
    certificateOffered: false,
    thumbnail: "https://nextjs.org/static/learn-nextjs.jpg",
    courseUrl: "https://nextjs.org/learn",
    students: 685000,
    projects: 1,
    aiScore: 92,
  },
  {
    id: 155,
    title: "Professional React & Next.js Course",
    platform: "ByteGrad",
    instructor: "ByteGrad Team",
    rating: 4.8,
    reviewCount: 6800,
    duration: "28 total hours",
    level: "Advanced",
    price: 1199,
    originalPrice: 4799,
    discount: 75,
    currency: "INR",
    skills: ["Next.js", "React", "TypeScript", "Server Actions"],
    description:
      "Build production-ready Next.js applications with advanced patterns and best practices.",
    isBookmarked: false,
    isRecommended: true,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-12-31",
    certificateOffered: true,
    thumbnail: "https://bytegrad.com/assets/professional-react-nextjs.jpg",
    courseUrl: "https://bytegrad.com/courses/professional-react-nextjs",
    students: 28000,
    projects: 15,
    aiScore: 95,
  },
  {
    id: 156,
    title: "Ultimate Next.js Course 2024 Edition",
    platform: "Developed By Ed",
    instructor: "Dev Ed",
    rating: 4.7,
    reviewCount: 8200,
    duration: "24 total hours",
    level: "All Levels",
    price: 999,
    originalPrice: 3999,
    discount: 75,
    currency: "INR",
    skills: ["Next.js", "React", "Framer Motion", "Authentication"],
    description:
      "Build full-stack Next.js applications with animations and authentication.",
    isBookmarked: false,
    isRecommended: false,
    category: "Full Stack Development",
    language: "English",
    lastUpdated: "2023-12-31",
    certificateOffered: true,
    thumbnail: "https://developedbyed.com/assets/nextjs-2024.jpg",
    courseUrl: "https://developedbyed.com/p/the-full-stack-react-course",
    students: 35000,
    projects: 8,
    aiScore: 90,
  },
  {
    id: 157,
    title: "Next.js for Beginners - Full Course",
    platform: "YouTube",
    instructor: "freeCodeCamp",
    rating: 4.7,
    reviewCount: 22000,
    duration: "4 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Next.js", "React", "Routing", "API Routes"],
    description:
      "Complete Next.js tutorial for beginners covering all essential concepts.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-05-18",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/nextjs-beginners/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=nextjs-beginners",
    students: 485000,
    projects: 2,
    aiScore: 86,
  },
  {
    id: 158,
    title: "Next.js E-Commerce Development",
    platform: "Udemy",
    instructor: "Brad Traversy",
    rating: 4.6,
    reviewCount: 12000,
    duration: "18 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Next.js", "E-Commerce", "Stripe", "MongoDB"],
    description:
      "Build a full-featured e-commerce store with Next.js, Stripe, and MongoDB.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/nextjs-ecommerce.jpg",
    courseUrl: "https://www.udemy.com/course/nextjs-ecommerce/",
    students: 48000,
    projects: 1,
    aiScore: 89,
  },
  {
    id: 159,
    title: "Mastering Next.js",
    platform: "Frontend Masters",
    instructor: "Scott Moss",
    rating: 4.7,
    reviewCount: 7200,
    duration: "6 total hours",
    level: "Advanced",
    price: 1199,
    originalPrice: 4799,
    discount: 75,
    currency: "INR",
    skills: ["Next.js", "Performance", "SEO", "Deployment"],
    description:
      "Advanced Next.js course covering performance optimization, SEO, and deployment.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail: "https://frontendmasters.com/assets/mastering-nextjs.jpg",
    courseUrl: "https://frontendmasters.com/courses/next-js/",
    students: 32000,
    projects: 5,
    aiScore: 91,
  },
  {
    id: 160,
    title: "Next.js App Router Course",
    platform: "Udemy",
    instructor: "Codevolution",
    rating: 4.6,
    reviewCount: 9800,
    duration: "14 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Next.js", "App Router", "Server Components", "Layouts"],
    description:
      "Master the Next.js App Router with server components and advanced patterns.",
    isBookmarked: false,
    isRecommended: false,
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/nextjs-app-router.jpg",
    courseUrl: "https://www.udemy.com/course/nextjs-app-router/",
    students: 42000,
    projects: 6,
    aiScore: 88,
  },
  {
    id: 161,
    title: "The Complete React Native + Hooks Course",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.6,
    reviewCount: 52000,
    duration: "38 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["React Native", "Hooks", "Navigation", "Redux"],
    description:
      "Learn React Native with Hooks, Context, and React Navigation to build mobile apps.",
    isBookmarked: false,
    isRecommended: true,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1896010_fb3e_4.jpg",
    courseUrl:
      "https://www.udemy.com/course/the-complete-react-native-and-redux-course/",
    students: 195000,
    projects: 12,
    aiScore: 93,
  },
  {
    id: 162,
    title: "React Native - The Practical Guide",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.7,
    reviewCount: 38000,
    duration: "30 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["React Native", "Expo", "Navigation", "Native Features"],
    description:
      "Master React Native by building real iOS and Android apps with Expo and native features.",
    isBookmarked: false,
    isRecommended: true,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1565838_e54e_12.jpg",
    courseUrl: "https://www.udemy.com/course/react-native-the-practical-guide/",
    students: 145000,
    projects: 10,
    aiScore: 94,
  },
  {
    id: 163,
    title: "React Native for Beginners",
    platform: "YouTube",
    instructor: "Programming with Mosh",
    rating: 4.8,
    reviewCount: 32000,
    duration: "6 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["React Native", "Components", "Styling", "Lists"],
    description:
      "Complete React Native tutorial for beginners covering fundamentals and building apps.",
    isBookmarked: false,
    isRecommended: true,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-01-28",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/0-S5a0eXPoc/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
    students: 785000,
    projects: 1,
    aiScore: 90,
  },
  {
    id: 164,
    title: "React Native: Advanced Concepts",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.7,
    reviewCount: 18000,
    duration: "17 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["React Native", "Animations", "Gestures", "Native Modules"],
    description:
      "Master advanced React Native including animations, gestures, and native module integration.",
    isBookmarked: false,
    isRecommended: false,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-08-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1341406_8dd6.jpg",
    courseUrl: "https://www.udemy.com/course/react-native-advanced/",
    students: 68000,
    projects: 8,
    aiScore: 91,
  },
  {
    id: 165,
    title: "Complete React Native Developer",
    platform: "Zero To Mastery",
    instructor: "Andrei Neagoie & Mo Binni",
    rating: 4.7,
    reviewCount: 15000,
    duration: "35 total hours",
    level: "All Levels",
    price: 899,
    originalPrice: 3599,
    discount: 75,
    currency: "INR",
    skills: ["React Native", "TypeScript", "Firebase", "Expo"],
    description:
      "Become a React Native developer by building production apps with TypeScript and Firebase.",
    isBookmarked: false,
    isRecommended: true,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://zerotomastery.io/assets/react-native-developer.jpg",
    courseUrl: "https://zerotomastery.io/courses/learn-react-native/",
    students: 58000,
    projects: 15,
    aiScore: 92,
  },
  {
    id: 166,
    title: "React Native Crash Course",
    platform: "YouTube",
    instructor: "Traversy Media",
    rating: 4.7,
    reviewCount: 18000,
    duration: "2 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["React Native", "Expo", "Components", "State"],
    description:
      "Quick React Native crash course covering basics and building your first mobile app.",
    isBookmarked: false,
    isRecommended: false,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-03-15",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/Hf4MJH0jDb4/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=Hf4MJH0jDb4",
    students: 425000,
    projects: 1,
    aiScore: 85,
  },
  {
    id: 167,
    title: "React Native with Firebase",
    platform: "Udemy",
    instructor: "Reed Barger",
    rating: 4.5,
    reviewCount: 12000,
    duration: "22 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["React Native", "Firebase", "Authentication", "Cloud Firestore"],
    description:
      "Build full-stack React Native apps with Firebase authentication and database.",
    isBookmarked: false,
    isRecommended: false,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-08-25",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/react-native-firebase.jpg",
    courseUrl: "https://www.udemy.com/course/react-native-firebase/",
    students: 48000,
    projects: 6,
    aiScore: 88,
  },
  {
    id: 168,
    title: "React Native E-Commerce App",
    platform: "Udemy",
    instructor: "Simon Grimm",
    rating: 4.6,
    reviewCount: 8500,
    duration: "16 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["React Native", "E-Commerce", "Stripe", "Redux"],
    description:
      "Build a complete e-commerce mobile app with React Native and Stripe payments.",
    isBookmarked: false,
    isRecommended: false,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/react-native-ecommerce.jpg",
    courseUrl: "https://www.udemy.com/course/react-native-ecommerce-app/",
    students: 32000,
    projects: 1,
    aiScore: 89,
  },
  {
    id: 169,
    title: "React Native Navigation",
    platform: "Udemy",
    instructor: "Catalin Miron",
    rating: 4.7,
    reviewCount: 6200,
    duration: "10 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["React Native", "Navigation", "React Navigation", "Deep Linking"],
    description:
      "Master React Native navigation patterns with React Navigation library.",
    isBookmarked: false,
    isRecommended: false,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-08-12",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/react-native-navigation.jpg",
    courseUrl: "https://www.udemy.com/course/react-native-navigation/",
    students: 25000,
    projects: 5,
    aiScore: 87,
  },
  {
    id: 170,
    title: "Building Mobile Apps with React Native",
    platform: "LinkedIn Learning",
    instructor: "Emmanuel Henri",
    rating: 4.5,
    reviewCount: 9800,
    duration: "5 total hours",
    level: "Beginner",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["React Native", "Mobile Development", "iOS", "Android"],
    description:
      "Learn React Native fundamentals and build cross-platform mobile applications.",
    isBookmarked: false,
    isRecommended: false,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-07-30",
    certificateOffered: true,
    thumbnail: "https://media.licdn.com/dms/image/react-native-mobile-apps.jpg",
    courseUrl:
      "https://www.linkedin.com/learning/building-mobile-apps-with-react-native",
    students: 42000,
    projects: 3,
    aiScore: 86,
  },
  {
    id: 171,
    title: "Docker Mastery: with Kubernetes + Swarm",
    platform: "Udemy",
    instructor: "Bret Fisher",
    rating: 4.7,
    reviewCount: 85000,
    duration: "19.5 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Docker", "Kubernetes", "Docker Compose", "Swarm"],
    description:
      "Build, test, deploy containers with the best mega-course on Docker, Kubernetes, Compose, Swarm and Registry.",
    isBookmarked: false,
    isRecommended: true,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1566610_f7f8_5.jpg",
    courseUrl: "https://www.udemy.com/course/docker-mastery/",
    students: 325000,
    projects: 12,
    aiScore: 95,
  },
  {
    id: 172,
    title: "Docker and Kubernetes: The Complete Guide",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.7,
    reviewCount: 72000,
    duration: "22 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Docker", "Kubernetes", "CI/CD", "Microservices"],
    description:
      "Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows.",
    isBookmarked: false,
    isRecommended: true,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1793828_7999_3.jpg",
    courseUrl:
      "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
    students: 285000,
    projects: 10,
    aiScore: 94,
  },
  {
    id: 173,
    title: "Docker for Beginners",
    platform: "YouTube",
    instructor: "TechWorld with Nana",
    rating: 4.8,
    reviewCount: 45000,
    duration: "3 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Docker", "Containers", "Images", "Docker Compose"],
    description:
      "Complete Docker tutorial for beginners covering containers, images, and Docker Compose.",
    isBookmarked: false,
    isRecommended: true,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-02-10",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/3c-iBn73dDE/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=3c-iBn73dDE",
    students: 1250000,
    projects: 2,
    aiScore: 91,
  },
  {
    id: 174,
    title: "Docker and Kubernetes Online Training",
    platform: "NareshIT",
    instructor: "NareshIT Team",
    rating: 4.6,
    reviewCount: 8500,
    duration: "40 total hours",
    level: "Intermediate",
    price: 999,
    originalPrice: 3999,
    discount: 75,
    currency: "INR",
    skills: ["Docker", "Kubernetes", "Helm", "CI/CD"],
    description:
      "Comprehensive Docker and Kubernetes training for production deployments.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-08-20",
    certificateOffered: true,
    thumbnail: "https://nareshit.com/docker-kubernetes-training.jpg",
    courseUrl: "https://nareshit.com/courses/docker-kubernetes-online-training",
    students: 38000,
    projects: 8,
    aiScore: 88,
  },
  {
    id: 175,
    title: "Docker Deep Dive",
    platform: "A Cloud Guru",
    instructor: "Nigel Poulton",
    rating: 4.7,
    reviewCount: 22000,
    duration: "12 total hours",
    level: "Intermediate",
    price: 799,
    originalPrice: 3199,
    discount: 75,
    currency: "INR",
    skills: ["Docker", "Networking", "Volumes", "Security"],
    description:
      "Deep dive into Docker covering networking, storage, security, and best practices.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://acloudguru.com/assets/docker-deep-dive.jpg",
    courseUrl: "https://acloudguru.com/course/docker-deep-dive",
    students: 95000,
    projects: 6,
    aiScore: 90,
  },
  {
    id: 176,
    title: "Docker for Developers",
    platform: "Udemy",
    instructor: "Academind by Maximilian",
    rating: 4.6,
    reviewCount: 28000,
    duration: "13 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Docker", "Development", "Multi-Container Apps", "Docker Compose"],
    description:
      "Learn Docker for development workflows and multi-container application deployment.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/docker-developers.jpg",
    courseUrl: "https://www.udemy.com/course/docker-kubernetes/",
    students: 105000,
    projects: 7,
    aiScore: 89,
  },
  {
    id: 177,
    title: "Docker Essentials",
    platform: "LinkedIn Learning",
    instructor: "Arthur Ulfeldt",
    rating: 4.5,
    reviewCount: 15000,
    duration: "3 total hours",
    level: "Beginner",
    price: 399,
    originalPrice: 1999,
    discount: 80,
    currency: "INR",
    skills: ["Docker", "Containers", "Images", "Registries"],
    description:
      "Learn Docker essentials including containers, images, and container orchestration basics.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-07-15",
    certificateOffered: true,
    thumbnail: "https://media.licdn.com/dms/image/docker-essentials.jpg",
    courseUrl: "https://www.linkedin.com/learning/docker-essential-training",
    students: 68000,
    projects: 3,
    aiScore: 85,
  },
  {
    id: 178,
    title: "Docker Crash Course for Busy DevOps",
    platform: "Udemy",
    instructor: "Tao W",
    rating: 4.5,
    reviewCount: 12000,
    duration: "6 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Docker", "Quick Start", "Best Practices", "Troubleshooting"],
    description:
      "Fast-paced Docker course for DevOps engineers covering practical scenarios.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-08-12",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/docker-crash-course.jpg",
    courseUrl: "https://www.udemy.com/course/docker-crash-course/",
    students: 48000,
    projects: 5,
    aiScore: 86,
  },
  {
    id: 179,
    title: "Docker Tutorial for Beginners - Full Course",
    platform: "YouTube",
    instructor: "freeCodeCamp",
    rating: 4.8,
    reviewCount: 38000,
    duration: "3.5 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Docker", "Containers", "Dockerfiles", "Docker Hub"],
    description:
      "Complete Docker tutorial covering fundamentals and practical examples for beginners.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-04-20",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/fqMOX6JJhGo/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
    students: 885000,
    projects: 4,
    aiScore: 87,
  },
  {
    id: 180,
    title: "Docker and Container Security",
    platform: "Udemy",
    instructor: "Mohamed Ahmed",
    rating: 4.4,
    reviewCount: 5200,
    duration: "8 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Docker", "Security", "Vulnerability Scanning", "Best Practices"],
    description:
      "Master Docker security including vulnerability scanning, image hardening, and runtime security.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/docker-security.jpg",
    courseUrl: "https://www.udemy.com/course/docker-security/",
    students: 22000,
    projects: 6,
    aiScore: 88,
  },
  {
    id: 181,
    title: "Kubernetes for the Absolute Beginners",
    platform: "Udemy",
    instructor: "Mumshad Mannambeth",
    rating: 4.6,
    reviewCount: 95000,
    duration: "6 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Kubernetes", "Pods", "Deployments", "Services"],
    description:
      "Learn Kubernetes fundamentals with hands-on labs and real-world examples.",
    isBookmarked: false,
    isRecommended: true,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1562490_4735.jpg",
    courseUrl: "https://www.udemy.com/course/learn-kubernetes/",
    students: 385000,
    projects: 8,
    aiScore: 92,
  },
  {
    id: 182,
    title: "Certified Kubernetes Administrator (CKA)",
    platform: "Udemy",
    instructor: "Mumshad Mannambeth",
    rating: 4.7,
    reviewCount: 78000,
    duration: "15 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: [
      "Kubernetes",
      "Administration",
      "Troubleshooting",
      "Certification",
    ],
    description:
      "Complete CKA certification course with hands-on practice and exam preparation.",
    isBookmarked: false,
    isRecommended: true,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2134150_1f0f_8.jpg",
    courseUrl:
      "https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/",
    students: 295000,
    projects: 12,
    aiScore: 96,
  },
  {
    id: 183,
    title: "Kubernetes Tutorial for Beginners",
    platform: "YouTube",
    instructor: "TechWorld with Nana",
    rating: 4.9,
    reviewCount: 68000,
    duration: "4 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Kubernetes", "Architecture", "Components", "Deployment"],
    description:
      "Complete Kubernetes tutorial covering architecture, components, and practical deployment.",
    isBookmarked: false,
    isRecommended: true,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-01-15",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/X48VuDVv0do/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=X48VuDVv0do",
    students: 1850000,
    projects: 3,
    aiScore: 93,
  },
  {
    id: 184,
    title: "Kubernetes - The Complete DevOps Course",
    platform: "KodeKloud",
    instructor: "Mumshad Mannambeth",
    rating: 4.8,
    reviewCount: 32000,
    duration: "28 total hours",
    level: "All Levels",
    price: 899,
    originalPrice: 3599,
    discount: 75,
    currency: "INR",
    skills: ["Kubernetes", "Helm", "Service Mesh", "Security"],
    description:
      "Comprehensive Kubernetes course with Helm, service mesh, and advanced topics.",
    isBookmarked: false,
    isRecommended: true,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail: "https://kodekloud.com/assets/kubernetes-complete-course.jpg",
    courseUrl: "https://kodekloud.com/courses/kubernetes-for-beginners/",
    students: 125000,
    projects: 15,
    aiScore: 95,
  },
  {
    id: 185,
    title: "Kubernetes Microservices",
    platform: "Udemy",
    instructor: "Richard Chesterwood",
    rating: 4.6,
    reviewCount: 22000,
    duration: "18 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Kubernetes", "Microservices", "Docker", "Spring Boot"],
    description:
      "Build and deploy microservices with Kubernetes, Docker, and Spring Boot.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-08-25",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/kubernetes-microservices.jpg",
    courseUrl: "https://www.udemy.com/course/kubernetes-microservices/",
    students: 85000,
    projects: 10,
    aiScore: 91,
  },
  {
    id: 186,
    title: "Kubernetes Administration",
    platform: "Linux Academy",
    instructor: "Linux Academy Team",
    rating: 4.7,
    reviewCount: 18000,
    duration: "20 total hours",
    level: "Advanced",
    price: 799,
    originalPrice: 3199,
    discount: 75,
    currency: "INR",
    skills: [
      "Kubernetes",
      "Administration",
      "Cluster Management",
      "Monitoring",
    ],
    description:
      "Advanced Kubernetes administration covering cluster management and monitoring.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://linuxacademy.com/assets/kubernetes-admin.jpg",
    courseUrl: "https://linuxacademy.com/course/kubernetes-administration/",
    students: 68000,
    projects: 8,
    aiScore: 90,
  },
  {
    id: 187,
    title: "Kubernetes on AWS",
    platform: "A Cloud Guru",
    instructor: "William Boyd",
    rating: 4.6,
    reviewCount: 12000,
    duration: "14 total hours",
    level: "Intermediate",
    price: 799,
    originalPrice: 3199,
    discount: 75,
    currency: "INR",
    skills: ["Kubernetes", "AWS", "EKS", "Cloud Native"],
    description:
      "Deploy and manage Kubernetes on AWS using EKS and cloud-native tools.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-08-18",
    certificateOffered: true,
    thumbnail: "https://acloudguru.com/assets/kubernetes-aws.jpg",
    courseUrl: "https://acloudguru.com/course/kubernetes-deep-dive",
    students: 48000,
    projects: 6,
    aiScore: 89,
  },
  {
    id: 188,
    title: "Kubernetes Security",
    platform: "Udemy",
    instructor: "Amigoscode",
    rating: 4.5,
    reviewCount: 8500,
    duration: "10 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Kubernetes", "Security", "RBAC", "Network Policies"],
    description:
      "Master Kubernetes security including RBAC, network policies, and pod security.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/kubernetes-security.jpg",
    courseUrl: "https://www.udemy.com/course/kubernetes-security/",
    students: 32000,
    projects: 7,
    aiScore: 88,
  },
  {
    id: 189,
    title: "Kubernetes Crash Course for Beginners",
    platform: "YouTube",
    instructor: "Traversy Media",
    rating: 4.7,
    reviewCount: 22000,
    duration: "1 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Kubernetes", "Basics", "kubectl", "Pods"],
    description:
      "Quick Kubernetes crash course covering fundamental concepts and kubectl commands.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-03-08",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/d6WC5n9G_sM/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=d6WC5n9G_sM",
    students: 585000,
    projects: 1,
    aiScore: 84,
  },
  {
    id: 190,
    title: "Kubernetes Patterns and Best Practices",
    platform: "Udemy",
    instructor: "Bilgin Ibryam",
    rating: 4.5,
    reviewCount: 6200,
    duration: "12 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Kubernetes", "Design Patterns", "Best Practices", "Cloud Native"],
    description:
      "Learn Kubernetes patterns and best practices for building cloud-native applications.",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-08-30",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/kubernetes-patterns.jpg",
    courseUrl: "https://www.udemy.com/course/kubernetes-patterns/",
    students: 25000,
    projects: 9,
    aiScore: 90,
  },
  {
    id: 191,
    title: "AWS Certified Solutions Architect - Associate 2024",
    platform: "Udemy",
    instructor: "Stephane Maarek",
    rating: 4.7,
    reviewCount: 185000,
    duration: "27 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["AWS", "Solutions Architecture", "EC2", "S3", "RDS"],
    description:
      "Pass the AWS Certified Solutions Architect Associate Certification SAA-C03. Complete Amazon Web Services course.",
    isBookmarked: false,
    isRecommended: true,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-09-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/362070_b123_3.jpg",
    courseUrl:
      "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    students: 785000,
    projects: 15,
    aiScore: 96,
  },
  {
    id: 192,
    title: "Ultimate AWS Certified Cloud Practitioner",
    platform: "Udemy",
    instructor: "Stephane Maarek",
    rating: 4.7,
    reviewCount: 128000,
    duration: "14 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["AWS", "Cloud Fundamentals", "AWS Services", "Certification"],
    description:
      "Full Practice Exam with Explanations included! PASS the Amazon Web Services Cloud Practitioner CLF-C02 Certification.",
    isBookmarked: false,
    isRecommended: true,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-09-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2409098_f24e_3.jpg",
    courseUrl:
      "https://www.udemy.com/course/aws-certified-cloud-practitioner-new/",
    students: 485000,
    projects: 8,
    aiScore: 94,
  },
  {
    id: 193,
    title: "AWS Certified Developer - Associate 2024",
    platform: "Udemy",
    instructor: "Stephane Maarek",
    rating: 4.7,
    reviewCount: 98000,
    duration: "28 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["AWS", "Lambda", "DynamoDB", "API Gateway", "CI/CD"],
    description:
      "Pass the AWS Certified Developer Associate Certification DVA-C02. Complete Serverless, DynamoDB & more.",
    isBookmarked: false,
    isRecommended: true,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1352162_93a8_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/",
    students: 385000,
    projects: 12,
    aiScore: 95,
  },
  {
    id: 194,
    title: "AWS Fundamentals",
    platform: "Coursera",
    instructor: "AWS",
    rating: 4.7,
    reviewCount: 42000,
    duration: "24 total hours",
    level: "Beginner",
    price: 590,
    originalPrice: 3590,
    discount: 84,
    currency: "INR",
    skills: ["AWS", "Cloud Services", "EC2", "S3"],
    description:
      "Learn AWS fundamentals from Amazon directly including core services and architecture.",
    isBookmarked: false,
    isRecommended: false,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail: "https://d3njjcbhbojbot.cloudfront.net/api/aws-fundamentals.jpg",
    courseUrl: "https://www.coursera.org/specializations/aws-fundamentals",
    students: 195000,
    projects: 5,
    aiScore: 91,
  },
  {
    id: 195,
    title: "AWS Tutorial for Beginners - Full Course",
    platform: "YouTube",
    instructor: "freeCodeCamp",
    rating: 4.8,
    reviewCount: 52000,
    duration: "4 total hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["AWS", "Cloud Computing", "EC2", "S3"],
    description:
      "Complete AWS tutorial for beginners covering core services and cloud fundamentals.",
    isBookmarked: false,
    isRecommended: false,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-02-25",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/ulprqHHWlng/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=ulprqHHWlng",
    students: 1250000,
    projects: 3,
    aiScore: 89,
  },
  {
    id: 196,
    title: "AWS Serverless APIs & Apps",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    reviewCount: 22000,
    duration: "12 total hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["AWS", "Lambda", "API Gateway", "DynamoDB"],
    description:
      "Build complete serverless applications with AWS Lambda, API Gateway, and DynamoDB.",
    isBookmarked: false,
    isRecommended: false,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/aws-serverless.jpg",
    courseUrl: "https://www.udemy.com/course/aws-serverless-apis-apps/",
    students: 85000,
    projects: 8,
    aiScore: 90,
  },
  {
    id: 197,
    title: "AWS for Beginners",
    platform: "A Cloud Guru",
    instructor: "Ryan Kroonenburg",
    rating: 4.7,
    reviewCount: 38000,
    duration: "18 total hours",
    level: "Beginner",
    price: 799,
    originalPrice: 3199,
    discount: 75,
    currency: "INR",
    skills: ["AWS", "Cloud Basics", "Core Services", "Architecture"],
    description:
      "Complete AWS course for beginners covering all core services and architecture.",
    isBookmarked: false,
    isRecommended: false,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail: "https://acloudguru.com/assets/aws-for-beginners.jpg",
    courseUrl: "https://acloudguru.com/course/aws-certified-cloud-practitioner",
    students: 95000,
    projects: 6,
    aiScore: 89,
  },
  {
    id: 198,
    title: "Counseling Skills Certificate Course (Beginner to Advanced)",
    platform: "Udemy",
    instructor: "Kain Ramsay",
    rating: 4.7,
    reviewCount: 32000,
    duration: "30 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Counseling", "Active Listening", "Emotional Intelligence"],
    description:
      "Develop essential counseling skills to support others, improve listening, and practice empathy.",
    isBookmarked: false,
    isRecommended: true,
    category: "Counseling",
    language: "English",
    lastUpdated: "2024-07-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/620234_9df2_6.jpg",
    courseUrl: "https://www.udemy.com/course/counseling-skills-certificate/",
    students: 145000,
    projects: 5,
    aiScore: 92,
  },
  {
    id: 199,
    title: "Positive Psychology: Resilience Skills",
    platform: "Coursera",
    instructor: "Dr. Karen Reivich (University of Pennsylvania)",
    rating: 4.8,
    reviewCount: 18500,
    duration: "12 hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Resilience", "Stress Management", "Emotional Intelligence"],
    description:
      "Learn positive psychology techniques to build resilience and manage stress effectively.",
    isBookmarked: false,
    isRecommended: true,
    category: "Psychology",
    language: "English",
    lastUpdated: "2024-06-15",
    certificateOffered: true,
    thumbnail: "https://coursera-course-photos.s3.amazonaws.com/psychology.jpg",
    courseUrl: "https://www.coursera.org/learn/resilience-skills",
    students: 65000,
    projects: 3,
    aiScore: 94,
  },
  {
    id: 200,
    title: "Life Coaching Certificate Course",
    platform: "Udemy",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.6,
    reviewCount: 41000,
    duration: "28 hours",
    level: "Beginner",
    price: 549,
    originalPrice: 3499,
    discount: 84,
    currency: "INR",
    skills: ["Life Coaching", "Goal Setting", "Personal Development"],
    description:
      "Become a certified life coach and help others achieve their personal and professional goals.",
    isBookmarked: false,
    isRecommended: false,
    category: "Counseling",
    language: "English",
    lastUpdated: "2024-05-12",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/58960_8a83_5.jpg",
    courseUrl:
      "https://www.udemy.com/course/life-coaching-certification-course/",
    students: 98000,
    projects: 7,
    aiScore: 90,
  },
  {
    id: 201,
    title: "Conflict Management Specialization",
    platform: "Coursera",
    instructor: "University of California, Irvine",
    rating: 4.7,
    reviewCount: 15500,
    duration: "20 hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Conflict Resolution", "Negotiation", "Leadership"],
    description:
      "Learn how to manage and resolve conflicts effectively in professional and personal settings.",
    isBookmarked: false,
    isRecommended: true,
    category: "Business Management",
    language: "English",
    lastUpdated: "2024-09-01",
    certificateOffered: true,
    thumbnail: "https://coursera-course-photos.s3.amazonaws.com/conflict.jpg",
    courseUrl: "https://www.coursera.org/specializations/conflict-management",
    students: 72000,
    projects: 4,
    aiScore: 93,
  },
  {
    id: 202,
    title: "Emotional Intelligence at Work",
    platform: "LinkedIn Learning",
    instructor: "Gemma Leigh Roberts",
    rating: 4.5,
    reviewCount: 8800,
    duration: "3 hours",
    level: "Beginner",
    price: 1400,
    originalPrice: 2100,
    discount: 33,
    currency: "INR",
    skills: ["Emotional Intelligence", "Self-Awareness", "Leadership"],
    description:
      "Master emotional intelligence techniques to improve communication and relationships at work.",
    isBookmarked: false,
    isRecommended: false,
    category: "Psychology",
    language: "English",
    lastUpdated: "2024-08-05",
    certificateOffered: true,
    thumbnail: "https://media-exp1.licdn.com/dms/image/C5605EQEIQ.jpg",
    courseUrl:
      "https://www.linkedin.com/learning/emotional-intelligence-at-work",
    students: 45000,
    projects: 2,
    aiScore: 88,
  },
  {
    id: 204,
    title: "Project Management Professional (PMP) Exam Prep",
    platform: "Udemy",
    instructor: "Joseph Phillips",
    rating: 4.7,
    reviewCount: 64000,
    duration: "35 total hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3999,
    discount: 87,
    currency: "INR",
    skills: ["Project Management", "Agile Methodology", "Scrum"],
    description:
      "Comprehensive PMP certification training with Agile, Scrum, and project planning concepts.",
    isBookmarked: false,
    isRecommended: true,
    category: "Business & Management",
    language: "English",
    lastUpdated: "2024-07-01",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/333372_91b0_5.jpg",
    courseUrl:
      "https://www.udemy.com/course/pmp-pmbok6-35-pdus-project-management-professional-certification-exam-prep/",
    students: 250000,
    projects: 8,
    aiScore: 94,
  },
  {
    id: 205,
    title: "Business Strategy Specialization",
    platform: "Coursera",
    instructor: "University of Virginia",
    rating: 4.8,
    reviewCount: 41000,
    duration: "Approx. 25 hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Business Analysis", "Marketing Strategy", "Entrepreneurship"],
    description:
      "Learn core business strategy concepts, competitive advantage, and entrepreneurship essentials.",
    isBookmarked: false,
    isRecommended: true,
    category: "Business & Management",
    language: "English",
    lastUpdated: "2024-09-12",
    certificateOffered: true,
    thumbnail:
      "https://coursera-course-photos.s3.amazonaws.com/business-strategy.jpg",
    courseUrl: "https://www.coursera.org/specializations/business-strategy",
    students: 175000,
    projects: 5,
    aiScore: 91,
  },
  {
    id: 206,
    title: "Instructional Design for Online Learning",
    platform: "Coursera",
    instructor: "University of Illinois",
    rating: 4.6,
    reviewCount: 8700,
    duration: "Approx. 20 hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: [
      "Curriculum Design",
      "Instructional Design",
      "Educational Technology",
    ],
    description:
      "Design engaging online learning experiences using modern educational technology.",
    isBookmarked: false,
    isRecommended: false,
    category: "Education",
    language: "English",
    lastUpdated: "2024-06-21",
    certificateOffered: true,
    thumbnail: "https://coursera-course-photos.s3.amazonaws.com/edu-design.jpg",
    courseUrl: "https://www.coursera.org/learn/instructional-design",
    students: 39000,
    projects: 3,
    aiScore: 84,
  },
  {
    id: 207,
    title: "Teaching English as a Foreign Language (TEFL)",
    platform: "Udemy",
    instructor: "International Open Academy",
    rating: 4.7,
    reviewCount: 22000,
    duration: "16 total hours",
    level: "Beginner",
    price: 449,
    originalPrice: 3499,
    discount: 87,
    currency: "INR",
    skills: ["Tutoring", "Educational Technology", "Languages"],
    description:
      "Get certified to teach English abroad or online with proven TEFL methods.",
    isBookmarked: false,
    isRecommended: true,
    category: "Education",
    language: "English",
    lastUpdated: "2024-07-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2740978_1b8a.jpg",
    courseUrl: "https://www.udemy.com/course/tefl-tesol-certification-course/",
    students: 98000,
    projects: 4,
    aiScore: 89,
  },
  {
    id: 208,
    title: "Financial Markets",
    platform: "Coursera",
    instructor: "Robert Shiller (Yale University)",
    rating: 4.8,
    reviewCount: 62000,
    duration: "Approx. 35 hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Financial Analysis", "Investment Management", "Budgeting"],
    description:
      "Understand how financial markets work, investment strategies, and behavioral finance.",
    isBookmarked: false,
    isRecommended: true,
    category: "Finance & Operations",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail:
      "https://coursera-course-photos.s3.amazonaws.com/financial-markets.jpg",
    courseUrl: "https://www.coursera.org/learn/financial-markets-global",
    students: 350000,
    projects: 6,
    aiScore: 95,
  },
  {
    id: 209,
    title: "Accounting Fundamentals",
    platform: "LinkedIn Learning",
    instructor: "Kay Stice",
    rating: 4.6,
    reviewCount: 18000,
    duration: "3 total hours",
    level: "Beginner",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    currency: "INR",
    skills: ["Accounting", "Bookkeeping", "Financial Analysis"],
    description:
      "Learn the basics of accounting, bookkeeping, and financial statements.",
    isBookmarked: false,
    isRecommended: false,
    category: "Finance & Operations",
    language: "English",
    lastUpdated: "2024-03-30",
    certificateOffered: true,
    thumbnail: "https://media-exp1.licdn.com/dms/image/C4D0EAQ/accounting.jpg",
    courseUrl: "https://www.linkedin.com/learning/accounting-fundamentals",
    students: 42000,
    projects: 2,
    aiScore: 83,
  },
  {
    id: 210,
    title: "Psychological First Aid",
    platform: "Coursera",
    instructor: "Johns Hopkins University",
    rating: 4.9,
    reviewCount: 56000,
    duration: "Approx. 7 hours",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["First Aid", "Mental Health Awareness", "Healthcare"],
    description:
      "Learn to provide basic psychological first aid in crisis situations.",
    isBookmarked: false,
    isRecommended: true,
    category: "Healthcare & Wellness",
    language: "English",
    lastUpdated: "2024-08-28",
    certificateOffered: true,
    thumbnail: "https://coursera-course-photos.s3.amazonaws.com/first-aid.jpg",
    courseUrl: "https://www.coursera.org/learn/psychological-first-aid",
    students: 210000,
    projects: 1,
    aiScore: 97,
  },
  {
    id: 211,
    title: "Complete Guide to Fitness & Health",
    platform: "Udemy",
    instructor: "Felix Harder",
    rating: 4.6,
    reviewCount: 34000,
    duration: "8 total hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Fitness Training", "Nutrition", "Wellness"],
    description:
      "Learn effective workout plans, nutrition, and wellness strategies for a healthy lifestyle.",
    isBookmarked: false,
    isRecommended: false,
    category: "Healthcare & Wellness",
    language: "English",
    lastUpdated: "2024-05-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/health-fitness.jpg",
    courseUrl: "https://www.udemy.com/course/fitness-health-coach/",
    students: 86000,
    projects: 2,
    aiScore: 86,
  },
  {
    id: 212,
    title: "Spanish for Beginners: Learn Conversational Spanish",
    platform: "Udemy",
    instructor: "Peter Hanley",
    rating: 4.7,
    reviewCount: 50000,
    duration: "10 total hours",
    level: "Beginner",
    price: 449,
    originalPrice: 2999,
    discount: 85,
    currency: "INR",
    skills: ["Spanish", "Languages", "Communication"],
    description:
      "Learn Spanish from scratch with real-life phrases, pronunciation, and grammar basics.",
    isBookmarked: false,
    isRecommended: true,
    category: "Languages",
    language: "English",
    lastUpdated: "2024-04-19",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/spanish.jpg",
    courseUrl:
      "https://www.udemy.com/course/spanish-for-beginners-learn-conversational-spanish/",
    students: 190000,
    projects: 3,
    aiScore: 90,
  },
  {
    id: 213,
    title: "French Language A1 for Beginners",
    platform: "Udemy",
    instructor: "Sandra D.",
    rating: 4.5,
    reviewCount: 28000,
    duration: "9.5 total hours",
    level: "Beginner",
    price: 449,
    originalPrice: 2999,
    discount: 85,
    currency: "INR",
    skills: ["French", "Languages", "Communication"],
    description:
      "Beginner-friendly French course with vocabulary, grammar, and conversational practice.",
    isBookmarked: false,
    isRecommended: false,
    category: "Languages",
    language: "English",
    lastUpdated: "2024-06-14",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/french.jpg",
    courseUrl: "https://www.udemy.com/course/french-for-beginners-course/",
    students: 82000,
    projects: 2,
    aiScore: 85,
  },
  {
    id: 214,
    title: "Graphic Design Masterclass",
    platform: "Udemy",
    instructor: "Lindsay Marsh",
    rating: 4.8,
    reviewCount: 125000,
    duration: "26 total hours",
    level: "Beginner to Advanced",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Graphic Design", "Adobe Illustrator", "Adobe Photoshop", "Canva"],
    description:
      "Learn modern graphic design with Adobe tools, typography, branding, and Canva projects.",
    isBookmarked: false,
    isRecommended: true,
    category: "Design & Creative",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail:
      "https://img-c.udemycdn.com/course/480x270/design-masterclass.jpg",
    courseUrl: "https://www.udemy.com/course/graphic-design-masterclass/",
    students: 300000,
    projects: 10,
    aiScore: 94,
  },
  {
    id: 215,
    title: "Public Speaking Mastery",
    platform: "Udemy",
    instructor: "TJ Walker",
    rating: 4.7,
    reviewCount: 145000,
    duration: "30 total hours",
    level: "All Levels",
    price: 499,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Public Speaking", "Interpersonal Communication", "Storytelling"],
    description:
      "Develop confidence, storytelling, and communication skills for powerful public speaking.",
    isBookmarked: false,
    isRecommended: true,
    category: "Professional Skills",
    language: "English",
    lastUpdated: "2024-07-29",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/public-speaking.jpg",
    courseUrl: "https://www.udemy.com/course/public-speaking/",
    students: 480000,
    projects: 6,
    aiScore: 93,
  },

  {
    id: 216,
    title: "Healthcare Essentials 216",
    platform: "edX",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.4,
    reviewCount: 17375,
    duration: "14 hours",
    level: "Beginner",
    price: 1499,
    originalPrice: 3999,
    discount: 82,
    currency: "INR",
    skills: ["Patient Care", "Healthcare Management", "Nutrition"],
    description:
      "Learn healthcare concepts to build strong skills in Patient Care, Healthcare Management, Nutrition.",
    isBookmarked: false,
    isRecommended: false,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/216",
    students: 86567,
    projects: 7,
    aiScore: 92,
  },
  {
    id: 217,
    title: "Counseling Essentials 217",
    platform: "Udemy",
    instructor: "Dr. Alyssa Richards",
    rating: 4.7,
    reviewCount: 8085,
    duration: "25 hours",
    level: "Intermediate",
    price: 549,
    originalPrice: 4999,
    discount: 80,
    currency: "INR",
    skills: ["Active Listening", "Therapy", "Counseling"],
    description:
      "Learn counseling concepts to build strong skills in Active Listening, Therapy, Counseling.",
    isBookmarked: false,
    isRecommended: true,
    category: "Counseling",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/217",
    students: 81163,
    projects: 3,
    aiScore: 90,
  },
  {
    id: 218,
    title: "Leadership Essentials 218",
    platform: "FutureLearn",
    instructor: "TJ Walker",
    rating: 4.3,
    reviewCount: 15674,
    duration: "15 hours",
    level: "Beginner",
    price: 549,
    originalPrice: 4999,
    discount: 86,
    currency: "INR",
    skills: ["Leadership", "Decision Making", "Influence"],
    description:
      "Learn leadership concepts to build strong skills in Leadership, Decision Making, Influence.",
    isBookmarked: false,
    isRecommended: true,
    category: "Leadership",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/218",
    students: 96026,
    projects: 5,
    aiScore: 92,
  },
  {
    id: 219,
    title: "Personal Development Essentials 219",
    platform: "LinkedIn Learning",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.3,
    reviewCount: 6684,
    duration: "34 hours",
    level: "Beginner",
    price: 1499,
    originalPrice: 3999,
    discount: 82,
    currency: "INR",
    skills: ["Self Improvement", "Confidence", "Time Management"],
    description:
      "Learn personal development concepts to build strong skills in Self Improvement, Confidence, Time Management.",
    isBookmarked: false,
    isRecommended: true,
    category: "Personal Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/219",
    students: 84242,
    projects: 2,
    aiScore: 86,
  },
  {
    id: 220,
    title: "Coaching Essentials 220",
    platform: "Coursera",
    instructor: "Dr. Alyssa Richards",
    rating: 4.6,
    reviewCount: 32059,
    duration: "10 hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 85,
    currency: "INR",
    skills: ["Life Coaching", "Goal Setting", "Motivation"],
    description:
      "Learn coaching concepts to build strong skills in Life Coaching, Goal Setting, Motivation.",
    isBookmarked: false,
    isRecommended: true,
    category: "Coaching",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/220",
    students: 109544,
    projects: 12,
    aiScore: 86,
  },
  {
    id: 221,
    title: "Education Essentials 221",
    platform: "Coursera",
    instructor: "TJ Walker",
    rating: 4.5,
    reviewCount: 30972,
    duration: "24 hours",
    level: "Advanced",
    price: 699,
    originalPrice: 4999,
    discount: 86,
    currency: "INR",
    skills: ["Curriculum Design", "Teaching", "Learning Strategies"],
    description:
      "Learn education concepts to build strong skills in Curriculum Design, Teaching, Learning Strategies.",
    isBookmarked: false,
    isRecommended: true,
    category: "Education",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/221",
    students: 87829,
    projects: 8,
    aiScore: 87,
  },
  {
    id: 222,
    title: "Leadership Essentials 222",
    platform: "Coursera",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.5,
    reviewCount: 39505,
    duration: "4 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 3999,
    discount: 86,
    currency: "INR",
    skills: ["Decision Making", "Leadership", "Influence"],
    description:
      "Learn leadership concepts to build strong skills in Decision Making, Leadership, Influence.",
    isBookmarked: false,
    isRecommended: false,
    category: "Leadership",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/222",
    students: 32836,
    projects: 9,
    aiScore: 87,
  },
  {
    id: 223,
    title: "Finance Essentials 223",
    platform: "Udemy",
    instructor: "Gemma Leigh Roberts",
    rating: 4.8,
    reviewCount: 10699,
    duration: "14 hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Investment", "Budgeting", "Personal Finance"],
    description:
      "Learn finance concepts to build strong skills in Investment, Budgeting, Personal Finance.",
    isBookmarked: false,
    isRecommended: false,
    category: "Finance",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/223",
    students: 14287,
    projects: 10,
    aiScore: 91,
  },
  {
    id: 224,
    title: "Creative Arts Essentials 224",
    platform: "FutureLearn",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.5,
    reviewCount: 29212,
    duration: "22 hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 3999,
    discount: 85,
    currency: "INR",
    skills: ["Art Therapy", "Creative Writing", "Design Thinking"],
    description:
      "Learn creative arts concepts to build strong skills in Art Therapy, Creative Writing, Design Thinking.",
    isBookmarked: false,
    isRecommended: true,
    category: "Creative Arts",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/224",
    students: 143122,
    projects: 6,
    aiScore: 95,
  },
  {
    id: 225,
    title: "Wellness Essentials 225",
    platform: "Skillshare",
    instructor: "TJ Walker",
    rating: 4.8,
    reviewCount: 9184,
    duration: "24 hours",
    level: "Beginner",
    price: 1499,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Meditation", "Stress Management", "Mindfulness"],
    description:
      "Learn wellness concepts to build strong skills in Meditation, Stress Management, Mindfulness.",
    isBookmarked: false,
    isRecommended: false,
    category: "Wellness",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/225",
    students: 35634,
    projects: 2,
    aiScore: 88,
  },
  {
    id: 226,
    title: "Leadership Essentials 226",
    platform: "FutureLearn",
    instructor: "University of London Faculty",
    rating: 4.7,
    reviewCount: 9076,
    duration: "15 hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Influence", "Decision Making", "Leadership"],
    description:
      "Learn leadership concepts to build strong skills in Influence, Decision Making, Leadership.",
    isBookmarked: false,
    isRecommended: true,
    category: "Leadership",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/226",
    students: 118404,
    projects: 8,
    aiScore: 88,
  },
  {
    id: 227,
    title: "Business Management Essentials 227",
    platform: "Skillshare",
    instructor: "Gemma Leigh Roberts",
    rating: 4.6,
    reviewCount: 24423,
    duration: "26 hours",
    level: "Beginner",
    price: 699,
    originalPrice: 3499,
    discount: 82,
    currency: "INR",
    skills: ["Teamwork", "Management", "Conflict Resolution"],
    description:
      "Learn business management concepts to build strong skills in Teamwork, Management, Conflict Resolution.",
    isBookmarked: false,
    isRecommended: false,
    category: "Business Management",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/227",
    students: 26696,
    projects: 9,
    aiScore: 95,
  },
  {
    id: 228,
    title: "Finance Essentials 228",
    platform: "edX",
    instructor: "Kain Ramsay",
    rating: 4.6,
    reviewCount: 12201,
    duration: "28 hours",
    level: "Beginner",
    price: 499,
    originalPrice: 4999,
    discount: 85,
    currency: "INR",
    skills: ["Investment", "Personal Finance", "Budgeting"],
    description:
      "Learn finance concepts to build strong skills in Investment, Personal Finance, Budgeting.",
    isBookmarked: false,
    isRecommended: true,
    category: "Finance",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/228",
    students: 108596,
    projects: 11,
    aiScore: 90,
  },
  {
    id: 229,
    title: "Finance Essentials 229",
    platform: "LinkedIn Learning",
    instructor: "TJ Walker",
    rating: 4.7,
    reviewCount: 15948,
    duration: "35 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 0,
    discount: 86,
    currency: "INR",
    skills: ["Budgeting", "Investment", "Personal Finance"],
    description:
      "Learn finance concepts to build strong skills in Budgeting, Investment, Personal Finance.",
    isBookmarked: false,
    isRecommended: true,
    category: "Finance",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/229",
    students: 105109,
    projects: 8,
    aiScore: 91,
  },
  {
    id: 230,
    title: "Healthcare Essentials 230",
    platform: "edX",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.5,
    reviewCount: 44020,
    duration: "40 hours",
    level: "Beginner",
    price: 499,
    originalPrice: 4999,
    discount: 86,
    currency: "INR",
    skills: ["Patient Care", "Healthcare Management", "Nutrition"],
    description:
      "Learn healthcare concepts to build strong skills in Patient Care, Healthcare Management, Nutrition.",
    isBookmarked: false,
    isRecommended: true,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/230",
    students: 83122,
    projects: 3,
    aiScore: 90,
  },
  {
    id: 231,
    title: "Education Essentials 231",
    platform: "FutureLearn",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.5,
    reviewCount: 40175,
    duration: "22 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 3999,
    discount: 85,
    currency: "INR",
    skills: ["Curriculum Design", "Learning Strategies", "Teaching"],
    description:
      "Learn education concepts to build strong skills in Curriculum Design, Learning Strategies, Teaching.",
    isBookmarked: false,
    isRecommended: true,
    category: "Education",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/231",
    students: 78935,
    projects: 4,
    aiScore: 86,
  },
  {
    id: 232,
    title: "Finance Essentials 232",
    platform: "edX",
    instructor: "Dr. Alyssa Richards",
    rating: 4.7,
    reviewCount: 14071,
    duration: "39 hours",
    level: "Advanced",
    price: 549,
    originalPrice: 3499,
    discount: 85,
    currency: "INR",
    skills: ["Budgeting", "Investment", "Personal Finance"],
    description:
      "Learn finance concepts to build strong skills in Budgeting, Investment, Personal Finance.",
    isBookmarked: false,
    isRecommended: true,
    category: "Finance",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/232",
    students: 122762,
    projects: 12,
    aiScore: 90,
  },
  {
    id: 233,
    title: "Finance Essentials 233",
    platform: "LinkedIn Learning",
    instructor: "Kain Ramsay",
    rating: 4.7,
    reviewCount: 36061,
    duration: "6 hours",
    level: "Advanced",
    price: 0,
    originalPrice: 4999,
    discount: 82,
    currency: "INR",
    skills: ["Personal Finance", "Investment", "Budgeting"],
    description:
      "Learn finance concepts to build strong skills in Personal Finance, Investment, Budgeting.",
    isBookmarked: false,
    isRecommended: false,
    category: "Finance",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/233",
    students: 72837,
    projects: 4,
    aiScore: 91,
  },
  {
    id: 234,
    title: "Coaching Essentials 234",
    platform: "FutureLearn",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.6,
    reviewCount: 28122,
    duration: "10 hours",
    level: "Beginner",
    price: 699,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Life Coaching", "Goal Setting", "Motivation"],
    description:
      "Learn coaching concepts to build strong skills in Life Coaching, Goal Setting, Motivation.",
    isBookmarked: false,
    isRecommended: true,
    category: "Coaching",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/234",
    students: 117427,
    projects: 8,
    aiScore: 88,
  },
  {
    id: 235,
    title: "Wellness Essentials 235",
    platform: "Udemy",
    instructor: "TJ Walker",
    rating: 4.7,
    reviewCount: 17863,
    duration: "5 hours",
    level: "Beginner",
    price: 499,
    originalPrice: 0,
    discount: 86,
    currency: "INR",
    skills: ["Meditation", "Mindfulness", "Stress Management"],
    description:
      "Learn wellness concepts to build strong skills in Meditation, Mindfulness, Stress Management.",
    isBookmarked: false,
    isRecommended: false,
    category: "Wellness",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/235",
    students: 110996,
    projects: 8,
    aiScore: 94,
  },
  {
    id: 236,
    title: "Psychology Essentials 236",
    platform: "FutureLearn",
    instructor: "Gemma Leigh Roberts",
    rating: 4.5,
    reviewCount: 26483,
    duration: "4 hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 3999,
    discount: 82,
    currency: "INR",
    skills: ["Positive Psychology", "Mental Health", "CBT"],
    description:
      "Learn psychology concepts to build strong skills in Positive Psychology, Mental Health, CBT.",
    isBookmarked: false,
    isRecommended: false,
    category: "Psychology",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/236",
    students: 40735,
    projects: 12,
    aiScore: 87,
  },
  {
    id: 237,
    title: "Creative Arts Essentials 237",
    platform: "LinkedIn Learning",
    instructor: "Kain Ramsay",
    rating: 4.7,
    reviewCount: 22991,
    duration: "24 hours",
    level: "Advanced",
    price: 549,
    originalPrice: 0,
    discount: 86,
    currency: "INR",
    skills: ["Design Thinking", "Art Therapy", "Creative Writing"],
    description:
      "Learn creative arts concepts to build strong skills in Design Thinking, Art Therapy, Creative Writing.",
    isBookmarked: false,
    isRecommended: false,
    category: "Creative Arts",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/237",
    students: 32300,
    projects: 6,
    aiScore: 95,
  },
  {
    id: 238,
    title: "Psychology Essentials 238",
    platform: "Skillshare",
    instructor: "Gemma Leigh Roberts",
    rating: 4.6,
    reviewCount: 19158,
    duration: "16 hours",
    level: "Intermediate",
    price: 549,
    originalPrice: 0,
    discount: 85,
    currency: "INR",
    skills: ["Mental Health", "CBT", "Positive Psychology"],
    description:
      "Learn psychology concepts to build strong skills in Mental Health, CBT, Positive Psychology.",
    isBookmarked: false,
    isRecommended: false,
    category: "Psychology",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/238",
    students: 113094,
    projects: 4,
    aiScore: 85,
  },
  {
    id: 239,
    title: "Coaching Essentials 239",
    platform: "Skillshare",
    instructor: "TJ Walker",
    rating: 4.4,
    reviewCount: 34657,
    duration: "20 hours",
    level: "Beginner",
    price: 1299,
    originalPrice: 3999,
    discount: 80,
    currency: "INR",
    skills: ["Goal Setting", "Motivation", "Life Coaching"],
    description:
      "Learn coaching concepts to build strong skills in Goal Setting, Motivation, Life Coaching.",
    isBookmarked: false,
    isRecommended: true,
    category: "Coaching",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/239",
    students: 87655,
    projects: 8,
    aiScore: 89,
  },
  {
    id: 240,
    title: "Coaching Essentials 240",
    platform: "Coursera",
    instructor: "Dr. Alyssa Richards",
    rating: 4.7,
    reviewCount: 16483,
    duration: "21 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 3999,
    discount: 85,
    currency: "INR",
    skills: ["Life Coaching", "Goal Setting", "Motivation"],
    description:
      "Learn coaching concepts to build strong skills in Life Coaching, Goal Setting, Motivation.",
    isBookmarked: false,
    isRecommended: true,
    category: "Coaching",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/240",
    students: 105095,
    projects: 8,
    aiScore: 93,
  },
  {
    id: 241,
    title: "Wellness Essentials 241",
    platform: "edX",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.7,
    reviewCount: 22406,
    duration: "30 hours",
    level: "Beginner",
    price: 1299,
    originalPrice: 0,
    discount: 86,
    currency: "INR",
    skills: ["Meditation", "Stress Management", "Mindfulness"],
    description:
      "Learn wellness concepts to build strong skills in Meditation, Stress Management, Mindfulness.",
    isBookmarked: false,
    isRecommended: true,
    category: "Wellness",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/241",
    students: 63139,
    projects: 5,
    aiScore: 85,
  },
  {
    id: 242,
    title: "Psychology Essentials 242",
    platform: "Skillshare",
    instructor: "Kain Ramsay",
    rating: 4.4,
    reviewCount: 21620,
    duration: "14 hours",
    level: "Advanced",
    price: 1499,
    originalPrice: 3499,
    discount: 82,
    currency: "INR",
    skills: ["Mental Health", "Positive Psychology", "CBT"],
    description:
      "Learn psychology concepts to build strong skills in Mental Health, Positive Psychology, CBT.",
    isBookmarked: false,
    isRecommended: false,
    category: "Psychology",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/242",
    students: 167461,
    projects: 7,
    aiScore: 95,
  },
  {
    id: 243,
    title: "Psychology Essentials 243",
    platform: "LinkedIn Learning",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.4,
    reviewCount: 6514,
    duration: "3 hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Positive Psychology", "CBT", "Mental Health"],
    description:
      "Learn psychology concepts to build strong skills in Positive Psychology, CBT, Mental Health.",
    isBookmarked: false,
    isRecommended: true,
    category: "Psychology",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/243",
    students: 83477,
    projects: 10,
    aiScore: 88,
  },
  {
    id: 244,
    title: "Leadership Essentials 244",
    platform: "edX",
    instructor: "Dr. Alyssa Richards",
    rating: 4.7,
    reviewCount: 11843,
    duration: "14 hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 0,
    discount: 85,
    currency: "INR",
    skills: ["Leadership", "Decision Making", "Influence"],
    description:
      "Learn leadership concepts to build strong skills in Leadership, Decision Making, Influence.",
    isBookmarked: false,
    isRecommended: true,
    category: "Leadership",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/244",
    students: 102469,
    projects: 12,
    aiScore: 93,
  },
  {
    id: 245,
    title: "Personal Development Essentials 245",
    platform: "Skillshare",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.5,
    reviewCount: 41941,
    duration: "4 hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 3499,
    discount: 80,
    currency: "INR",
    skills: ["Self Improvement", "Time Management", "Confidence"],
    description:
      "Learn personal development concepts to build strong skills in Self Improvement, Time Management, Confidence.",
    isBookmarked: false,
    isRecommended: true,
    category: "Personal Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/245",
    students: 138709,
    projects: 9,
    aiScore: 89,
  },
  {
    id: 246,
    title: "Creative Arts Essentials 246",
    platform: "Skillshare",
    instructor: "University of London Faculty",
    rating: 4.3,
    reviewCount: 35607,
    duration: "10 hours",
    level: "Advanced",
    price: 699,
    originalPrice: 3999,
    discount: 80,
    currency: "INR",
    skills: ["Art Therapy", "Creative Writing", "Design Thinking"],
    description:
      "Learn creative arts concepts to build strong skills in Art Therapy, Creative Writing, Design Thinking.",
    isBookmarked: false,
    isRecommended: true,
    category: "Creative Arts",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/246",
    students: 103907,
    projects: 12,
    aiScore: 87,
  },
  {
    id: 247,
    title: "Healthcare Essentials 247",
    platform: "LinkedIn Learning",
    instructor: "Kain Ramsay",
    rating: 4.6,
    reviewCount: 39134,
    duration: "29 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 4999,
    discount: 80,
    currency: "INR",
    skills: ["Patient Care", "Healthcare Management", "Nutrition"],
    description:
      "Learn healthcare concepts to build strong skills in Patient Care, Healthcare Management, Nutrition.",
    isBookmarked: false,
    isRecommended: false,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/247",
    students: 88304,
    projects: 9,
    aiScore: 93,
  },
  {
    id: 248,
    title: "Wellness Essentials 248",
    platform: "LinkedIn Learning",
    instructor: "Dr. Alyssa Richards",
    rating: 4.7,
    reviewCount: 33288,
    duration: "10 hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 3999,
    discount: 80,
    currency: "INR",
    skills: ["Mindfulness", "Meditation", "Stress Management"],
    description:
      "Learn wellness concepts to build strong skills in Mindfulness, Meditation, Stress Management.",
    isBookmarked: false,
    isRecommended: false,
    category: "Wellness",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/248",
    students: 71248,
    projects: 6,
    aiScore: 85,
  },
  {
    id: 249,
    title: "Personal Development Essentials 249",
    platform: "LinkedIn Learning",
    instructor: "TJ Walker",
    rating: 4.6,
    reviewCount: 16288,
    duration: "30 hours",
    level: "Advanced",
    price: 699,
    originalPrice: 4999,
    discount: 0,
    currency: "INR",
    skills: ["Self Improvement", "Time Management", "Confidence"],
    description:
      "Learn personal development concepts to build strong skills in Self Improvement, Time Management, Confidence.",
    isBookmarked: false,
    isRecommended: false,
    category: "Personal Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/249",
    students: 172480,
    projects: 11,
    aiScore: 90,
  },
  {
    id: 250,
    title: "Creative Arts Essentials 250",
    platform: "edX",
    instructor: "Gemma Leigh Roberts",
    rating: 4.3,
    reviewCount: 22724,
    duration: "26 hours",
    level: "Advanced",
    price: 1299,
    originalPrice: 3999,
    discount: 86,
    currency: "INR",
    skills: ["Design Thinking", "Creative Writing", "Art Therapy"],
    description:
      "Learn creative arts concepts to build strong skills in Design Thinking, Creative Writing, Art Therapy.",
    isBookmarked: false,
    isRecommended: false,
    category: "Creative Arts",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/250",
    students: 63542,
    projects: 7,
    aiScore: 94,
  },
  {
    id: 251,
    title: "Healthcare Essentials 251",
    platform: "Coursera",
    instructor: "Gemma Leigh Roberts",
    rating: 4.6,
    reviewCount: 34251,
    duration: "8 hours",
    level: "Advanced",
    price: 699,
    originalPrice: 3999,
    discount: 86,
    currency: "INR",
    skills: ["Healthcare Management", "Patient Care", "Nutrition"],
    description:
      "Learn healthcare concepts to build strong skills in Healthcare Management, Patient Care, Nutrition.",
    isBookmarked: false,
    isRecommended: true,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/251",
    students: 167539,
    projects: 3,
    aiScore: 95,
  },
  {
    id: 252,
    title: "Creative Arts Essentials 252",
    platform: "edX",
    instructor: "TJ Walker",
    rating: 4.7,
    reviewCount: 38693,
    duration: "37 hours",
    level: "Advanced",
    price: 0,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Design Thinking", "Creative Writing", "Art Therapy"],
    description:
      "Learn creative arts concepts to build strong skills in Design Thinking, Creative Writing, Art Therapy.",
    isBookmarked: false,
    isRecommended: true,
    category: "Creative Arts",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/252",
    students: 120106,
    projects: 9,
    aiScore: 85,
  },
  {
    id: 253,
    title: "Business Management Essentials 253",
    platform: "Udemy",
    instructor: "Kain Ramsay",
    rating: 4.6,
    reviewCount: 42349,
    duration: "5 hours",
    level: "Beginner",
    price: 549,
    originalPrice: 4999,
    discount: 80,
    currency: "INR",
    skills: ["Teamwork", "Conflict Resolution", "Management"],
    description:
      "Learn business management concepts to build strong skills in Teamwork, Conflict Resolution, Management.",
    isBookmarked: false,
    isRecommended: false,
    category: "Business Management",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/253",
    students: 14576,
    projects: 3,
    aiScore: 86,
  },
  {
    id: 254,
    title: "Healthcare Essentials 254",
    platform: "Udemy",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.3,
    reviewCount: 7656,
    duration: "16 hours",
    level: "Advanced",
    price: 1499,
    originalPrice: 3499,
    discount: 82,
    currency: "INR",
    skills: ["Nutrition", "Healthcare Management", "Patient Care"],
    description:
      "Learn healthcare concepts to build strong skills in Nutrition, Healthcare Management, Patient Care.",
    isBookmarked: false,
    isRecommended: false,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/254",
    students: 123025,
    projects: 9,
    aiScore: 87,
  },
  {
    id: 255,
    title: "Personal Development Essentials 255",
    platform: "FutureLearn",
    instructor: "Dr. Alyssa Richards",
    rating: 4.5,
    reviewCount: 40993,
    duration: "16 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 4999,
    discount: 0,
    currency: "INR",
    skills: ["Self Improvement", "Confidence", "Time Management"],
    description:
      "Learn personal development concepts to build strong skills in Self Improvement, Confidence, Time Management.",
    isBookmarked: false,
    isRecommended: true,
    category: "Personal Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/255",
    students: 79380,
    projects: 11,
    aiScore: 85,
  },
  {
    id: 256,
    title: "Healthcare Essentials 256",
    platform: "LinkedIn Learning",
    instructor: "TJ Walker",
    rating: 4.7,
    reviewCount: 7183,
    duration: "18 hours",
    level: "Advanced",
    price: 549,
    originalPrice: 0,
    discount: 86,
    currency: "INR",
    skills: ["Nutrition", "Healthcare Management", "Patient Care"],
    description:
      "Learn healthcare concepts to build strong skills in Nutrition, Healthcare Management, Patient Care.",
    isBookmarked: false,
    isRecommended: false,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/256",
    students: 110006,
    projects: 6,
    aiScore: 90,
  },
  {
    id: 257,
    title: "Counseling Essentials 257",
    platform: "Skillshare",
    instructor: "University of London Faculty",
    rating: 4.5,
    reviewCount: 27338,
    duration: "23 hours",
    level: "Intermediate",
    price: 499,
    originalPrice: 4999,
    discount: 82,
    currency: "INR",
    skills: ["Active Listening", "Therapy", "Counseling"],
    description:
      "Learn counseling concepts to build strong skills in Active Listening, Therapy, Counseling.",
    isBookmarked: false,
    isRecommended: true,
    category: "Counseling",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/257",
    students: 130034,
    projects: 3,
    aiScore: 87,
  },
  {
    id: 258,
    title: "Counseling Essentials 258",
    platform: "edX",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.4,
    reviewCount: 42753,
    duration: "9 hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3999,
    discount: 82,
    currency: "INR",
    skills: ["Counseling", "Active Listening", "Therapy"],
    description:
      "Learn counseling concepts to build strong skills in Counseling, Active Listening, Therapy.",
    isBookmarked: false,
    isRecommended: false,
    category: "Counseling",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/258",
    students: 79348,
    projects: 2,
    aiScore: 87,
  },
  {
    id: 259,
    title: "Communication Essentials 259",
    platform: "FutureLearn",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.8,
    reviewCount: 20962,
    duration: "34 hours",
    level: "Beginner",
    price: 549,
    originalPrice: 3499,
    discount: 82,
    currency: "INR",
    skills: ["Business Communication", "Presentation", "Public Speaking"],
    description:
      "Learn communication concepts to build strong skills in Business Communication, Presentation, Public Speaking.",
    isBookmarked: false,
    isRecommended: true,
    category: "Communication",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/259",
    students: 18949,
    projects: 2,
    aiScore: 86,
  },
  {
    id: 260,
    title: "Business Management Essentials 260",
    platform: "FutureLearn",
    instructor: "Gemma Leigh Roberts",
    rating: 4.6,
    reviewCount: 7515,
    duration: "4 hours",
    level: "Beginner",
    price: 0,
    originalPrice: 3499,
    discount: 80,
    currency: "INR",
    skills: ["Conflict Resolution", "Management", "Teamwork"],
    description:
      "Learn business management concepts to build strong skills in Conflict Resolution, Management, Teamwork.",
    isBookmarked: false,
    isRecommended: true,
    category: "Business Management",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/260",
    students: 35525,
    projects: 9,
    aiScore: 90,
  },
  {
    id: 261,
    title: "Finance Essentials 261",
    platform: "LinkedIn Learning",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.4,
    reviewCount: 31973,
    duration: "22 hours",
    level: "Advanced",
    price: 499,
    originalPrice: 3999,
    discount: 85,
    currency: "INR",
    skills: ["Personal Finance", "Investment", "Budgeting"],
    description:
      "Learn finance concepts to build strong skills in Personal Finance, Investment, Budgeting.",
    isBookmarked: false,
    isRecommended: true,
    category: "Finance",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/261",
    students: 72266,
    projects: 9,
    aiScore: 86,
  },
  {
    id: 262,
    title: "Healthcare Essentials 262",
    platform: "LinkedIn Learning",
    instructor: "Kain Ramsay",
    rating: 4.7,
    reviewCount: 40464,
    duration: "20 hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 82,
    currency: "INR",
    skills: ["Patient Care", "Nutrition", "Healthcare Management"],
    description:
      "Learn healthcare concepts to build strong skills in Patient Care, Nutrition, Healthcare Management.",
    isBookmarked: false,
    isRecommended: true,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/262",
    students: 176081,
    projects: 11,
    aiScore: 94,
  },
  {
    id: 263,
    title: "Wellness Essentials 263",
    platform: "LinkedIn Learning",
    instructor: "University of London Faculty",
    rating: 4.5,
    reviewCount: 36000,
    duration: "10 hours",
    level: "Beginner",
    price: 1499,
    originalPrice: 3999,
    discount: 86,
    currency: "INR",
    skills: ["Mindfulness", "Stress Management", "Meditation"],
    description:
      "Learn wellness concepts to build strong skills in Mindfulness, Stress Management, Meditation.",
    isBookmarked: false,
    isRecommended: true,
    category: "Wellness",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/263",
    students: 75715,
    projects: 9,
    aiScore: 95,
  },
  {
    id: 264,
    title: "Psychology Essentials 264",
    platform: "Udemy",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.6,
    reviewCount: 25121,
    duration: "35 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 3499,
    discount: 0,
    currency: "INR",
    skills: ["CBT", "Positive Psychology", "Mental Health"],
    description:
      "Learn psychology concepts to build strong skills in CBT, Positive Psychology, Mental Health.",
    isBookmarked: false,
    isRecommended: false,
    category: "Psychology",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/264",
    students: 162066,
    projects: 2,
    aiScore: 94,
  },
  {
    id: 265,
    title: "Counseling Essentials 265",
    platform: "edX",
    instructor: "TJ Walker",
    rating: 4.6,
    reviewCount: 24344,
    duration: "27 hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 0,
    discount: 82,
    currency: "INR",
    skills: ["Therapy", "Active Listening", "Counseling"],
    description:
      "Learn counseling concepts to build strong skills in Therapy, Active Listening, Counseling.",
    isBookmarked: false,
    isRecommended: false,
    category: "Counseling",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/265",
    students: 174335,
    projects: 5,
    aiScore: 89,
  },
  {
    id: 266,
    title: "Finance Essentials 266",
    platform: "FutureLearn",
    instructor: "University of London Faculty",
    rating: 4.3,
    reviewCount: 26654,
    duration: "10 hours",
    level: "Beginner",
    price: 549,
    originalPrice: 3499,
    discount: 80,
    currency: "INR",
    skills: ["Personal Finance", "Budgeting", "Investment"],
    description:
      "Learn finance concepts to build strong skills in Personal Finance, Budgeting, Investment.",
    isBookmarked: false,
    isRecommended: true,
    category: "Finance",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/266",
    students: 89375,
    projects: 3,
    aiScore: 86,
  },
  {
    id: 267,
    title: "Leadership Essentials 267",
    platform: "LinkedIn Learning",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.4,
    reviewCount: 17696,
    duration: "10 hours",
    level: "Intermediate",
    price: 549,
    originalPrice: 3499,
    discount: 82,
    currency: "INR",
    skills: ["Leadership", "Decision Making", "Influence"],
    description:
      "Learn leadership concepts to build strong skills in Leadership, Decision Making, Influence.",
    isBookmarked: false,
    isRecommended: false,
    category: "Leadership",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/267",
    students: 151776,
    projects: 5,
    aiScore: 91,
  },
  {
    id: 268,
    title: "Coaching Essentials 268",
    platform: "edX",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.6,
    reviewCount: 31204,
    duration: "31 hours",
    level: "Advanced",
    price: 0,
    originalPrice: 3999,
    discount: 0,
    currency: "INR",
    skills: ["Life Coaching", "Motivation", "Goal Setting"],
    description:
      "Learn coaching concepts to build strong skills in Life Coaching, Motivation, Goal Setting.",
    isBookmarked: false,
    isRecommended: false,
    category: "Coaching",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/268",
    students: 173034,
    projects: 5,
    aiScore: 85,
  },
  {
    id: 269,
    title: "Wellness Essentials 269",
    platform: "FutureLearn",
    instructor: "Gemma Leigh Roberts",
    rating: 4.6,
    reviewCount: 34081,
    duration: "14 hours",
    level: "Beginner",
    price: 1499,
    originalPrice: 3499,
    discount: 82,
    currency: "INR",
    skills: ["Meditation", "Mindfulness", "Stress Management"],
    description:
      "Learn wellness concepts to build strong skills in Meditation, Mindfulness, Stress Management.",
    isBookmarked: false,
    isRecommended: false,
    category: "Wellness",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/269",
    students: 17206,
    projects: 12,
    aiScore: 88,
  },
  {
    id: 270,
    title: "Counseling Essentials 270",
    platform: "edX",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.4,
    reviewCount: 5896,
    duration: "38 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 3999,
    discount: 80,
    currency: "INR",
    skills: ["Therapy", "Counseling", "Active Listening"],
    description:
      "Learn counseling concepts to build strong skills in Therapy, Counseling, Active Listening.",
    isBookmarked: false,
    isRecommended: true,
    category: "Counseling",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/270",
    students: 10097,
    projects: 11,
    aiScore: 89,
  },
  {
    id: 271,
    title: "Healthcare Essentials 271",
    platform: "LinkedIn Learning",
    instructor: "University of London Faculty",
    rating: 4.7,
    reviewCount: 31237,
    duration: "28 hours",
    level: "Intermediate",
    price: 0,
    originalPrice: 0,
    discount: 86,
    currency: "INR",
    skills: ["Patient Care", "Healthcare Management", "Nutrition"],
    description:
      "Learn healthcare concepts to build strong skills in Patient Care, Healthcare Management, Nutrition.",
    isBookmarked: false,
    isRecommended: false,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/271",
    students: 81894,
    projects: 12,
    aiScore: 95,
  },
  {
    id: 272,
    title: "Healthcare Essentials 272",
    platform: "edX",
    instructor: "Kain Ramsay",
    rating: 4.7,
    reviewCount: 39579,
    duration: "36 hours",
    level: "Intermediate",
    price: 549,
    originalPrice: 4999,
    discount: 80,
    currency: "INR",
    skills: ["Nutrition", "Patient Care", "Healthcare Management"],
    description:
      "Learn healthcare concepts to build strong skills in Nutrition, Patient Care, Healthcare Management.",
    isBookmarked: false,
    isRecommended: true,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/272",
    students: 169521,
    projects: 4,
    aiScore: 88,
  },
  {
    id: 273,
    title: "Coaching Essentials 273",
    platform: "Udemy",
    instructor: "TJ Walker",
    rating: 4.4,
    reviewCount: 25823,
    duration: "36 hours",
    level: "Beginner",
    price: 699,
    originalPrice: 0,
    discount: 86,
    currency: "INR",
    skills: ["Motivation", "Goal Setting", "Life Coaching"],
    description:
      "Learn coaching concepts to build strong skills in Motivation, Goal Setting, Life Coaching.",
    isBookmarked: false,
    isRecommended: true,
    category: "Coaching",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/273",
    students: 161479,
    projects: 8,
    aiScore: 85,
  },
  {
    id: 274,
    title: "Personal Development Essentials 274",
    platform: "Udemy",
    instructor: "Dr. Alyssa Richards",
    rating: 4.3,
    reviewCount: 30466,
    duration: "23 hours",
    level: "Beginner",
    price: 499,
    originalPrice: 4999,
    discount: 0,
    currency: "INR",
    skills: ["Self Improvement", "Time Management", "Confidence"],
    description:
      "Learn personal development concepts to build strong skills in Self Improvement, Time Management, Confidence.",
    isBookmarked: false,
    isRecommended: false,
    category: "Personal Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/274",
    students: 88974,
    projects: 12,
    aiScore: 94,
  },
  {
    id: 275,
    title: "Business Management Essentials 275",
    platform: "Udemy",
    instructor: "Dr. Alyssa Richards",
    rating: 4.4,
    reviewCount: 13039,
    duration: "24 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 3999,
    discount: 80,
    currency: "INR",
    skills: ["Conflict Resolution", "Teamwork", "Management"],
    description:
      "Learn business management concepts to build strong skills in Conflict Resolution, Teamwork, Management.",
    isBookmarked: false,
    isRecommended: false,
    category: "Business Management",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/275",
    students: 154948,
    projects: 9,
    aiScore: 87,
  },
  {
    id: 276,
    title: "Education Essentials 276",
    platform: "edX",
    instructor: "Kain Ramsay",
    rating: 4.6,
    reviewCount: 9613,
    duration: "37 hours",
    level: "Advanced",
    price: 0,
    originalPrice: 4999,
    discount: 80,
    currency: "INR",
    skills: ["Curriculum Design", "Teaching", "Learning Strategies"],
    description:
      "Learn education concepts to build strong skills in Curriculum Design, Teaching, Learning Strategies.",
    isBookmarked: false,
    isRecommended: false,
    category: "Education",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/276",
    students: 69515,
    projects: 12,
    aiScore: 85,
  },
  {
    id: 277,
    title: "Personal Development Essentials 277",
    platform: "LinkedIn Learning",
    instructor: "Kain Ramsay",
    rating: 4.7,
    reviewCount: 21819,
    duration: "16 hours",
    level: "Advanced",
    price: 699,
    originalPrice: 3499,
    discount: 86,
    currency: "INR",
    skills: ["Self Improvement", "Confidence", "Time Management"],
    description:
      "Learn personal development concepts to build strong skills in Self Improvement, Confidence, Time Management.",
    isBookmarked: false,
    isRecommended: true,
    category: "Personal Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/277",
    students: 166981,
    projects: 7,
    aiScore: 87,
  },
  {
    id: 278,
    title: "Leadership Essentials 278",
    platform: "Udemy",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.5,
    reviewCount: 26061,
    duration: "4 hours",
    level: "Beginner",
    price: 699,
    originalPrice: 3999,
    discount: 0,
    currency: "INR",
    skills: ["Influence", "Decision Making", "Leadership"],
    description:
      "Learn leadership concepts to build strong skills in Influence, Decision Making, Leadership.",
    isBookmarked: false,
    isRecommended: false,
    category: "Leadership",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/278",
    students: 150841,
    projects: 9,
    aiScore: 87,
  },
  {
    id: 279,
    title: "Creative Arts Essentials 279",
    platform: "Skillshare",
    instructor: "Kain Ramsay",
    rating: 4.6,
    reviewCount: 43117,
    duration: "22 hours",
    level: "Advanced",
    price: 1499,
    originalPrice: 3999,
    discount: 80,
    currency: "INR",
    skills: ["Art Therapy", "Design Thinking", "Creative Writing"],
    description:
      "Learn creative arts concepts to build strong skills in Art Therapy, Design Thinking, Creative Writing.",
    isBookmarked: false,
    isRecommended: false,
    category: "Creative Arts",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/279",
    students: 164179,
    projects: 9,
    aiScore: 85,
  },
  {
    id: 280,
    title: "Healthcare Essentials 280",
    platform: "edX",
    instructor: "University of London Faculty",
    rating: 4.5,
    reviewCount: 6051,
    duration: "10 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 0,
    discount: 85,
    currency: "INR",
    skills: ["Patient Care", "Nutrition", "Healthcare Management"],
    description:
      "Learn healthcare concepts to build strong skills in Patient Care, Nutrition, Healthcare Management.",
    isBookmarked: false,
    isRecommended: false,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/280",
    students: 81665,
    projects: 10,
    aiScore: 93,
  },
  {
    id: 281,
    title: "Finance Essentials 281",
    platform: "edX",
    instructor: "Dr. Alyssa Richards",
    rating: 4.7,
    reviewCount: 12667,
    duration: "20 hours",
    level: "Intermediate",
    price: 1299,
    originalPrice: 4999,
    discount: 86,
    currency: "INR",
    skills: ["Personal Finance", "Budgeting", "Investment"],
    description:
      "Learn finance concepts to build strong skills in Personal Finance, Budgeting, Investment.",
    isBookmarked: false,
    isRecommended: false,
    category: "Finance",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/281",
    students: 65978,
    projects: 4,
    aiScore: 94,
  },
  {
    id: 282,
    title: "Creative Arts Essentials 282",
    platform: "edX",
    instructor: "Dr. Alyssa Richards",
    rating: 4.5,
    reviewCount: 30156,
    duration: "7 hours",
    level: "Intermediate",
    price: 699,
    originalPrice: 0,
    discount: 82,
    currency: "INR",
    skills: ["Design Thinking", "Creative Writing", "Art Therapy"],
    description:
      "Learn creative arts concepts to build strong skills in Design Thinking, Creative Writing, Art Therapy.",
    isBookmarked: false,
    isRecommended: true,
    category: "Creative Arts",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/282",
    students: 15703,
    projects: 7,
    aiScore: 86,
  },
  {
    id: 283,
    title: "Leadership Essentials 283",
    platform: "Skillshare",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.4,
    reviewCount: 8488,
    duration: "22 hours",
    level: "Beginner",
    price: 1299,
    originalPrice: 3499,
    discount: 0,
    currency: "INR",
    skills: ["Leadership", "Influence", "Decision Making"],
    description:
      "Learn leadership concepts to build strong skills in Leadership, Influence, Decision Making.",
    isBookmarked: false,
    isRecommended: false,
    category: "Leadership",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/283",
    students: 132927,
    projects: 6,
    aiScore: 94,
  },
  {
    id: 284,
    title: "Personal Development Essentials 284",
    platform: "LinkedIn Learning",
    instructor: "TJ Walker",
    rating: 4.5,
    reviewCount: 12840,
    duration: "25 hours",
    level: "Intermediate",
    price: 1499,
    originalPrice: 3499,
    discount: 0,
    currency: "INR",
    skills: ["Confidence", "Self Improvement", "Time Management"],
    description:
      "Learn personal development concepts to build strong skills in Confidence, Self Improvement, Time Management.",
    isBookmarked: false,
    isRecommended: true,
    category: "Personal Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/284",
    students: 161483,
    projects: 8,
    aiScore: 86,
  },
  {
    id: 285,
    title: "Psychology Essentials 285",
    platform: "Skillshare",
    instructor: "University of London Faculty",
    rating: 4.5,
    reviewCount: 24045,
    duration: "35 hours",
    level: "Beginner",
    price: 699,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Positive Psychology", "Mental Health", "CBT"],
    description:
      "Learn psychology concepts to build strong skills in Positive Psychology, Mental Health, CBT.",
    isBookmarked: false,
    isRecommended: false,
    category: "Psychology",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/285",
    students: 121713,
    projects: 8,
    aiScore: 90,
  },
  {
    id: 286,
    title: "Wellness Essentials 286",
    platform: "FutureLearn",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.7,
    reviewCount: 35828,
    duration: "21 hours",
    level: "Advanced",
    price: 549,
    originalPrice: 4999,
    discount: 80,
    currency: "INR",
    skills: ["Stress Management", "Mindfulness", "Meditation"],
    description:
      "Learn wellness concepts to build strong skills in Stress Management, Mindfulness, Meditation.",
    isBookmarked: false,
    isRecommended: false,
    category: "Wellness",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/286",
    students: 79008,
    projects: 5,
    aiScore: 95,
  },
  {
    id: 287,
    title: "Business Management Essentials 287",
    platform: "FutureLearn",
    instructor: "Kain Ramsay",
    rating: 4.4,
    reviewCount: 35181,
    duration: "6 hours",
    level: "Beginner",
    price: 1499,
    originalPrice: 3499,
    discount: 85,
    currency: "INR",
    skills: ["Management", "Conflict Resolution", "Teamwork"],
    description:
      "Learn business management concepts to build strong skills in Management, Conflict Resolution, Teamwork.",
    isBookmarked: false,
    isRecommended: false,
    category: "Business Management",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/287",
    students: 168599,
    projects: 11,
    aiScore: 88,
  },
  {
    id: 288,
    title: "Psychology Essentials 288",
    platform: "Udemy",
    instructor: "TJ Walker",
    rating: 4.7,
    reviewCount: 26302,
    duration: "7 hours",
    level: "Beginner",
    price: 1499,
    originalPrice: 4999,
    discount: 0,
    currency: "INR",
    skills: ["Mental Health", "CBT", "Positive Psychology"],
    description:
      "Learn psychology concepts to build strong skills in Mental Health, CBT, Positive Psychology.",
    isBookmarked: false,
    isRecommended: true,
    category: "Psychology",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/288",
    students: 49442,
    projects: 5,
    aiScore: 86,
  },
  {
    id: 289,
    title: "Business Management Essentials 289",
    platform: "edX",
    instructor: "Kain Ramsay",
    rating: 4.6,
    reviewCount: 36944,
    duration: "15 hours",
    level: "Beginner",
    price: 499,
    originalPrice: 4999,
    discount: 85,
    currency: "INR",
    skills: ["Management", "Conflict Resolution", "Teamwork"],
    description:
      "Learn business management concepts to build strong skills in Management, Conflict Resolution, Teamwork.",
    isBookmarked: false,
    isRecommended: false,
    category: "Business Management",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/289",
    students: 109140,
    projects: 3,
    aiScore: 89,
  },
  {
    id: 290,
    title: "Coaching Essentials 290",
    platform: "FutureLearn",
    instructor: "Brenda Bailey-Hughes",
    rating: 4.5,
    reviewCount: 34116,
    duration: "30 hours",
    level: "Intermediate",
    price: 1499,
    originalPrice: 3999,
    discount: 85,
    currency: "INR",
    skills: ["Life Coaching", "Goal Setting", "Motivation"],
    description:
      "Learn coaching concepts to build strong skills in Life Coaching, Goal Setting, Motivation.",
    isBookmarked: false,
    isRecommended: false,
    category: "Coaching",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/290",
    students: 53182,
    projects: 5,
    aiScore: 95,
  },
  {
    id: 291,
    title: "Leadership Essentials 291",
    platform: "FutureLearn",
    instructor: "TJ Walker",
    rating: 4.4,
    reviewCount: 42913,
    duration: "25 hours",
    level: "Beginner",
    price: 499,
    originalPrice: 3499,
    discount: 82,
    currency: "INR",
    skills: ["Decision Making", "Influence", "Leadership"],
    description:
      "Learn leadership concepts to build strong skills in Decision Making, Influence, Leadership.",
    isBookmarked: false,
    isRecommended: false,
    category: "Leadership",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/291",
    students: 77598,
    projects: 2,
    aiScore: 89,
  },
  {
    id: 292,
    title: "Leadership Essentials 292",
    platform: "edX",
    instructor: "Joeel & Natalie Rivera",
    rating: 4.8,
    reviewCount: 5823,
    duration: "22 hours",
    level: "Beginner",
    price: 1299,
    originalPrice: 3999,
    discount: 85,
    currency: "INR",
    skills: ["Leadership", "Influence", "Decision Making"],
    description:
      "Learn leadership concepts to build strong skills in Leadership, Influence, Decision Making.",
    isBookmarked: false,
    isRecommended: true,
    category: "Leadership",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/292",
    students: 65200,
    projects: 10,
    aiScore: 93,
  },
  {
    id: 293,
    title: "Healthcare Essentials 293",
    platform: "FutureLearn",
    instructor: "Kain Ramsay",
    rating: 4.6,
    reviewCount: 32499,
    duration: "34 hours",
    level: "Intermediate",
    price: 1499,
    originalPrice: 4999,
    discount: 80,
    currency: "INR",
    skills: ["Patient Care", "Nutrition", "Healthcare Management"],
    description:
      "Learn healthcare concepts to build strong skills in Patient Care, Nutrition, Healthcare Management.",
    isBookmarked: false,
    isRecommended: false,
    category: "Healthcare",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/293",
    students: 48353,
    projects: 2,
    aiScore: 85,
  },
  {
    id: 294,
    title: "Personal Development Essentials 294",
    platform: "Coursera",
    instructor: "Gemma Leigh Roberts",
    rating: 4.3,
    reviewCount: 10148,
    duration: "23 hours",
    level: "Beginner",
    price: 549,
    originalPrice: 0,
    discount: 82,
    currency: "INR",
    skills: ["Self Improvement", "Time Management", "Confidence"],
    description:
      "Learn personal development concepts to build strong skills in Self Improvement, Time Management, Confidence.",
    isBookmarked: false,
    isRecommended: false,
    category: "Personal Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/294",
    students: 166463,
    projects: 11,
    aiScore: 90,
  },
  {
    id: 295,
    title: "Finance Essentials 295",
    platform: "FutureLearn",
    instructor: "Dr. Alyssa Richards",
    rating: 4.8,
    reviewCount: 38266,
    duration: "32 hours",
    level: "Advanced",
    price: 0,
    originalPrice: 3499,
    discount: 0,
    currency: "INR",
    skills: ["Personal Finance", "Investment", "Budgeting"],
    description:
      "Learn finance concepts to build strong skills in Personal Finance, Investment, Budgeting.",
    isBookmarked: false,
    isRecommended: true,
    category: "Finance",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/295",
    students: 18323,
    projects: 7,
    aiScore: 86,
  },
  {
    id: 296,
    title: "Education Essentials 296",
    platform: "FutureLearn",
    instructor: "Gemma Leigh Roberts",
    rating: 4.6,
    reviewCount: 39199,
    duration: "5 hours",
    level: "Advanced",
    price: 499,
    originalPrice: 0,
    discount: 86,
    currency: "INR",
    skills: ["Curriculum Design", "Learning Strategies", "Teaching"],
    description:
      "Learn education concepts to build strong skills in Curriculum Design, Learning Strategies, Teaching.",
    isBookmarked: false,
    isRecommended: true,
    category: "Education",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/296",
    students: 169002,
    projects: 3,
    aiScore: 93,
  },
  {
    id: 297,
    title: "Personal Development Essentials 297",
    platform: "Udemy",
    instructor: "TJ Walker",
    rating: 4.6,
    reviewCount: 42652,
    duration: "14 hours",
    level: "Advanced",
    price: 549,
    originalPrice: 0,
    discount: 0,
    currency: "INR",
    skills: ["Confidence", "Time Management", "Self Improvement"],
    description:
      "Learn personal development concepts to build strong skills in Confidence, Time Management, Self Improvement.",
    isBookmarked: false,
    isRecommended: true,
    category: "Personal Development",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/480x270/default.jpg",
    courseUrl: "https://example.com/course/297",
    students: 121517,
    projects: 9,
    aiScore: 92,
  },

  // … continuing entries up to id 297
];
// AI Recommendation Engine
class AIRecommendationEngine {
  constructor(userProfile, courses) {
    this.userProfile = userProfile;
    this.courses = courses;

    // FIXED: Increased skill match weight significantly
    this.weights = {
      skillMatch: 0.4, // Increased from 0.25
      careerGoalAlignment: 0.2,
      levelMatch: 0.15,
      platformPreference: 0.1,
      budgetFit: 0.1,
      popularityScore: 0.03, // Reduced
      freshnessScore: 0.02, // Reduced
    };
  }

  // FIXED: Exact and partial skill matching with scoring
  calculateSkillMatchScore(courseSkills, userSkills) {
    if (!courseSkills || !userSkills || userSkills.length === 0) {
      return 0;
    }

    // Normalize user skills to array of strings
    const normalizedUserSkills = userSkills
      .map((skill) => {
        const skillName = typeof skill === "object" ? skill.name : skill;
        return skillName ? skillName.toLowerCase().trim() : "";
      })
      .filter(Boolean);

    // Normalize course skills
    const normalizedCourseSkills = courseSkills
      .map((skill) => (skill ? skill.toLowerCase().trim() : ""))
      .filter(Boolean);

    let exactMatches = 0;
    let partialMatches = 0;
    let relatedMatches = 0;

    // Define skill relationships for better matching
    const skillRelations = {
      react: ["reactjs", "react.js", "react native", "jsx"],
      javascript: ["js", "es6", "node.js", "nodejs", "typescript"],
      typescript: ["ts", "javascript"],
      "node.js": ["nodejs", "express", "javascript", "backend"],
      css: ["sass", "scss", "less", "styling", "flexbox", "grid"],
      html: ["html5", "markup", "web"],
      python: ["django", "flask", "fastapi"],
      java: ["spring", "kotlin"],
      aws: ["cloud", "ec2", "s3", "lambda"],
      docker: ["containerization", "kubernetes"],
    };

    normalizedCourseSkills.forEach((courseSkill) => {
      // Check for exact matches
      const hasExactMatch = normalizedUserSkills.some(
        (userSkill) => userSkill === courseSkill
      );

      if (hasExactMatch) {
        exactMatches++;
        return;
      }

      // Check for partial matches (but avoid false positives)
      const hasPartialMatch = normalizedUserSkills.some((userSkill) => {
        // Must match at least 80% of the shorter string length
        const minLen = Math.min(userSkill.length, courseSkill.length);
        if (minLen < 3) return false; // Avoid matching very short strings

        return (
          (courseSkill.includes(userSkill) ||
            userSkill.includes(courseSkill)) &&
          (userSkill.length >= courseSkill.length * 0.8 ||
            courseSkill.length >= userSkill.length * 0.8)
        );
      });

      if (hasPartialMatch) {
        partialMatches++;
        return;
      }

      // Check for related skill matches
      const hasRelatedMatch = normalizedUserSkills.some((userSkill) => {
        const relatedSkills = skillRelations[userSkill] || [];
        return relatedSkills.includes(courseSkill);
      });

      if (hasRelatedMatch) {
        relatedMatches++;
      }
    });

    // Calculate weighted score
    const totalCourseSkills = normalizedCourseSkills.length;
    const exactScore = (exactMatches / totalCourseSkills) * 100;
    const partialScore = (partialMatches / totalCourseSkills) * 60;
    const relatedScore = (relatedMatches / totalCourseSkills) * 30;

    // Bonus for having multiple exact matches
    const matchBonus = exactMatches >= 2 ? 20 : 0;

    return Math.min(100, exactScore + partialScore + relatedScore + matchBonus);
  }

  calculateRecommendationScore(course) {
    let score = 0;

    // Validate course
    if (!course || !course.skills || !Array.isArray(course.skills)) {
      return 0;
    }

    const userSkills = this.userProfile.skills || [];
    const userGoals = this.userProfile.careerGoals || [];
    const preferredPlatforms = this.userProfile.preferredPlatforms || [];

    // 1. FIXED Skill Match Score (40%)
    const skillScore = this.calculateSkillMatchScore(course.skills, userSkills);
    score += skillScore * this.weights.skillMatch;

    // 2. Career Goal Alignment (20%)
    const goalMatches = userGoals.filter((goal) => {
      if (!goal || typeof goal !== "string") return false;
      const goalLower = goal.toLowerCase();

      // Match against category
      const categoryMatch =
        course.category && course.category.toLowerCase().includes(goalLower);

      // Match against course skills with exact or strong partial match
      const skillMatch = course.skills.some((skill) => {
        if (!skill) return false;
        const skillLower = skill.toLowerCase();
        return (
          skillLower === goalLower ||
          (skillLower.includes(goalLower) && goalLower.length > 3) ||
          (goalLower.includes(skillLower) && skillLower.length > 3)
        );
      });

      // Match against title (for specific technologies)
      const titleMatch =
        course.title && course.title.toLowerCase().includes(goalLower);

      return categoryMatch || skillMatch || titleMatch;
    }).length;

    const goalScore =
      goalMatches > 0
        ? (goalMatches / Math.max(userGoals.length, 1)) * 100
        : 20;
    score += goalScore * this.weights.careerGoalAlignment;

    // 3. Level Match (15%)
    const levelScore = this.getLevelScore(course.level);
    score += levelScore * this.weights.levelMatch;

    // 4. Platform Preference (10%)
    const platformScore = preferredPlatforms.includes(course.platform)
      ? 100
      : 50;
    score += platformScore * this.weights.platformPreference;

    // 5. Budget Fit (10%)
    const budgetScore = this.getBudgetScore(course.price);
    score += budgetScore * this.weights.budgetFit;

    // 6. Popularity Score (3%)
    const ratingScore = (course.rating / 5) * 50;
    const studentScore = Math.min((course.students / 100000) * 50, 50);
    const popularityScore = ratingScore + studentScore;
    score += popularityScore * this.weights.popularityScore;

    // 7. Freshness Score (2%)
    const daysSinceUpdate = this.getDaysSinceUpdate(course.lastUpdated);
    const freshnessScore = Math.max(100 - (daysSinceUpdate / 30) * 10, 0);
    score += freshnessScore * this.weights.freshnessScore;

    return Math.round(score);
  }

  getLevelScore(courseLevel) {
    const levelMap = {
      Beginner: { Beginner: 100, Intermediate: 70, Advanced: 30 },
      Intermediate: { Beginner: 50, Intermediate: 100, Advanced: 70 },
      Advanced: { Beginner: 20, Intermediate: 60, Advanced: 100 },
    };

    return levelMap[this.userProfile.experience]?.[courseLevel] || 50;
  }

  getBudgetScore(price) {
    switch (this.userProfile.budget) {
      case "low":
        return price === 0 ? 100 : price <= 500 ? 80 : price <= 1000 ? 40 : 20;
      case "medium":
        return price === 0 ? 100 : price <= 1000 ? 90 : price <= 2000 ? 70 : 40;
      case "high":
        return 100;
      default:
        return 50;
    }
  }

  getDaysSinceUpdate(lastUpdated) {
    const updateDate = new Date(lastUpdated);
    const today = new Date();
    const diffTime = Math.abs(today - updateDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getRecommendations(limit = 10) {
    const coursesWithScores = this.courses.map((course) => ({
      ...course,
      aiScore: this.calculateRecommendationScore(course),
      recommendationReason: this.getRecommendationReason(course),
    }));

    return coursesWithScores
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, limit);
  }

  getRecommendationReason(course) {
    const reasons = [];

    if (!course || !course.skills || !Array.isArray(course.skills)) {
      return "Recommended for you";
    }

    const userSkills = this.userProfile.skills || [];
    const userGoals = this.userProfile.careerGoals || [];

    // Skill matches
    const normalizedUserSkills = userSkills
      .map((skill) => {
        const skillName = typeof skill === "object" ? skill.name : skill;
        return skillName ? skillName.toLowerCase() : "";
      })
      .filter(Boolean);

    const skillMatches = course.skills.filter((skill) => {
      if (!skill || typeof skill !== "string") return false;
      return normalizedUserSkills.some(
        (userSkill) =>
          userSkill === skill.toLowerCase() ||
          (skill.toLowerCase().includes(userSkill) && userSkill.length > 3)
      );
    });

    if (skillMatches.length > 0) {
      reasons.push(
        `Matches your ${skillMatches.slice(0, 2).join(", ")} skills`
      );
    }

    // Career goals
    const goalMatches = userGoals.filter((goal) => {
      if (!goal || typeof goal !== "string") return false;
      return (
        (course.category &&
          course.category.toLowerCase().includes(goal.toLowerCase())) ||
        (course.title &&
          course.title.toLowerCase().includes(goal.toLowerCase()))
      );
    });

    if (goalMatches.length > 0) {
      reasons.push(`Perfect for ${goalMatches[0]}`);
    }

    // Level appropriateness
    if (course.level === this.userProfile.experience) {
      reasons.push(`Ideal for ${this.userProfile.experience} level`);
    }

    // Highly rated
    if (course.rating >= 4.7) {
      reasons.push(`Highly rated (${course.rating})`);
    }

    // Popular
    if (course.students > 100000) {
      reasons.push(
        `Popular choice (${Math.floor(course.students / 1000)}k students)`
      );
    }

    // Free
    if (course.price === 0) {
      reasons.push("Free course");
    }

    // Many projects
    if (course.projects >= 10) {
      reasons.push(`${course.projects} hands-on projects`);
    }

    return reasons.slice(0, 2).join(" • ") || "Recommended for you";
  }
}

export default function CourseExplorerPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("ai-recommended");
  const [bookmarkedCourses, setBookmarkedCourses] = useState(new Set());
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const { triggerCourseRecommendation } = useNotificationTriggers();
  const { trackCourseBookmark, trackPageVisit } = useUserActivityTracker();
  const [showFilters, setShowFilters] = useState(false);

  // Track page visit on component mount
  useEffect(() => {
    trackPageVisit("course-explorer");
  }, [trackPageVisit]);

  const [formData, setFormData] = useState({
    currentRole: "",
    experience: "",
    careerGoals: [],
    preferredPlatforms: [],
    budget: "",
    timeCommitment: "",
    learningStyle: "",
    skills: [],
  });

  // Fetch courses with AI scoring
  const fetchCoursesWithAI = async () => {
    setLoading(true);
    try {
      const filteredCourses = [...mockCourses];

      const aiEngine = new AIRecommendationEngine(formData, filteredCourses);
      const coursesWithAI = aiEngine.getRecommendations(filteredCourses.length);

      setCourses(coursesWithAI);

      // Trigger course recommendation notification only if preferences have changed
      const recommendedCourses = coursesWithAI.filter(
        (course: any) => course.isRecommended
      );
      if (recommendedCourses.length > 0) {
        const category = formData.careerGoals?.[0] || "your interests";

        // Check if this is due to a preference change
        const currentPreferences = JSON.stringify(formData);
        const lastPreferences = localStorage.getItem("lastCoursePreferences");
        const isPreferenceChange =
          lastPreferences && lastPreferences !== currentPreferences;

        // Store current preferences for next comparison
        localStorage.setItem("lastCoursePreferences", currentPreferences);

        // Only trigger notification if preferences changed or it's been a while
        if (isPreferenceChange) {
          triggerCourseRecommendation(
            recommendedCourses.length,
            category,
            true
          ); // Force notify on preference change
        } else if (!lastPreferences) {
          // First time visit - don't spam, but allow one notification
          triggerCourseRecommendation(recommendedCourses.length, category);
        }
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Load courses
  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    await fetchCoursesWithAI();

    setLoading(false);
  }, [formData]); // Only depend on formData since filtering is now done in render

  const [skills, setSkills] = useState([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("courseBookmarks");
    if (savedBookmarks) {
      try {
        const bookmarksArray = JSON.parse(savedBookmarks);
        setBookmarkedCourses(new Set(bookmarksArray));
      } catch (error) {
        console.error("Error loading bookmarks:", error);
        // Set default bookmarks if parsing fails
        setBookmarkedCourses(new Set([2, 5, 12, 19, 26, 35, 38, 39]));
      }
    } else {
      // Set default bookmarks for first-time users
      setBookmarkedCourses(new Set([2, 5, 12, 19, 26, 35, 38, 39]));
    }
  }, []);

  // Fix the fetchSkills function - line where you set formData
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Fetched Profile:", data);

        if (!res.ok) {
          return toast({
            title: "Error",
            description: data.message || "Failed to fetch profile.",
            variant: "destructive",
          });
        }

        // FIXED: Handle both response formats (data.data or data directly)
        const profile = data.data || data;

        setFormData({
          currentRole: profile.currentRole || "",
          experience: profile.experience || "",
          careerGoals: profile.careerGoals || [],
          preferredPlatforms: profile.preferredPlatforms || [],
          budget: profile.budget || "",
          timeCommitment: profile.timeCommitment || "",
          learningStyle: profile.learningStyle || [],
          skills: profile.skills || [],
        });

        setSkills(profile.skills || []);

        console.log("✅ FormData set:", {
          currentRole: profile.currentRole,
          experience: profile.experience,
          careerGoals: profile.careerGoals,
          budget: profile.budget,
          timeCommitment: profile.timeCommitment,
        });
      } catch (error) {
        console.error("Fetch Error:", error);
        toast({
          title: "Error",
          description: "Something went wrong while fetching profile.",
          variant: "destructive",
        });
      }
    };

    fetchSkills();
  }, []);

  // Fetch on mount or when formData changes
  useEffect(() => {
    fetchCoursesWithAI();
  }, [formData]);

  // Initial load
  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Refresh courses
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCourses();
    setRefreshing(false);
  };

  // Toggle bookmark
  const toggleBookmark = (courseId) => {
    setBookmarkedCourses((prev) => {
      const newBookmarks = new Set(prev);
      const isBookmarking = !newBookmarks.has(courseId);

      if (newBookmarks.has(courseId)) {
        newBookmarks.delete(courseId);
      } else {
        newBookmarks.add(courseId);

        // Find course details and track bookmark
        const course = courses.find((c: any) => c.id === courseId);
        if (course && isBookmarking) {
          trackCourseBookmark(courseId.toString(), course.title);
        }
      }

      // Save to localStorage
      try {
        localStorage.setItem(
          "courseBookmarks",
          JSON.stringify(Array.from(newBookmarks))
        );
      } catch (error) {
        console.error("Error saving bookmarks:", error);
      }

      return newBookmarks;
    });
  };

  // Filter courses for tabs with search and filters
  const applyFilters = (coursesToFilter) => {
    let filtered = coursesToFilter;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((course) => {
        if (!course) return false;
        const searchLower = searchTerm.toLowerCase();
        return (
          (course.title && course.title.toLowerCase().includes(searchLower)) ||
          (course.description &&
            course.description.toLowerCase().includes(searchLower)) ||
          (course.instructor &&
            course.instructor.toLowerCase().includes(searchLower)) ||
          (course.skills &&
            Array.isArray(course.skills) &&
            course.skills.some(
              (skill) =>
                skill &&
                typeof skill === "string" &&
                skill.toLowerCase().includes(searchLower)
            )) ||
          (course.category &&
            course.category.toLowerCase().includes(searchLower)) ||
          (course.platform &&
            course.platform.toLowerCase().includes(searchLower))
        );
      });
    }

    // Apply level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter(
        (course) => course.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    // Apply platform filter
    if (selectedPlatform !== "all") {
      filtered = filtered.filter(
        (course) =>
          course.platform.toLowerCase() === selectedPlatform.toLowerCase()
      );
    }

    // Apply sorting
    if (sortBy === "ai-recommended") {
      filtered = filtered.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
    } else if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered = filtered.sort(
        (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
      );
    } else if (sortBy === "popular") {
      filtered = filtered.sort((a, b) => b.students - a.students);
    } else if (sortBy === "projects") {
      filtered = filtered.sort((a, b) => b.projects - a.projects);
    }

    return filtered;
  };

  const filteredCourses = applyFilters(courses);

  // Get AI recommended courses (based on aiScore > 80 or isRecommended flag)
  const recommendedCourses = applyFilters(
    courses.filter(
      (course) =>
        course.isRecommended || (course.aiScore && course.aiScore > 80)
    )
  );

  const bookmarkedCoursesData = applyFilters(
    courses.filter((course) => bookmarkedCourses.has(course.id))
  );

  // Format price
  const formatPrice = (price, currency = "USD") => {
    if (price === 0) return "Free";

    // Convert USD to INR (approximate rate: 1 USD = 83 INR)
    const priceInINR = currency === "USD" ? price * 83 : price;

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(priceInINR);
  };

  // Get category stats
  const categoryStats = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Enhanced Header - Mobile Optimized */}
        <div className="text-center space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Course Explorer
            </h1>
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered course recommendations tailored for developers
          </p>
        </div>

        {/* AI Personalization Card - Premium Design */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          <CardContent className="relative p-4 sm:p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg animate-pulse">
                    <Brain className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-lg">
                      AI Personalization
                    </h3>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-0.5 shadow-md">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Courses optimized for your profile
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = "/dashboard/profile")}
                className="hover:bg-white/50 transition-colors"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* User Profile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Skills */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Skills
                  </span>
                </div>
                <div className="space-y-1">
                  {formData.skills?.length > 0 ? (
                    <>
                      <div className="flex flex-wrap gap-1">
                        {formData.skills.slice(0, 2).map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-blue-50 text-blue-700 border border-blue-200"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                      {formData.skills.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{formData.skills.length - 2} more
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Not set</p>
                  )}
                </div>
              </div>

              {/* Career Goals */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Goals
                  </span>
                </div>
                <div className="space-y-1">
                  {formData.careerGoals?.length > 0 ? (
                    <>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {formData.careerGoals[0]}
                      </p>
                      {formData.careerGoals.length > 1 && (
                        <p className="text-xs text-gray-500">
                          +{formData.careerGoals.length - 1} more
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Not set</p>
                  )}
                </div>
              </div>

              {/* Budget */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100 hover:border-green-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Budget
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {formData.budget ? (
                    <>
                      <Badge
                        className={`text-xs font-medium ${
                          formData.budget === "low"
                            ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                            : formData.budget === "medium"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {formData.budget.charAt(0).toUpperCase() +
                          formData.budget.slice(1)}
                      </Badge>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Not set</p>
                  )}
                </div>
              </div>

              {/* Time Commitment */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Time
                  </span>
                </div>
                <div>
                  {formData.timeCommitment ? (
                    <Badge
                      className={`text-xs font-medium ${
                        formData.timeCommitment === "part-time"
                          ? "bg-orange-50 text-orange-700 border border-orange-200"
                          : formData.timeCommitment === "full-time"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {formData.timeCommitment
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join("-")}
                    </Badge>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Not set</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6 w-full lg:w-auto justify-between lg:justify-end">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-purple-600">
                    {recommendedCourses.length}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-600">
                    AI Matches
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-green-600">
                    {courses.filter((c) => c.price === 0).length}
                  </div>
                  <div className="text-xs sm:text-sm text-green-600">
                    Free Courses
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-orange-600">
                    {Math.round(
                      courses.reduce((sum, c) => sum + c.rating, 0) /
                        courses.length || 0
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-orange-600">
                    Avg Rating
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Search and Filters - Mobile First Design */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                Search & Filter Courses
              </CardTitle>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="gap-2 w-full sm:w-auto"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2 w-full sm:w-auto sm:hidden"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>

                <Badge
                  variant="secondary"
                  className="px-2 sm:px-3 py-1 text-xs self-center"
                >
                  {courses.length}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-3 sm:p-6 pt-0">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 transform -translate-y-1/2" />
                <Input
                  placeholder="Search courses, skills, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 sm:h-12 text-sm sm:text-base w-full"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div
              className={`space-y-3 sm:space-y-0 ${
                showFilters ? "block" : "hidden"
              } sm:block`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Level Select */}
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="h-10 sm:h-12 w-full">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                {/* Platform Select */}
                <Select
                  value={selectedPlatform}
                  onValueChange={setSelectedPlatform}
                >
                  <SelectTrigger className="h-10 sm:h-12 w-full">
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="udemy">Udemy</SelectItem>
                    <SelectItem value="coursera">Coursera</SelectItem>
                    <SelectItem value="freecodecamp">FreeCodeCamp</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Select */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10 sm:h-12 w-full">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-recommended">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                        AI Recommended
                      </div>
                    </SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="projects">Most Projects</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode (Desktop Only) */}
                <div className="hidden lg:flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="pt-3 sm:pt-4 border-t">
                <div className="flex flex-wrap gap-2 justify-start sm:justify-center">
                  {Object.entries(categoryStats)
                    .slice(0, 6)
                    .map(([category, count]) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 text-xs transition-colors duration-200"
                        onClick={() => setSearchTerm(category)}
                      >
                        {category} ({count})
                      </Badge>
                    ))}
                </div>
              </div>

              {/* Search Stats */}
              {!loading && (
                <div className="pt-3 sm:pt-4 border-t flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-600 text-center">
                  <span>Found {courses.length} courses</span>
                  {searchTerm && (
                    <span className="text-blue-600">
                      Searching for "{searchTerm}"
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50 mt-3">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-red-600">
                <ExternalLink className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="flex-1 text-sm sm:text-base">{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadCourses}
                  className="ml-auto text-xs w-full sm:w-auto"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Mobile-First Tabs */}
        <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 h-12 sm:h-14 bg-white shadow-sm min-w-[300px]">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm transition-all duration-200"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>All ({mockCourses.length})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="recommended"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm transition-all duration-200"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                  <span>AI ({recommendedCourses.length})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="bookmarked"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm transition-all duration-200"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Saved ({bookmarkedCoursesData.length})</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="relative">
                  <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 animate-spin mx-auto text-blue-600" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 animate-pulse" />
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                  AI is analyzing courses for personalized recommendations...
                </p>
              </div>
            </div>
          )}

          {/* All Courses Tab */}
          <TabsContent value="all" className="space-y-4">
            <CourseGrid
              courses={mockCourses}
              bookmarkedCourses={bookmarkedCourses}
              onToggleBookmark={toggleBookmark}
              loading={loading}
              formatPrice={formatPrice}
              viewMode={viewMode}
            />
          </TabsContent>

          {/* Recommended Courses Tab */}
          <TabsContent value="recommended" className="space-y-4">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                    <div>
                      <h3 className="font-medium sm:font-semibold text-purple-900 text-sm sm:text-base">
                        AI-Powered Recommendations
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-700 mt-0.5">
                        Personally selected based on your skills, goals, and
                        preferences.
                      </p>
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-purple-600 text-white text-xs sm:text-sm">
                      {Math.round(
                        recommendedCourses.reduce(
                          (sum, course) => sum + course.aiScore,
                          0
                        ) / recommendedCourses.length || 0
                      )}
                      % Match
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CourseGrid
              courses={recommendedCourses}
              bookmarkedCourses={bookmarkedCourses}
              onToggleBookmark={toggleBookmark}
              loading={loading}
              formatPrice={formatPrice}
              showAIScore={true}
              viewMode={viewMode}
            />
          </TabsContent>

          {/* Bookmarked Courses Tab */}
          <TabsContent value="bookmarked" className="space-y-4">
            {bookmarkedCoursesData.length === 0 && !loading ? (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="py-12 sm:py-20 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Bookmark className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    No Bookmarked Courses
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
                    Start bookmarking courses you're interested in to access
                    them quickly!
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = document.querySelector('[value="all"]');
                      tabs?.click();
                    }}
                    className="gap-2"
                  >
                    <Search className="h-4 w-4" />
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <CourseGrid
                courses={bookmarkedCoursesData}
                bookmarkedCourses={bookmarkedCourses}
                onToggleBookmark={toggleBookmark}
                loading={loading}
                formatPrice={formatPrice}
                viewMode={viewMode}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Enhanced Course Grid Component - Mobile First
function CourseGrid({
  courses,
  bookmarkedCourses,
  onToggleBookmark,
  loading,
  formatPrice,
  showAIScore = false,
  viewMode = "grid",
}) {
  if (loading) {
    return (
      <div
        className={`grid gap-4 sm:gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {[...Array(6)].map((_, i) => (
          <CourseCardSkeleton key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="py-12 sm:py-20 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Search className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            No Courses Found
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={`grid gap-4 sm:gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {courses.map((course) => (
        <EnhancedCourseCard
          key={course.id}
          course={course}
          isBookmarked={bookmarkedCourses.has(course.id)}
          onToggleBookmark={() => onToggleBookmark(course.id)}
          formatPrice={formatPrice}
          showAIScore={showAIScore}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}

// Enhanced Course Card Component - Mobile Optimized
function EnhancedCourseCard({
  course,
  isBookmarked,
  onToggleBookmark,
  formatPrice,
  showAIScore = false,
  viewMode = "grid",
}) {
  const discountBadge =
    course.originalPrice && course.originalPrice > course.price
      ? `${Math.round(
          ((course.originalPrice - course.price) / course.originalPrice) * 100
        )}% OFF`
      : null;

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-[1.01]">
        <div className="flex flex-col sm:flex-row">
          {/* Course Image */}
          <div className="relative sm:w-48 lg:w-56 flex-shrink-0">
            <div className="aspect-video sm:aspect-square relative overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const colors = {
                    Udemy: "A435F0",
                    Coursera: "0056D3",
                    FreeCodeCamp: "0A0A23",
                  };
                  const color = colors[course.platform] || "6366F1";
                  e.target.src = `https://via.placeholder.com/400x225/${color}/white?text=${encodeURIComponent(
                    course.platform
                  )}`;
                }}
              />

              {/* Bookmark Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleBookmark();
                }}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg h-8 w-8 p-0"
              >
                <Bookmark
                  className={`h-3 w-3 ${
                    isBookmarked
                      ? "fill-blue-600 text-blue-600"
                      : "text-gray-600"
                  }`}
                />
              </Button>

              {/* Badges */}
              {discountBadge && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white font-semibold text-xs">
                  {discountBadge}
                </Badge>
              )}
            </div>
          </div>

          {/* Course Content */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-base sm:text-lg line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
                  {course.title}
                </h3>
                {course.isRecommended && (
                  <Badge className="bg-purple-100 text-purple-800 text-xs shrink-0">
                    🤖 AI
                  </Badge>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-600">
                by {course.instructor}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {course.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1">
                {course.skills.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats and Price */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mt-3 sm:mt-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{(course.students / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right">
                  <span
                    className={`text-base sm:text-lg font-bold ${
                      course.price === 0 ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {formatPrice(course.price, course.currency)}
                  </span>
                  {course.originalPrice &&
                    course.originalPrice > course.price && (
                      <div className="text-xs text-gray-500 line-through">
                        {formatPrice(course.originalPrice, course.currency)}
                      </div>
                    )}
                </div>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  onClick={() => window.open(course.courseUrl, "_blank")}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Enroll</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view (default)
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-[1.02] h-full flex flex-col">
      <div className="relative overflow-hidden">
        {/* Course Image */}
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const colors = {
                Udemy: "A435F0",
                Coursera: "0056D3",
                FreeCodeCamp: "0A0A23",
              };
              const color = colors[course.platform] || "6366F1";
              e.target.src = `https://via.placeholder.com/400x225/${color}/white?text=${encodeURIComponent(
                course.platform
              )}`;
            }}
          />

          {/* Bookmark Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onToggleBookmark();
            }}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <Bookmark
              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                isBookmarked ? "fill-blue-600 text-blue-600" : "text-gray-600"
              }`}
            />
          </Button>

          {/* Discount Badge */}
          {discountBadge && (
            <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white font-semibold text-xs">
              {discountBadge}
            </Badge>
          )}

          {/* AI Score Badge */}
          {showAIScore && course.aiScore > 80 && (
            <Badge className="absolute top-10 sm:top-12 left-2 sm:left-3 bg-purple-500 text-white font-semibold text-xs">
              <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
              {course.aiScore}%
            </Badge>
          )}

          {/* Platform Badge */}
          <Badge
            variant="secondary"
            className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white/90 backdrop-blur-sm text-gray-800 font-medium text-xs"
          >
            {course.platform}
          </Badge>
        </div>

        {/* Course Content */}
        <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
                {course.title}
              </h3>
              {course.isRecommended && (
                <Badge className="bg-purple-100 text-purple-800 text-xs shrink-0">
                  🤖 AI
                </Badge>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600">
              by {course.instructor}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* AI Recommendation Reason */}
          {course.recommendationReason && showAIScore && (
            <div className="bg-purple-50 p-2 sm:p-3 rounded-md border border-purple-200">
              <p className="text-xs text-purple-700">
                <Target className="h-3 w-3 inline mr-1" />
                {course.recommendationReason}
              </p>
            </div>
          )}

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1">
            {course.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {course.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{course.skills.length - 4}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{(course.students / 1000).toFixed(0)}k</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{course.duration}</span>
              </div>
              {course.projects > 0 && (
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{course.projects} projects</span>
                </div>
              )}
            </div>
            {course.certificateOffered && (
              <Badge variant="secondary" className="text-xs">
                <Award className="h-2 w-2 mr-1" />
                Cert
              </Badge>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t mt-auto">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-base sm:text-lg lg:text-xl font-bold ${
                    course.price === 0 ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {formatPrice(course.price, course.currency)}
                </span>
                {course.originalPrice &&
                  course.originalPrice > course.price && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      {formatPrice(course.originalPrice, course.currency)}
                    </span>
                  )}
              </div>
              {course.platform === "Coursera" && course.price > 0 && (
                <p className="text-xs text-gray-500">Monthly subscription</p>
              )}
            </div>

            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
              onClick={() => window.open(course.courseUrl, "_blank")}
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span>Enroll</span>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Loading Skeleton Component - Mobile Optimized
function CourseCardSkeleton({ viewMode = "grid" }) {
  if (viewMode === "list") {
    return (
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 lg:w-56 aspect-video sm:aspect-square bg-gray-200 animate-pulse" />
          <div className="p-4 sm:p-6 flex-1 space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <div className="h-5 sm:h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded-full w-20 animate-pulse" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-white/90 backdrop-blur-sm h-full">
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <div className="h-5 sm:h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded-full w-20 animate-pulse" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
          <div className="h-9 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
