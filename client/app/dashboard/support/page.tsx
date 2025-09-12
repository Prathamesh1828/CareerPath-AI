"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, MessageCircle, Book, Mail, X, CheckCircle, AlertCircle, ExternalLink, Plus, Send, Bot, User } from "lucide-react"
import { useState, useRef, useEffect, useCallback } from "react"

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
        "Access recent activity and personalized suggestions"
      ]
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
        "Download optimized versions with improvements"
      ]
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
        "Bookmark courses for later and track completion"
      ]
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
        "Access skills breakdown and project requirements"
      ]
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
        "Update profile to refine suggestions"
      ]
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
        "Generate reports for portfolio or interviews"
      ]
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
        "Export skills summary for resume or portfolio"
      ]
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
        "Contact our team for technical assistance"
      ]
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
        "Switch between light and dark themes"
      ]
    }
  ]
}

const faqData = [
  {
    question: "How does the AI resume analysis work?",
    answer: "Our AI analyzes your resume against industry standards, ATS compatibility, and job requirements to provide detailed feedback and improvement suggestions. It checks for keyword optimization, formatting issues, skills gaps, and provides a comprehensive score with actionable recommendations.",
    status: "Popular"
  },
  {
    question: "Can I export my career roadmap?",
    answer: "Yes, you can export your personalized roadmap as a PDF or share it directly with mentors and employers. The export includes your progress, completed courses, upcoming milestones, and skill assessments in a professional format.",
    status: "New"
  },
  {
    question: "How often are course recommendations updated?",
    answer: "Course recommendations are refreshed weekly based on industry trends, your progress, and new learning opportunities from our partner platforms including Udemy, Coursera, Pluralsight, and others. We also factor in emerging technologies and market demands.",
    status: "Updated"
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We use enterprise-grade encryption and never share your personal information with third parties without your explicit consent. Your data is stored securely using industry-standard protocols, and you have full control over your privacy settings.",
    status: "Security"
  },
  {
    question: "Can I track multiple career paths simultaneously?",
    answer: "Yes! You can create and compare multiple career roadmaps to explore different professional directions simultaneously. This helps you make informed decisions about career transitions and compare different paths side-by-side.",
    status: "Feature"
  },
  {
    question: "How does the AI prioritize recommended courses?",
    answer: "Our AI analyzes your current skills, career goals, learning preferences, and industry demand to suggest the most relevant courses. It considers factors like your skill gaps, learning style, time availability, market trends, and salary potential for different skills.",
    status: "AI"
  },
  {
    question: "Can I add custom courses to my learning path?",
    answer: "Yes, you can manually add courses from any platform or training provider to customize your roadmap. This includes company training programs, bootcamps, books, YouTube tutorials, and other learning resources not in our partner database.",
    status: "Customization"
  },
  {
    question: "How do I change my career goal or target role?",
    answer: "You can update your target role anytime by visiting your Profile section and modifying your career preferences. The AI will automatically adjust your roadmap and recommendations to align with your new goals within 24 hours.",
    status: "Settings"
  },
  {
    question: "Do you offer a mobile application?",
    answer: "A mobile application is currently in development and will be available soon on both iOS and Android platforms. You'll be able to track progress, complete courses, access your roadmap, and receive notifications on the go.",
    status: "Coming Soon"
  },
  {
    question: "Can I collaborate with peers on projects and learning?",
    answer: "Yes, our platform supports study groups and project collaboration. You can join or create study groups, share progress with peers, work together on coding projects, participate in learning challenges, and build your professional network.",
    status: "Social"
  },
  {
    question: "What happens if I complete all recommended courses?",
    answer: "Once you complete your initial roadmap, we'll provide advanced learning resources, specialized certifications, leadership training, and job placement support. We also offer mentorship connections and networking opportunities to help you advance further in your career.",
    status: "Advanced"
  },
  {
    question: "How do I contact support for urgent technical issues?",
    answer: "For urgent technical issues, use our live chat feature for immediate assistance available 24/7. You can also email us at support@career-path-ai.com or use the contact form below. We aim to respond within 2 hours during business hours and 8 hours outside business hours.",
    status: "Support"
  }
]

