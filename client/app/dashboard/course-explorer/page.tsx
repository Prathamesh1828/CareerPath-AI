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
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

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
const mockCourses = [
  // Frontend Development Courses
  {
    id: 1,
    title: "The Complete React Developer Course (w/ Hooks and Redux)",
    platform: "Udemy",
    instructor: "Andrew Mead",
    rating: 4.7,
    reviewCount: 47285,
    duration: "39 hours",
    level: "Intermediate",
    price: 84.99,
    originalPrice: 199.99,
    discount: 58,
    currency: "USD",
    skills: ["React", "Redux", "JavaScript", "Hooks", "Context API"],
    description:
      "Learn React from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    isBookmarked: false,
    isRecommended: true,
    category: "Frontend Development",
    language: "English",
    lastUpdated: "2024-11-01",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg",
    courseUrl: "https://www.udemy.com/course/react-2nd-edition/",
    students: 176543,
    projects: 8,
    aiScore: 95,
  },
  {
    id: 2,
    title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.8,
    reviewCount: 59847,
    duration: "28 hours",
    level: "Advanced",
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    currency: "USD",
    skills: [
      "CSS3",
      "Sass",
      "Flexbox",
      "Grid",
      "Animations",
      "Responsive Design",
    ],
    description:
      "The most advanced and modern CSS course on the internet: master flexbox, CSS Grid, responsive design, and so much more.",
    isBookmarked: true,
    isRecommended: true,
    category: "Frontend Development",
    language: "English",
    lastUpdated: "2024-10-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1026604_790b_2.jpg",
    courseUrl: "https://www.udemy.com/course/advanced-css-and-sass/",
    students: 298756,
    projects: 6,
    aiScore: 92,
  },
  {
    id: 3,
    title: "Vue - The Complete Guide (incl. Router & Composition API)",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.7,
    reviewCount: 35642,
    duration: "31.5 hours",
    level: "Beginner",
    price: 84.99,
    originalPrice: 179.99,
    discount: 53,
    currency: "USD",
    skills: ["Vue.js", "Vuex", "Vue Router", "Composition API", "JavaScript"],
    description:
      "Vue.js is an amazing JavaScript Framework for building Frontend Applications! Vue.js mixes the Best of Angular + React!",
    isBookmarked: false,
    isRecommended: false,
    category: "Frontend Development",
    language: "English",
    lastUpdated: "2024-11-05",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1775408_3c1e_2.jpg",
    courseUrl: "https://www.udemy.com/course/vuejs-2-the-complete-guide/",
    students: 145632,
    projects: 5,
    aiScore: 85,
  },
  {
    id: 4,
    title: "Modern JavaScript From The Beginning 2.0 - 2024",
    platform: "Udemy",
    instructor: "Brad Traversy",
    rating: 4.6,
    reviewCount: 28945,
    duration: "36 hours",
    level: "Beginner",
    price: 89.99,
    originalPrice: 189.99,
    discount: 53,
    currency: "USD",
    skills: ["JavaScript", "ES6+", "DOM", "Async/Await", "Modules"],
    description:
      "Learn Modern JavaScript from the beginning. All the way from basics to advanced topics like Async/Await, OOP, and more",
    isBookmarked: false,
    isRecommended: true,
    category: "Frontend Development",
    language: "English",
    lastUpdated: "2024-10-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/2508942_11d3_3.jpg",
    courseUrl:
      "https://www.udemy.com/course/modern-javascript-from-the-beginning/",
    students: 87453,
    projects: 12,
    aiScore: 88,
  },
  {
    id: 5,
    title: "Angular - The Complete Guide (2024 Edition)",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    reviewCount: 89456,
    duration: "34.5 hours",
    level: "Intermediate",
    price: 84.99,
    originalPrice: 179.99,
    discount: 53,
    currency: "USD",
    skills: ["Angular", "TypeScript", "RxJS", "NgRx", "Angular CLI"],
    description:
      "Master Angular (formerly Angular 2) and build awesome, reactive web apps with the successor of Angular.js",
    isBookmarked: false,
    isRecommended: false,
    category: "Frontend Development",
    language: "English",
    lastUpdated: "2024-11-08",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/756150_c033_2.jpg",
    courseUrl: "https://www.udemy.com/course/the-complete-guide-to-angular-2/",
    students: 456789,
    projects: 7,
    aiScore: 82,
  },

  // Backend Development Courses
  {
    id: 6,
    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp 2024",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.8,
    reviewCount: 68594,
    duration: "42 hours",
    level: "Intermediate",
    price: 94.99,
    originalPrice: 199.99,
    discount: 52,
    currency: "USD",
    skills: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "REST APIs"],
    description:
      "Master Node by building a real-world RESTful API and web app (with authentication, Node.js security, payments & more)",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-10-25",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1646980_23f7_2.jpg",
    courseUrl: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
    students: 234567,
    projects: 8,
    aiScore: 96,
  },
  {
    id: 7,
    title: "Complete Python Bootcamp From Zero to Hero in Python 3",
    platform: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.6,
    reviewCount: 478562,
    duration: "22 hours",
    level: "Beginner",
    price: 89.99,
    originalPrice: 189.99,
    discount: 52,
    currency: "USD",
    skills: ["Python", "Object Oriented Programming", "Web Scraping", "APIs"],
    description:
      "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
    isBookmarked: false,
    isRecommended: true,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/629302_8a2d_2.jpg",
    courseUrl: "https://www.udemy.com/course/complete-python-bootcamp/",
    students: 1567890,
    projects: 15,
    aiScore: 89,
  },
  {
    id: 8,
    title: "Java Spring Boot Microservices 5-in-1",
    platform: "Udemy",
    instructor: "Ranga Karanam",
    rating: 4.5,
    reviewCount: 12486,
    duration: "20 hours",
    level: "Advanced",
    price: 84.99,
    originalPrice: 199.99,
    discount: 57,
    currency: "USD",
    skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes"],
    description:
      "Master Microservices with Spring Boot, Spring Cloud, Docker and Kubernetes",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-09-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1793828_2f96_5.jpg",
    courseUrl:
      "https://www.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/",
    students: 67890,
    projects: 6,
    aiScore: 78,
  },
  {
    id: 9,
    title: "Django for Beginners: Build websites with Python and Django",
    platform: "Udemy",
    instructor: "William Vincent",
    rating: 4.7,
    reviewCount: 15643,
    duration: "18 hours",
    level: "Beginner",
    price: 79.99,
    originalPrice: 159.99,
    discount: 50,
    currency: "USD",
    skills: ["Django", "Python", "PostgreSQL", "HTML", "CSS"],
    description:
      "A step-by-step approach to web development with Django 4.0. Build, test, and deploy 5 progressively more complex websites",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-08-12",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/822444_a6a7.jpg",
    courseUrl: "https://www.udemy.com/course/django-for-beginners/",
    students: 89456,
    projects: 5,
    aiScore: 84,
  },
  {
    id: 10,
    title: "Go: The Complete Developer's Guide (Golang)",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.6,
    reviewCount: 28594,
    duration: "9 hours",
    level: "Intermediate",
    price: 84.99,
    originalPrice: 179.99,
    discount: 53,
    currency: "USD",
    skills: ["Go", "Golang", "Concurrency", "Web Servers", "Testing"],
    description:
      "Master the fundamentals and advanced features of the Go Programming Language (Golang)",
    isBookmarked: false,
    isRecommended: false,
    category: "Backend Development",
    language: "English",
    lastUpdated: "2024-07-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1774168_9e8d.jpg",
    courseUrl: "https://www.udemy.com/course/go-the-complete-developers-guide/",
    students: 156789,
    projects: 4,
    aiScore: 81,
  },

  // Full Stack Development Courses
  {
    id: 11,
    title: "MERN React Node Ecommerce from Scratch to Deployment 2024",
    platform: "Udemy",
    instructor: "Ryan Dhungel",
    rating: 4.5,
    reviewCount: 8956,
    duration: "17 hours",
    level: "Advanced",
    price: 89.99,
    originalPrice: 179.99,
    discount: 50,
    currency: "USD",
    skills: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "JWT",
      "Payment Integration",
    ],
    description:
      "Build Ecommerce like Amazon, Flipkart from scratch using MERN Stack",
    isBookmarked: false,
    isRecommended: true,
    category: "Full Stack Development",
    language: "English",
    lastUpdated: "2024-11-10",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    courseUrl: "https://www.udemy.com/course/mern-ecommerce/",
    students: 45678,
    projects: 1,
    aiScore: 93,
  },
  {
    id: 12,
    title: "Next.js & React - The Complete Guide (incl. Two Paths!)",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.8,
    reviewCount: 25486,
    duration: "26 hours",
    level: "Advanced",
    price: 94.99,
    originalPrice: 199.99,
    discount: 52,
    currency: "USD",
    skills: [
      "Next.js",
      "React",
      "SSR",
      "API Routes",
      "Authentication",
      "Deployment",
    ],
    description:
      "Learn NextJS from the ground up and build production-ready, fullstack ReactJS apps faster than ever before!",
    isBookmarked: true,
    isRecommended: true,
    category: "Full Stack Development",
    language: "English",
    lastUpdated: "2024-11-08",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/3873464_403c.jpg",
    courseUrl: "https://www.udemy.com/course/nextjs-react-the-complete-guide/",
    students: 125647,
    projects: 6,
    aiScore: 97,
  },
  {
    id: 13,
    title: "The Complete 2024 Web Development Bootcamp",
    platform: "Udemy",
    instructor: "Dr. Angela Yu",
    rating: 4.7,
    reviewCount: 289456,
    duration: "65 hours",
    level: "Beginner",
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    currency: "USD",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "React", "MongoDB"],
    description:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    isBookmarked: false,
    isRecommended: true,
    category: "Full Stack Development",
    language: "English",
    lastUpdated: "2024-10-30",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    courseUrl:
      "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    students: 756894,
    projects: 32,
    aiScore: 91,
  },
  {
    id: 14,
    title: "Full Stack Web Development with ASP.NET Core & React",
    platform: "Udemy",
    instructor: "Neil Cummings",
    rating: 4.6,
    reviewCount: 15689,
    duration: "35 hours",
    level: "Advanced",
    price: 84.99,
    originalPrice: 189.99,
    discount: 55,
    currency: "USD",
    skills: [
      "ASP.NET Core",
      "React",
      "Entity Framework",
      "SignalR",
      "Identity",
    ],
    description:
      "Learn to build a real world app with .NET Core API and React front end from start to finish",
    isBookmarked: false,
    isRecommended: false,
    category: "Full Stack Development",
    language: "English",
    lastUpdated: "2024-09-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1708340_7c0d.jpg",
    courseUrl:
      "https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/",
    students: 89456,
    projects: 1,
    aiScore: 79,
  },

  // Mobile Development Courses
  {
    id: 15,
    title: "React Native - The Practical Guide [2024]",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    reviewCount: 35742,
    duration: "32 hours",
    level: "Intermediate",
    price: 94.99,
    originalPrice: 199.99,
    discount: 52,
    currency: "USD",
    skills: ["React Native", "Mobile Development", "iOS", "Android", "Expo"],
    description:
      "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
    isBookmarked: false,
    isRecommended: true,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-10-12",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    courseUrl: "https://www.udemy.com/course/react-native-the-practical-guide/",
    students: 98765,
    projects: 8,
    aiScore: 89,
  },
  {
    id: 16,
    title: "Flutter & Dart - The Complete Guide [2024 Edition]",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    reviewCount: 45896,
    duration: "40 hours",
    level: "Beginner",
    price: 89.99,
    originalPrice: 189.99,
    discount: 52,
    currency: "USD",
    skills: ["Flutter", "Dart", "Mobile Development", "iOS", "Android"],
    description:
      "A Complete Guide to the Flutter SDK & Flutter Framework for building native iOS and Android apps",
    isBookmarked: false,
    isRecommended: false,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-09-28",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1708340_7c0d.jpg",
    courseUrl:
      "https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/",
    students: 234567,
    projects: 12,
    aiScore: 86,
  },
  {
    id: 17,
    title: "iOS & Swift - The Complete iOS App Development Bootcamp",
    platform: "Udemy",
    instructor: "Dr. Angela Yu",
    rating: 4.8,
    reviewCount: 89456,
    duration: "54 hours",
    level: "Beginner",
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    currency: "USD",
    skills: ["Swift", "iOS", "Xcode", "Core Data", "ARKit"],
    description:
      "From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!",
    isBookmarked: false,
    isRecommended: false,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-08-15",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1778502_f4b9_12.jpg",
    courseUrl: "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
    students: 456789,
    projects: 23,
    aiScore: 83,
  },
  {
    id: 18,
    title: "The Complete Android 14 & Kotlin Development Masterclass",
    platform: "Udemy",
    instructor: "Denis Panjuta",
    rating: 4.5,
    reviewCount: 23456,
    duration: "46 hours",
    level: "Beginner",
    price: 84.99,
    originalPrice: 179.99,
    discount: 53,
    currency: "USD",
    skills: [
      "Android",
      "Kotlin",
      "Android Studio",
      "Firebase",
      "Material Design",
    ],
    description:
      "Learn Android 14 App Development From Beginner to Advanced Developer. Master Android Studio and build your first app today",
    isBookmarked: false,
    isRecommended: false,
    category: "Mobile Development",
    language: "English",
    lastUpdated: "2024-07-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    courseUrl: "https://www.udemy.com/course/android-kotlin-developer/",
    students: 123456,
    projects: 18,
    aiScore: 80,
  },

  // Data Science Courses
  {
    id: 19,
    title: "Python for Data Science and Machine Learning Bootcamp",
    platform: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.6,
    reviewCount: 156789,
    duration: "25 hours",
    level: "Intermediate",
    price: 89.99,
    originalPrice: 189.99,
    discount: 52,
    currency: "USD",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-Learn",
    ],
    description:
      "Learn how to use NumPy, Pandas, Seaborn , Matplotlib , Plotly , Scikit-Learn , Machine Learning, Tensorflow , and more!",
    isBookmarked: true,
    isRecommended: true,
    category: "Data Science",
    language: "English",
    lastUpdated: "2024-10-30",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/903744_8eb2.jpg",
    courseUrl:
      "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
    students: 456789,
    projects: 15,
    aiScore: 92,
  },
  {
    id: 20,
    title: "Data Science Course 2024: Complete Data Science Bootcamp",
    platform: "Udemy",
    instructor: "365 Careers",
    rating: 4.5,
    reviewCount: 89456,
    duration: "30 hours",
    level: "Beginner",
    price: 84.99,
    originalPrice: 199.99,
    discount: 57,
    currency: "USD",
    skills: ["Statistics", "Python", "SQL", "Tableau", "Machine Learning"],
    description:
      "Complete Data Science Training: Mathematics, Statistics, Python, Advanced Statistics in Python, Machine & Deep Learning",
    isBookmarked: false,
    isRecommended: false,
    category: "Data Science",
    language: "English",
    lastUpdated: "2024-09-25",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1754098_e0df_3.jpg",
    courseUrl:
      "https://www.udemy.com/course/the-data-science-course-complete-data-science-bootcamp/",
    students: 234567,
    projects: 12,
    aiScore: 87,
  },
  {
    id: 21,
    title: "Complete SQL Bootcamp: Go from Zero to Hero",
    platform: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.7,
    reviewCount: 178456,
    duration: "9 hours",
    level: "Beginner",
    price: 64.99,
    originalPrice: 139.99,
    discount: 54,
    currency: "USD",
    skills: ["SQL", "PostgreSQL", "Database Design", "Data Analysis"],
    description:
      "Become an expert at SQL! Learn to write complex queries, design databases, and analyze data using PostgreSQL",
    isBookmarked: false,
    isRecommended: true,
    category: "Data Science",
    language: "English",
    lastUpdated: "2024-11-01",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/762616_7693_3.jpg",
    courseUrl: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
    students: 567890,
    projects: 8,
    aiScore: 91,
  },
  {
    id: 22,
    title: "R Programming A-Z™: R For Data Science With Real Exercises!",
    platform: "Udemy",
    instructor: "Kirill Eremenko",
    rating: 4.5,
    reviewCount: 67890,
    duration: "10.5 hours",
    level: "Beginner",
    price: 79.99,
    originalPrice: 189.99,
    discount: 58,
    currency: "USD",
    skills: [
      "R Programming",
      "Data Analysis",
      "Statistics",
      "Data Visualization",
    ],
    description:
      "Learn R Programming from a Data Science expert. Data Analytics, Data Science, Statistical Analysis, Packages, Functions, GGPlot2",
    isBookmarked: false,
    isRecommended: false,
    category: "Data Science",
    language: "English",
    lastUpdated: "2024-08-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/851712_fc61_6.jpg",
    courseUrl: "https://www.udemy.com/course/r-programming/",
    students: 345678,
    projects: 6,
    aiScore: 84,
  },

  // Machine Learning Courses
  {
    id: 23,
    title: "Machine Learning A-Z™: AI, Python & R + ChatGPT Prize [2024]",
    platform: "Udemy",
    instructor: "Kirill Eremenko",
    rating: 4.5,
    reviewCount: 189456,
    duration: "44 hours",
    level: "Intermediate",
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    currency: "USD",
    skills: ["Machine Learning", "Python", "R", "Deep Learning", "AI"],
    description:
      "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
    isBookmarked: false,
    isRecommended: true,
    category: "Machine Learning",
    language: "English",
    lastUpdated: "2024-10-30",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg",
    courseUrl: "https://www.udemy.com/course/machinelearning/",
    students: 678901,
    projects: 20,
    aiScore: 94,
  },
  {
    id: 24,
    title: "Deep Learning A-Z™ 2024: Neural Networks, AI & ChatGPT Prize",
    platform: "Udemy",
    instructor: "Kirill Eremenko",
    rating: 4.4,
    reviewCount: 89456,
    duration: "23 hours",
    level: "Advanced",
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    currency: "USD",
    skills: ["Deep Learning", "Neural Networks", "TensorFlow", "PyTorch", "AI"],
    description:
      "Learn to create Deep Learning Algorithms in Python from two Machine Learning & Data Science experts. Templates included.",
    isBookmarked: false,
    isRecommended: false,
    category: "Machine Learning",
    language: "English",
    lastUpdated: "2024-09-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1128744_d542.jpg",
    courseUrl: "https://www.udemy.com/course/deeplearning/",
    students: 456789,
    projects: 12,
    aiScore: 88,
  },
  {
    id: 25,
    title: "Complete Tensorflow 2 and Keras Deep Learning Bootcamp",
    platform: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.6,
    reviewCount: 34567,
    duration: "19 hours",
    level: "Intermediate",
    price: 89.99,
    originalPrice: 189.99,
    discount: 52,
    currency: "USD",
    skills: [
      "TensorFlow",
      "Keras",
      "Deep Learning",
      "Neural Networks",
      "Python",
    ],
    description:
      "Learn to use Python for Deep Learning with Google's latest TensorFlow 2 library and create artificial neural networks.",
    isBookmarked: false,
    isRecommended: true,
    category: "Machine Learning",
    language: "English",
    lastUpdated: "2024-08-30",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/2776760_f176_10.jpg",
    courseUrl:
      "https://www.udemy.com/course/complete-tensorflow-2-and-keras-deep-learning-bootcamp/",
    students: 123456,
    projects: 10,
    aiScore: 90,
  },
  {
    id: 26,
    title: "MLOps | Machine Learning Operations Specialization",
    platform: "Coursera",
    instructor: "DeepLearning.AI",
    rating: 4.7,
    reviewCount: 15647,
    duration: "32 hours",
    level: "Advanced",
    price: 49,
    originalPrice: null,
    discount: 0,
    currency: "USD",
    skills: [
      "MLOps",
      "Machine Learning",
      "DevOps",
      "CI/CD",
      "Model Deployment",
    ],
    description:
      "Learn to design an ML production system end-to-end: project scoping, data needs, modeling strategies, and deployment",
    isBookmarked: true,
    isRecommended: true,
    category: "Machine Learning",
    language: "English",
    lastUpdated: "2024-07-15",
    certificateOffered: true,
    thumbnail:
      "https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/mlops-logo.png",
    courseUrl:
      "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops",
    students: 67890,
    projects: 8,
    aiScore: 93,
  },

  // DevOps Courses
  {
    id: 27,
    title: "Docker & Kubernetes: The Complete Guide",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.6,
    reviewCount: 45896,
    duration: "21.5 hours",
    level: "Intermediate",
    price: 94.99,
    originalPrice: 199.99,
    discount: 52,
    currency: "USD",
    skills: ["Docker", "Kubernetes", "DevOps", "Containerization", "CI/CD"],
    description:
      "Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows",
    isBookmarked: false,
    isRecommended: true,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-10-18",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1793828_7431_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
    students: 234567,
    projects: 8,
    aiScore: 88,
  },
  {
    id: 28,
    title: "Complete DevOps Bootcamp: Zero to Hero in DevOps [2024]",
    platform: "Udemy",
    instructor: "Imran Teli",
    rating: 4.5,
    reviewCount: 23456,
    duration: "30 hours",
    level: "Beginner",
    price: 84.99,
    originalPrice: 189.99,
    discount: 55,
    currency: "USD",
    skills: ["DevOps", "Jenkins", "Docker", "Ansible", "Terraform", "AWS"],
    description:
      "DevOps Real Time Projects with Jenkins, Git, Maven, SonarQube, Ansible, Docker, Kubernetes, Terraform, Prometheus, Grafana",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-09-05",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/4779316_a814.jpg",
    courseUrl: "https://www.udemy.com/course/devopsbootcamp/",
    students: 89456,
    projects: 12,
    aiScore: 85,
  },
  {
    id: 29,
    title:
      "Terraform for DevOps Beginners + Labs: Complete Step by Step Guide!",
    platform: "Udemy",
    instructor: "Kalyan Reddy Daida",
    rating: 4.6,
    reviewCount: 15678,
    duration: "12 hours",
    level: "Intermediate",
    price: 79.99,
    originalPrice: 179.99,
    discount: 56,
    currency: "USD",
    skills: [
      "Terraform",
      "Infrastructure as Code",
      "AWS",
      "DevOps",
      "Automation",
    ],
    description:
      "Learn Terraform for AWS Cloud with 25+ Demo's, Interview Questions, Terraform Associate Certification Tips",
    isBookmarked: false,
    isRecommended: false,
    category: "DevOps",
    language: "English",
    lastUpdated: "2024-08-20",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/3454606_93f3_2.jpg",
    courseUrl: "https://www.udemy.com/course/terraform-for-beginners/",
    students: 67890,
    projects: 25,
    aiScore: 82,
  },

  // Cloud Engineering Courses
  {
    id: 30,
    title: "AWS Certified Solutions Architect - Associate 2024",
    platform: "Udemy",
    instructor: "Stephane Maarek",
    rating: 4.7,
    reviewCount: 189456,
    duration: "27 hours",
    level: "Intermediate",
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    currency: "USD",
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "VPC", "IAM"],
    description:
      "Full Practice Exam with Explanations included! PASS the Amazon Web Services Solutions Architect Associate Certification SAA-C03!",
    isBookmarked: false,
    isRecommended: true,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-11-05",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/362070_b9a1_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    students: 567890,
    projects: 15,
    aiScore: 95,
  },
  {
    id: 31,
    title: "Microsoft Azure Fundamentals AZ-900 - 2024 Edition",
    platform: "Udemy",
    instructor: "Scott Duffy",
    rating: 4.5,
    reviewCount: 89456,
    duration: "8 hours",
    level: "Beginner",
    price: 64.99,
    originalPrice: 139.99,
    discount: 54,
    currency: "USD",
    skills: [
      "Azure",
      "Cloud Computing",
      "Microsoft 365",
      "Security",
      "Pricing",
    ],
    description:
      "Prepare for the AZ-900 Microsoft Azure Fundamentals Exam with Live Instructor, Subtitles/CC, Practice Tests and Lifetime Updates",
    isBookmarked: false,
    isRecommended: false,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-10-22",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    courseUrl: "https://www.udemy.com/course/az900-azure/",
    students: 234567,
    projects: 5,
    aiScore: 81,
  },
  {
    id: 32,
    title: "Google Cloud Digital Leader Certification Course",
    platform: "Coursera",
    instructor: "Google Cloud",
    rating: 4.6,
    reviewCount: 23456,
    duration: "15 hours",
    level: "Beginner",
    price: 39,
    originalPrice: null,
    discount: 0,
    currency: "USD",
    skills: [
      "Google Cloud Platform",
      "Digital Transformation",
      "Data",
      "Security",
    ],
    description:
      "Prepare for the Google Cloud Digital Leader exam. Develop knowledge of cloud concepts, Google Cloud products and services",
    isBookmarked: false,
    isRecommended: false,
    category: "Cloud Computing",
    language: "English",
    lastUpdated: "2024-09-10",
    certificateOffered: true,
    thumbnail:
      "https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/gcp-logo.png",
    courseUrl:
      "https://www.coursera.org/professional-certificates/google-cloud-digital-leader-training",
    students: 89456,
    projects: 6,
    aiScore: 78,
  },

  // AI Engineering Courses
  {
    id: 33,
    title: "ChatGPT Complete Guide: Learn Midjourney, ChatGPT 4 & More",
    platform: "Udemy",
    instructor: "Julian Melanson",
    rating: 4.4,
    reviewCount: 45678,
    duration: "15 hours",
    level: "Beginner",
    price: 79.99,
    originalPrice: 189.99,
    discount: 58,
    currency: "USD",
    skills: [
      "ChatGPT",
      "AI Tools",
      "Prompt Engineering",
      "Midjourney",
      "AI Automation",
    ],
    description:
      "Master ChatGPT, Midjourney, and 15+ AI tools. Become an AI expert and 10x your productivity with this comprehensive AI course.",
    isBookmarked: false,
    isRecommended: true,
    category: "AI Engineering",
    language: "English",
    lastUpdated: "2024-11-01",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/5132106_6b13.jpg",
    courseUrl: "https://www.udemy.com/course/chatgpt-bard-bing-complete-guide/",
    students: 123456,
    projects: 10,
    aiScore: 90,
  },
  {
    id: 34,
    title: "LangChain- Develop LLM powered applications with LangChain",
    platform: "Udemy",
    instructor: "Eden Marco",
    rating: 4.5,
    reviewCount: 12345,
    duration: "11 hours",
    level: "Advanced",
    price: 84.99,
    originalPrice: 179.99,
    discount: 53,
    currency: "USD",
    skills: ["LangChain", "LLM", "Python", "OpenAI", "Vector Databases"],
    description:
      "Learn how to leverage the LangChain framework to build applications powered by large language models",
    isBookmarked: false,
    isRecommended: false,
    category: "AI Engineering",
    language: "English",
    lastUpdated: "2024-10-05",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/5132106_6b13.jpg",
    courseUrl: "https://www.udemy.com/course/langchain/",
    students: 34567,
    projects: 8,
    aiScore: 86,
  },
  {
    id: 35,
    title: "Generative AI for Everyone",
    platform: "Coursera",
    instructor: "DeepLearning.AI",
    rating: 4.7,
    reviewCount: 56789,
    duration: "12 hours",
    level: "Beginner",
    price: 0,
    originalPrice: null,
    discount: 0,
    currency: "USD",
    skills: [
      "Generative AI",
      "AI Ethics",
      "Prompt Engineering",
      "AI Applications",
    ],
    description:
      "Learn how generative AI works, and how to use it. This course is designed for everyone - no technical background required.",
    isBookmarked: true,
    isRecommended: true,
    category: "AI Engineering",
    language: "English",
    lastUpdated: "2024-10-15",
    certificateOffered: true,
    thumbnail:
      "https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/ai-logo.png",
    courseUrl: "https://www.coursera.org/learn/generative-ai-for-everyone",
    students: 234567,
    projects: 5,
    aiScore: 95,
  },

  // Cybersecurity Courses
  {
    id: 36,
    title: "The Complete Cyber Security Course : Hackers Exposed!",
    platform: "Udemy",
    instructor: "Nathan House",
    rating: 4.5,
    reviewCount: 89456,
    duration: "15 hours",
    level: "Beginner",
    price: 89.99,
    originalPrice: 179.99,
    discount: 50,
    currency: "USD",
    skills: [
      "Ethical Hacking",
      "Network Security",
      "Malware Analysis",
      "Incident Response",
    ],
    description:
      "Volume 1 : An Intermediate Course Covering Anonymous Browsing, Malware, Network Security, Online Banking, & Windows Security",
    isBookmarked: false,
    isRecommended: false,
    category: "Cybersecurity",
    language: "English",
    lastUpdated: "2024-09-25",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/857010_8239_2.jpg",
    courseUrl:
      "https://www.udemy.com/course/the-complete-internet-security-privacy-course-volume-1/",
    students: 178456,
    projects: 12,
    aiScore: 83,
  },
  {
    id: 37,
    title: "Complete Ethical Hacking Bootcamp 2024: Zero to Mastery",
    platform: "Udemy",
    instructor: "Aleksa Tamburkovski",
    rating: 4.6,
    reviewCount: 23456,
    duration: "19 hours",
    level: "Intermediate",
    price: 84.99,
    originalPrice: 189.99,
    discount: 55,
    currency: "USD",
    skills: [
      "Penetration Testing",
      "Kali Linux",
      "Web Application Security",
      "Network Security",
    ],
    description:
      "Become an ethical hacker that companies will hire! Learn penetration testing, web app security, and get certification ready",
    isBookmarked: false,
    isRecommended: false,
    category: "Cybersecurity",
    language: "English",
    lastUpdated: "2024-08-30",
    certificateOffered: true,
    thumbnail: "https://img-c.udemycdn.com/course/240x135/4565638_6935.jpg",
    courseUrl:
      "https://www.udemy.com/course/complete-ethical-hacking-bootcamp-zero-to-mastery/",
    students: 67890,
    projects: 15,
    aiScore: 79,
  },
  {
    id: 38,
    title: "Google Cybersecurity Professional Certificate",
    platform: "Coursera",
    instructor: "Google",
    rating: 4.8,
    reviewCount: 145623,
    duration: "180 hours",
    level: "Beginner",
    price: 49,
    originalPrice: null,
    discount: 0,
    currency: "USD",
    skills: [
      "Security Operations",
      "SIEM Tools",
      "Network Security",
      "Incident Response",
    ],
    description:
      "Launch your cybersecurity career. No degree or prior experience required to get started.",
    isBookmarked: true,
    isRecommended: true,
    category: "Cybersecurity",
    language: "English",
    lastUpdated: "2024-09-15",
    certificateOffered: true,
    thumbnail:
      "https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/google-cyber-logo.png",
    courseUrl:
      "https://www.coursera.org/professional-certificates/google-cybersecurity",
    students: 456789,
    projects: 20,
    aiScore: 92,
  },

  // Free Courses
  {
    id: 39,
    title: "TypeScript for Beginners",
    platform: "FreeCodeCamp",
    instructor: "Hitesh Choudhary",
    rating: 4.8,
    reviewCount: 67890,
    duration: "5 hours",
    level: "Beginner",
    price: 0,
    originalPrice: null,
    discount: 0,
    currency: "USD",
    skills: ["TypeScript", "JavaScript", "Static Typing", "Node.js"],
    description:
      "Learn TypeScript from scratch in this comprehensive free course. Perfect for JavaScript developers.",
    isBookmarked: true,
    isRecommended: true,
    category: "Frontend Development",
    language: "English",
    lastUpdated: "2024-10-15",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/30LWjhZzg50/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=30LWjhZzg50",
    students: 234567,
    projects: 3,
    aiScore: 93,
  },
  {
    id: 40,
    title: "Git & GitHub Crash Course For Beginners",
    platform: "FreeCodeCamp",
    instructor: "Brad Traversy",
    rating: 4.9,
    reviewCount: 123456,
    duration: "1 hour",
    level: "Beginner",
    price: 0,
    originalPrice: null,
    discount: 0,
    currency: "USD",
    skills: ["Git", "GitHub", "Version Control", "Command Line"],
    description:
      "Learn Git and GitHub in one hour. Perfect for beginners who want to start using version control.",
    isBookmarked: false,
    isRecommended: true,
    category: "Development Tools",
    language: "English",
    lastUpdated: "2024-11-01",
    certificateOffered: false,
    thumbnail: "https://i.ytimg.com/vi/SWYqp7iY_Tc/maxresdefault.jpg",
    courseUrl: "https://www.youtube.com/watch?v=SWYqp7iY_Tc",
    students: 567890,
    projects: 2,
    aiScore: 97,
  },
];

