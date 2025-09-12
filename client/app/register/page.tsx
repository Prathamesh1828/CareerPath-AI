"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast"; // <-- adjust based on your toast import path

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match!",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword, // <-- Add this line
          }),
        }
      );

      const data = await res.json();
      console.log("Register Response:", data);

      if (!res.ok) {
        return toast({
          title: "Registration Failed",
          description: data.message || "Something went wrong.",
          variant: "destructive",
        });
      }

      if (data.token) {
        localStorage.setItem("token", data.token);

        toast({
          title: "Account Created",
          description: "Welcome to Career-Path AI!",
        });

        router.push("/dashboard"); // Navigate after successful registration
      } else {
        toast({
          title: "Unexpected Error",
          description: "Token not received. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-screen gradient-animation flex items-stretch justify-center p-0 md:p-0 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full bg-transparent box-border">
        {/* Branding / Image Panel */}
        <div
          className={`
            flex flex-col items-center justify-center
            w-full md:w-1/2
            bg-gradient-to-br from-[#6C63FF] to-[#5B54E6]
            md:border-r-2 md:border-white/20
            px-2 py-6 md:px-8 md:py-0
            text-center
            ${isVisible ? "animate-fadeInUp" : "opacity-0"}
          `}
        >
          {/* LOGO & TEXT: Adjusted font and spacing for mobile */}
          <Link href="/" className="inline-flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center animate-pulse-custom">
              <span className="text-white font-bold text-base sm:text-lg md:text-2xl">
                CP
              </span>
            </div>
            <span className="text-lg sm:text-2xl md:text-4xl font-bold text-white drop-shadow">
              Career-Path AI
            </span>
          </Link>
          <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-white/90 mt-2 sm:mt-3 max-w-xs md:max-w-md mx-auto">
            Supercharge your career journey with AI.
          </p>
          {/* IMAGE: Responsive sizing, mobile first */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto mt-5 md:mt-8 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/career.png"
              alt="Brand side"
              className="object-cover w-full h-full"
              draggable={false}
            />
          </div>
        </div>

        {/* Registration Form */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-2 sm:p-5 md:p-0 bg-white bg-opacity-90 h-full">
          <Card
            className={`w-full max-w-sm sm:max-w-md mx-auto border-2 border-white/20 shadow-2xl backdrop-blur-sm bg-white/95 
              ${isVisible ? "animate-slideInRight" : "opacity-0"}
            `}
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="text-center p-3 sm:p-5">
              <CardTitle className="text-lg sm:text-2xl font-bold text-gray-900">
                Create Account
              </CardTitle>
              <CardDescription className="text-xs sm:text-base">
                Join thousands of professionals advancing their careers with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-5 pt-0">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="h-10 sm:h-11 transition-all duration-300 focus:ring-2 focus:ring-[#6C63FF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-10 sm:h-11 transition-all duration-300 focus:ring-2 focus:ring-[#6C63FF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-10 sm:h-11 pr-10 transition-all duration-300 focus:ring-2 focus:ring-[#6C63FF]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="h-10 sm:h-11 pr-10 transition-all duration-300 focus:ring-2 focus:ring-[#6C63FF]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-1 rounded border-gray-300 text-[#6C63FF] focus:ring-[#6C63FF] transition-colors duration-200"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-xs sm:text-sm text-gray-600"
                  >
                    I agree to the{" "}
                    <Link
                      href="#"
                      className="text-[#6C63FF] hover:underline transition-colors duration-200"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="text-[#6C63FF] hover:underline transition-colors duration-200"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] hover:from-[#5B54E6] hover:to-[#4F46E5] text-white h-10 sm:h-11 rounded-lg transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-dots">Creating account</span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
              <div className="mt-4 sm:mt-6">
                <Separator className="my-4" />
                <p className="text-center text-xs sm:text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#6C63FF] hover:underline font-medium transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
