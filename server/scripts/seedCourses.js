// scripts/seedCourses.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Import Roadmap model with error handling
let Roadmap;
try {
  const module = await import("../models/roadmapModel.js");
  Roadmap = module.default;
  console.log("✓ Roadmap model loaded successfully");
} catch (error) {
  console.error("❌ Error loading Roadmap model:", error.message);
  console.error("   File path:", error);
  process.exit(1);
}

// MongoDB connection
const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log(
      "URI:",
      process.env.MONGODB_URL || "mongodb://localhost:27017/careerpath-ai"
    );

    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost:27017/careerpath-ai"
    );
    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Initial Mock Roadmap Data (from your paste.txt)
const initialMockRoadmapData = {
  frontend: {
    selectedPath: "Frontend Developer",
    progress: 0,
    estimatedTime: "8-12 months",
    phases: [
      {
        id: 1,
        title: "Foundation Skills",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Master the core fundamentals of web development",
        skills: [
          {
            name: "HTML",
            level: "Pending",
            description: "Semantic markup and accessibility",
          },
          {
            name: "CSS",
            level: "Pending",
            description: "Layouts, animations, and responsive design",
          },
          {
            name: "JavaScript Basics",
            level: "Pending",
            description: "ES6+, DOM manipulation, async programming",
          },
        ],
        courses: [
          {
            name: "HTML & CSS Fundamentals",
            platform: "freeCodeCamp",
            completed: false,
            duration: "20 hours",
            rating: 4.8,
            url: "https://freecodecamp.org/learn/responsive-web-design/",
          },
          {
            name: "JavaScript Basics",
            platform: "Codecademy",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://codecademy.com/learn/introduction-to-javascript",
          },
        ],
        projects: [
          {
            name: "Personal Portfolio Website",
            completed: false,
            difficulty: "Beginner",
          },
          {
            name: "Responsive Landing Page",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Modern JavaScript & React",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn modern JavaScript and React ecosystem",
        skills: [
          {
            name: "ES6+",
            level: "Pending",
            description: "Arrow functions, destructuring, modules",
          },
          {
            name: "React",
            level: "Pending",
            description: "Components, hooks, state management",
          },
          {
            name: "State Management",
            level: "Pending",
            description: "Context API, Redux basics",
          },
        ],
        courses: [
          {
            name: "Modern JavaScript Course",
            platform: "Udemy",
            completed: false,
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
            completed: false,
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
    progress: 0,
    estimatedTime: "10-14 months",
    phases: [
      {
        id: 1,
        title: "Foundation Skills",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Learn backend development fundamentals",
        skills: [
          {
            name: "Python",
            level: "Pending",
            description: "Server-side programming language",
          },
          {
            name: "SQL",
            level: "Pending",
            description: "Database queries and management",
          },
          {
            name: "API Design",
            level: "Pending",
            description: "RESTful API principles",
          },
        ],
        courses: [
          {
            name: "Python Backend Bootcamp",
            platform: "Udemy",
            completed: false,
            duration: "35 hours",
            rating: 4.7,
            url: "https://udemy.com/course/python-backend-web-development/",
          },
          {
            name: "SQL Fundamentals",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.6,
            url: "https://coursera.org/learn/sql-data-science",
          },
        ],
        projects: [
          { name: "Simple REST API", completed: false, difficulty: "Beginner" },
          {
            name: "User Authentication System",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Backend",
        status: "upcoming",
        progress: 0,
        duration: "4-5 months",
        description: "Advanced backend concepts and frameworks",
        skills: [
          {
            name: "Django/Flask",
            level: "Pending",
            description: "Python web frameworks",
          },
          {
            name: "Database Design",
            level: "Pending",
            description: "Schema design and optimization",
          },
          {
            name: "Testing",
            level: "Pending",
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
            completed: false,
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
    progress: 0,
    estimatedTime: "12-18 months",
    phases: [
      {
        id: 1,
        title: "Frontend Foundation",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Master frontend technologies",
        skills: [
          {
            name: "React",
            level: "Pending",
            description: "Frontend library and ecosystem",
          },
          {
            name: "JavaScript",
            level: "Pending",
            description: "ES6+ and modern JS concepts",
          },
          {
            name: "CSS/SCSS",
            level: "Pending",
            description: "Styling and responsive design",
          },
        ],
        courses: [
          {
            name: "React Complete Guide",
            platform: "Udemy",
            completed: false,
            duration: "50 hours",
            rating: 4.9,
            url: "https://udemy.com/course/react-the-complete-guide-incl-redux/",
          },
          {
            name: "Modern CSS Techniques",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.6,
            url: "https://coursera.org/learn/responsive-website-tutorial-and-examples/",
          },
        ],
        projects: [
          {
            name: "React Dashboard",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "Responsive Web App",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 2,
        title: "Backend Integration",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Learn backend development and integration",
        skills: [
          {
            name: "Node.js",
            level: "Pending",
            description: "Server-side JavaScript runtime",
          },
          {
            name: "Express.js",
            level: "Pending",
            description: "Backend web framework",
          },
          { name: "MongoDB", level: "Pending", description: "NoSQL database" },
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
            completed: false,
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
    progress: 0,
    estimatedTime: "15-24 months",
    phases: [
      {
        id: 1,
        title: "Mathematics & Statistics",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Build strong mathematical foundation",
        skills: [
          {
            name: "Statistics",
            level: "Pending",
            description: "Descriptive and inferential statistics",
          },
          {
            name: "Linear Algebra",
            level: "Pending",
            description: "Vectors, matrices, and operations",
          },
          {
            name: "Probability",
            level: "Pending",
            description: "Probability theory and distributions",
          },
        ],
        courses: [
          {
            name: "Statistics for Data Science",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://coursera.org/learn/statistical-inferences",
          },
          {
            name: "Linear Algebra",
            platform: "Khan Academy",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://khanacademy.org/math/linear-algebra",
          },
        ],
        projects: [
          {
            name: "Statistical Analysis Project",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "Probability Simulations",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Programming & Tools",
        status: "upcoming",
        progress: 0,
        duration: "5-7 months",
        description: "Master programming tools for data science",
        skills: [
          {
            name: "Python",
            level: "Pending",
            description: "Data manipulation and analysis",
          },
          {
            name: "Pandas",
            level: "Pending",
            description: "Data manipulation library",
          },
          { name: "SQL", level: "Pending", description: "Database querying" },
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
            completed: false,
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
    progress: 0,
    estimatedTime: "8-14 months",
    phases: [
      {
        id: 1,
        title: "Mobile Development Basics",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Learn mobile app development fundamentals",
        skills: [
          {
            name: "Flutter",
            level: "Pending",
            description: "Cross-platform mobile framework",
          },
          {
            name: "Dart",
            level: "Pending",
            description: "Programming language for Flutter",
          },
          {
            name: "Mobile UI/UX",
            level: "Pending",
            description: "Mobile design principles",
          },
        ],
        courses: [
          {
            name: "Flutter Complete Course",
            platform: "Udemy",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/",
          },
          {
            name: "Mobile UI Design",
            platform: "Coursera",
            completed: false,
            duration: "20 hours",
            rating: 4.6,
            url: "https://coursera.org/learn/mobile-interaction-design",
          },
        ],
        projects: [
          { name: "Simple Todo App", completed: false, difficulty: "Beginner" },
          { name: "Weather App", completed: false, difficulty: "Intermediate" },
        ],
      },
      {
        id: 2,
        title: "Advanced Mobile Development",
        status: "upcoming",
        progress: 0,
        duration: "3-5 months",
        description: "Advanced mobile app features and integration",
        skills: [
          {
            name: "State Management",
            level: "Pending",
            description: "Bloc, Provider patterns",
          },
          {
            name: "API Integration",
            level: "Pending",
            description: "REST API and GraphQL",
          },
          {
            name: "Local Storage",
            level: "Pending",
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
            completed: false,
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
    progress: 0,
    estimatedTime: "18-24 months",
    phases: [
      {
        id: 1,
        title: "ML Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Learn machine learning basics and mathematics",
        skills: [
          {
            name: "Python",
            level: "Pending",
            description: "Primary programming language for ML",
          },
          {
            name: "Mathematics",
            level: "Pending",
            description: "Linear algebra, calculus, statistics",
          },
          {
            name: "Data Processing",
            level: "Pending",
            description: "Data cleaning and preprocessing",
          },
        ],
        courses: [
          {
            name: "Machine Learning Foundations",
            platform: "Coursera",
            completed: false,
            duration: "45 hours",
            rating: 4.9,
            url: "https://coursera.org/learn/machine-learning",
          },
          {
            name: "Python for ML",
            platform: "DataCamp",
            completed: false,
            duration: "35 hours",
            rating: 4.7,
            url: "https://datacamp.com/courses/machine-learning-for-everyone",
          },
        ],
        projects: [
          {
            name: "Linear Regression Model",
            completed: false,
            difficulty: "Beginner",
          },
          {
            name: "Classification Project",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Deep Learning & Frameworks",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description: "Advanced ML techniques and deep learning",
        skills: [
          {
            name: "TensorFlow",
            level: "Pending",
            description: "Deep learning framework",
          },
          {
            name: "PyTorch",
            level: "Pending",
            description: "Alternative DL framework",
          },
          {
            name: "Neural Networks",
            level: "Pending",
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
    progress: 0,
    estimatedTime: "10-18 months",
    phases: [
      {
        id: 1,
        title: "Infrastructure Basics",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn infrastructure and automation basics",
        skills: [
          {
            name: "Linux",
            level: "Pending",
            description: "Command line and system administration",
          },
          {
            name: "Shell Scripting",
            level: "Pending",
            description: "Bash and automation scripts",
          },
          {
            name: "Git",
            level: "Pending",
            description: "Version control and collaboration",
          },
        ],
        courses: [
          {
            name: "Linux System Administration",
            platform: "Udemy",
            completed: false,
            duration: "30 hours",
            rating: 4.8,
            url: "https://udemy.com/course/linux-administration-bootcamp/",
          },
          {
            name: "Shell Scripting Mastery",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.6,
            url: "https://coursera.org/learn/hands-on-introduction-to-linux-commands-and-shell-scripting",
          },
        ],
        projects: [
          {
            name: "Server Setup Automation",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "Backup Script System",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Containerization & CI/CD",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Container technologies and continuous deployment",
        skills: [
          {
            name: "Docker",
            level: "Pending",
            description: "Containerization platform",
          },
          {
            name: "Kubernetes",
            level: "Pending",
            description: "Container orchestration",
          },
          {
            name: "Jenkins",
            level: "Pending",
            description: "CI/CD automation server",
          },
        ],
        courses: [
          {
            name: "Docker Complete Course",
            platform: "Udemy",
            completed: false,
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
            completed: false,
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
    progress: 0,
    estimatedTime: "12-20 months",
    phases: [
      {
        id: 1,
        title: "Cloud Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn cloud computing basics and core services",
        skills: [
          {
            name: "AWS Core",
            level: "Pending",
            description: "EC2, S3, VPC, IAM services",
          },
          {
            name: "Cloud Architecture",
            level: "Pending",
            description: "Design patterns and best practices",
          },
          {
            name: "Networking",
            level: "Pending",
            description: "VPCs, subnets, security groups",
          },
        ],
        courses: [
          {
            name: "AWS Cloud Practitioner",
            platform: "AWS",
            completed: false,
            duration: "25 hours",
            rating: 4.8,
            url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/",
          },
          {
            name: "Cloud Architecture Patterns",
            platform: "Coursera",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://coursera.org/learn/cloud-computing",
          },
        ],
        projects: [
          {
            name: "Static Website Hosting",
            completed: false,
            difficulty: "Beginner",
          },
          {
            name: "Multi-tier Application",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Cloud Services",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Advanced cloud services and automation",
        skills: [
          {
            name: "Serverless",
            level: "Pending",
            description: "Lambda, API Gateway, DynamoDB",
          },
          {
            name: "Infrastructure as Code",
            level: "Pending",
            description: "CloudFormation, Terraform",
          },
          {
            name: "DevOps Integration",
            level: "Pending",
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
            completed: false,
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
            completed: false,
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
    progress: 0,
    estimatedTime: "20-24 months",
    phases: [
      {
        id: 1,
        title: "AI & Math Foundations",
        status: "upcoming",
        progress: 0,
        duration: "5-6 months",
        description: "Build strong foundation in AI and mathematics",
        skills: [
          {
            name: "Python",
            level: "Pending",
            description: "Primary AI programming language",
          },
          {
            name: "Linear Algebra",
            level: "Pending",
            description: "Matrix operations and vector spaces",
          },
          {
            name: "Statistics",
            level: "Pending",
            description: "Probability and statistical inference",
          },
        ],
        courses: [
          {
            name: "AI for Everyone",
            platform: "Coursera",
            completed: false,
            duration: "15 hours",
            rating: 4.8,
            url: "https://coursera.org/learn/ai-for-everyone",
          },
          {
            name: "Mathematics for AI",
            platform: "edX",
            completed: false,
            duration: "40 hours",
            rating: 4.7,
            url: "https://edx.org/course/introduction-to-linear-algebra",
          },
        ],
        projects: [
          {
            name: "Basic Neural Network",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "Linear Regression from Scratch",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Deep Learning & NLP",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description: "Advanced AI techniques and natural language processing",
        skills: [
          {
            name: "TensorFlow",
            level: "Pending",
            description: "Deep learning framework",
          },
          {
            name: "Natural Language Processing",
            level: "Pending",
            description: "Text processing and understanding",
          },
          {
            name: "Computer Vision",
            level: "Pending",
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
    progress: 0,
    estimatedTime: "10-18 months",
    phases: [
      {
        id: 1,
        title: "Security Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn cybersecurity basics and networking",
        skills: [
          {
            name: "Network Security",
            level: "Pending",
            description: "Firewalls, VPNs, and network protocols",
          },
          {
            name: "Operating Systems",
            level: "Pending",
            description: "Windows and Linux security",
          },
          {
            name: "Security Policies",
            level: "Pending",
            description: "Compliance and governance",
          },
        ],
        courses: [
          {
            name: "CompTIA Security+",
            platform: "CompTIA",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://comptia.org/certifications/security",
          },
          {
            name: "Network Security Fundamentals",
            platform: "Coursera",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://coursera.org/learn/network-security",
          },
        ],
        projects: [
          {
            name: "Network Security Audit",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "Security Policy Development",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Threat Detection & Response",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Advanced threat hunting and incident response",
        skills: [
          {
            name: "SIEM Tools",
            level: "Pending",
            description: "Security information and event management",
          },
          {
            name: "Incident Response",
            level: "Pending",
            description: "Threat detection and response procedures",
          },
          {
            name: "Penetration Testing",
            level: "Pending",
            description: "Ethical hacking and vulnerability assessment",
          },
        ],
        courses: [
          {
            name: "SIEM Fundamentals",
            platform: "Udemy",
            completed: false,
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
            completed: false,
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
  "game-developer": {
    selectedPath: "Game Developer",
    progress: 0,
    estimatedTime: "12-18 months",
    phases: [
      {
        id: 1,
        title: "Game Development Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Understand programming and game design basics",
        skills: [
          {
            name: "C++/C#",
            level: "Pending",
            description: "Core programming languages for game development",
          },
          {
            name: "Math for Games",
            level: "Pending",
            description: "Linear algebra, vectors, physics",
          },
          {
            name: "Game Engines Basics",
            level: "Pending",
            description: "Unity/Unreal basics",
          },
        ],
        courses: [
          {
            name: "Intro to C# and Unity",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.7,
            url: "https://www.coursera.org/specializations/game-design",
          },
          {
            name: "Unreal Engine Essentials",
            platform: "Udemy",
            completed: false,
            duration: "30 hours",
            rating: 4.8,
            url: "https://www.udemy.com/course/unreal-engine-the-ultimate-game-developer-course/",
          },
        ],
        projects: [
          {
            name: "Simple 2D Platformer",
            completed: false,
            difficulty: "Beginner",
          },
          {
            name: "Physics-based Game Demo",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Intermediate Game Development",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Develop intermediate-level games with advanced concepts",
        skills: [
          {
            name: "AI for Games",
            level: "Pending",
            description: "Pathfinding, decision-making, behaviors",
          },
          {
            name: "3D Game Development",
            level: "Pending",
            description: "3D physics, lighting, and rendering",
          },
          {
            name: "Game Asset Integration",
            level: "Pending",
            description: "Import and manage 3D models, textures, audio",
          },
        ],
        courses: [
          {
            name: "AI for Game Developers",
            platform: "Udemy",
            completed: false,
            duration: "35 hours",
            rating: 4.6,
            url: "https://www.udemy.com/course/unity-artificial-intelligence-programming/",
          },
          {
            name: "3D Game Development with Unity",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/unity-3d",
          },
        ],
        projects: [
          {
            name: "3D First-Person Shooter",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "AI-driven Strategy Game",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: 3,
        title: "Advanced Game Development",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description:
          "Master performance optimization, multiplayer, and publishing",
        skills: [
          {
            name: "Multiplayer Networking",
            level: "Pending",
            description: "Sockets, matchmaking, and game servers",
          },
          {
            name: "Optimization",
            level: "Pending",
            description: "Memory management and performance tuning",
          },
          {
            name: "Game Publishing",
            level: "Pending",
            description: "Deploying games on PC, console, and mobile",
          },
        ],
        courses: [
          {
            name: "Multiplayer Game Development",
            platform: "Udemy",
            completed: false,
            duration: "30 hours",
            rating: 4.8,
            url: "https://www.udemy.com/course/multiplayer-game-development-with-unity/",
          },
          {
            name: "Game Optimization Techniques",
            platform: "Pluralsight",
            completed: false,
            duration: "20 hours",
            rating: 4.6,
            url: "https://www.pluralsight.com/courses/unity-optimization",
          },
        ],
        projects: [
          {
            name: "Multiplayer Online Game",
            completed: false,
            difficulty: "Expert",
          },
          {
            name: "Mobile Game Deployment",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  "blockchain-developer": {
    selectedPath: "Blockchain Developer",
    progress: 0,
    estimatedTime: "10-14 months",
    phases: [
      {
        id: 1,
        title: "Blockchain Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "3 months",
        description: "Learn blockchain basics and cryptocurrencies",
        skills: [
          {
            name: "Cryptography",
            level: "Pending",
            description: "Hashing, digital signatures",
          },
          {
            name: "Ethereum Basics",
            level: "Pending",
            description: "Smart contracts and dApps",
          },
        ],
        courses: [
          {
            name: "Blockchain Basics",
            platform: "Coursera",
            completed: false,
            duration: "20 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/blockchain-basics",
          },
        ],
        projects: [
          {
            name: "Basic Crypto Wallet",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Smart Contracts & Development",
        status: "upcoming",
        progress: 0,
        duration: "4 months",
        description: "Develop smart contracts and decentralized apps",
        skills: [
          {
            name: "Solidity",
            level: "Pending",
            description: "Smart contract programming language",
          },
          {
            name: "Web3.js",
            level: "Pending",
            description: "Interaction with Ethereum blockchain",
          },
        ],
        courses: [
          {
            name: "Ethereum & Solidity",
            platform: "Udemy",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/",
          },
        ],
        projects: [
          {
            name: "Voting dApp",
            completed: false,
            difficulty: "Intermediate",
          },
          {
            name: "Decentralized Exchange",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  "embedded-systems-engineer": {
    selectedPath: "Embedded Systems Engineer",
    progress: 0,
    estimatedTime: "12-16 months",
    phases: [
      {
        id: 1,
        title: "Embedded Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn basics of embedded systems and microcontrollers",
        skills: [
          {
            name: "C Programming",
            level: "Pending",
            description: "Low-level programming for hardware",
          },
          {
            name: "Microcontrollers",
            level: "Pending",
            description: "Arduino, STM32, ARM basics",
          },
        ],
        courses: [
          {
            name: "Embedded Systems Essentials",
            platform: "Coursera",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/embedded-systems",
          },
        ],
        projects: [
          {
            name: "LED Blinking with Arduino",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Intermediate Embedded Systems",
        status: "upcoming",
        progress: 0,
        duration: "4-5 months",
        description: "Work with real-time systems and sensors",
        skills: [
          {
            name: "RTOS",
            level: "Pending",
            description: "Real-Time Operating Systems",
          },
          {
            name: "Sensor Integration",
            level: "Pending",
            description: "Interfacing and communication protocols (I2C, SPI)",
          },
        ],
        courses: [
          {
            name: "Real-Time Embedded Systems",
            platform: "Udemy",
            completed: false,
            duration: "35 hours",
            rating: 4.8,
            url: "https://www.udemy.com/course/real-time-operating-systems/",
          },
        ],
        projects: [
          {
            name: "Temperature Monitoring System",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "ui-ux-designer": {
    selectedPath: "UI/UX Designer",
    progress: 0,
    estimatedTime: "6-9 months",
    phases: [
      {
        id: 1,
        title: "Design Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Learn basics of user interface and visual design",
        skills: [
          {
            name: "Typography",
            level: "Pending",
            description: "Fonts, readability, and consistency",
          },
          {
            name: "Color Theory",
            level: "Pending",
            description: "Effective use of color in design",
          },
        ],
        courses: [
          {
            name: "Intro to UI Design",
            platform: "Coursera",
            completed: false,
            duration: "20 hours",
            rating: 4.6,
            url: "https://www.coursera.org/learn/ui-design",
          },
        ],
        projects: [
          {
            name: "App Wireframe Design",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "User Experience & Prototyping",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn usability testing, wireframes, and prototyping",
        skills: [
          {
            name: "User Research",
            level: "Pending",
            description: "Personas, user journeys, surveys",
          },
          {
            name: "Prototyping Tools",
            level: "Pending",
            description: "Figma, Sketch, Adobe XD",
          },
        ],
        courses: [
          {
            name: "UX Research & Prototyping",
            platform: "edX",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://www.edx.org/course/ux-design",
          },
        ],
        projects: [
          {
            name: "Clickable Prototype",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "technical-product-manager": {
    selectedPath: "Technical Product Manager",
    progress: 0,
    estimatedTime: "9-12 months",
    phases: [
      {
        id: 1,
        title: "Product Management Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Learn basics of product lifecycle and agile",
        skills: [
          {
            name: "Agile & Scrum",
            level: "Pending",
            description: "Scrum methodology and sprints",
          },
          {
            name: "Roadmapping",
            level: "Pending",
            description: "Creating product roadmaps",
          },
        ],
        courses: [
          {
            name: "Agile Product Management",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.8,
            url: "https://www.coursera.org/specializations/agile-development",
          },
        ],
        projects: [
          {
            name: "Sample Product Roadmap",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Technical Product Management",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Work with engineering teams and product metrics",
        skills: [
          {
            name: "Technical Understanding",
            level: "Pending",
            description: "APIs, cloud services, databases",
          },
          {
            name: "Metrics & Analytics",
            level: "Pending",
            description: "Tracking KPIs and growth metrics",
          },
        ],
        courses: [
          {
            name: "Technical Product Management",
            platform: "Udemy",
            completed: false,
            duration: "40 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/technical-product-management/",
          },
        ],
        projects: [
          {
            name: "MVP Development Project",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },

  "business-analyst": {
    selectedPath: "Business Analyst",
    progress: 0,
    estimatedTime: "6-9 months",
    phases: [
      {
        id: 1,
        title: "Business Analysis Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Understand business processes and requirements gathering",
        skills: [
          {
            name: "Requirement Gathering",
            level: "Pending",
            description: "Documenting user and business needs",
          },
          {
            name: "Process Mapping",
            level: "Pending",
            description: "Flowcharts, BPMN diagrams",
          },
        ],
        courses: [
          {
            name: "Business Analysis Fundamentals",
            platform: "Udemy",
            completed: false,
            duration: "20 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/business-analysis-fundamentals/",
          },
        ],
        projects: [
          {
            name: "Requirement Document for IT Project",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Business Analysis",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Work with stakeholders and advanced analytics",
        skills: [
          {
            name: "Data Analysis",
            level: "Pending",
            description: "SQL, Excel, BI tools",
          },
          {
            name: "Stakeholder Management",
            level: "Pending",
            description: "Effective communication with business teams",
          },
        ],
        courses: [
          {
            name: "Data Analysis for Business",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.6,
            url: "https://www.coursera.org/learn/business-analytics",
          },
        ],
        projects: [
          {
            name: "Business Case Analysis",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "project-manager": {
    selectedPath: "Project Manager",
    progress: 0,
    estimatedTime: "9-12 months",
    phases: [
      {
        id: 1,
        title: "Project Management Basics",
        status: "upcoming",
        progress: 0,
        duration: "3 months",
        description: "Learn PM methodologies and project lifecycle",
        skills: [
          {
            name: "Waterfall vs Agile",
            level: "Pending",
            description: "Understanding methodologies",
          },
          {
            name: "Risk Management",
            level: "Pending",
            description: "Identifying and mitigating risks",
          },
        ],
        courses: [
          {
            name: "Project Management Principles",
            platform: "edX",
            completed: false,
            duration: "30 hours",
            rating: 4.8,
            url: "https://www.edx.org/course/project-management",
          },
        ],
        projects: [
          {
            name: "Mini Project Plan",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Project Management",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Manage large teams and budgets",
        skills: [
          {
            name: "PMP Preparation",
            level: "Pending",
            description: "PMI PMP certification preparation",
          },
          {
            name: "Team Leadership",
            level: "Pending",
            description: "Motivating and guiding teams",
          },
        ],
        courses: [
          {
            name: "PMP Exam Prep",
            platform: "Udemy",
            completed: false,
            duration: "40 hours",
            rating: 4.9,
            url: "https://www.udemy.com/course/pmp-exam-prep-course-pmbok6/",
          },
        ],
        projects: [
          {
            name: "Enterprise Project Execution Plan",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  "product-manager": {
    selectedPath: "Product Manager",
    progress: 0,
    estimatedTime: "8-12 months",
    phases: [
      {
        id: 1,
        title: "Product Management Foundations",
        status: "upcoming",
        progress: 0,
        duration: "3 months",
        description: "Learn basics of product lifecycle management",
        skills: [
          {
            name: "Market Research",
            level: "Pending",
            description: "Understanding markets and competitors",
          },
          {
            name: "MVP Design",
            level: "Pending",
            description: "Creating minimum viable products",
          },
        ],
        courses: [
          {
            name: "Digital Product Management",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/uva-darden-digital-product-management",
          },
        ],
        projects: [
          {
            name: "Product Pitch Deck",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
    ],
  },
  "operations-manager": {
    selectedPath: "Operations Manager",
    progress: 0,
    estimatedTime: "10-14 months",
    phases: [
      {
        id: 1,
        title: "Operations Management Basics",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn supply chain and operations fundamentals",
        skills: [
          {
            name: "Supply Chain Basics",
            level: "Pending",
            description: "Procurement, logistics",
          },
          {
            name: "Process Improvement",
            level: "Pending",
            description: "Lean, Six Sigma",
          },
        ],
        courses: [
          {
            name: "Operations Management",
            platform: "Coursera",
            completed: false,
            duration: "35 hours",
            rating: 4.6,
            url: "https://www.coursera.org/learn/operations-management",
          },
        ],
        projects: [
          {
            name: "Logistics Optimization Plan",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "hr-specialist": {
    selectedPath: "HR Specialist",
    progress: 0,
    estimatedTime: "6-9 months",
    phases: [
      {
        id: 1,
        title: "Human Resource Basics",
        status: "upcoming",
        progress: 0,
        duration: "3 months",
        description: "Learn recruitment and employee relations",
        skills: [
          {
            name: "Recruitment",
            level: "Pending",
            description: "Hiring and onboarding processes",
          },
          {
            name: "Employee Engagement",
            level: "Pending",
            description: "Motivating and retaining staff",
          },
        ],
        courses: [
          {
            name: "HR Fundamentals",
            platform: "Udemy",
            completed: false,
            duration: "20 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/hr-fundamentals/",
          },
        ],
        projects: [
          {
            name: "Recruitment Plan",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
    ],
  },

  "financial-analyst": {
    selectedPath: "Financial Analyst",
    progress: 0,
    estimatedTime: "8-12 months",
    phases: [
      {
        id: 1,
        title: "Financial Analysis Basics",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn core financial concepts and data analysis",
        skills: [
          {
            name: "Excel for Finance",
            level: "Pending",
            description: "Formulas, pivot tables, modeling",
          },
          {
            name: "Accounting Basics",
            level: "Pending",
            description: "Financial statements, ratios",
          },
        ],
        courses: [
          {
            name: "Financial Analysis for Beginners",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/financial-analysis",
          },
        ],
        projects: [
          {
            name: "Company Financial Statement Analysis",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Financial Modeling",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Build advanced models and investment analysis",
        skills: [
          {
            name: "Valuation",
            level: "Pending",
            description: "DCF, comparables",
          },
          {
            name: "Forecasting",
            level: "Pending",
            description: "Building predictive models",
          },
        ],
        courses: [
          {
            name: "Financial Modeling & Valuation",
            platform: "Udemy",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.udemy.com/course/financial-analyst-course/",
          },
        ],
        projects: [
          {
            name: "DCF Valuation Model",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  "investment-banker": {
    selectedPath: "Investment Banker",
    progress: 0,
    estimatedTime: "12-18 months",
    phases: [
      {
        id: 1,
        title: "Investment Banking Foundations",
        status: "upcoming",
        progress: 0,
        duration: "4-5 months",
        description: "Learn fundamentals of corporate finance and markets",
        skills: [
          {
            name: "Corporate Finance",
            level: "Pending",
            description: "M&A, capital raising",
          },
          {
            name: "Financial Markets",
            level: "Pending",
            description: "Equity, debt, derivatives",
          },
        ],
        courses: [
          {
            name: "Intro to Investment Banking",
            platform: "Coursera",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/ibm-finance",
          },
        ],
        projects: [
          {
            name: "M&A Case Study",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Investment Banking",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description: "Master valuations, pitch books, and deal structuring",
        skills: [
          {
            name: "Valuation Models",
            level: "Pending",
            description: "LBO, merger models",
          },
          {
            name: "Deal Structuring",
            level: "Pending",
            description: "Negotiations, term sheets",
          },
        ],
        courses: [
          {
            name: "Investment Banking Certification",
            platform: "Udemy",
            completed: false,
            duration: "50 hours",
            rating: 4.9,
            url: "https://www.udemy.com/course/investment-banking/",
          },
        ],
        projects: [
          {
            name: "IPO Pitch Book",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  accountant: {
    selectedPath: "Accountant",
    progress: 0,
    estimatedTime: "9-12 months",
    phases: [
      {
        id: 1,
        title: "Accounting Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Master basics of bookkeeping and financial reporting",
        skills: [
          {
            name: "Bookkeeping",
            level: "Pending",
            description: "Journals, ledgers, trial balances",
          },
          {
            name: "Financial Reporting",
            level: "Pending",
            description: "Balance sheet, income statement",
          },
        ],
        courses: [
          {
            name: "Accounting Fundamentals",
            platform: "Coursera",
            completed: false,
            duration: "20 hours",
            rating: 4.6,
            url: "https://www.coursera.org/learn/accounting-fundamentals",
          },
        ],
        projects: [
          {
            name: "Small Business Accounts",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Accounting & Tax",
        status: "upcoming",
        progress: 0,
        duration: "5-6 months",
        description: "Learn advanced accounting principles and taxation",
        skills: [
          {
            name: "GAAP/IFRS",
            level: "Pending",
            description: "Standards and compliance",
          },
          {
            name: "Taxation",
            level: "Pending",
            description: "Corporate and individual tax laws",
          },
        ],
        courses: [
          {
            name: "Intermediate Accounting",
            platform: "Udemy",
            completed: false,
            duration: "35 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/intermediate-accounting/",
          },
        ],
        projects: [
          {
            name: "Corporate Tax Filing Simulation",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  economist: {
    selectedPath: "Economist",
    progress: 0,
    estimatedTime: "12-18 months",
    phases: [
      {
        id: 1,
        title: "Economics Foundations",
        status: "upcoming",
        progress: 0,
        duration: "4-5 months",
        description: "Learn microeconomics and macroeconomics",
        skills: [
          {
            name: "Microeconomics",
            level: "Pending",
            description: "Supply, demand, elasticity",
          },
          {
            name: "Macroeconomics",
            level: "Pending",
            description: "GDP, inflation, fiscal policy",
          },
        ],
        courses: [
          {
            name: "Principles of Economics",
            platform: "edX",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://www.edx.org/course/principles-of-economics",
          },
        ],
        projects: [
          {
            name: "Market Analysis Report",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Applied Economics & Research",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description: "Apply economics with data and policy analysis",
        skills: [
          {
            name: "Econometrics",
            level: "Pending",
            description: "Regression, statistical analysis",
          },
          {
            name: "Policy Analysis",
            level: "Pending",
            description: "Impact studies and reports",
          },
        ],
        courses: [
          {
            name: "Econometrics",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.coursera.org/learn/erasmus-econometrics",
          },
        ],
        projects: [
          {
            name: "Economic Impact Study",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  actuary: {
    selectedPath: "Actuary",
    progress: 0,
    estimatedTime: "18-24 months",
    phases: [
      {
        id: 1,
        title: "Actuarial Science Foundations",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description:
          "Learn probability, statistics, and finance for actuarial exams",
        skills: [
          {
            name: "Probability & Statistics",
            level: "Pending",
            description: "Core actuarial math",
          },
          {
            name: "Financial Mathematics",
            level: "Pending",
            description: "Time value of money, annuities",
          },
        ],
        courses: [
          {
            name: "Actuarial Science Basics",
            platform: "Udemy",
            completed: false,
            duration: "50 hours",
            rating: 4.8,
            url: "https://www.udemy.com/course/actuarial-science/",
          },
        ],
        projects: [
          {
            name: "Insurance Risk Modeling",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Actuarial Practices",
        status: "upcoming",
        progress: 0,
        duration: "8-12 months",
        description: "Master actuarial modeling and regulatory compliance",
        skills: [
          {
            name: "Life Insurance Modeling",
            level: "Pending",
            description: "Mortality tables, reserves",
          },
          {
            name: "Risk Management",
            level: "Pending",
            description: "Enterprise risk and compliance",
          },
        ],
        courses: [
          {
            name: "SOA/CAS Exam Prep",
            platform: "Coaching Actuaries",
            completed: false,
            duration: "100 hours",
            rating: 4.9,
            url: "https://www.coachingactuaries.com/",
          },
        ],
        projects: [
          {
            name: "Pension Fund Model",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  counselor: {
    selectedPath: "Counselor",
    progress: 0,
    estimatedTime: "9-12 months",
    phases: [
      {
        id: 1,
        title: "Counseling Foundations",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description:
          "Learn psychology basics, communication, and listening skills.",
        skills: [
          {
            name: "Active Listening",
            level: "Pending",
            description: "Empathy and nonverbal cues",
          },
          {
            name: "Counseling Theories",
            level: "Pending",
            description: "CBT, person-centered approaches",
          },
        ],
        courses: [
          {
            name: "Introduction to Counseling",
            platform: "Coursera",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/counseling",
          },
        ],
        projects: [
          {
            name: "Mock Counseling Sessions",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Applied Counseling",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Practice case management and ethical decision making.",
        skills: [
          {
            name: "Case Management",
            level: "Pending",
            description: "Tracking client progress",
          },
          {
            name: "Ethics",
            level: "Pending",
            description: "Confidentiality and professional boundaries",
          },
        ],
        courses: [
          {
            name: "Counseling Techniques",
            platform: "Udemy",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.udemy.com/course/counseling-techniques/",
          },
        ],
        projects: [
          {
            name: "Client Progress Reports",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  psychologist: {
    selectedPath: "Psychologist",
    progress: 0,
    estimatedTime: "12-18 months",
    phases: [
      {
        id: 1,
        title: "Psychology Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description:
          "Study human behavior and psychological assessment basics.",
        skills: [
          {
            name: "Research Methods",
            level: "Pending",
            description: "Experiments and data collection",
          },
          {
            name: "Psychological Testing",
            level: "Pending",
            description: "Cognitive and behavioral assessments",
          },
        ],
        courses: [
          {
            name: "Introduction to Psychology",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.coursera.org/learn/psychology",
          },
        ],
        projects: [
          {
            name: "Behavioral Research Report",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Applied Psychology",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description: "Practice psychological therapies and research projects.",
        skills: [
          {
            name: "Therapeutic Approaches",
            level: "Pending",
            description: "CBT, DBT, psychodynamic methods",
          },
          {
            name: "Clinical Practice",
            level: "Pending",
            description: "Supervised counseling and therapy",
          },
        ],
        courses: [
          {
            name: "Clinical Psychology",
            platform: "Udemy",
            completed: false,
            duration: "60 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/clinical-psychology/",
          },
        ],
        projects: [
          {
            name: "Therapy Case Study",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  nutritionist: {
    selectedPath: "Nutritionist",
    progress: 0,
    estimatedTime: "8-12 months",
    phases: [
      {
        id: 1,
        title: "Nutrition Basics",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn about food groups, dietary needs, and metabolism.",
        skills: [
          {
            name: "Macronutrients & Micronutrients",
            level: "Pending",
            description: "Proteins, carbs, vitamins",
          },
          {
            name: "Diet Planning",
            level: "Pending",
            description: "Balanced diet design",
          },
        ],
        courses: [
          {
            name: "Nutrition Science",
            platform: "edX",
            completed: false,
            duration: "35 hours",
            rating: 4.6,
            url: "https://www.edx.org/course/nutrition-science",
          },
        ],
        projects: [
          {
            name: "Personalized Meal Plan",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Nutrition",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Focus on clinical nutrition and dietary interventions.",
        skills: [
          {
            name: "Clinical Dietetics",
            level: "Pending",
            description: "Nutrition for medical conditions",
          },
          {
            name: "Sports Nutrition",
            level: "Pending",
            description: "Optimizing diet for performance",
          },
        ],
        courses: [
          {
            name: "Clinical Nutrition",
            platform: "Udemy",
            completed: false,
            duration: "50 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/clinical-nutrition/",
          },
        ],
        projects: [
          {
            name: "Nutrition Intervention Plan",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "fitness-trainer": {
    selectedPath: "Fitness Trainer",
    progress: 0,
    estimatedTime: "6-9 months",
    phases: [
      {
        id: 1,
        title: "Fitness Training Basics",
        status: "upcoming",
        progress: 0,
        duration: "3 months",
        description: "Learn anatomy, exercise types, and safety practices.",
        skills: [
          {
            name: "Exercise Science",
            level: "Pending",
            description: "Muscle groups and biomechanics",
          },
          {
            name: "Workout Design",
            level: "Pending",
            description: "Strength, endurance, flexibility",
          },
        ],
        courses: [
          {
            name: "Personal Trainer Course",
            platform: "Udemy",
            completed: false,
            duration: "25 hours",
            rating: 4.6,
            url: "https://www.udemy.com/course/personal-trainer-certification/",
          },
        ],
        projects: [
          {
            name: "Personalized Workout Plan",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Training",
        status: "upcoming",
        progress: 0,
        duration: "3-6 months",
        description:
          "Learn advanced fitness programming and client management.",
        skills: [
          {
            name: "Nutrition for Fitness",
            level: "Pending",
            description: "Integrating diet with training",
          },
          {
            name: "Client Coaching",
            level: "Pending",
            description: "Motivation and performance tracking",
          },
        ],
        courses: [
          {
            name: "Advanced Personal Training",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.coursera.org/learn/personal-training",
          },
        ],
        projects: [
          {
            name: "Client Progress Report",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "public-health-specialist": {
    selectedPath: "Public Health Specialist",
    progress: 0,
    estimatedTime: "10-15 months",
    phases: [
      {
        id: 1,
        title: "Public Health Foundations",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Understand epidemiology and health systems.",
        skills: [
          {
            name: "Epidemiology",
            level: "Pending",
            description: "Disease tracking and analysis",
          },
          {
            name: "Health Policy",
            level: "Pending",
            description: "Policy development and implementation",
          },
        ],
        courses: [
          {
            name: "Foundations of Public Health",
            platform: "Coursera",
            completed: false,
            duration: "50 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/public-health",
          },
        ],
        projects: [
          {
            name: "Epidemiological Study Report",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Applied Public Health",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description: "Work on health promotion campaigns and research.",
        skills: [
          {
            name: "Program Management",
            level: "Pending",
            description: "Planning and evaluating health programs",
          },
          {
            name: "Community Outreach",
            level: "Pending",
            description: "Engaging communities for awareness",
          },
        ],
        courses: [
          {
            name: "Global Health Initiatives",
            platform: "edX",
            completed: false,
            duration: "60 hours",
            rating: 4.6,
            url: "https://www.edx.org/course/global-public-health",
          },
        ],
        projects: [
          {
            name: "Health Awareness Campaign",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  teacher: {
    selectedPath: "Teacher",
    progress: 0,
    estimatedTime: "9-12 months",
    phases: [
      {
        id: 1,
        title: "Teaching Foundations",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description:
          "Learn pedagogy, lesson planning, and classroom management.",
        skills: [
          {
            name: "Lesson Planning",
            level: "Pending",
            description: "Creating structured and engaging lessons",
          },
          {
            name: "Classroom Management",
            level: "Pending",
            description: "Handling diverse groups effectively",
          },
        ],
        courses: [
          {
            name: "Foundations of Teaching",
            platform: "Coursera",
            completed: false,
            duration: "30 hours",
            rating: 4.8,
            url: "https://www.coursera.org/learn/foundations-of-teaching",
          },
        ],
        projects: [
          {
            name: "Lesson Plan Portfolio",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Teaching Skills",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description:
          "Focus on curriculum design, assessments, and technology in education.",
        skills: [
          {
            name: "Curriculum Development",
            level: "Pending",
            description: "Designing comprehensive curricula",
          },
          {
            name: "Educational Technology",
            level: "Pending",
            description: "Using tools like LMS and online platforms",
          },
        ],
        courses: [
          {
            name: "Innovative Teaching with Technology",
            platform: "edX",
            completed: false,
            duration: "50 hours",
            rating: 4.7,
            url: "https://www.edx.org/course/innovative-teaching",
          },
        ],
        projects: [
          {
            name: "Digital Learning Module",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "educational-consultant": {
    selectedPath: "Educational Consultant",
    progress: 0,
    estimatedTime: "10-14 months",
    phases: [
      {
        id: 1,
        title: "Education Systems and Policy",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Understand education systems, policies, and frameworks.",
        skills: [
          {
            name: "Policy Analysis",
            level: "Pending",
            description: "Evaluating education reforms",
          },
          {
            name: "Advisory Skills",
            level: "Pending",
            description: "Consulting with schools and institutions",
          },
        ],
        courses: [
          {
            name: "Education Policy Analysis",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.6,
            url: "https://www.coursera.org/learn/education-policy",
          },
        ],
        projects: [
          {
            name: "Education Policy Report",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Applied Education Consulting",
        status: "upcoming",
        progress: 0,
        duration: "6-8 months",
        description: "Work on education consulting projects and solutions.",
        skills: [
          {
            name: "Program Evaluation",
            level: "Pending",
            description: "Measuring program effectiveness",
          },
          {
            name: "Change Management",
            level: "Pending",
            description: "Helping institutions adopt new systems",
          },
        ],
        courses: [
          {
            name: "Consulting in Education",
            platform: "Udemy",
            completed: false,
            duration: "45 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/education-consulting/",
          },
        ],
        projects: [
          {
            name: "School Improvement Plan",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  "research-scientist": {
    selectedPath: "Research Scientist",
    progress: 0,
    estimatedTime: "12-18 months",
    phases: [
      {
        id: 1,
        title: "Research Methodology",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description:
          "Learn scientific research methods, statistics, and ethics.",
        skills: [
          {
            name: "Research Design",
            level: "Pending",
            description: "Quantitative and qualitative methods",
          },
          {
            name: "Data Analysis",
            level: "Pending",
            description: "Using statistical tools",
          },
        ],
        courses: [
          {
            name: "Research Methods",
            platform: "edX",
            completed: false,
            duration: "50 hours",
            rating: 4.8,
            url: "https://www.edx.org/course/research-methods",
          },
        ],
        projects: [
          {
            name: "Research Proposal",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Applied Research",
        status: "upcoming",
        progress: 0,
        duration: "6-12 months",
        description: "Conduct independent research and publish results.",
        skills: [
          {
            name: "Lab/Field Work",
            level: "Pending",
            description: "Data collection and experiments",
          },
          {
            name: "Publication Writing",
            level: "Pending",
            description: "Writing academic papers",
          },
        ],
        courses: [
          {
            name: "Scientific Writing",
            platform: "Coursera",
            completed: false,
            duration: "60 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/sciwrite",
          },
        ],
        projects: [
          {
            name: "Published Research Paper",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  "career-coach": {
    selectedPath: "Career Coach",
    progress: 0,
    estimatedTime: "6-9 months",
    phases: [
      {
        id: 1,
        title: "Career Coaching Foundations",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn career development theories and coaching basics.",
        skills: [
          {
            name: "Career Assessment",
            level: "Pending",
            description: "Helping clients identify strengths",
          },
          {
            name: "Coaching Models",
            level: "Pending",
            description: "GROW, SMART frameworks",
          },
        ],
        courses: [
          {
            name: "Career Coaching Basics",
            platform: "Udemy",
            completed: false,
            duration: "25 hours",
            rating: 4.6,
            url: "https://www.udemy.com/course/career-coaching/",
          },
        ],
        projects: [
          {
            name: "Career Roadmap for Client",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Coaching",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Learn client management, job placement, and mentorship.",
        skills: [
          {
            name: "Interview Preparation",
            level: "Pending",
            description: "Mock interviews and feedback",
          },
          {
            name: "Mentorship",
            level: "Pending",
            description: "Guiding clients long-term",
          },
        ],
        courses: [
          {
            name: "Advanced Career Coaching",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.coursera.org/learn/career-coaching",
          },
        ],
        projects: [
          {
            name: "Mock Interview Series",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "corporate-trainer": {
    selectedPath: "Corporate Trainer",
    progress: 0,
    estimatedTime: "8-12 months",
    phases: [
      {
        id: 1,
        title: "Training & Facilitation Basics",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn instructional design and facilitation skills.",
        skills: [
          {
            name: "Instructional Design",
            level: "Pending",
            description: "Creating engaging training modules",
          },
          {
            name: "Facilitation",
            level: "Pending",
            description: "Managing workshops and training sessions",
          },
        ],
        courses: [
          {
            name: "Corporate Training Foundations",
            platform: "Udemy",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/corporate-training/",
          },
        ],
        projects: [
          {
            name: "Workshop Facilitation Project",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Corporate Training",
        status: "upcoming",
        progress: 0,
        duration: "5-8 months",
        description:
          "Learn advanced facilitation, evaluation, and leadership training.",
        skills: [
          {
            name: "Leadership Training",
            level: "Pending",
            description: "Developing future leaders",
          },
          {
            name: "Training Evaluation",
            level: "Pending",
            description: "Assessing training effectiveness",
          },
        ],
        courses: [
          {
            name: "Advanced Corporate Training",
            platform: "Coursera",
            completed: false,
            duration: "45 hours",
            rating: 4.8,
            url: "https://www.coursera.org/learn/corporate-training",
          },
        ],
        projects: [
          {
            name: "Leadership Development Program",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  "graphic-designer": {
    selectedPath: "Graphic Designer",
    progress: 0,
    estimatedTime: "8-12 months",
    phases: [
      {
        id: 1,
        title: "Design Foundations",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn design principles, color theory, and typography.",
        skills: [
          {
            name: "Design Principles",
            level: "Pending",
            description: "Balance, contrast, hierarchy",
          },
          {
            name: "Typography",
            level: "Pending",
            description: "Font pairing and readability",
          },
        ],
        courses: [
          {
            name: "Graphic Design Basics",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.8,
            url: "https://www.coursera.org/learn/graphic-design",
          },
        ],
        projects: [
          {
            name: "Poster Design",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Graphic Design",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description:
          "Master tools like Adobe Illustrator, Photoshop, and Figma.",
        skills: [
          {
            name: "Illustration",
            level: "Pending",
            description: "Digital art creation",
          },
          {
            name: "UI Graphics",
            level: "Pending",
            description: "Designing for apps and web",
          },
        ],
        courses: [
          {
            name: "Adobe Photoshop Masterclass",
            platform: "Udemy",
            completed: false,
            duration: "40 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/photoshop-masterclass/",
          },
        ],
        projects: [
          {
            name: "Brand Identity Package",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "digital-marketer": {
    selectedPath: "Digital Marketer",
    progress: 0,
    estimatedTime: "6-9 months",
    phases: [
      {
        id: 1,
        title: "Digital Marketing Basics",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Learn SEO, social media, and content strategy.",
        skills: [
          {
            name: "SEO",
            level: "Pending",
            description: "On-page and off-page optimization",
          },
          {
            name: "Content Marketing",
            level: "Pending",
            description: "Creating engaging blogs and media",
          },
        ],
        courses: [
          {
            name: "Digital Marketing Specialization",
            platform: "Coursera",
            completed: false,
            duration: "30 hours",
            rating: 4.8,
            url: "https://www.coursera.org/specializations/digital-marketing",
          },
        ],
        projects: [
          {
            name: "SEO-Optimized Blog",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Digital Marketing",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Master PPC ads, analytics, and campaign management.",
        skills: [
          {
            name: "Google Ads",
            level: "Pending",
            description: "Campaign creation and optimization",
          },
          {
            name: "Analytics",
            level: "Pending",
            description: "Measuring campaign performance",
          },
        ],
        courses: [
          {
            name: "Google Analytics & Ads Mastery",
            platform: "Udemy",
            completed: false,
            duration: "40 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/google-ads-analytics/",
          },
        ],
        projects: [
          {
            name: "Marketing Campaign Plan",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "content-writer": {
    selectedPath: "Content Writer",
    progress: 0,
    estimatedTime: "6-8 months",
    phases: [
      {
        id: 1,
        title: "Writing Foundations",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Learn grammar, structure, and clarity in writing.",
        skills: [
          {
            name: "Grammar & Clarity",
            level: "Pending",
            description: "Polished and professional writing",
          },
          {
            name: "Storytelling",
            level: "Pending",
            description: "Engaging narrative techniques",
          },
        ],
        courses: [
          {
            name: "Creative Writing Specialization",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.8,
            url: "https://www.coursera.org/specializations/creative-writing",
          },
        ],
        projects: [
          {
            name: "Short Story or Article",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Professional Content Writing",
        status: "upcoming",
        progress: 0,
        duration: "3-5 months",
        description: "Focus on SEO writing, blogs, and business content.",
        skills: [
          {
            name: "SEO Writing",
            level: "Pending",
            description: "Writing content for search engines",
          },
          {
            name: "Copywriting",
            level: "Pending",
            description: "Persuasive writing for marketing",
          },
        ],
        courses: [
          {
            name: "Copywriting Masterclass",
            platform: "Udemy",
            completed: false,
            duration: "35 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/copywriting-masterclass/",
          },
        ],
        projects: [
          {
            name: "Content Marketing Blog Series",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "video-editor": {
    selectedPath: "Video Editor",
    progress: 0,
    estimatedTime: "8-12 months",
    phases: [
      {
        id: 1,
        title: "Video Editing Basics",
        status: "upcoming",
        progress: 0,
        duration: "3-4 months",
        description: "Learn editing principles, cuts, and transitions.",
        skills: [
          {
            name: "Basic Editing",
            level: "Pending",
            description: "Trimming, transitions, effects",
          },
          {
            name: "Storyboarding",
            level: "Pending",
            description: "Planning video flow",
          },
        ],
        courses: [
          {
            name: "Video Editing in Premiere Pro",
            platform: "Udemy",
            completed: false,
            duration: "30 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/premiere-pro-video-editing/",
          },
        ],
        projects: [
          {
            name: "Edited Short Film",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Video Production",
        status: "upcoming",
        progress: 0,
        duration: "5-8 months",
        description: "Master effects, sound design, and color grading.",
        skills: [
          {
            name: "Color Grading",
            level: "Pending",
            description: "Professional video look",
          },
          {
            name: "Sound Design",
            level: "Pending",
            description: "Mixing and audio effects",
          },
        ],
        courses: [
          {
            name: "After Effects & Premiere Masterclass",
            platform: "Udemy",
            completed: false,
            duration: "45 hours",
            rating: 4.8,
            url: "https://www.udemy.com/course/after-effects-premiere-masterclass/",
          },
        ],
        projects: [
          {
            name: "YouTube Video Series",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  photographer: {
    selectedPath: "Photographer",
    progress: 0,
    estimatedTime: "6-10 months",
    phases: [
      {
        id: 1,
        title: "Photography Basics",
        status: "upcoming",
        progress: 0,
        duration: "2-3 months",
        description: "Learn camera settings, composition, and lighting.",
        skills: [
          {
            name: "Camera Operation",
            level: "Pending",
            description: "Shutter speed, ISO, aperture",
          },
          {
            name: "Composition",
            level: "Pending",
            description: "Rule of thirds, framing",
          },
        ],
        courses: [
          {
            name: "Fundamentals of Photography",
            platform: "Udemy",
            completed: false,
            duration: "25 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/fundamentals-of-photography/",
          },
        ],
        projects: [
          {
            name: "Photo Portfolio",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Professional Photography",
        status: "upcoming",
        progress: 0,
        duration: "4-6 months",
        description: "Master editing, commercial, and creative photography.",
        skills: [
          {
            name: "Photo Editing",
            level: "Pending",
            description: "Lightroom and Photoshop",
          },
          {
            name: "Commercial Photography",
            level: "Pending",
            description: "Product, event, and portrait photography",
          },
        ],
        courses: [
          {
            name: "Photography Masterclass",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.coursera.org/learn/photography",
          },
        ],
        projects: [
          {
            name: "Freelance Photography Project",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },

  lawyer: {
    selectedPath: "Lawyer",
    progress: 0,
    estimatedTime: "4-6 years",
    phases: [
      {
        id: 1,
        title: "Legal Foundations",
        status: "upcoming",
        progress: 0,
        duration: "2-3 years",
        description:
          "Study constitutional law, criminal law, and legal writing.",
        skills: [
          {
            name: "Legal Research",
            level: "Pending",
            description: "Conducting thorough legal analysis",
          },
          {
            name: "Legal Writing",
            level: "Pending",
            description: "Drafting contracts, briefs, and memos",
          },
        ],
        courses: [
          {
            name: "Introduction to Law",
            platform: "Coursera",
            completed: false,
            duration: "60 hours",
            rating: 4.8,
            url: "https://www.coursera.org/specializations/law",
          },
        ],
        projects: [
          {
            name: "Mock Trial Participation",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Professional Law Practice",
        status: "upcoming",
        progress: 0,
        duration: "2-3 years",
        description:
          "Specialize in corporate, criminal, or civil law and prepare for bar exams.",
        skills: [
          {
            name: "Courtroom Skills",
            level: "Pending",
            description: "Litigation, negotiation, oral advocacy",
          },
          {
            name: "Specialization",
            level: "Pending",
            description: "Corporate law, IP law, or criminal defense",
          },
        ],
        courses: [
          {
            name: "Bar Exam Preparation",
            platform: "Kaplan",
            completed: false,
            duration: "200 hours",
            rating: 4.9,
            url: "https://www.kaptest.com/bar-exam",
          },
        ],
        projects: [
          {
            name: "Client Case Handling",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  paralegal: {
    selectedPath: "Paralegal",
    progress: 0,
    estimatedTime: "1-2 years",
    phases: [
      {
        id: 1,
        title: "Paralegal Foundations",
        status: "upcoming",
        progress: 0,
        duration: "6-12 months",
        description: "Learn legal research, document drafting, and ethics.",
        skills: [
          {
            name: "Legal Research",
            level: "Pending",
            description: "Using legal databases",
          },
          {
            name: "Document Preparation",
            level: "Pending",
            description: "Contracts, agreements, pleadings",
          },
        ],
        courses: [
          {
            name: "Paralegal Certificate",
            platform: "edX",
            completed: false,
            duration: "150 hours",
            rating: 4.7,
            url: "https://www.edx.org/course/paralegal-certificate",
          },
        ],
        projects: [
          {
            name: "Case Document Drafting",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Legal Support",
        status: "upcoming",
        progress: 0,
        duration: "1 year",
        description:
          "Assist in trials, client communication, and compliance research.",
        skills: [
          {
            name: "Trial Assistance",
            level: "Pending",
            description: "Supporting lawyers during litigation",
          },
          {
            name: "Compliance",
            level: "Pending",
            description: "Regulatory documentation",
          },
        ],
        courses: [
          {
            name: "Advanced Paralegal Training",
            platform: "Udemy",
            completed: false,
            duration: "60 hours",
            rating: 4.6,
            url: "https://www.udemy.com/course/paralegal-training/",
          },
        ],
        projects: [
          {
            name: "Case Preparation Portfolio",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "policy-analyst": {
    selectedPath: "Policy Analyst",
    progress: 0,
    estimatedTime: "2-4 years",
    phases: [
      {
        id: 1,
        title: "Policy Foundations",
        status: "upcoming",
        progress: 0,
        duration: "1-2 years",
        description: "Learn political science, economics, and policy writing.",
        skills: [
          {
            name: "Policy Research",
            level: "Pending",
            description: "Gathering and analyzing data",
          },
          {
            name: "Policy Writing",
            level: "Pending",
            description: "Briefs, reports, recommendations",
          },
        ],
        courses: [
          {
            name: "Public Policy Specialization",
            platform: "Coursera",
            completed: false,
            duration: "50 hours",
            rating: 4.8,
            url: "https://www.coursera.org/specializations/public-policy",
          },
        ],
        projects: [
          {
            name: "Policy Recommendation Report",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Policy Analysis",
        status: "upcoming",
        progress: 0,
        duration: "1-2 years",
        description:
          "Focus on implementation, monitoring, and international policy.",
        skills: [
          {
            name: "Quantitative Analysis",
            level: "Pending",
            description: "Data-driven policy decisions",
          },
          {
            name: "International Policy",
            level: "Pending",
            description: "Global political and economic issues",
          },
        ],
        courses: [
          {
            name: "Policy Analysis Masterclass",
            platform: "edX",
            completed: false,
            duration: "70 hours",
            rating: 4.7,
            url: "https://www.edx.org/course/policy-analysis",
          },
        ],
        projects: [
          {
            name: "Impact Assessment Report",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
  "compliance-officer": {
    selectedPath: "Compliance Officer",
    progress: 0,
    estimatedTime: "1-3 years",
    phases: [
      {
        id: 1,
        title: "Compliance Basics",
        status: "upcoming",
        progress: 0,
        duration: "6-12 months",
        description: "Learn laws, regulations, and compliance frameworks.",
        skills: [
          {
            name: "Risk Management",
            level: "Pending",
            description: "Identifying legal risks",
          },
          {
            name: "Documentation",
            level: "Pending",
            description: "Policy creation and audits",
          },
        ],
        courses: [
          {
            name: "Compliance Basics",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.6,
            url: "https://www.coursera.org/learn/compliance",
          },
        ],
        projects: [
          {
            name: "Compliance Checklist",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Compliance Management",
        status: "upcoming",
        progress: 0,
        duration: "1-2 years",
        description:
          "Focus on corporate compliance, audits, and international standards.",
        skills: [
          {
            name: "Corporate Compliance",
            level: "Pending",
            description: "SOX, GDPR, HIPAA, AML",
          },
          {
            name: "Audit Skills",
            level: "Pending",
            description: "Conducting and leading audits",
          },
        ],
        courses: [
          {
            name: "Corporate Compliance & Ethics",
            platform: "Udemy",
            completed: false,
            duration: "60 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/compliance-ethics/",
          },
        ],
        projects: [
          {
            name: "Internal Audit Project",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  entrepreneur: {
    selectedPath: "Entrepreneur",
    progress: 0,
    estimatedTime: "1-3 years",
    phases: [
      {
        id: 1,
        title: "Entrepreneurial Foundations",
        status: "upcoming",
        progress: 0,
        duration: "6-12 months",
        description:
          "Learn business basics, market research, and startup ideation.",
        skills: [
          {
            name: "Business Planning",
            level: "Pending",
            description: "Creating business models and strategies",
          },
          {
            name: "Market Research",
            level: "Pending",
            description: "Analyzing competition and demand",
          },
        ],
        courses: [
          {
            name: "Entrepreneurship Specialization",
            platform: "Coursera",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.coursera.org/specializations/entrepreneurship",
          },
        ],
        projects: [
          {
            name: "Business Plan Draft",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Startup Growth & Scaling",
        status: "upcoming",
        progress: 0,
        duration: "1-2 years",
        description: "Learn fundraising, scaling operations, and leadership.",
        skills: [
          {
            name: "Fundraising",
            level: "Pending",
            description: "Pitching to investors",
          },
          {
            name: "Leadership",
            level: "Pending",
            description: "Building and managing teams",
          },
        ],
        courses: [
          {
            name: "How to Start a Startup",
            platform: "edX",
            completed: false,
            duration: "50 hours",
            rating: 4.7,
            url: "https://www.edx.org/course/startup",
          },
        ],
        projects: [
          {
            name: "Investor Pitch Deck",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "sales-executive": {
    selectedPath: "Sales Executive",
    progress: 0,
    estimatedTime: "6-12 months",
    phases: [
      {
        id: 1,
        title: "Sales Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "3-6 months",
        description:
          "Learn communication, sales processes, and customer needs analysis.",
        skills: [
          {
            name: "Communication",
            level: "Pending",
            description: "Active listening and persuasion",
          },
          {
            name: "Sales Process",
            level: "Pending",
            description: "Lead generation, pitching, closing",
          },
        ],
        courses: [
          {
            name: "Sales Training: Practical Sales Techniques",
            platform: "Udemy",
            completed: false,
            duration: "25 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/sales-training-practical-sales-techniques/",
          },
        ],
        projects: [
          {
            name: "Mock Sales Pitch",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Sales & CRM",
        status: "upcoming",
        progress: 0,
        duration: "6 months",
        description: "Master CRM tools, account management, and negotiation.",
        skills: [
          {
            name: "CRM Tools",
            level: "Pending",
            description: "Salesforce, HubSpot, Zoho",
          },
          {
            name: "Negotiation",
            level: "Pending",
            description: "Closing high-value deals",
          },
        ],
        courses: [
          {
            name: "B2B Sales Masterclass",
            platform: "Coursera",
            completed: false,
            duration: "30 hours",
            rating: 4.6,
            url: "https://www.coursera.org/learn/b2b-sales",
          },
        ],
        projects: [
          {
            name: "CRM Project",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "customer-success-manager": {
    selectedPath: "Customer Success Manager",
    progress: 0,
    estimatedTime: "6-12 months",
    phases: [
      {
        id: 1,
        title: "Customer Success Basics",
        status: "upcoming",
        progress: 0,
        duration: "3-6 months",
        description:
          "Learn customer engagement, onboarding, and retention strategies.",
        skills: [
          {
            name: "Customer Engagement",
            level: "Pending",
            description: "Building long-term relationships",
          },
          {
            name: "Onboarding",
            level: "Pending",
            description: "Helping customers adopt products effectively",
          },
        ],
        courses: [
          {
            name: "Customer Success Training",
            platform: "Udemy",
            completed: false,
            duration: "20 hours",
            rating: 4.7,
            url: "https://www.udemy.com/course/customer-success/",
          },
        ],
        projects: [
          {
            name: "Customer Journey Map",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Customer Success",
        status: "upcoming",
        progress: 0,
        duration: "6 months",
        description:
          "Master churn reduction, upselling, and customer advocacy.",
        skills: [
          {
            name: "Churn Reduction",
            level: "Pending",
            description: "Retaining customers",
          },
          {
            name: "Upselling & Cross-selling",
            level: "Pending",
            description: "Driving revenue growth",
          },
        ],
        courses: [
          {
            name: "Customer Success Masterclass",
            platform: "Coursera",
            completed: false,
            duration: "25 hours",
            rating: 4.6,
            url: "https://www.coursera.org/learn/customer-success",
          },
        ],
        projects: [
          {
            name: "Customer Retention Strategy",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  "supply-chain-analyst": {
    selectedPath: "Supply Chain Analyst",
    progress: 0,
    estimatedTime: "1-2 years",
    phases: [
      {
        id: 1,
        title: "Supply Chain Fundamentals",
        status: "upcoming",
        progress: 0,
        duration: "6-12 months",
        description: "Learn logistics, procurement, and operations basics.",
        skills: [
          {
            name: "Logistics",
            level: "Pending",
            description: "Managing flow of goods and services",
          },
          {
            name: "Procurement",
            level: "Pending",
            description: "Vendor and supplier management",
          },
        ],
        courses: [
          {
            name: "Supply Chain Fundamentals",
            platform: "edX",
            completed: false,
            duration: "40 hours",
            rating: 4.8,
            url: "https://www.edx.org/course/supply-chain-fundamentals",
          },
        ],
        projects: [
          {
            name: "Supply Chain Case Study",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Supply Chain Analytics",
        status: "upcoming",
        progress: 0,
        duration: "1 year",
        description:
          "Focus on supply chain optimization, forecasting, and technology.",
        skills: [
          {
            name: "Forecasting",
            level: "Pending",
            description: "Demand and supply planning",
          },
          {
            name: "Optimization",
            level: "Pending",
            description: "Improving efficiency using analytics",
          },
        ],
        courses: [
          {
            name: "Supply Chain Analytics",
            platform: "Coursera",
            completed: false,
            duration: "50 hours",
            rating: 4.7,
            url: "https://www.coursera.org/learn/supply-chain-analytics",
          },
        ],
        projects: [
          {
            name: "Logistics Optimization Project",
            completed: false,
            difficulty: "Intermediate",
          },
        ],
      },
    ],
  },
  journalist: {
    selectedPath: "Journalist",
    progress: 0,
    estimatedTime: "2-4 years",
    phases: [
      {
        id: 1,
        title: "Journalism Foundations",
        status: "upcoming",
        progress: 0,
        duration: "1-2 years",
        description: "Learn reporting, ethics, and writing for news media.",
        skills: [
          {
            name: "Reporting",
            level: "Pending",
            description: "Interviewing and gathering facts",
          },
          {
            name: "News Writing",
            level: "Pending",
            description: "Clear and engaging reporting",
          },
        ],
        courses: [
          {
            name: "Journalism Specialization",
            platform: "Coursera",
            completed: false,
            duration: "50 hours",
            rating: 4.8,
            url: "https://www.coursera.org/specializations/journalism",
          },
        ],
        projects: [
          {
            name: "Investigative Article",
            completed: false,
            difficulty: "Beginner",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Journalism & Media",
        status: "upcoming",
        progress: 0,
        duration: "1-2 years",
        description:
          "Master investigative journalism, multimedia, and broadcast reporting.",
        skills: [
          {
            name: "Investigative Journalism",
            level: "Pending",
            description: "Exposing deeper stories",
          },
          {
            name: "Multimedia Reporting",
            level: "Pending",
            description: "Video, radio, and digital journalism",
          },
        ],
        courses: [
          {
            name: "Investigative Journalism Masterclass",
            platform: "edX",
            completed: false,
            duration: "70 hours",
            rating: 4.7,
            url: "https://www.edx.org/course/investigative-journalism",
          },
        ],
        projects: [
          {
            name: "News Documentary",
            completed: false,
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },
};

// Verification function
const verifySeed = async () => {
  try {
    console.log("\n" + "=".repeat(60));
    console.log("VERIFYING SEED DATA");
    console.log("=".repeat(60));

    const totalCount = await Roadmap.countDocuments();
    console.log(`\n✓ Total Roadmaps in Database: ${totalCount}`);

    if (totalCount === 0) {
      console.log("\n❌ ERROR: No roadmaps found in database!");
      return false;
    }

    const roadmaps = await Roadmap.find({});
    console.log("\n✓ Roadmaps Found:");
    roadmaps.forEach((roadmap, index) => {
      console.log(
        `   ${index + 1}. ${roadmap.careerPath} - "${roadmap.selectedPath}"`
      );
    });

    const stats = {
      totalRoadmaps: totalCount,
      totalPhases: 0,
      totalCourses: 0,
      totalProjects: 0,
      totalSkills: 0,
    };

    for (const roadmap of roadmaps) {
      if (roadmap.phases && roadmap.phases.length > 0) {
        stats.totalPhases += roadmap.phases.length;
        roadmap.phases.forEach((phase) => {
          stats.totalCourses += phase.courses ? phase.courses.length : 0;
          stats.totalProjects += phase.projects ? phase.projects.length : 0;
          stats.totalSkills += phase.skills ? phase.skills.length : 0;
        });
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("SUMMARY STATISTICS");
    console.log("=".repeat(60));
    console.log(`\n✓ Total Roadmaps: ${stats.totalRoadmaps}`);
    console.log(`✓ Total Phases: ${stats.totalPhases}`);
    console.log(`✓ Total Skills: ${stats.totalSkills}`);
    console.log(`✓ Total Courses: ${stats.totalCourses}`);
    console.log(`✓ Total Projects: ${stats.totalProjects}`);

    console.log("\n" + "=".repeat(60));
    console.log("✅ SEED VERIFICATION PASSED!");
    console.log("=".repeat(60) + "\n");

    return true;
  } catch (error) {
    console.error("\n❌ Verification error:", error.message);
    return false;
  }
};

// Seed function
const seedRoadmaps = async () => {
  try {
    console.log("\n" + "=".repeat(60));
    console.log("STARTING ROADMAP SEEDING");
    console.log("=".repeat(60) + "\n");

    const deleteResult = await Roadmap.deleteMany({});
    console.log(`✓ Cleared ${deleteResult.deletedCount} existing roadmaps`);

    const roadmapEntries = Object.entries(initialMockRoadmapData);

    if (roadmapEntries.length > 0) {
      const roadmapsToInsert = roadmapEntries.map(([careerPath, data]) => ({
        careerPath,
        ...data,
      }));

      await Roadmap.insertMany(roadmapsToInsert);
      console.log(`✓ Inserted ${roadmapsToInsert.length} new roadmaps\n`);
    } else {
      console.log("⚠️  No roadmap data to insert\n");
    }

    const verified = await verifySeed();

    if (verified) {
      console.log("✅ Seeding completed successfully!");
      process.exit(0);
    } else {
      console.log("⚠️  Seeding completed with warnings");
      process.exit(0);
    }
  } catch (error) {
    console.error("\n❌ Error seeding roadmaps:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
};

// Run seeding
const runSeed = async () => {
  try {
    console.log("Starting seed script...\n");
    await connectDB();
    await seedRoadmaps();
  } catch (error) {
    console.error("❌ Fatal error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
};

// Execute
console.log("Script loaded, executing...");
runSeed().catch((error) => {
  console.error("❌ Unhandled error:", error);
  process.exit(1);
});

export { seedRoadmaps, initialMockRoadmapData, verifySeed };