// AI Recommendation Engine

export default function CourseExplorerPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("ai-recommended");
  const [bookmarkedCourses, setBookmarkedCourses] = useState(
    new Set([2, 5, 12, 19, 26, 35, 38, 39])
  );
  const [refreshing, setRefreshing] = useState(false);

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

  // AI Recommendation Engine
  class AIRecommendationEngine {
    constructor(userProfile, courses) {
      this.userProfile = userProfile;
      this.courses = courses;
      this.weights = {
        skillMatch: 0.25,
        careerGoalAlignment: 0.2,
        levelMatch: 0.15,
        platformPreference: 0.1,
        budgetFit: 0.15,
        popularityScore: 0.1,
        freshnessScore: 0.05,
      };
    }

    calculateRecommendationScore(course) {
      let score = 0;

      const userSkills = this.userProfile.skills || [];
      const userGoals = this.userProfile.careerGoals || [];
      const preferredPlatforms = this.userProfile.preferredPlatforms || [];

      // Skill Match Score (25%)
      const skillMatches = course.skills.filter((skill) =>
        userSkills.some(
          (userSkill) =>
            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      ).length;

      const skillScore =
        skillMatches > 0 ? (skillMatches / course.skills.length) * 100 : 20;
      score += skillScore * this.weights.skillMatch;

      // Career Goal Alignment (20%)
      const goalMatches = userGoals.filter(
        (goal) =>
          course.category.toLowerCase().includes(goal.toLowerCase()) ||
          course.skills.some((skill) =>
            goal.toLowerCase().includes(skill.toLowerCase())
          ) ||
          course.title.toLowerCase().includes(goal.toLowerCase())
      ).length;

      const goalScore = goalMatches > 0 ? 100 : 30;
      score += goalScore * this.weights.careerGoalAlignment;

      // Level Match (15%)
      const levelScore = this.getLevelScore(course.level);
      score += levelScore * this.weights.levelMatch;

      // Platform Preference (10%)
      const platformScore = preferredPlatforms.includes(course.platform)
        ? 100
        : 60;
      score += platformScore * this.weights.platformPreference;

      // Budget Fit (15%)
      const budgetScore = this.getBudgetScore(course.price);
      score += budgetScore * this.weights.budgetFit;

      // Popularity Score (10%)
      const ratingScore = (course.rating / 5) * 50;
      const studentScore = Math.min((course.students / 50000) * 50, 50);
      const popularityScore = ratingScore + studentScore;
      score += popularityScore * this.weights.popularityScore;

      // Freshness Score (5%)
      const daysSinceUpdate = this.getDaysSinceUpdate(course.lastUpdated);
      const freshnessScore = Math.max(100 - (daysSinceUpdate / 30) * 10, 0);
      score += freshnessScore * this.weights.freshnessScore;

      return Math.round(score);
    }

    getLevelScore(courseLevel) {
      const levelMap = {
        Beginner: { Beginner: 100, Intermediate: 80, Advanced: 40 },
        Intermediate: { Beginner: 60, Intermediate: 100, Advanced: 80 },
        Advanced: { Beginner: 20, Intermediate: 70, Advanced: 100 },
      };
      return levelMap[this.userProfile.experience]?.[courseLevel] || 50;
    }

    getBudgetScore(price) {
      switch (this.userProfile.budget) {
        case "low":
          return price === 0 ? 100 : price < 50 ? 80 : price < 100 ? 40 : 20;
        case "medium":
          return price === 0 ? 100 : price < 100 ? 90 : price < 200 ? 70 : 40;
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
      const userSkills = this.userProfile.skills || [];
      const userGoals = this.userProfile.careerGoals || [];

      // Skill matches
      const skillMatches = course.skills.filter((skill) =>
        userSkills.some((userSkill) =>
          userSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (skillMatches.length > 0) {
        reasons.push(
          `Matches your ${skillMatches.slice(0, 2).join(", ")} skills`
        );
      }

      // Career goals
      const goalMatches = userGoals.filter(
        (goal) =>
          course.category.toLowerCase().includes(goal.toLowerCase()) ||
          course.title.toLowerCase().includes(goal.toLowerCase())
      );
      if (goalMatches.length > 0) {
        reasons.push(`Perfect for ${goalMatches[0]}`);
      }

      // Level appropriateness
      if (course.level === this.userProfile.experience) {
        reasons.push(`Ideal for ${this.userProfile.experience} level`);
      }

      // Highly rated
      if (course.rating >= 4.7) {
        reasons.push(`Highly rated (${course.rating}★)`);
      }

      // Popular
      if (course.students > 100000) {
        reasons.push(
          `Popular choice (${Math.floor(course.students / 1000)}k+ students)`
        );
      }

      // Free
      if (course.price === 0) {
        reasons.push(`Free course`);
      }

      // Many projects
      if (course.projects > 10) {
        reasons.push(`${course.projects} hands-on projects`);
      }

      return reasons.slice(0, 2).join(" • ") || "Recommended for you";
    }
  }

  // Fetch courses with AI scoring
  const fetchCoursesWithAI = async () => {
    setLoading(true);
    try {
      const filteredCourses = [...mockCourses];

      const aiEngine = new AIRecommendationEngine(formData, filteredCourses);
      const coursesWithAI = aiEngine.getRecommendations(filteredCourses.length);

      setCourses(coursesWithAI);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount or when formData changes
  useEffect(() => {
    fetchCoursesWithAI();
  }, [formData]);
  // Load courses
  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    await fetchCoursesWithAI();

    setLoading(false);
  }, [searchTerm, selectedLevel, selectedPlatform, sortBy]);

  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    // 1️⃣ After login, store token

    // 2️⃣ When submitting skill:
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

        // ✅ populate the form with backend data
        setFormData({
          currentRole: data.currentRole || "",
          experience: data.experience || "",
          careerGoals: data.careerGoals || [],
          preferredPlatforms: data.preferredPlatforms || [],
          budget: data.budget || "",
          timeCommitment: data.timeCommitment || "",
          learningStyle: data.learningStyle || "",
          skills: data.skills || [],
        });

        // ✅ skills list
        setSkills(data.skills || []);
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
      if (newBookmarks.has(courseId)) {
        newBookmarks.delete(courseId);
      } else {
        newBookmarks.add(courseId);
      }
      return newBookmarks;
    });
  };

  // Filter courses for tabs
  const filteredCourses = courses;
  const recommendedCourses = courses.filter((course) => course.isRecommended);
  const bookmarkedCoursesData = courses.filter((course) =>
    bookmarkedCourses.has(course.id)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Course Explorer
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered course recommendations tailored for developers
          </p>
        </div>

        {/* AI Personalization Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-blue-900">
                    AI Personalization Active
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {formData.experience} {formData.currentRole}
                  </Badge>
                </div>
                <p className="text-sm text-blue-700">
                  Recommendations based on: Skills: Skills:{" "}
                  {formData.skills.join(", ")}
                </p>
                <p className="text-sm text-blue-700">
                  Goals: {(formData?.careerGoals || []).slice(0, 2).join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {recommendedCourses.length}
                  </div>
                  <div className="text-xs text-purple-600">AI Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {courses.filter((c) => c.price === 0).length}
                  </div>
                  <div className="text-xs text-green-600">Free Courses</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Search and Filters */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Search & Filter Courses
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Badge variant="secondary" className="px-3 py-1">
                  {courses.length} courses
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search courses, skills, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedPlatform}
                  onValueChange={setSelectedPlatform}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="udemy">Udemy</SelectItem>
                    <SelectItem value="coursera">Coursera</SelectItem>
                    <SelectItem value="freecodecamp">FreeCodeCamp</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-recommended">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />
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

                <Button
                  variant="outline"
                  className="h-12 border-2 border-dashed hover:border-solid transition-all"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-wrap gap-2">
                {Object.entries(categoryStats)
                  .slice(0, 8)
                  .map(([category, count]) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => setSearchTerm(category)}
                    >
                      {category} ({count})
                    </Badge>
                  ))}
              </div>
            </div>

            {/* Search Stats */}
            {!loading && (
              <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-gray-600">
                <span>Found {courses.length} courses</span>
                {searchTerm && <span>Searching for "{searchTerm}"</span>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="py-4">
              <div className="flex items-center gap-2 text-red-600">
                <ExternalLink className="h-4 w-4" />
                <span>{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadCourses}
                  className="ml-auto"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Course Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-white shadow-sm">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              All Courses ({filteredCourses.length})
            </TabsTrigger>
            <TabsTrigger
              value="recommended"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Sparkles className="h-4 w-4 text-purple-500" />
              AI Recommended ({recommendedCourses.length})
            </TabsTrigger>
            <TabsTrigger
              value="bookmarked"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              Bookmarked ({bookmarkedCoursesData.length})
            </TabsTrigger>
          </TabsList>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                <p className="text-gray-600">
                  AI is analyzing courses for personalized recommendations...
                </p>
              </div>
            </div>
          )}

          {/* All Courses Tab */}
          <TabsContent value="all" className="space-y-4">
            <CourseGrid
              courses={filteredCourses}
              bookmarkedCourses={bookmarkedCourses}
              onToggleBookmark={toggleBookmark}
              loading={loading}
              formatPrice={formatPrice}
            />
          </TabsContent>

          {/* Recommended Courses Tab */}
          <TabsContent value="recommended" className="space-y-4">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <div>
                    <h3 className="font-medium text-purple-900">
                      AI-Powered Recommendations
                    </h3>
                    <p className="text-sm text-purple-700">
                      These courses are personally selected based on your
                      skills, goals, and learning preferences.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-purple-600 text-white">
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
            />
          </TabsContent>

          {/* Bookmarked Courses Tab */}
          <TabsContent value="bookmarked" className="space-y-4">
            {bookmarkedCoursesData.length === 0 && !loading ? (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="py-20 text-center">
                  <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Bookmarked Courses
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start bookmarking courses you're interested in!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <CourseGrid
                courses={bookmarkedCoursesData}
                bookmarkedCourses={bookmarkedCourses}
                onToggleBookmark={toggleBookmark}
                loading={loading}
                formatPrice={formatPrice}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Enhanced Course Grid Component
function CourseGrid({
  courses,
  bookmarkedCourses,
  onToggleBookmark,
  loading,
  formatPrice,
  showAIScore = false,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="py-20 text-center">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Courses Found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map((course) => (
        <EnhancedCourseCard
          key={course.id}
          course={course}
          isBookmarked={bookmarkedCourses.has(course.id)}
          onToggleBookmark={() => onToggleBookmark(course.id)}
          formatPrice={formatPrice}
          showAIScore={showAIScore}
        />
      ))}
    </div>
  );
}

// Enhanced Course Card Component
function EnhancedCourseCard({
  course,
  isBookmarked,
  onToggleBookmark,
  formatPrice,
  showAIScore = false,
}) {
  const discountBadge =
    course.originalPrice && course.originalPrice > course.price
      ? `${Math.round(
          ((course.originalPrice - course.price) / course.originalPrice) * 100
        )}% OFF`
      : null;

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
                Pluralsight: "F15B2A",
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
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <Bookmark
              className={`h-4 w-4 ${
                isBookmarked ? "fill-blue-600 text-blue-600" : "text-gray-600"
              }`}
            />
          </Button>

          {/* Discount Badge */}
          {discountBadge && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold">
              {discountBadge}
            </Badge>
          )}

          {/* AI Score Badge */}
          {showAIScore && course.aiScore > 80 && (
            <Badge className="absolute top-12 left-3 bg-purple-500 text-white font-semibold">
              <Sparkles className="h-3 w-3 mr-1" />
              {course.aiScore}% Match
            </Badge>
          )}

          {/* Platform Badge */}
          <Badge
            variant="secondary"
            className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 font-medium"
          >
            {course.platform}
          </Badge>
        </div>

        {/* Course Content */}
        <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              {course.isRecommended && (
                <Badge className="bg-purple-100 text-purple-800 text-xs shrink-0">
                  🤖 AI Pick
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-600">by {course.instructor}</p>
            <p className="text-sm text-gray-500 line-clamp-2">
              {course.description}
            </p>
          </div>

          {/* AI Recommendation Reason */}
          {course.recommendationReason && showAIScore && (
            <div className="bg-purple-50 p-2 rounded-md border border-purple-200">
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
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-gray-400">
                  ({(course.reviewCount / 1000).toFixed(0)}k)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{(course.students / 1000).toFixed(0)}k</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              {course.projects > 0 && (
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>{course.projects} projects</span>
                </div>
              )}
            </div>
            {course.certificateOffered && (
              <Badge variant="secondary" className="text-xs">
                Certificate
              </Badge>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t mt-auto">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xl font-bold ${
                    course.price === 0 ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {formatPrice(course.price, course.currency)}
                </span>
                {course.originalPrice &&
                  course.originalPrice > course.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(course.originalPrice, course.currency)}
                    </span>
                  )}
              </div>
              {course.platform === "Coursera" && course.price > 0 && (
                <p className="text-xs text-gray-500">Monthly subscription</p>
              )}
            </div>

            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open(course.courseUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Enroll Now
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Loading Skeleton Component
function CourseCardSkeleton() {
  return (
    <Card className="border-0 bg-white/90 backdrop-blur-sm h-full">
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
        </div>
        <div className="flex justify-between items-center pt-4">
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
          <div className="h-9 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
