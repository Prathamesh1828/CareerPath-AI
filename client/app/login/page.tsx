"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
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
import { toast } from "@/components/ui/use-toast";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (res.ok) {
            router.push("/dashboard");
            return;
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("Token verification error:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }

      setIsCheckingAuth(false);
      setIsVisible(true);
    };

    verifyToken();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (!res.ok) {
        return toast({
          title: "Login Failed",
          description: data.message || "Invalid email or password.",
          variant: "destructive",
        });
      }

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast({
          title: "Welcome back!",
          description: `Signed in as ${data.user.name}`,
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        toast({
          title: "Unexpected Error",
          description: "Authentication failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast({
        title: "Network Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    console.log("Google credential received:", credentialResponse);
    setIsLoading(true);

    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken: credentialResponse.credential }),
        }
      );

      const data = await response.json();
      console.log("Google Login Response:", data);

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast({
          title: "Welcome!",
          description: `Signed in as ${data.user.name}`,
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        toast({
          title: "Google Sign-In Failed",
          description: data.message || "Google authentication failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast({
        title: "Authentication Error",
        description:
          error instanceof Error
            ? error.message
            : "Google authentication error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In Error");
    toast({
      title: "Google Sign-In Failed",
      description:
        "Unable to sign in with Google. Please try again or use email/password.",
      variant: "destructive",
    });
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#6C63FF] to-[#5B54E6]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen w-screen gradient-animation flex flex-col md:flex-row">
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

          <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto mt-5 md:mt-8 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/career.png"
              alt="Career Path AI"
              className="object-cover w-full h-full"
              draggable={false}
            />
          </div>
        </div>

        {/* Login Form section */}
        <div className="flex items-center justify-center w-full md:w-1/2 bg-white bg-opacity-90 min-h-[50vh] h-auto md:h-screen max-h-full md:max-h-none overflow-y-auto px-4 sm:px-8 lg:px-12">
          <Card
            className={`w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto border-2 border-white/20 shadow-2xl backdrop-blur-sm bg-white/95 
            ${isVisible ? "animate-slideInLeft" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="text-center p-3 sm:p-5 lg:p-6">
              <CardTitle className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-xs sm:text-base lg:text-lg">
                Sign in to your account to continue your career journey
              </CardDescription>
            </CardHeader>

            <CardContent className="p-3 sm:p-5 lg:p-6 pt-0">
              <form
                onSubmit={handleLogin}
                className="space-y-3 sm:space-y-4 lg:space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm lg:text-base">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-10 sm:h-11 lg:h-12 transition-all duration-300 focus:ring-2 focus:ring-[#6C63FF]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm lg:text-base">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-10 sm:h-11 lg:h-12 pr-10 transition-all duration-300 focus:ring-2 focus:ring-[#6C63FF]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm lg:text-base mt-1">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="rounded border-gray-300 text-[#6C63FF] focus:ring-[#6C63FF] transition-colors duration-200"
                      tabIndex={-1}
                    />
                    <Label htmlFor="remember" className="text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-[#6C63FF] hover:underline transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] hover:from-[#5B54E6] hover:to-[#4F46E5] text-white h-10 sm:h-11 lg:h-12 rounded-lg transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-dots">Signing in</span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-4 sm:mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  {GOOGLE_CLIENT_ID ? (
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      size="large"
                      theme="outline"
                      text="signin_with"
                      shape="rectangular"
                      width="100%"
                      useOneTap={false}
                      auto_select={false}
                    />
                  ) : (
                    <div className="text-center text-sm text-red-500">
                      Google OAuth not configured. Please add
                      NEXT_PUBLIC_GOOGLE_CLIENT_ID to your .env.local file.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 sm:mt-6 lg:mt-8">
                <p className="text-center text-xs sm:text-sm lg:text-base text-gray-600">
                  {"Don't have an account? "}
                  <Link
                    href="/register"
                    className="text-[#6C63FF] hover:underline font-medium transition-colors duration-200"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
