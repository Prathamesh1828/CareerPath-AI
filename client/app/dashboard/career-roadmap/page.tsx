"use client";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  Award,
  Target,
  Map,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Info,
  Star,
  ExternalLink,
  Users,
  TrendingUp,
  Sparkles,
  Brain,
  Zap,
  Rocket,
  ArrowUpRight,
  Calendar,
  TimerIcon,
  FlagIcon,
  Play,
  PauseCircle,
  RotateCcw,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

// Enhanced career paths with icons and gradients
const careerPaths = [
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Build user interfaces and web experiences",
    salary: "₹4,39,500 - ₹10,96,000",
    timeFrame: "6-12 months",
  },
  {
    id: "backend",
    name: "Backend Developer",
    description: "Develop server-side applications and APIs",
    salary: "₹5,81,000 - ₹18,79,000",
    timeFrame: "8-14 months",
  },
  {
    id: "fullstack",
    name: "Full Stack Developer",
    description: "Work on both frontend and backend development",
    salary: "₹6,22,500 - ₹30,62,000",
    timeFrame: "10-18 months",
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    description: "Analyze data and build machine learning models",
    salary: "₹8,64,000 - ₹30,45,000",
    timeFrame: "12-24 months",
  },
  {
    id: "mobile-developer",
    name: "Mobile Developer",
    description: "Build cross-platform mobile applications",
    salary: "₹5,00,000 - ₹20,00,000",
    timeFrame: "6-14 months",
  },
  {
    id: "ml-engineer",
    name: "Machine Learning Engineer",
    description: "Design and deploy machine learning solutions",
    salary: "₹10,00,000 - ₹30,00,000",
    timeFrame: "12-24 months",
  },
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    description: "Manage CI/CD pipelines and infrastructure",
    salary: "₹6,00,000 - ₹25,00,000",
    timeFrame: "8-18 months",
  },
  {
    id: "cloud-engineer",
    name: "Cloud Engineer",
    description: "Design cloud infrastructure and deployments",
    salary: "₹7,00,000 - ₹28,00,000",
    timeFrame: "10-20 months",
  },
  {
    id: "ai-engineer",
    name: "AI Engineer",
    description: "Develop AI solutions and algorithms",
    salary: "₹8,50,000 - ₹32,00,000",
    timeFrame: "12-24 months",
  },
  {
    id: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    description: "Protect systems and data from security threats",
    salary: "₹5,00,000 - ₹22,00,000",
    timeFrame: "8-18 months",
  },
];

