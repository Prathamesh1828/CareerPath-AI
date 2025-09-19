"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  MessageCircle,
  Book,
  Mail,
  X,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Plus,
  Send,
  Bot,
  User,
  Sparkles,
  Search,
  ArrowRight,
  Clock,
  Zap,
  Shield,
  Smartphone,
  Monitor,
  Settings,
  Award,
  Users,
  TrendingUp,
  BookOpen,
  FileText,
  PhoneCall,
  Headphones,
  Star,
  ChevronDown,
  ChevronUp,
  Copy,
  RotateCcw,
  Filter,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

const documentationData = {
  sections: [
    {
      id: "dashboard",
      title: "Dashboard Home",
      icon: "📊",
      description: "Your central hub for career development",
      content: [
        "View overall career progress (65% completion)",
        "Track skills matched (80%) and courses completed (8)",
        "Get AI-powered recommendations for next steps",
        "Monitor resume score improvements (+5% from last update)",
        "Access recent activity and personalized suggestions",
      ],
    },
    {
      id: "resume-analyzer",
      title: "Resume Analyzer",
      icon: "📄",
      description: "AI-powered resume optimization tool",
      content: [
        "Upload your resume for comprehensive AI analysis",
        "Get detailed feedback on content, formatting, and keywords",
        "Receive ATS (Applicant Tracking System) compatibility scores",
        "Compare your resume against industry standards",
        "Download optimized versions with improvements",
      ],
    },
    {
      id: "course-explorer",
      title: "Course Explorer",
      icon: "🔍",
      description: "Discover courses tailored to your career goals",
      content: [
        "Search courses from Udemy, Coursera, and other platforms",
        "Filter by level (Beginner, Intermediate, Advanced)",
        "View AI-recommended courses based on your career path",
        "Compare course ratings, duration, and pricing",
        "Bookmark courses for later and track completion",
      ],
    },
    {
      id: "career-roadmap",
      title: "Career Roadmap",
      icon: "🗺️",
      description: "Your personalized path to career success",
      content: [
        "Interactive phase-by-phase learning plan",
        "Track progress with checkboxes for courses and projects",
        "View estimated completion times for each phase",
        "Get motivational messages to stay motivated",
        "Access skills breakdown and project requirements",
      ],
    },
    {
      id: "career-form",
      title: "Career Form",
      icon: "📝",
      description: "Input your preferences for personalized advice",
      content: [
        "Complete skills assessment and career interests",
        "Set learning preferences and availability",
        "Define career goals and target roles",
        "Get AI-generated career recommendations",
        "Update profile to refine suggestions",
      ],
    },
    {
      id: "insights-analytics",
      title: "Insights & Analytics",
      icon: "📈",
      description: "Visualize your career development progress",
      content: [
        "Track skill development over time",
        "View job market trends in your field",
        "Analyze learning patterns and productivity",
        "Compare your progress with industry benchmarks",
        "Generate reports for portfolio or interviews",
      ],
    },
    {
      id: "profile-skills",
      title: "Profile & Skills",
      icon: "👤",
      description: "Manage your professional profile",
      content: [
        "Update personal and professional information",
        "Maintain skills inventory with proficiency levels",
        "Track certifications and achievements",
        "Link to LinkedIn and other professional profiles",
        "Export skills summary for resume or portfolio",
      ],
    },
    {
      id: "support",
      title: "Support Center",
      icon: "🆘",
      description: "Get help when you need it",
      content: [
        "Access comprehensive documentation",
        "Chat with our AI-powered support bot",
        "Submit detailed support requests via email",
        "Browse frequently asked questions",
        "Contact our team for technical assistance",
      ],
    },
    {
      id: "settings",
      title: "Settings",
      icon: "⚙️",
      description: "Customize your application experience",
      content: [
        "Update account information and preferences",
        "Configure notification settings",
        "Manage privacy and data sharing options",
        "Set learning reminders and goals",
        "Switch between light and dark themes",
      ],
    },
  ],
};