const chatbotKnowledge = {
  "resume analysis": "The AI Resume Analyzer evaluates your resume for ATS compatibility, keyword optimization, formatting, and provides improvement suggestions with a detailed score.",
  "upload resume": "To upload your resume, go to Resume Analyzer page, click 'Upload Resume', select your PDF or Word file, and wait for the AI analysis to complete.",
  "career roadmap": "Your Career Roadmap is a personalized step-by-step plan showing phases, skills to learn, courses to take, and projects to complete for your target career.",
  "export roadmap": "You can export your roadmap as PDF by going to Career Roadmap page and clicking the 'Export PDF' button in the top-right corner.",
  "course recommendations": "Course recommendations are AI-generated based on your skills, career goals, and current market trends. They're updated weekly from platforms like Udemy and Coursera.",
  "add courses": "You can add custom courses by going to Course Explorer, clicking 'Add Custom Course', and entering the course details manually.",
  "change career goal": "Update your career goal in Profile & Skills section. The AI will automatically adjust your roadmap within 24 hours.",
  "mobile app": "A mobile app is coming soon for iOS and Android. You'll get notifications when it's available.",
  "data privacy": "Your data is encrypted and secure. We never share personal information without consent. You control your privacy settings.",
  "login issues": "For login problems, try resetting your password, clearing browser cache, or contact support if issues persist.",
  "multiple careers": "Yes, you can track multiple career paths simultaneously and compare them side-by-side to make informed decisions.",
  "progress tracking": "Your progress is tracked automatically as you complete courses, projects, and update your skills. View it on the Dashboard.",
  "billing": "For billing questions, check your account settings or contact support. We offer monthly and yearly subscription plans.",
  "certifications": "Track your certifications in Profile & Skills section. Add completion dates and upload certificates for verification."
}