const initialMockRoadmapData = {
  frontend: {
    selectedPath: "Frontend Developer",
    progress: 65,
    estimatedTime: "8-12 months",
    phases: [
      {
        id: 1,
        title: "Foundation Skills",
        status: "completed",
        progress: 100,
        duration: "2-3 months",
        description: "Master the core fundamentals of web development",
        skills: [
          {
            name: "HTML",
            level: "Expert",
            description: "Semantic markup and accessibility",
          },
          {
            name: "CSS",
            level: "Expert",
            description: "Layouts, animations, and responsive design",
          },
          {
            name: "JavaScript Basics",
            level: "Advanced",
            description: "ES6+, DOM manipulation, async programming",
          },
        ],
        courses: [
          {
            name: "HTML & CSS Fundamentals",
            platform: "freeCodeCamp",
            completed: true,
            duration: "20 hours",
            rating: 4.8,
            url: "https://freecodecamp.org/learn/responsive-web-design/",
          },
          {
            name: "JavaScript Basics",
            platform: "Codecademy",
            completed: true,
            duration: "30 hours",
            rating: 4.7,
            url: "https://codecademy.com/learn/introduction-to-javascript",
          },
        ],
        projects: [
          {
            name: "Personal Portfolio Website",
            completed: true,
            difficulty: "Beginner",
          },
          {
            name: "Responsive Landing Page",
            completed: true,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Modern JavaScript & React",
        status: "in_progress",
        progress: 75,
        duration: "3-4 months",
        description: "Learn modern JavaScript and React ecosystem",
        skills: [
          {
            name: "ES6+",
            level: "Advanced",
            description: "Arrow functions, destructuring, modules",
          },
          {
            name: "React",
            level: "Intermediate",
            description: "Components, hooks, state management",
          },
          {
            name: "State Management",
            level: "Beginner",
            description: "Context API, Redux basics",
          },
        ],
        courses: [
          {
            name: "Modern JavaScript Course",
            platform: "Udemy",
            completed: true,
            duration: "40 hours",
            rating: 4.9,
            url: "https://udemy.com/course/the-complete-javascript-course/",
          },
          {
            name: "React Complete Guide",
            platform: "Udemy",
            completed: false,
            duration: "50 hours",
            rating: 4.8,
            url: "https://udemy.com/course/react-the-complete-guide-incl-redux/",
          },
        ],
        projects: [
          {
            name: "Todo App with React",
            completed: true,
            difficulty: "Intermediate",
          },
          {
            name: "E-commerce Frontend",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "Advanced Frontend",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Advanced tools and testing methodologies",
        skills: [
          {
            name: "TypeScript",
            level: "Pending",
            description: "Type safety and better development experience",
          },
          {
            name: "Next.js",
            level: "Pending",
            description: "Full-stack React framework",
          },
          {
            name: "Testing",
            level: "Pending",
            description: "Unit and integration testing",
          },
        ],
        courses: [
          {
            name: "TypeScript Fundamentals",
            platform: "Pluralsight",
            completed: false,
            duration: "25 hours",
            rating: 4.6,
            url: "https://pluralsight.com/courses/typescript",
          },
          {
            name: "Next.js Complete Course",
            platform: "Udemy",
            completed: false,
            duration: "35 hours",
            rating: 4.7,
            url: "https://udemy.com/course/nextjs-react-the-complete-guide/",
          },
        ],
        projects: [
          {
            name: "Full Stack Blog App",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "Real-time Chat Application",
            completed: false,
            difficulty: "Expert",
          },
        ],
      },
      {
        id: 4,
        title: "Professional Skills",
        status: "upcoming",
        progress: 0,
        duration: "1-2 months",
        description: "Industry best practices and deployment",
        skills: [
          {
            name: "Git/GitHub",
            level: "Pending",
            description: "Version control and collaboration",
          },
          {
            name: "Deployment",
            level: "Pending",
            description: "CI/CD, cloud platforms",
          },
          {
            name: "Performance",
            level: "Pending",
            description: "Optimization and monitoring",
          },
        ],
        courses: [
          {
            name: "Git & GitHub Mastery",
            platform: "Udemy",
            completed: false,
            duration: "15 hours",
            rating: 4.5,
            url: "https://udemy.com/course/git-and-github-bootcamp/",
          },
          {
            name: "Web Performance Optimization",
            platform: "Google",
            completed: false,
            duration: "20 hours",
            rating: 4.8,
            url: "https://developers.google.com/web/fundamentals/performance",
          },
        ],
        projects: [
          {
            name: "Open Source Contribution",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "Portfolio Optimization",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  backend: {
    selectedPath: "Backend Developer",
    progress: 55,
    estimatedTime: "10-14 months",
    phases: [
      {
        id: 1,
        title: "Foundation Skills",
        status: "completed",
        progress: 100,
        duration: "2-3 months",
        description: "Learn backend development fundamentals",
        skills: [
          {
            name: "Python",
            level: "Expert",
            description: "Server-side programming language",
          },
          {
            name: "SQL",
            level: "Advanced",
            description: "Database queries and management",
          },
          {
            name: "API Design",
            level: "Intermediate",
            description: "RESTful API principles",
          },
        ],
        courses: [
          {
            name: "Python Backend Bootcamp",
            platform: "Udemy",
            completed: true,
            duration: "35 hours",
            rating: 4.7,
            url: "https://udemy.com/course/python-backend-web-development/",
          },
          {
            name: "SQL Fundamentals",
            platform: "Coursera",
            completed: true,
            duration: "25 hours",
            rating: 4.6,
            url: "https://coursera.org/learn/sql-data-science",
          },
        ],
        projects: [
          { name: "Simple REST API", completed: true, difficulty: "Beginner" },
          {
            name: "User Authentication System",
            completed: true,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Backend",
        status: "in_progress",
        progress: 60,
        duration: "4-5 months",
        description: "Advanced backend concepts and frameworks",
        skills: [
          {
            name: "Django/Flask",
            level: "Intermediate",
            description: "Python web frameworks",
          },
          {
            name: "Database Design",
            level: "Intermediate",
            description: "Schema design and optimization",
          },
          {
            name: "Testing",
            level: "Beginner",
            description: "Unit and integration testing",
          },
        ],
        courses: [
          {
            name: "Django Complete Course",
            platform: "Udemy",
            completed: false,
            duration: "45 hours",
            rating: 4.8,
            url: "https://udemy.com/course/python-django-the-practical-guide/",
          },
          {
            name: "Database Design",
            platform: "Coursera",
            completed: true,
            duration: "30 hours",
            rating: 4.5,
            url: "https://coursera.org/learn/database-design",
          },
        ],
        projects: [
          {
            name: "Blog API with Django",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "E-commerce Backend",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "DevOps & Deployment",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Server management and deployment",
        skills: [
          {
            name: "Docker",
            level: "Pending",
            description: "Containerization technology",
          },
          {
            name: "AWS",
            level: "Pending",
            description: "Cloud infrastructure",
          },
          {
            name: "Monitoring",
            level: "Pending",
            description: "Application monitoring and logging",
          },
        ],
        courses: [
          {
            name: "Docker for Developers",
            platform: "Udemy",
            completed: false,
            duration: "20 hours",
            rating: 4.7,
            url: "https://udemy.com/course/docker-mastery/",
          },
          {
            name: "AWS Solutions Architect",
            platform: "AWS",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://aws.amazon.com/training/path-architecting/",
          },
        ],
        projects: [
          {
            name: "Dockerized Application",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "AWS Deployment Pipeline",
            completed: false,
            difficulty: "Expert",
          },
        ],
      },
    ],
  },

  fullstack: {
    selectedPath: "Full Stack Developer",
    progress: 45,
    estimatedTime: "12-18 months",
    phases: [
      {
        id: 1,
        title: "Frontend Foundation",
        status: "completed",
        progress: 100,
        duration: "3-4 months",
        description: "Master frontend technologies",
        skills: [
          {
            name: "React",
            level: "Expert",
            description: "Frontend library and ecosystem",
          },
          {
            name: "JavaScript",
            level: "Expert",
            description: "ES6+ and modern JS concepts",
          },
          {
            name: "CSS/SCSS",
            level: "Advanced",
            description: "Styling and responsive design",
          },
        ],
        courses: [
          {
            name: "React Complete Guide",
            platform: "Udemy",
            completed: true,
            duration: "50 hours",
            rating: 4.9,
            url: "https://udemy.com/course/react-the-complete-guide-incl-redux/",
          },
          {
            name: "Modern CSS Techniques",
            platform: "Coursera",
            completed: true,
            duration: "25 hours",
            rating: 4.6,
            url: "https://coursera.org/learn/responsive-website-tutorial-and-examples/",
          },
        ],
        projects: [
          {
            name: "React Dashboard",
            completed: true,
            difficulty: "Intermediate",
          },
          {
            name: "Responsive Web App",
            completed: true,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 2,
        title: "Backend Integration",
        status: "in_progress",
        progress: 40,
        duration: "4-6 months",
        description: "Learn backend development and integration",
        skills: [
          {
            name: "Node.js",
            level: "Intermediate",
            description: "Server-side JavaScript runtime",
          },
          {
            name: "Express.js",
            level: "Intermediate",
            description: "Backend web framework",
          },
          { name: "MongoDB", level: "Beginner", description: "NoSQL database" },
        ],
        courses: [
          {
            name: "Node.js Complete Course",
            platform: "Udemy",
            completed: false,
            duration: "45 hours",
            rating: 4.8,
            url: "https://udemy.com/course/the-complete-nodejs-developer-course-2/",
          },
          {
            name: "MongoDB Essentials",
            platform: "MongoDB University",
            completed: true,
            duration: "20 hours",
            rating: 4.7,
            url: "https://university.mongodb.com/courses/M001/about",
          },
        ],
        projects: [
          { name: "Full Stack Blog", completed: false, difficulty: "Advanced" },
          {
            name: "Real-time Chat App",
            completed: false,
            difficulty: "Expert",
          },
        ],
      },
      {
        id: 3,
        title: "Advanced Integration",
        status: "upcoming",
        progress: 0,
        duration: "3-5 months",
        description: "Advanced full stack concepts",
        skills: [
          {
            name: "GraphQL",
            level: "Pending",
            description: "Query language for APIs",
          },
          {
            name: "Next.js",
            level: "Pending",
            description: "Full stack React framework",
          },
          {
            name: "Authentication",
            level: "Pending",
            description: "JWT and OAuth implementation",
          },
        ],
        courses: [
          {
            name: "GraphQL Complete Guide",
            platform: "Udemy",
            completed: false,
            duration: "35 hours",
            rating: 4.6,
            url: "https://udemy.com/course/graphql-with-react-course/",
          },
          {
            name: "Next.js for Production",
            platform: "Vercel",
            completed: false,
            duration: "30 hours",
            rating: 4.8,
            url: "https://nextjs.org/learn",
          },
        ],
        projects: [
          {
            name: "E-commerce Platform",
            completed: false,
            difficulty: "Expert",
          },
          { name: "Social Media App", completed: false, difficulty: "Expert" },
        ],
      },
    ],
  },

  "data-scientist": {
    selectedPath: "Data Scientist",
    progress: 35,
    estimatedTime: "15-24 months",
    phases: [
      {
        id: 1,
        title: "Mathematics & Statistics",
        status: "completed",
        progress: 90,
        duration: "4-6 months",
        description: "Build strong mathematical foundation",
        skills: [
          {
            name: "Statistics",
            level: "Expert",
            description: "Descriptive and inferential statistics",
          },
          {
            name: "Linear Algebra",
            level: "Advanced",
            description: "Vectors, matrices, and operations",
          },
          {
            name: "Probability",
            level: "Advanced",
            description: "Probability theory and distributions",
          },
        ],
        courses: [
          {
            name: "Statistics for Data Science",
            platform: "Coursera",
            completed: true,
            duration: "40 hours",
            rating: 4.8,
            url: "https://coursera.org/learn/statistical-inferences",
          },
          {
            name: "Linear Algebra",
            platform: "Khan Academy",
            completed: true,
            duration: "30 hours",
            rating: 4.7,
            url: "https://khanacademy.org/math/linear-algebra",
          },
        ],
        projects: [
          {
            name: "Statistical Analysis Project",
            completed: true,
            difficulty: "Intermediate",
          },
          {
            name: "Probability Simulations",
            completed: true,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Programming & Tools",
        status: "in_progress",
        progress: 50,
        duration: "5-7 months",
        description: "Master programming tools for data science",
        skills: [
          {
            name: "Python",
            level: "Intermediate",
            description: "Data manipulation and analysis",
          },
          {
            name: "Pandas",
            level: "Intermediate",
            description: "Data manipulation library",
          },
          { name: "SQL", level: "Beginner", description: "Database querying" },
        ],
        courses: [
          {
            name: "Python for Data Science",
            platform: "DataCamp",
            completed: false,
            duration: "50 hours",
            rating: 4.9,
            url: "https://datacamp.com/courses/intro-to-python-for-data-science",
          },
          {
            name: "SQL for Data Analysis",
            platform: "Udemy",
            completed: true,
            duration: "25 hours",
            rating: 4.6,
            url: "https://udemy.com/course/the-complete-sql-bootcamp/",
          },
        ],
        projects: [
          {
            name: "Data Analysis with Pandas",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "Customer Segmentation",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "Machine Learning",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description: "Learn machine learning algorithms and techniques",
        skills: [
          {
            name: "Scikit-learn",
            level: "Pending",
            description: "Machine learning library",
          },
          {
            name: "TensorFlow",
            level: "Pending",
            description: "Deep learning framework",
          },
          {
            name: "Model Evaluation",
            level: "Pending",
            description: "Validation and testing techniques",
          },
        ],
        courses: [
          {
            name: "Machine Learning A-Z",
            platform: "Udemy",
            completed: false,
            duration: "45 hours",
            rating: 4.8,
            url: "https://udemy.com/course/machinelearning/",
          },
          {
            name: "Deep Learning Specialization",
            platform: "Coursera",
            completed: false,
            duration: "60 hours",
            rating: 4.9,
            url: "https://coursera.org/specializations/deep-learning",
          },
        ],
        projects: [
          {
            name: "Predictive Model",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "Deep Learning Project",
            completed: false,
            difficulty: "Expert",
          },
        ],
      },
    ],
  },

  "mobile-developer": {
    selectedPath: "Mobile Developer",
    progress: 40,
    estimatedTime: "8-14 months",
    phases: [
      {
        id: 1,
        title: "Mobile Development Basics",
        status: "completed",
        progress: 95,
        duration: "2-3 months",
        description: "Learn mobile app development fundamentals",
        skills: [
          {
            name: "Flutter",
            level: "Expert",
            description: "Cross-platform mobile framework",
          },
          {
            name: "Dart",
            level: "Advanced",
            description: "Programming language for Flutter",
          },
          {
            name: "Mobile UI/UX",
            level: "Intermediate",
            description: "Mobile design principles",
          },
        ],
        courses: [
          {
            name: "Flutter Complete Course",
            platform: "Udemy",
            completed: true,
            duration: "40 hours",
            rating: 4.8,
            url: "https://udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/",
          },
          {
            name: "Mobile UI Design",
            platform: "Coursera",
            completed: true,
            duration: "20 hours",
            rating: 4.6,
            url: "https://coursera.org/learn/mobile-interaction-design",
          },
        ],
        projects: [
          { name: "Simple Todo App", completed: true, difficulty: "Beginner" },
          { name: "Weather App", completed: true, difficulty: "Intermediate" },
        ],
      },
      {
        id: 2,
        title: "Advanced Mobile Development",
        status: "in_progress",
        progress: 45,
        duration: "3-5 months",
        description: "Advanced mobile app features and integration",
        skills: [
          {
            name: "State Management",
            level: "Intermediate",
            description: "Bloc, Provider patterns",
          },
          {
            name: "API Integration",
            level: "Intermediate",
            description: "REST API and GraphQL",
          },
          {
            name: "Local Storage",
            level: "Beginner",
            description: "SQLite and shared preferences",
          },
        ],
        courses: [
          {
            name: "Advanced Flutter Development",
            platform: "Udemy",
            completed: false,
            duration: "50 hours",
            rating: 4.7,
            url: "https://udemy.com/course/flutter-advanced-course/",
          },
          {
            name: "Mobile App Architecture",
            platform: "Google",
            completed: true,
            duration: "15 hours",
            rating: 4.5,
            url: "https://developer.android.com/courses/android-basics-compose/course",
          },
        ],
        projects: [
          {
            name: "E-commerce Mobile App",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "Social Media App",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "App Store & Production",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Publishing and maintaining mobile apps",
        skills: [
          {
            name: "App Store Deployment",
            level: "Pending",
            description: "Publishing to app stores",
          },
          {
            name: "Performance Optimization",
            level: "Pending",
            description: "App optimization techniques",
          },
          {
            name: "Analytics",
            level: "Pending",
            description: "User analytics and crash reporting",
          },
        ],
        courses: [
          {
            name: "App Store Optimization",
            platform: "Udemy",
            completed: false,
            duration: "20 hours",
            rating: 4.4,
            url: "https://udemy.com/course/app-store-optimization-aso/",
          },
          {
            name: "Mobile App Analytics",
            platform: "Google",
            completed: false,
            duration: "15 hours",
            rating: 4.6,
            url: "https://analytics.google.com/analytics/academy/",
          },
        ],
        projects: [
          {
            name: "Production App Release",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "App Performance Audit",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },

  "ml-engineer": {
    selectedPath: "Machine Learning Engineer",
    progress: 30,
    estimatedTime: "18-24 months",
    phases: [
      {
        id: 1,
        title: "ML Fundamentals",
        status: "completed",
        progress: 85,
        duration: "4-6 months",
        description: "Learn machine learning basics and mathematics",
        skills: [
          {
            name: "Python",
            level: "Expert",
            description: "Primary programming language for ML",
          },
          {
            name: "Mathematics",
            level: "Advanced",
            description: "Linear algebra, calculus, statistics",
          },
          {
            name: "Data Processing",
            level: "Advanced",
            description: "Data cleaning and preprocessing",
          },
        ],
        courses: [
          {
            name: "Machine Learning Foundations",
            platform: "Coursera",
            completed: true,
            duration: "45 hours",
            rating: 4.9,
            url: "https://coursera.org/learn/machine-learning",
          },
          {
            name: "Python for ML",
            platform: "DataCamp",
            completed: true,
            duration: "35 hours",
            rating: 4.7,
            url: "https://datacamp.com/courses/machine-learning-for-everyone",
          },
        ],
        projects: [
          {
            name: "Linear Regression Model",
            completed: true,
            difficulty: "Beginner",
          },
          {
            name: "Classification Project",
            completed: true,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Deep Learning & Frameworks",
        status: "in_progress",
        progress: 40,
        duration: "6-8 months",
        description: "Advanced ML techniques and deep learning",
        skills: [
          {
            name: "TensorFlow",
            level: "Intermediate",
            description: "Deep learning framework",
          },
          {
            name: "PyTorch",
            level: "Beginner",
            description: "Alternative DL framework",
          },
          {
            name: "Neural Networks",
            level: "Intermediate",
            description: "CNN, RNN, and transformer models",
          },
        ],
        courses: [
          {
            name: "Deep Learning Specialization",
            platform: "Coursera",
            completed: false,
            duration: "60 hours",
            rating: 4.9,
            url: "https://coursera.org/specializations/deep-learning",
          },
          {
            name: "PyTorch Complete Guide",
            platform: "Udemy",
            completed: false,
            duration: "40 hours",
            rating: 4.6,
            url: "https://udemy.com/course/pytorch-for-deep-learning/",
          },
        ],
        projects: [
          {
            name: "CNN Image Classifier",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "NLP Sentiment Analysis",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "MLOps & Production",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Deploy and manage ML models in production",
        skills: [
          {
            name: "Model Deployment",
            level: "Pending",
            description: "Serving models at scale",
          },
          {
            name: "MLflow",
            level: "Pending",
            description: "ML lifecycle management",
          },
          {
            name: "Docker",
            level: "Pending",
            description: "Containerization for ML models",
          },
        ],
        courses: [
          {
            name: "MLOps Fundamentals",
            platform: "Coursera",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://coursera.org/learn/machine-learning-engineering-for-production-mlops",
          },
          {
            name: "ML Model Deployment",
            platform: "Udemy",
            completed: false,
            duration: "25 hours",
            rating: 4.5,
            url: "https://udemy.com/course/deployment-of-machine-learning-models/",
          },
        ],
        projects: [
          {
            name: "Model API Deployment",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "ML Pipeline Automation",
            completed: false,
            difficulty: "Expert",
          },
        ],
      },
    ],
  },

  "devops-engineer": {
    selectedPath: "DevOps Engineer",
    progress: 50,
    estimatedTime: "10-18 months",
    phases: [
      {
        id: 1,
        title: "Infrastructure Basics",
        status: "completed",
        progress: 100,
        duration: "3-4 months",
        description: "Learn infrastructure and automation basics",
        skills: [
          {
            name: "Linux",
            level: "Expert",
            description: "Command line and system administration",
          },
          {
            name: "Shell Scripting",
            level: "Advanced",
            description: "Bash and automation scripts",
          },
          {
            name: "Git",
            level: "Advanced",
            description: "Version control and collaboration",
          },
        ],
        courses: [
          {
            name: "Linux System Administration",
            platform: "Udemy",
            completed: true,
            duration: "30 hours",
            rating: 4.8,
            url: "https://udemy.com/course/linux-administration-bootcamp/",
          },
          {
            name: "Shell Scripting Mastery",
            platform: "Coursera",
            completed: true,
            duration: "25 hours",
            rating: 4.6,
            url: "https://coursera.org/learn/hands-on-introduction-to-linux-commands-and-shell-scripting",
          },
        ],
        projects: [
          {
            name: "Server Setup Automation",
            completed: true,
            difficulty: "Intermediate",
          },
          {
            name: "Backup Script System",
            completed: true,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Containerization & CI/CD",
        status: "in_progress",
        progress: 60,
        duration: "4-6 months",
        description: "Container technologies and continuous deployment",
        skills: [
          {
            name: "Docker",
            level: "Intermediate",
            description: "Containerization platform",
          },
          {
            name: "Kubernetes",
            level: "Beginner",
            description: "Container orchestration",
          },
          {
            name: "Jenkins",
            level: "Intermediate",
            description: "CI/CD automation server",
          },
        ],
        courses: [
          {
            name: "Docker Complete Course",
            platform: "Udemy",
            completed: true,
            duration: "40 hours",
            rating: 4.7,
            url: "https://udemy.com/course/docker-mastery/",
          },
          {
            name: "Kubernetes Fundamentals",
            platform: "Coursera",
            completed: false,
            duration: "35 hours",
            rating: 4.8,
            url: "https://coursera.org/learn/google-kubernetes-engine",
          },
        ],
        projects: [
          {
            name: "Dockerized Application",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "CI/CD Pipeline Setup",
            completed: true,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "Cloud & Monitoring",
        status: "upcoming",
        progress: 0,
        duration: "3-5 months",
        description: "Cloud platforms and infrastructure monitoring",
        skills: [
          { name: "AWS", level: "Pending", description: "Amazon Web Services" },
          {
            name: "Terraform",
            level: "Pending",
            description: "Infrastructure as code",
          },
          {
            name: "Monitoring",
            level: "Pending",
            description: "Prometheus, Grafana, logging",
          },
        ],
        courses: [
          {
            name: "AWS Solutions Architect",
            platform: "AWS",
            completed: false,
            duration: "45 hours",
            rating: 4.9,
            url: "https://aws.amazon.com/training/path-architecting/",
          },
          {
            name: "Infrastructure Monitoring",
            platform: "Udemy",
            completed: false,
            duration: "30 hours",
            rating: 4.5,
            url: "https://udemy.com/course/prometheus-course/",
          },
        ],
        projects: [
          {
            name: "AWS Infrastructure Setup",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "Monitoring Dashboard",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  "cloud-engineer": {
    selectedPath: "Cloud Engineer",
    progress: 42,
    estimatedTime: "12-20 months",
    phases: [
      {
        id: 1,
        title: "Cloud Fundamentals",
        status: "completed",
        progress: 90,
        duration: "3-4 months",
        description: "Learn cloud computing basics and core services",
        skills: [
          {
            name: "AWS Core",
            level: "Expert",
            description: "EC2, S3, VPC, IAM services",
          },
          {
            name: "Cloud Architecture",
            level: "Advanced",
            description: "Design patterns and best practices",
          },
          {
            name: "Networking",
            level: "Intermediate",
            description: "VPCs, subnets, security groups",
          },
        ],
        courses: [
          {
            name: "AWS Cloud Practitioner",
            platform: "AWS",
            completed: true,
            duration: "25 hours",
            rating: 4.8,
            url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/",
          },
          {
            name: "Cloud Architecture Patterns",
            platform: "Coursera",
            completed: true,
            duration: "30 hours",
            rating: 4.7,
            url: "https://coursera.org/learn/cloud-computing",
          },
        ],
        projects: [
          {
            name: "Static Website Hosting",
            completed: true,
            difficulty: "Beginner",
          },
          {
            name: "Multi-tier Application",
            completed: true,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Cloud Services",
        status: "in_progress",
        progress: 55,
        duration: "4-6 months",
        description: "Advanced cloud services and automation",
        skills: [
          {
            name: "Serverless",
            level: "Intermediate",
            description: "Lambda, API Gateway, DynamoDB",
          },
          {
            name: "Infrastructure as Code",
            level: "Intermediate",
            description: "CloudFormation, Terraform",
          },
          {
            name: "DevOps Integration",
            level: "Beginner",
            description: "CI/CD with cloud services",
          },
        ],
        courses: [
          {
            name: "AWS Solutions Architect",
            platform: "AWS",
            completed: false,
            duration: "50 hours",
            rating: 4.9,
            url: "https://aws.amazon.com/training/path-architecting/",
          },
          {
            name: "Terraform Complete Guide",
            platform: "Udemy",
            completed: true,
            duration: "35 hours",
            rating: 4.6,
            url: "https://udemy.com/course/terraform-beginner-to-advanced/",
          },
        ],
        projects: [
          {
            name: "Serverless Web Application",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "Infrastructure Automation",
            completed: true,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "Enterprise & Security",
        status: "upcoming",
        progress: 0,
        duration: "3-5 months",
        description: "Enterprise-grade solutions and security",
        skills: [
          {
            name: "Cloud Security",
            level: "Pending",
            description: "Security best practices and compliance",
          },
          {
            name: "Cost Optimization",
            level: "Pending",
            description: "Resource optimization and billing",
          },
          {
            name: "Disaster Recovery",
            level: "Pending",
            description: "Backup and recovery strategies",
          },
        ],
        courses: [
          {
            name: "AWS Security Specialty",
            platform: "AWS",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://aws.amazon.com/training/path-security/",
          },
          {
            name: "Cloud Cost Management",
            platform: "Coursera",
            completed: false,
            duration: "20 hours",
            rating: 4.5,
            url: "https://coursera.org/learn/gcp-cost-optimization",
          },
        ],
        projects: [
          {
            name: "Secure Multi-Account Setup",
            completed: false,
            difficulty: "Expert",
          },
          {
            name: "Disaster Recovery Plan",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  "ai-engineer": {
    selectedPath: "AI Engineer",
    progress: 25,
    estimatedTime: "20-24 months",
    phases: [
      {
        id: 1,
        title: "AI & Math Foundations",
        status: "completed",
        progress: 80,
        duration: "5-6 months",
        description: "Build strong foundation in AI and mathematics",
        skills: [
          {
            name: "Python",
            level: "Expert",
            description: "Primary AI programming language",
          },
          {
            name: "Linear Algebra",
            level: "Advanced",
            description: "Matrix operations and vector spaces",
          },
          {
            name: "Statistics",
            level: "Advanced",
            description: "Probability and statistical inference",
          },
        ],
        courses: [
          {
            name: "AI for Everyone",
            platform: "Coursera",
            completed: true,
            duration: "15 hours",
            rating: 4.8,
            url: "https://coursera.org/learn/ai-for-everyone",
          },
          {
            name: "Mathematics for AI",
            platform: "edX",
            completed: true,
            duration: "40 hours",
            rating: 4.7,
            url: "https://edx.org/course/introduction-to-linear-algebra",
          },
        ],
        projects: [
          {
            name: "Basic Neural Network",
            completed: true,
            difficulty: "Intermediate",
          },
          {
            name: "Linear Regression from Scratch",
            completed: true,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Deep Learning & NLP",
        status: "in_progress",
        progress: 35,
        duration: "6-8 months",
        description: "Advanced AI techniques and natural language processing",
        skills: [
          {
            name: "TensorFlow",
            level: "Intermediate",
            description: "Deep learning framework",
          },
          {
            name: "Natural Language Processing",
            level: "Beginner",
            description: "Text processing and understanding",
          },
          {
            name: "Computer Vision",
            level: "Beginner",
            description: "Image recognition and processing",
          },
        ],
        courses: [
          {
            name: "Deep Learning Specialization",
            platform: "Coursera",
            completed: false,
            duration: "60 hours",
            rating: 4.9,
            url: "https://coursera.org/specializations/deep-learning",
          },
          {
            name: "NLP with Python",
            platform: "Udemy",
            completed: false,
            duration: "45 hours",
            rating: 4.6,
            url: "https://udemy.com/course/nlp-natural-language-processing-with-python/",
          },
        ],
        projects: [
          {
            name: "Image Classification Model",
            completed: false,
            difficulty: "Advanced",
          },
          {
            name: "Chatbot Development",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "Advanced AI & Deployment",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description: "Cutting-edge AI techniques and production deployment",
        skills: [
          {
            name: "Reinforcement Learning",
            level: "Pending",
            description: "Learning through rewards and actions",
          },
          {
            name: "Model Optimization",
            level: "Pending",
            description: "Performance tuning and efficiency",
          },
          {
            name: "AI Ethics",
            level: "Pending",
            description: "Responsible AI development",
          },
        ],
        courses: [
          {
            name: "Reinforcement Learning",
            platform: "Coursera",
            completed: false,
            duration: "50 hours",
            rating: 4.8,
            url: "https://coursera.org/specializations/reinforcement-learning",
          },
          {
            name: "AI in Production",
            platform: "Udemy",
            completed: false,
            duration: "35 hours",
            rating: 4.7,
            url: "https://udemy.com/course/tensorflow-developer-certificate-machine-learning-zero-to-mastery/",
          },
        ],
        projects: [
          {
            name: "RL Game Playing Agent",
            completed: false,
            difficulty: "Expert",
          },
          {
            name: "Production AI System",
            completed: false,
            difficulty: "Expert",
          },
        ],
      },
    ],
  },

  "cybersecurity-analyst": {
    selectedPath: "Cybersecurity Analyst",
    progress: 48,
    estimatedTime: "10-18 months",
    phases: [
      {
        id: 1,
        title: "Security Fundamentals",
        status: "completed",
        progress: 95,
        duration: "3-4 months",
        description: "Learn cybersecurity basics and networking",
        skills: [
          {
            name: "Network Security",
            level: "Expert",
            description: "Firewalls, VPNs, and network protocols",
          },
          {
            name: "Operating Systems",
            level: "Advanced",
            description: "Windows and Linux security",
          },
          {
            name: "Security Policies",
            level: "Advanced",
            description: "Compliance and governance",
          },
        ],
        courses: [
          {
            name: "CompTIA Security+",
            platform: "CompTIA",
            completed: true,
            duration: "40 hours",
            rating: 4.8,
            url: "https://comptia.org/certifications/security",
          },
          {
            name: "Network Security Fundamentals",
            platform: "Coursera",
            completed: true,
            duration: "30 hours",
            rating: 4.7,
            url: "https://coursera.org/learn/network-security",
          },
        ],
        projects: [
          {
            name: "Network Security Audit",
            completed: true,
            difficulty: "Intermediate",
          },
          {
            name: "Security Policy Development",
            completed: true,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Threat Detection & Response",
        status: "in_progress",
        progress: 55,
        duration: "4-6 months",
        description: "Advanced threat hunting and incident response",
        skills: [
          {
            name: "SIEM Tools",
            level: "Intermediate",
            description: "Security information and event management",
          },
          {
            name: "Incident Response",
            level: "Intermediate",
            description: "Threat detection and response procedures",
          },
          {
            name: "Penetration Testing",
            level: "Beginner",
            description: "Ethical hacking and vulnerability assessment",
          },
        ],
        courses: [
          {
            name: "SIEM Fundamentals",
            platform: "Udemy",
            completed: true,
            duration: "25 hours",
            rating: 4.6,
            url: "https://udemy.com/course/splunk-fundamentals/",
          },
          {
            name: "Incident Response",
            platform: "SANS",
            completed: false,
            duration: "35 hours",
            rating: 4.9,
            url: "https://sans.org/cyber-security-courses/incident-response-cyber-threat-hunting/",
          },
        ],
        projects: [
          {
            name: "SIEM Dashboard Setup",
            completed: true,
            difficulty: "Advanced",
          },
          {
            name: "Incident Response Plan",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "Advanced Security & Forensics",
        status: "upcoming",
        progress: 0,
        duration: "3-5 months",
        description: "Digital forensics and advanced security analysis",
        skills: [
          {
            name: "Digital Forensics",
            level: "Pending",
            description: "Evidence collection and analysis",
          },
          {
            name: "Malware Analysis",
            level: "Pending",
            description: "Reverse engineering and threat analysis",
          },
          {
            name: "Risk Assessment",
            level: "Pending",
            description: "Vulnerability and risk management",
          },
        ],
        courses: [
          {
            name: "Digital Forensics",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.7,
            url: "https://coursera.org/learn/digital-forensics-concepts",
          },
          {
            name: "Malware Analysis",
            platform: "Udemy",
            completed: false,
            duration: "30 hours",
            rating: 4.5,
            url: "https://udemy.com/course/malware-analysis/",
          },
        ],
        projects: [
          {
            name: "Forensics Investigation",
            completed: false,
            difficulty: "Expert",
          },
          {
            name: "Risk Assessment Report",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
};

export default function CareerRoadmapPage() {
  const [selectedCareer, setSelectedCareer] = useState("frontend");
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(
    null
  );
  const [expandedPhases, setExpandedPhases] = useState<number[]>([2]);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [roadmapData, setRoadmapData] = useState(initialMockRoadmapData);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [motivationMessage, setMotivationMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const motivationMessages = [
    "🚀 Keep pushing forward - you've got this!",
    "✨ Your future self will thank you for this effort!",
    "💪 Every step counts towards your success!",
    "🎯 Great job staying consistent with your learning!",
    "📚 Learning is the key to unlocking your potential!",
    "⭐ You're one step closer to achieving your goal!",
    "🔥 Believe in yourself and all that you are!",
    "🌟 Progress, not perfection - you're doing amazing!",
    "💡 Each skill you master opens new opportunities!",
    "🎉 Consistency beats perfection every time!",
    "🏆 Your dedication today shapes your tomorrow!",
    "🌈 Every expert was once a beginner - keep going!",
  ];

  const handleMotivationClick = () => {
    setMotivationMessage(motivationMessages[motivationIndex]);
    setMotivationIndex((motivationIndex + 1) % motivationMessages.length);
  };

  const currentRoadmapData =
    roadmapData[selectedCareer] || roadmapData.frontend;

  // Initialize animations
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedProgress(currentRoadmapData.progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentRoadmapData.progress]);

  // Calculate overall progress based on phases
  const calculateOverallProgress = (phases) => {
    if (!phases || phases.length === 0) return 0;
    const totalProgress = phases.reduce(
      (acc, phase) => acc + phase.progress,
      0
    );
    return Math.round(totalProgress / phases.length);
  };

  // Calculate phase progress based on courses and projects
  const calculatePhaseProgress = (phase) => {
    const totalCourses = phase.courses.length;
    const totalProjects = phase.projects.length;
    const completedCourses = phase.courses.filter(
      (course) => course.completed
    ).length;
    const completedProjects = phase.projects.filter(
      (project) => project.completed
    ).length;

    if (totalCourses + totalProjects === 0) return 0;

    const progress =
      ((completedCourses + completedProjects) /
        (totalCourses + totalProjects)) *
      100;
    return Math.round(progress);
  };

  // Update phase status based on progress
  const updatePhaseStatus = (progress) => {
    if (progress === 100) return "completed";
    if (progress > 0) return "in_progress";
    return "upcoming";
  };

  // Toggle phase completion (checkbox)
  const togglePhaseCompletion = (phaseId) => {
    setRoadmapData((prevData) => {
      const newData = { ...prevData };
      const phases = [...newData[selectedCareer].phases];

      const phaseIndex = phases.findIndex((phase) => phase.id === phaseId);
      if (phaseIndex === -1) return prevData;

      const phase = { ...phases[phaseIndex] };
      const isCompleted = phase.status === "completed";

      // Toggle all courses and projects in this phase
      phase.courses = phase.courses.map((course) => ({
        ...course,
        completed: !isCompleted,
      }));
      phase.projects = phase.projects.map((project) => ({
        ...project,
        completed: !isCompleted,
      }));

      // Update progress and status
      phase.progress = isCompleted ? 0 : 100;
      phase.status = isCompleted ? "upcoming" : "completed";

      phases[phaseIndex] = phase;
      newData[selectedCareer] = {
        ...newData[selectedCareer],
        phases,
        progress: calculateOverallProgress(phases),
      };

      return newData;
    });
  };

  // Toggle course completion
  const toggleCourseCompletion = (phaseId, courseIndex) => {
    setRoadmapData((prevData) => {
      const newData = { ...prevData };
      const phases = [...newData[selectedCareer].phases];

      const phaseIndex = phases.findIndex((phase) => phase.id === phaseId);
      if (phaseIndex === -1) return prevData;

      const phase = { ...phases[phaseIndex] };
      phase.courses = [...phase.courses];
      phase.courses[courseIndex] = {
        ...phase.courses[courseIndex],
        completed: !phase.courses[courseIndex].completed,
      };

      // Recalculate phase progress
      phase.progress = calculatePhaseProgress(phase);
      phase.status = updatePhaseStatus(phase.progress);

      phases[phaseIndex] = phase;
      newData[selectedCareer] = {
        ...newData[selectedCareer],
        phases,
        progress: calculateOverallProgress(phases),
      };

      return newData;
    });
  };

  // Toggle project completion
  const toggleProjectCompletion = (phaseId, projectIndex) => {
    setRoadmapData((prevData) => {
      const newData = { ...prevData };
      const phases = [...newData[selectedCareer].phases];

      const phaseIndex = phases.findIndex((phase) => phase.id === phaseId);
      if (phaseIndex === -1) return prevData;

      const phase = { ...phases[phaseIndex] };
      phase.projects = [...phase.projects];
      phase.projects[projectIndex] = {
        ...phase.projects[projectIndex],
        completed: !phase.projects[projectIndex].completed,
      };

      // Recalculate phase progress
      phase.progress = calculatePhaseProgress(phase);
      phase.status = updatePhaseStatus(phase.progress);

      phases[phaseIndex] = phase;
      newData[selectedCareer] = {
        ...newData[selectedCareer],
        phases,
        progress: calculateOverallProgress(phases),
      };

      return newData;
    });
  };

  const togglePhase = (phaseId: number) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseId)
        ? prev.filter((id) => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />;
      case "in_progress":
        return (
          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 animate-pulse" />
        );
      default:
        return <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getSkillBadgeColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer transition-all duration-200";
      case "Advanced":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-all duration-200";
      case "Intermediate":
        return "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer transition-all duration-200";
      case "Beginner":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer transition-all duration-200";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer transition-all duration-200";
    }
  };

  const selectedPath = careerPaths.find((path) => path.id === selectedCareer);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Enhanced Header - Mobile Optimized */}
          <div
            className={`text-center space-y-2 sm:space-y-3 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg">
                <Map className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-left sm:text-center">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Career Roadmap
                </h1>
                <div className="flex items-center gap-1 sm:gap-2 justify-start sm:justify-center mt-1">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    AI-Powered Learning Path
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your personalized path to achieving your career goals with
              AI-powered guidance and progress tracking
            </p>
          </div>

          {/* Enhanced Career Path Selection - Mobile First */}
          <Card
            className={`relative overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 ${
              isVisible ? "animate-slideInLeft" : "opacity-0"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-28 sm:h-28 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>

            <CardHeader className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 relative z-10">
                <div className="p-2 sm:p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg">
                  <Target className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">
                    Select Your Career Goal
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
                    Choose your target role to generate a personalized learning
                    roadmap
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 lg:p-8 pt-0 relative z-10">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Career Path Selector */}
                <div className="space-y-3 sm:space-y-4">
                  <label className="text-sm sm:text-base font-semibold text-gray-700 block">
                    🎯 Career Path
                  </label>
                  <Select
                    value={selectedCareer}
                    onValueChange={setSelectedCareer}
                  >
                    <SelectTrigger className="w-full h-12 sm:h-14 lg:h-16 shadow-lg border-2 border-gray-200 hover:border-purple-500 focus:border-purple-600 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-xl text-sm sm:text-base">
                      <SelectValue placeholder="Select a career path" />
                    </SelectTrigger>
                    <SelectContent className="w-full max-h-80 overflow-y-auto">
                      {careerPaths.map((path) => (
                        <SelectItem
                          key={path.id}
                          value={path.id}
                          className="cursor-pointer hover:bg-purple-50 py-3 sm:py-4"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="text-xl sm:text-2xl flex-shrink-0">
                              {path.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm sm:text-base text-gray-900">
                                {path.name}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                                {path.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Path Overview */}
                {selectedPath && (
                  <div
                    className={`p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r ${selectedPath.bgGradient} border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <span className="text-3xl sm:text-4xl">
                        {selectedPath.icon}
                      </span>
                      <h4 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900">
                        Path Overview
                      </h4>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 bg-white/70 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-700">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-sm sm:text-base">
                            Salary:
                          </span>
                        </div>
                        <span className="text-sm sm:text-base text-gray-800 font-medium">
                          {selectedPath.salary}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 bg-white/70 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold text-sm sm:text-base">
                            Timeline:
                          </span>
                        </div>
                        <span className="text-sm sm:text-base text-gray-800 font-medium">
                          {selectedPath.timeFrame}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Progress Overview - Mobile Optimized */}
          <Card
            className={`relative overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 ${
              isVisible ? "animate-slideInRight" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-blue-50/30 to-cyan-50/30"></div>
            <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-purple-500/5 to-transparent rounded-br-full"></div>

            <CardHeader className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 relative z-10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 sm:p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg">
                    <Rocket className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">
                      {currentRoadmapData.selectedPath} Journey
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-gray-600 mt-1">
                      Track your progress towards becoming a{" "}
                      {currentRoadmapData.selectedPath}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-600 font-medium">
                    Live Progress
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 lg:p-8 pt-0 relative z-10">
              {/* Stats Grid - Enhanced Mobile Layout */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {currentRoadmapData.progress}%
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                    Overall Progress
                  </p>
                  <div className="mt-2 h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                      style={{ width: `${currentRoadmapData.progress}%` }}
                    />
                  </div>
                </div>

                <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 mb-2">
                    {currentRoadmapData.estimatedTime}
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                    Est. Time Left
                  </p>
                  <div className="mt-2 flex items-center justify-center">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  </div>
                </div>

                <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    {
                      currentRoadmapData.phases.filter(
                        (p) => p.status === "completed"
                      ).length
                    }
                    /{currentRoadmapData.phases.length}
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                    Phases Done
                  </p>
                  <div className="mt-2 flex items-center justify-center">
                    <FlagIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                  </div>
                </div>

                <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 col-span-2 lg:col-span-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 mb-2">
                    {currentRoadmapData.phases.reduce(
                      (total, phase) =>
                        total + phase.courses.length + phase.projects.length,
                      0
                    )}
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                    Total Learning Items
                  </p>
                  <div className="mt-2 flex items-center justify-center">
                    <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="relative mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-3 text-xs sm:text-sm text-gray-600">
                  <span className="font-medium">Journey Progress</span>
                  <span className="font-bold text-purple-600">
                    {animatedProgress}% Complete
                  </span>
                </div>
                <div className="relative h-4 sm:h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${animatedProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      {animatedProgress > 15 && (
                        <span className="text-white text-xs sm:text-sm font-bold">
                          {animatedProgress}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>🚀 Start</span>
                  <span>🎯 Goal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Learning Phases - Mobile Optimized */}
          <div
            className={`space-y-4 sm:space-y-6 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg">
                  <Brain className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Learning Phases
                </h2>
              </div>
              {selectedSkillFilter && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSkillFilter(null)}
                  className="text-purple-600 border-purple-300 hover:bg-purple-50 text-xs sm:text-sm gap-2 w-full sm:w-auto"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  Clear Filter: {selectedSkillFilter}
                </Button>
              )}
            </div>

            {/* Phase Cards - Enhanced Mobile Layout */}
            {currentRoadmapData.phases.map((phase, index) => {
              const isExpanded = expandedPhases.includes(phase.id);
              const isCurrentPhase = phase.status === "in_progress";

              return (
                <Card
                  key={phase.id}
                  className={`transition-all duration-500 hover:shadow-2xl border-0 group ${
                    phase.status === "completed"
                      ? "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/80 via-green-50/40 to-white shadow-xl"
                      : phase.status === "in_progress"
                      ? "border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/80 via-blue-50/40 to-white shadow-2xl ring-2 ring-blue-200/50"
                      : "border-l-4 border-l-gray-300 hover:border-l-purple-500 bg-white/95 backdrop-blur-sm hover:shadow-xl"
                  } hover:scale-[1.01]`}
                >
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50/30 transition-all duration-300 p-4 sm:p-6"
                    onClick={() => togglePhase(phase.id)}
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      {/* Left Section - Mobile Optimized */}
                      <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(phase.status)}
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                          <Checkbox
                            checked={phase.status === "completed"}
                            onCheckedChange={() =>
                              togglePhaseCompletion(phase.id)
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-3">
                              <CardTitle className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate">
                                Phase {phase.id}: {phase.title}
                              </CardTitle>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge
                                  className={`${getStatusColor(
                                    phase.status
                                  )} text-xs border-0 shadow-sm`}
                                >
                                  {phase.status.replace("_", " ")}
                                </Badge>
                                {isCurrentPhase && (
                                  <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                                    <span className="text-xs font-medium text-yellow-700">
                                      Current
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                              {phase.description}
                            </p>

                            {/* Progress Section */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                  <TimerIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span>{phase.duration}</span>
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-gray-700">
                                  {phase.progress}%
                                </span>
                              </div>
                              <div className="relative">
                                <Progress
                                  value={phase.progress}
                                  className="h-2 sm:h-3 bg-gray-200 rounded-full"
                                >
                                  <div
                                    className={`h-full rounded-full transition-all duration-1000 ${
                                      phase.status === "completed"
                                        ? "bg-gradient-to-r from-green-500 to-green-600"
                                        : phase.status === "in_progress"
                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                                        : "bg-gradient-to-r from-gray-400 to-gray-500"
                                    }`}
                                  />
                                </Progress>
                                {phase.status === "in_progress" && (
                                  <div className="absolute top-0 left-0 h-full w-full bg-white/20 animate-pulse rounded-full" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Mobile Optimized */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          {isCurrentPhase && (
                            <div className="flex items-center gap-1 text-xs bg-blue-100 px-2 py-1 rounded-full">
                              <Play className="h-3 w-3 text-blue-600" />
                              <span className="hidden sm:inline text-blue-700">
                                Active
                              </span>
                            </div>
                          )}
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 group-hover:text-purple-600 transition-colors" />
                          ) : (
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 group-hover:text-purple-600 transition-colors" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Expanded Content - Enhanced Mobile Layout */}
                  {isExpanded && (
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <Tabs defaultValue="skills" className="space-y-4">
                        {/* Enhanced Mobile Tabs */}
                        <div className="overflow-x-auto">
                          <TabsList className="grid w-full grid-cols-3 bg-gray-100 h-12 sm:h-14 min-w-[300px] rounded-xl">
                            <TabsTrigger
                              value="skills"
                              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm font-medium transition-all duration-300 rounded-lg"
                            >
                              <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              <span>Skills</span>
                            </TabsTrigger>
                            <TabsTrigger
                              value="courses"
                              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm font-medium transition-all duration-300 rounded-lg"
                            >
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              <span>Courses</span>
                            </TabsTrigger>
                            <TabsTrigger
                              value="projects"
                              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm font-medium transition-all duration-300 rounded-lg"
                            >
                              <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              <span>Projects</span>
                            </TabsTrigger>
                          </TabsList>
                        </div>

                        {/* Skills Tab - Enhanced */}
                        <TabsContent value="skills" className="space-y-4">
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            {phase.skills.map((skill, skillIndex) => (
                              <Tooltip key={skillIndex}>
                                <TooltipTrigger>
                                  <Badge
                                    className={`${getSkillBadgeColor(
                                      skill.level
                                    )} transform hover:scale-105 text-xs sm:text-sm shadow-sm`}
                                    onClick={() =>
                                      setSelectedSkillFilter(skill.name)
                                    }
                                  >
                                    <span className="mr-1 sm:mr-2">
                                      {skill.name}
                                    </span>
                                    <span className="text-xs opacity-75 hidden sm:inline">
                                      ({skill.level})
                                    </span>
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="bottom"
                                  className="max-w-xs"
                                >
                                  <div className="space-y-1">
                                    <p className="font-semibold">
                                      {skill.name}
                                    </p>
                                    <p className="text-sm">
                                      {skill.description}
                                    </p>
                                    <p className="text-xs opacity-75">
                                      Level: {skill.level}
                                    </p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </TabsContent>

                        {/* Courses Tab - Enhanced Mobile Layout */}
                        <TabsContent
                          value="courses"
                          className="space-y-3 sm:space-y-4"
                        >
                          {phase.courses
                            .filter(
                              (course) =>
                                !selectedSkillFilter ||
                                course.name
                                  .toLowerCase()
                                  .includes(selectedSkillFilter.toLowerCase())
                            )
                            .map((course, courseIndex) => (
                              <div
                                key={courseIndex}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:from-blue-100 hover:to-cyan-100"
                              >
                                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                  <Checkbox
                                    checked={course.completed}
                                    onCheckedChange={() =>
                                      toggleCourseCompletion(
                                        phase.id,
                                        courseIndex
                                      )
                                    }
                                    className="mt-1 flex-shrink-0"
                                  />
                                  <div className="p-2 bg-blue-200 rounded-lg flex-shrink-0">
                                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">
                                      {course.name}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                                      <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                        {course.platform}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {course.duration}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                        {course.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                                  onClick={() =>
                                    window.open(course.url, "_blank")
                                  }
                                >
                                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="text-xs sm:text-sm">
                                    Start Course
                                  </span>
                                </Button>
                              </div>
                            ))}
                        </TabsContent>

                        {/* Projects Tab - Enhanced Mobile Layout */}
                        <TabsContent
                          value="projects"
                          className="space-y-3 sm:space-y-4"
                        >
                          {phase.projects
                            .filter(
                              (project) =>
                                !selectedSkillFilter ||
                                project.name
                                  .toLowerCase()
                                  .includes(selectedSkillFilter.toLowerCase())
                            )
                            .map((project, projectIndex) => (
                              <div
                                key={projectIndex}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:from-purple-100 hover:to-pink-100"
                              >
                                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                  <Checkbox
                                    checked={project.completed}
                                    onCheckedChange={() =>
                                      toggleProjectCompletion(
                                        phase.id,
                                        projectIndex
                                      )
                                    }
                                    className="mt-1 flex-shrink-0"
                                  />
                                  <div className="p-2 bg-purple-200 rounded-lg flex-shrink-0">
                                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm sm:text-base text-gray-900 mb-2">
                                      {project.name}
                                    </p>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                      <Badge
                                        className={`text-xs sm:text-sm ${
                                          project.difficulty === "Beginner"
                                            ? "bg-green-100 text-green-700 border-green-300"
                                            : project.difficulty ===
                                              "Intermediate"
                                            ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                            : project.difficulty === "Advanced"
                                            ? "bg-orange-100 text-orange-700 border-orange-300"
                                            : "bg-red-100 text-red-700 border-red-300"
                                        }`}
                                      >
                                        {project.difficulty}
                                      </Badge>
                                      {project.completed && (
                                        <Badge className="bg-green-100 text-green-800 border-green-300 text-xs sm:text-sm">
                                          <CheckCircle className="h-3 w-3 mr-1" />
                                          Done
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Enhanced Next Steps - Mobile Optimized */}
          <Card
            className={`border-2 border-dashed border-purple-500 bg-gradient-to-br from-purple-50/70 to-blue-50/70 shadow-2xl hover:shadow-3xl transition-all duration-500 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg">
                  <Target className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-purple-600 text-base sm:text-lg lg:text-xl font-bold flex items-center gap-2">
                    🎯 Next Steps
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-gray-600">
                    Recommended actions to continue your progress
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300 hover:from-blue-100 hover:to-blue-200">
                  <div className="p-2 sm:p-3 bg-blue-200 rounded-lg">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-blue-900 text-sm sm:text-base mb-2">
                      Continue Current Phase
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 mb-3 sm:mb-4 leading-relaxed">
                      Focus on completing your in-progress learning phase to
                      maintain momentum
                    </p>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                      onClick={handleMotivationClick}
                    >
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Continue Learning
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl border-l-4 border-l-purple-500 hover:shadow-xl transition-all duration-300 hover:from-purple-100 hover:to-purple-200">
                  <div className="p-2 sm:p-3 bg-purple-200 rounded-lg">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-purple-900 text-sm sm:text-base mb-2">
                      Build Portfolio Projects
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 mb-3 sm:mb-4 leading-relaxed">
                      Apply your skills in real-world projects to strengthen
                      your portfolio
                    </p>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                      onClick={handleMotivationClick}
                    >
                      <Rocket className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Start Building
                    </Button>
                  </div>
                </div>
              </div>

              {/* Motivation Message Display - Enhanced */}
              {motivationMessage && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl sm:rounded-2xl border-l-4 border-l-yellow-400 animate-fadeIn shadow-lg">
                  <p className="text-center text-sm sm:text-base lg:text-lg font-semibold text-gray-800 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl">💫</span>
                    <span className="flex-1 min-w-0">{motivationMessage}</span>
                    <span className="text-2xl sm:text-3xl">💫</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