const faqData = [
  {
    question: "How does the AI resume analysis work?",
    answer:
      "Our AI analyzes your resume against industry standards, ATS compatibility, and job requirements to provide detailed feedback and improvement suggestions. It checks for keyword optimization, formatting issues, skills gaps, and provides a comprehensive score with actionable recommendations.",
    status: "Popular",
    category: "Resume",
  },
  {
    question: "Can I export my career roadmap?",
    answer:
      "Yes, you can export your personalized roadmap as a PDF or share it directly with mentors and employers. The export includes your progress, completed courses, upcoming milestones, and skill assessments in a professional format.",
    status: "New",
    category: "Roadmap",
  },
  {
    question: "How often are course recommendations updated?",
    answer:
      "Course recommendations are refreshed weekly based on industry trends, your progress, and new learning opportunities from our partner platforms including Udemy, Coursera, Pluralsight, and others. We also factor in emerging technologies and market demands.",
    status: "Updated",
    category: "Courses",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We use enterprise-grade encryption and never share your personal information with third parties without your explicit consent. Your data is stored securely using industry-standard protocols, and you have full control over your privacy settings.",
    status: "Security",
    category: "Privacy",
  },
  {
    question: "Can I track multiple career paths simultaneously?",
    answer:
      "Yes! You can create and compare multiple career roadmaps to explore different professional directions simultaneously. This helps you make informed decisions about career transitions and compare different paths side-by-side.",
    status: "Feature",
    category: "Roadmap",
  },
  {
    question: "How does the AI prioritize recommended courses?",
    answer:
      "Our AI analyzes your current skills, career goals, learning preferences, and industry demand to suggest the most relevant courses. It considers factors like your skill gaps, learning style, time availability, market trends, and salary potential for different skills.",
    status: "AI",
    category: "Courses",
  },
  {
    question: "Can I add custom courses to my learning path?",
    answer:
      "Yes, you can manually add courses from any platform or training provider to customize your roadmap. This includes company training programs, bootcamps, books, YouTube tutorials, and other learning resources not in our partner database.",
    status: "Customization",
    category: "Courses",
  },
  {
    question: "How do I change my career goal or target role?",
    answer:
      "You can update your target role anytime by visiting your Profile section and modifying your career preferences. The AI will automatically adjust your roadmap and recommendations to align with your new goals within 24 hours.",
    status: "Settings",
    category: "Profile",
  },
  {
    question: "Do you offer a mobile application?",
    answer:
      "A mobile application is currently in development and will be available soon on both iOS and Android platforms. You'll be able to track progress, complete courses, access your roadmap, and receive notifications on the go.",
    status: "Coming Soon",
    category: "General",
  },
  {
    question: "Can I collaborate with peers on projects and learning?",
    answer:
      "Yes, our platform supports study groups and project collaboration. You can join or create study groups, share progress with peers, work together on coding projects, participate in learning challenges, and build your professional network.",
    status: "Social",
    category: "General",
  },
  {
    question: "What happens if I complete all recommended courses?",
    answer:
      "Once you complete your initial roadmap, we'll provide advanced learning resources, specialized certifications, leadership training, and job placement support. We also offer mentorship connections and networking opportunities to help you advance further in your career.",
    status: "Advanced",
    category: "Roadmap",
  },
  {
    question: "How do I contact support for urgent technical issues?",
    answer:
      "For urgent technical issues, use our live chat feature for immediate assistance available 24/7. You can also email us at support@career-path-ai.com or use the contact form below. We aim to respond within 2 hours during business hours and 8 hours outside business hours.",
    status: "Support",
    category: "General",
  },
];

const chatbotKnowledge = {
  "resume analysis":
    "The AI Resume Analyzer evaluates your resume for ATS compatibility, keyword optimization, formatting, and provides improvement suggestions with a detailed score.",
  "upload resume":
    "To upload your resume, go to Resume Analyzer page, click 'Upload Resume', select your PDF or Word file, and wait for the AI analysis to complete.",
  "career roadmap":
    "Your Career Roadmap is a personalized step-by-step plan showing phases, skills to learn, courses to take, and projects to complete for your target career.",
  "export roadmap":
    "You can export your roadmap as PDF by going to Career Roadmap page and clicking the 'Export PDF' button in the top-right corner.",
  "course recommendations":
    "Course recommendations are AI-generated based on your skills, career goals, and current market trends. They're updated weekly from platforms like Udemy and Coursera.",
  "add courses":
    "You can add custom courses by going to Course Explorer, clicking 'Add Custom Course', and entering the course details manually.",
  "change career goal":
    "Update your career goal in Profile & Skills section. The AI will automatically adjust your roadmap within 24 hours.",
  "mobile app":
    "A mobile app is coming soon for iOS and Android. You'll get notifications when it's available.",
  "data privacy":
    "Your data is encrypted and secure. We never share personal information without consent. You control your privacy settings.",
  "login issues":
    "For login problems, try resetting your password, clearing browser cache, or contact support if issues persist.",
  "multiple careers":
    "Yes, you can track multiple career paths simultaneously and compare them side-by-side to make informed decisions.",
  "progress tracking":
    "Your progress is tracked automatically as you complete courses, projects, and update your skills. View it on the Dashboard.",
  billing:
    "For billing questions, check your account settings or contact support. We offer monthly and yearly subscription plans.",
  certifications:
    "Track your certifications in Profile & Skills section. Add completion dates and upload certificates for verification.",
};