export default function SupportPage() {
  const [showDocs, setShowDocs] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  // FIXED Chatbot state with input ref to maintain focus
  const [chatMessages, setChatMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)
  const inputRef = useRef(null) // Key fix: Input reference

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Initialize chatbot with welcome message
  useEffect(() => {
    if (showChatbot && chatMessages.length === 0) {
      setChatMessages([
        {
          id: 1,
          sender: 'bot',
          message: "Hi! I'm PathBot, your Career-Path AI assistant. I'm here to help you with any questions about our platform. How can I assist you today?",
          timestamp: new Date()
        }
      ])
    }
  }, [showChatbot, chatMessages.length])

  // Focus input when chatbot opens
  useEffect(() => {
    if (showChatbot && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 100)
    }
  }, [showChatbot])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // STABLE AI Chatbot Response Logic (memoized to prevent re-creation)
  const getChatbotResponse = useCallback((userMessage) => {
    const message = userMessage.toLowerCase()
    
    for (const [key, response] of Object.entries(chatbotKnowledge)) {
      if (message.includes(key) || message.includes(key.split(' ').join(''))) {
        return response
      }
    }

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you with Career-Path AI. What would you like to know about?"
    }

    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! Is there anything else I can help you with regarding Career-Path AI?"
    }

    return "I understand you're asking about that topic. While I don't have specific information on that right now, here are some ways I can help:\n\n• Check our Documentation for detailed guides\n• Browse the FAQ section below\n• Use the contact form to send detailed questions\n\nIs there anything specific about resume analysis, career roadmaps, or course recommendations I can help with?"
  }, [])

  // STABLE chatbot input handling (no unnecessary re-renders)
  const handleChatInputChange = useCallback((e) => {
    setCurrentMessage(e.target.value)
  }, [])

  // STABLE message sending function
  const handleSendMessage = useCallback(() => {
    const messageToSend = currentMessage.trim()
    if (!messageToSend || isTyping) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: messageToSend,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setIsTyping(true)

    // Keep focus after clearing input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)

    // Simulate AI typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        message: getChatbotResponse(messageToSend),
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, botResponse])
      setIsTyping(false)
      
      // Ensure input stays focused after bot response
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 0)
    }, 1000 + Math.random() * 1000)
  }, [currentMessage, isTyping, getChatbotResponse])

  // STABLE key handling
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }, [handleSendMessage])

  const quickReplies = [
    "How do I upload my resume?",
    "How does the career roadmap work?",
    "Can I export my progress?",
    "How do I add custom courses?"
  ]

  const handleQuickReply = useCallback((reply) => {
    if (isTyping) return
    
    setCurrentMessage('')
    
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: reply,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Keep focus after quick reply
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        message: getChatbotResponse(reply),
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, botResponse])
      setIsTyping(false)
      
      // Ensure input stays focused
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 0)
    }, 1000 + Math.random() * 1000)
  }, [isTyping, getChatbotResponse])

  const generateGmailComposeUrl = (to, subject, body) => {
    const encodedSubject = encodeURIComponent(subject)
    const encodedBody = encodeURIComponent(body)
    return `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${to}&su=${encodedSubject}&body=${encodedBody}`
  }

  const handleSendEmail = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields before sending.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.')
      return
    }

    const supportEmail = 'support@career-path-ai.com'
    
    const emailBody = `Support Request from Career-Path AI

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from the Career-Path AI Support Center.
User submitted on: ${new Date().toLocaleString()}`

    const gmailUrl = generateGmailComposeUrl(
      supportEmail,
      `[Career-Path AI Support] ${formData.subject}`,
      emailBody
    )

    window.open(gmailUrl, '_blank')

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const handleEmailButtonClick = () => {
    const supportEmail = 'support@career-path-ai.com'
    const defaultSubject = 'Support Request - Career-Path AI'
    const defaultBody = `Hi Support Team,

I need assistance with Career-Path AI.

Please describe your issue below:


---
Best regards,
[Your Name]`

    const gmailUrl = generateGmailComposeUrl(supportEmail, defaultSubject, defaultBody)
    window.open(gmailUrl, '_blank')
  }

  const DocsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-0 w-full h-full bg-white overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <Book className="h-6 w-6 text-[#6C63FF]" />
            <h2 className="text-2xl font-bold text-gray-900">Career-Path AI Documentation</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDocs(false)}
            className="hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-600 text-lg">
                Welcome to Career-Path AI! This comprehensive platform helps you navigate your career journey with AI-powered insights and personalized recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentationData.sections.map((section, index) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-fit">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{section.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                      <p className="text-gray-600 text-sm">{section.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#6C63FF] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-[#6C63FF]/5 to-blue-500/5 rounded-lg border border-[#6C63FF]/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-gray-700 mb-3">
                New to Career-Path AI? Here's the recommended flow to maximize your experience:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Complete your <strong>Career Form</strong> to set preferences</li>
                <li>Upload your resume to the <strong>Resume Analyzer</strong></li>
                <li>Explore your personalized <strong>Career Roadmap</strong></li>
                <li>Browse recommended courses in <strong>Course Explorer</strong></li>
                <li>Track your progress on the <strong>Dashboard</strong></li>
              </ol>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Need more help? Contact our support team using the form below.
            </p>
            <Button 
              onClick={() => setShowDocs(false)}
              className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white"
            >
              Close Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const ChatbotModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-0 w-full h-full bg-white overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[#6C63FF] to-blue-500 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-[#6C63FF]" />
            </div>
            <div>
              <h3 className="font-semibold text-white">PathBot</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p className="text-sm text-green-500 font-semibold">Online</p>
                <span className="text-sm text-blue-100">• Career-Path AI Assistant</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChatbot(false)}
            className="hover:bg-white/20 text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' 
                    ? 'bg-[#6C63FF] text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-[#6C63FF] text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {chatMessages.length === 1 && (
          <div className="px-4 py-2 border-t border-gray-100 flex-shrink-0">
            <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  disabled={isTyping}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* COMPLETELY FIXED Chat Input */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={currentMessage}
              onChange={handleChatInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Career-Path AI..."
              className="flex-1"
              disabled={isTyping}
              autoFocus
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            PathBot is powered by AI and can make mistakes. Double-check important information.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
        <p className="text-gray-600">Get help and find answers to your questions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-[#6C63FF]" />
              Documentation
            </CardTitle>
            <CardDescription>Browse our comprehensive guides</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-[#6C63FF] hover:bg-[#5B54E6] text-white"
              onClick={() => setShowDocs(true)}
            >
              View Docs
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#6C63FF]" />
              AI Live Chat
            </CardTitle>
            <CardDescription>Chat with PathBot, our AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-[#6C63FF] hover:bg-[#5B54E6] text-white flex items-center gap-2"
              onClick={() => setShowChatbot(true)}
            >
              <Bot className="h-4 w-4" />
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#6C63FF]" />
              Email Support
            </CardTitle>
            <CardDescription>Send us a detailed message</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-[#6C63FF] hover:bg-[#5B54E6] text-white flex items-center gap-2"
              onClick={handleEmailButtonClick}
            >
              <ExternalLink className="h-4 w-4" />
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#6C63FF]" />
            Contact Support
          </CardTitle>
          <CardDescription>Fill out the form below and we'll open Gmail for you with a pre-filled message</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="your@email.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input 
                id="subject" 
                name="subject"
                placeholder="How can we help?" 
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea 
                id="message" 
                name="message"
                rows={4} 
                placeholder="Describe your issue or question in detail..." 
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Mail className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-blue-800">
                Clicking "Send Message" will open Gmail with your message pre-filled for easy sending.
              </p>
            </div>
            <Button 
              type="submit"
              className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Send Message (Opens Gmail)
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Click on any question to expand the answer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {faqData.map((faq, index) => {
            const isOpen = openFAQ === index
            return (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <h4 className="font-medium text-gray-900">{faq.question}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {faq.status}
                    </Badge>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className={`transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                      {isOpen ? (
                        <X className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Plus className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </button>
                <div 
                  id={`faq-content-${index}`}
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen 
                      ? 'max-h-96 opacity-100 pb-4 px-4' 
                      : 'max-h-0 opacity-0 px-4'
                  } overflow-hidden`}
                >
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {showDocs && <DocsModal />}
      {showChatbot && <ChatbotModal />}
    </div>
  )
}
