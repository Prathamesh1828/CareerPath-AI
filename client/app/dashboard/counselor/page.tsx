"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  Target,
  Clock,
  DollarSign,
  Mail,
} from "lucide-react";

export default function CounselingPage() {
  const [formData, setFormData] = useState({
    currentRole: "",
    experience: "",
    careerGoals: "",
    budget: "",
    timeCommitment: "",
    learningStyle: "",
    counselor: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const counselors = [
    {
      name: "Dr. Aarti Sharma",
      role: "Career Coach",
      spec: "Engineering, IT",
      img: "https://randomuser.me/api/portraits/women/21.jpg",
      bio: "Helping students discover career paths in tech and engineering with structured mentoring.",
      exp: "12+ years guiding engineering students and IT professionals.",
    },
    {
      name: "Prof. Rajeev Menon",
      role: "Education Advisor",
      spec: "Higher Studies, Abroad",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
      bio: "Expert in higher studies and international education opportunities.",
      exp: "15+ years experience in academic counseling and admissions abroad.",
    },
    {
      name: "Sneha Kulkarni",
      role: "Job Consultant",
      spec: "Resume, Interview Prep",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Passionate about helping freshers and professionals land their dream jobs.",
      exp: "10+ years in recruitment & interview coaching.",
    },
    {
      name: "Vikas Deshmukh",
      role: "Industry Mentor",
      spec: "Management, MBA",
      img: "https://randomuser.me/api/portraits/men/50.jpg",
      bio: "Guides professionals on management careers and MBA pathways.",
      exp: "20+ years corporate experience in management roles.",
    },
    {
      name: "Neha Rathi",
      role: "Skill Trainer",
      spec: "Upskilling, IT Tools",
      img: "https://randomuser.me/api/portraits/women/67.jpg",
      bio: "Helps students pick the right platforms and tools for upskilling.",
      exp: "8+ years in IT training and e-learning development.",
    },
    {
      name: "Rohit Patil",
      role: "HR Expert",
      spec: "Job Switch, Salary Negotiation",
      img: "https://randomuser.me/api/portraits/men/24.jpg",
      bio: "Specializes in job transitions, HR consulting, and workplace guidance.",
      exp: "12+ years in HR leadership roles.",
    },
    {
      name: "Ankita Nair",
      role: "Student Counselor",
      spec: "Career Confusion",
      img: "https://randomuser.me/api/portraits/women/15.jpg",
      bio: "Helps students overcome confusion and choose the right career path.",
      exp: "7+ years in student counseling.",
    },
    {
      name: "Sanjay Verma",
      role: "Exam Mentor",
      spec: "Competitive Exams",
      img: "https://randomuser.me/api/portraits/men/31.jpg",
      bio: "Coaches students for UPSC, Banking, and other competitive exams.",
      exp: "10+ years experience with top exam prep institutes.",
    },
    {
      name: "Divya Kapoor",
      role: "Soft Skills Coach",
      spec: "Communication, Leadership",
      img: "https://randomuser.me/api/portraits/women/9.jpg",
      bio: "Focuses on communication, personality development, and leadership.",
      exp: "9+ years training professionals & students in soft skills.",
    },
    {
      name: "Karan Bhosale",
      role: "Tech Mentor",
      spec: "AI, Data Science, Startups",
      img: "https://randomuser.me/api/portraits/men/85.jpg",
      bio: "Guides tech enthusiasts towards AI, data, and entrepreneurial journeys.",
      exp: "8+ years in startups and data-driven roles.",
    },
  ];

  return (
    <div className="min-h-screen p-6 sm:p-12 ">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-blue-700">
          Career Counseling Portal
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Get personalized one-on-one guidance from our expert counselors.
          Choose your mentor, fill in your details, and take your next career
          step with confidence.
        </p>
      </motion.div>

      {/* Reasons Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto"
      >
        {[
          {
            icon: <Briefcase className="h-8 w-8 text-blue-600" />,
            title: "Career Confusion",
            desc: "Not sure which path to choose? Get clarity based on your strengths.",
          },
          {
            icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
            title: "Higher Studies",
            desc: "Confused about studying abroad or PG courses? We guide you fully.",
          },
          {
            icon: <BookOpen className="h-8 w-8 text-blue-600" />,
            title: "Skill Development",
            desc: "Upgrade your skills with curated learning resources and plans.",
          },
          {
            icon: <Target className="h-8 w-8 text-blue-600" />,
            title: "Goal Setting",
            desc: "Set realistic and achievable goals for your career growth.",
          },
          {
            icon: <Clock className="h-8 w-8 text-blue-600" />,
            title: "Time Management",
            desc: "Learn to balance academics, work, and skill building.",
          },
          {
            icon: <DollarSign className="h-8 w-8 text-blue-600" />,
            title: "Job Switch",
            desc: "Get strategies for career transitions and salary negotiations.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-4">
              {item.icon}
              <h3 className="text-xl font-semibold text-blue-700">
                {item.title}
              </h3>
            </div>
            <p className="mt-3 text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Counselor List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mt-16 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
          Meet Our Counselors
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {counselors.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-2xl transition flex flex-col"
            >
              <img
                src={c.img}
                alt={c.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-blue-100 shadow-md"
              />
              <h3 className="mt-4 text-lg font-semibold text-blue-700 text-center">
                {c.name}
              </h3>
              <p className="text-gray-600 text-sm text-center">{c.role}</p>
              <p className="text-gray-500 text-sm text-center italic">
                {c.spec}
              </p>
              <p className="mt-2 text-gray-600 text-sm">{c.bio}</p>
              <p className="mt-1 text-gray-500 text-xs">Experience: {c.exp}</p>

              <Button
                variant="outline"
                className="mt-4 w-full flex items-center gap-2 border-cyan-500 text-cyan-700"
              >
                <Mail className="h-4 w-4" /> Contact
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mt-20 max-w-3xl mx-auto"
      >
        <Card className="border-0 shadow-xl bg-gradient-to-r from-white to-blue-50">
          <CardHeader className="p-6 text-center">
            <CardTitle className="text-2xl font-bold text-blue-700">
              Request Counseling
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill the form and select your counselor. You’ll get a personalized
              session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Input
              name="currentRole"
              placeholder="Your current role or education"
              value={formData.currentRole}
              onChange={handleChange}
            />
            <Input
              name="experience"
              placeholder="Your experience (e.g. 2 years, Fresher)"
              value={formData.experience}
              onChange={handleChange}
            />
            <Input
              name="careerGoals"
              placeholder="Your career goals (e.g. Data Scientist, MBA)"
              value={formData.careerGoals}
              onChange={handleChange}
            />
            <Input
              name="budget"
              placeholder="Budget for learning/courses (e.g. ₹5000, Free)"
              value={formData.budget}
              onChange={handleChange}
            />
            <Input
              name="timeCommitment"
              placeholder="Weekly time commitment (e.g. 10 hrs/week)"
              value={formData.timeCommitment}
              onChange={handleChange}
            />
            <Input
              name="learningStyle"
              placeholder="Learning style (Visual, Self-paced, Group)"
              value={formData.learningStyle}
              onChange={handleChange}
            />

            {/* Counselor Selection */}
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, counselor: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Your Counselor" />
              </SelectTrigger>
              <SelectContent>
                {counselors.map((c, idx) => (
                  <SelectItem key={idx} value={c.name}>
                    {c.name} - {c.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition">
                Submit Request
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