export default function SupportPage() {
  const [showDocs, setShowDocs] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [faqFilter, setFAQFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Initialize chatbot with welcome message
  useEffect(() => {
    if (showChatbot && chatMessages.length === 0) {
      setChatMessages([
        {
          id: 1,
          sender: "bot",
          message:
            "Hi! I'm PathBot, your Career-Path AI assistant. I'm here to help you with any questions about our platform. How can I assist you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [showChatbot, chatMessages.length]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (showChatbot && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [showChatbot]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Filter FAQs based on category and search
  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = faqFilter === "All" || faq.category === faqFilter;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqCategories = ["All", ...new Set(faqData.map((faq) => faq.category))];

  // Chatbot response logic
  const getChatbotResponse = useCallback((userMessage) => {
    const message = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(chatbotKnowledge)) {
      if (message.includes(key) || message.includes(key.split(" ").join(""))) {
        return response;
      }
    }

    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return "Hello! I'm here to help you with Career-Path AI. What would you like to know about?";
    }

    if (message.includes("thank") || message.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with regarding Career-Path AI?";
    }

    return "I understand you're asking about that topic. While I don't have specific information on that right now, here are some ways I can help:\n\n• Check our Documentation for detailed guides\n• Browse the FAQ section below\n• Use the contact form to send detailed questions\n\nIs there anything specific about resume analysis, career roadmaps, or course recommendations I can help with?";
  }, []);

  const handleChatInputChange = useCallback((e) => {
    setCurrentMessage(e.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    const messageToSend = currentMessage.trim();
    if (!messageToSend || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      message: messageToSend,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: "bot",
        message: getChatbotResponse(messageToSend),
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }, 1000 + Math.random() * 1000);
  }, [currentMessage, isTyping, getChatbotResponse]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const quickReplies = [
    "How do I upload my resume?",
    "How does the career roadmap work?",
    "Can I export my progress?",
    "How do I add custom courses?",
  ];

  const handleQuickReply = useCallback(
    (reply) => {
      if (isTyping) return;

      setCurrentMessage("");

      const userMessage = {
        id: Date.now(),
        sender: "user",
        message: reply,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);

      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          sender: "bot",
          message: getChatbotResponse(reply),
          timestamp: new Date(),
        };

        setChatMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);

        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }, 1000 + Math.random() * 1000);
    },
    [isTyping, getChatbotResponse]
  );

  const generateGmailComposeUrl = (to, subject, body) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${to}&su=${encodedSubject}&body=${encodedBody}`;
  };

  const handleSendEmail = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all fields before sending.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const supportEmail = "support@career-path-ai.com";

    const emailBody = `Support Request from Career-Path AI

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from the Career-Path AI Support Center.
User submitted on: ${new Date().toLocaleString()}`;

    const gmailUrl = generateGmailComposeUrl(
      supportEmail,
      `[Career-Path AI Support] ${formData.subject}`,
      emailBody
    );

    window.open(gmailUrl, "_blank");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleEmailButtonClick = () => {
    const supportEmail = "support@career-path-ai.com";
    const defaultSubject = "Support Request - Career-Path AI";
    const defaultBody = `Hi Support Team,

I need assistance with Career-Path AI.

Please describe your issue below:


---
Best regards,
[Your Name]`;

    const gmailUrl = generateGmailComposeUrl(
      supportEmail,
      defaultSubject,
      defaultBody
    );
    window.open(gmailUrl, "_blank");
  };

  // Enhanced Documentation Modal - Mobile First
  const DocsModal = () => (
    <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm">
      <div className="fixed inset-0 w-full h-full bg-white overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Book className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                Documentation
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Complete platform guide
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDocs(false)}
            className="hover:bg-gray-100 p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="mb-6 sm:mb-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Welcome to Career-Path AI!
                </h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  This comprehensive platform helps you navigate your career
                  journey with AI-powered insights and personalized
                  recommendations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {documentationData.sections.map((section, index) => (
                <div
                  key={section.id}
                  className="group border-2 border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-2xl">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Getting Started Guide */}
            <div className="mt-8 sm:mt-12 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-50/80 via-blue-50/80 to-cyan-50/80 rounded-xl sm:rounded-2xl border-2 border-purple-200/50 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Getting Started
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                New to Career-Path AI? Here's the recommended flow to maximize
                your experience:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  "Complete your Career Form to set preferences",
                  "Upload your resume to the Resume Analyzer",
                  "Explore your personalized Career Roadmap",
                  "Browse recommended courses in Course Explorer",
                  "Track your progress on the Dashboard",
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/70 rounded-lg border border-purple-200"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-800 font-medium">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              Need more help? Contact our support team using the form below.
            </p>
            <Button
              onClick={() => setShowDocs(false)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white w-full sm:w-auto"
            >
              Close Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Chatbot Modal - Mobile First
  const ChatbotModal = () => (
    <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm">
      <div className="fixed inset-0 w-full h-full bg-white overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                PathBot
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-green-300 font-semibold">
                    Online
                  </span>
                </div>
                <span className="text-xs text-white/80 hidden sm:inline">
                  • AI Assistant
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChatbot(false)}
            className="hover:bg-white/20 text-white p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "bg-white border-2 border-gray-200 text-gray-600 shadow-sm"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`p-3 sm:p-4 rounded-2xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed">
                    {msg.message}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      msg.sender === "user"
                        ? "text-purple-100"
                        : "text-gray-500"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%]">
                <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                  <Bot className="h-4 w-4 text-gray-600" />
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-2xl rounded-bl-md border border-gray-200 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Replies */}
        {chatMessages.length === 1 && (
          <div className="px-3 sm:px-4 py-2 border-t border-gray-100 bg-white flex-shrink-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">
              Quick questions:
            </p>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  disabled={isTyping}
                  className="px-3 py-2 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 text-gray-700 text-xs sm:text-sm rounded-lg sm:rounded-full transition-all duration-200 disabled:opacity-50 font-medium border border-gray-200 hover:border-purple-300"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex gap-2 sm:gap-3">
            <Input
              ref={inputRef}
              value={currentMessage}
              onChange={handleChatInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Career-Path AI..."
              className="flex-1 h-12 border-2 focus:border-purple-500 rounded-xl"
              disabled={isTyping}
              autoFocus
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-12 px-4 rounded-xl shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            PathBot is powered by AI and can make mistakes. Double-check
            important information.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Support Center
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Get help and find answers to your questions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                24/7 Support
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Support Options Grid - Mobile Optimized */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            {/* Documentation Card */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200/50">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Book className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Documentation
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Browse our comprehensive guides and tutorials
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setShowDocs(true)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Docs
                </Button>
              </CardContent>
            </Card>

            {/* AI Chat Card */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200/50">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-600 font-semibold">
                      Live
                    </span>
                  </div>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  AI Live Chat
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Chat with PathBot, our AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  onClick={() => setShowChatbot(true)}
                >
                  <Bot className="h-4 w-4" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            {/* Email Support Card */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 sm:col-span-2 lg:col-span-1">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    2h response
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Email Support
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Send us a detailed message via email
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  onClick={handleEmailButtonClick}
                >
                  <ExternalLink className="h-4 w-4" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form - Enhanced Mobile */}
          <Card
            className={`border-0 shadow-xl bg-white/95 backdrop-blur-sm ${
              isVisible ? "animate-slideInLeft" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                  <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                Contact Support
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-600">
                Fill out the form below and we'll open Gmail for you with a
                pre-filled message
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <form
                onSubmit={handleSendEmail}
                className="space-y-4 sm:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12 border-2 focus:border-purple-500 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 border-2 focus:border-purple-500 rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-700"
                  >
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="h-12 border-2 focus:border-purple-500 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe your issue or question in detail..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-2 focus:border-purple-500 rounded-xl resize-none"
                    required
                  />
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="p-2 bg-blue-200 rounded-lg">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Clicking "Send Message" will open Gmail with your message
                    pre-filled for easy sending.
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Send Message (Opens Gmail)
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section - Enhanced Mobile */}
          <Card
            className={`border-0 shadow-xl bg-white/95 backdrop-blur-sm ${
              isVisible ? "animate-slideInRight" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl mb-2">
                    <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg">
                      <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                    </div>
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Click on any question to expand the answer
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {filteredFAQs.length} questions
                </Badge>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 border-2 focus:border-purple-500 rounded-lg"
                  />
                </div>
                <select
                  value={faqFilter}
                  onChange={(e) => setFAQFilter(e.target.value)}
                  className="h-10 px-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 text-sm bg-white"
                >
                  {faqCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-2 sm:space-y-3">
                {filteredFAQs.map((faq, index) => {
                  const isOpen = openFAQ === index;
                  return (
                    <div
                      key={index}
                      className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-purple-300 transition-all duration-300 bg-white"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors duration-200 group"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start gap-3 sm:gap-4 flex-1">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                              {faq.question}
                            </h4>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                variant="secondary"
                                className={`text-xs ${
                                  faq.status === "Popular"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : faq.status === "New"
                                    ? "bg-green-100 text-green-800"
                                    : faq.status === "Updated"
                                    ? "bg-blue-100 text-blue-800"
                                    : faq.status === "Security"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {faq.status}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {faq.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-purple-600" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-purple-600 transition-colors" />
                          )}
                        </div>
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "max-h-96 opacity-100 pb-4 sm:pb-5 px-4 sm:px-5"
                            : "max-h-0 opacity-0 px-4 sm:px-5"
                        } overflow-hidden`}
                      >
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    No Results Found
                  </h3>
                  <p className="text-sm text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {showDocs && <DocsModal />}
      {showChatbot && <ChatbotModal />}

      {/* Mobile Bottom Padding */}
      <div className="h-8 sm:h-0" />
    </div>
  );
}
