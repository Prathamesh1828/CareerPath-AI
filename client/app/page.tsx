"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  FileText,
  Map,
  Play,
  Star,
  Users,
  CheckCircle,
  TrendingUp,
  Menu,
  X,
  Pause,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Ensure button updates on manual pause
  const handlePause = () => setIsPlaying(false);
  const handlePlay = () => setIsPlaying(true);

  const features = [
    {
      icon: FileText,
      title: "Resume Analysis",
      description:
        "AI-powered resume parsing and ATS compatibility scoring with improvement suggestions",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Map,
      title: "Career Roadmap",
      description:
        "Personalized career paths with skills, courses, and timeline recommendations",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: BookOpen,
      title: "Course Explorer",
      description:
        "Interactive course discovery with AI recommendations based on your profile gaps",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: BarChart3,
      title: "Real-time Insights",
      description:
        "Visual analytics and reports on your career progress and market trends",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Google",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "Career-Path AI helped me transition from marketing to tech. The roadmap was spot-on!",
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      company: "Microsoft",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "The resume analysis feature increased my interview rate by 300%. Incredible tool!",
    },
    {
      name: "Emily Rodriguez",
      role: "Full Stack Developer",
      company: "Netflix",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "From zero coding experience to landing my dream job in 8 months. Thank you!",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div
              className={`flex items-center space-x-2 ${
                isVisible ? "animate-slideInLeft" : "opacity-0"
              }`}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] rounded-lg flex items-center justify-center animate-pulse-custom">
                <span className="text-white font-bold text-xs sm:text-sm">
                  CP
                </span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                Career-Path AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div
              className={`hidden md:flex items-center space-x-4 ${
                isVisible ? "animate-slideInRight" : "opacity-0"
              }`}
            >
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-[#6C63FF] transition-colors rounded-full duration-300"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] hover:from-[#5B54E6] hover:to-[#4F46E5] text-white rounded-full px-4 sm:px-6 transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 space-y-2 animate-fadeInUp">
              <Link href="/login" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-[#6C63FF]"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button className="w-full bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] hover:from-[#5B54E6] hover:to-[#4F46E5] text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-animation py-12 sm:py-16 lg:py-20 xl:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full animate-float"></div>
          <div
            className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container-responsive relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div
              className={`text-center lg:text-left ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h1 className="text-responsive-3xl font-bold text-white mb-4 sm:mb-6">
                Your AI-Powered
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Career Companion
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Career-Path AI assists in career planning with AI-driven
                insights. Analyze your resume, explore courses, build roadmaps,
                and get real-time career guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-[#6C63FF] hover:bg-gray-100 rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold "
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#6C63FF] rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold bg-transparent "
                >
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Hero Image/Video */}
            <div
              className={`relative order-first lg:order-last ${
                isVisible ? "animate-slideInRight" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 ">
                <img
                  src="/landing.png"
                  alt="Career-Path AI Dashboard"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold animate-pulse-custom">
                  Live Demo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-12 sm:py-16 lg:py-20 bg-white relative"
      >
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-responsive-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">
              Powerful Features for Your Career Growth
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              Everything you need to plan, track, and accelerate your career
              journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`border-2 border-gray-100 hover:border-[#6C63FF] transition-all duration-500  animate-fadeInUp ${
                  activeFeature === index
                    ? "ring-2 ring-[#6C63FF] ring-opacity-50"
                    : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center p-4 sm:p-6">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110`}
                  >
                    <feature.icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${feature.color}`}
                    />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-center text-sm sm:text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-gray-50 to-purple-50">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-slideInLeft order-2 lg:order-1">
              <h3 className="text-responsive-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                See Career-Path AI in Action
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Watch how our AI analyzes resumes, creates personalized
                roadmaps, and provides actionable insights to accelerate your
                career growth.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    Real-time resume analysis
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    Personalized learning paths
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    Market trend insights
                  </span>
                </div>
              </div>
            </div>
            <div className="animate-slideInRight order-1 lg:order-2">
              <div className="relative bg-white rounded-2xl shadow-2xl p-3 sm:p-4 ">
                <div className="aspect-video bg-gradient-to-br from-[#6C63FF] to-[#5B54E6] rounded-lg flex items-center justify-center relative overflow-hidden">
                  <video
                    ref={videoRef}
                    src="/career.mp4"
                    poster="/placeholder.svg?height=300&width=500"
                    className="w-full h-full object-cover rounded-lg"
                    controls={false}
                    autoPlay
                    loop
                    onPause={handlePause}
                    onPlay={handlePlay}
                    onEnded={handlePause}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/90 text-[#6C63FF] hover:bg-white rounded-full p-3 sm:p-4 "
                      onClick={handleToggle}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6 sm:h-8 sm:w-8" />
                      ) : (
                        <Play className="h-6 w-6 sm:h-8 sm:w-8" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-responsive-2xl font-bold text-gray-900 mb-4 animate-fadeInUp">
              Success Stories
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              Join thousands of professionals who've accelerated their careers
              with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className=" animate-fadeInUp border-2 border-gray-100 hover:border-[#6C63FF] transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-sm sm:text-base line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 gradient-animation">
        <div className="container-responsive">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              { number: "50,000+", label: "Resumes Analyzed", icon: FileText },
              { number: "25,000+", label: "Career Paths Created", icon: Map },
              { number: "95%", label: "User Satisfaction", icon: Users },
              {
                number: "300%",
                label: "Average Salary Increase",
                icon: TrendingUp,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="animate-fadeInUp "
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white mx-auto mb-3 sm:mb-4" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-purple-200 text-xs sm:text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-responsive text-center">
          <div className="animate-fadeInUp max-w-4xl mx-auto">
            <h2 className="text-responsive-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              Join thousands of professionals who are already using AI to
              accelerate their career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] hover:from-[#5B54E6] hover:to-[#4F46E5] text-white rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold "
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold  bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container-responsive py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    CP
                  </span>
                </div>
                <span className="text-lg sm:text-xl font-bold">
                  Career-Path AI
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base">
                Empowering careers with AI-driven insights and personalized
                guidance. Transform your professional journey today.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">
                Product
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; 2024 Career-Path AI. All rights reserved. Made with ❤️ for
              career growth.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
