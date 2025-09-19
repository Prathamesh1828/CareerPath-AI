import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    console.log("API route called with Gemini AI");
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    
    const formData = await request.json();
    console.log("Form data received:", formData);
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create a comprehensive prompt for career counseling
    const prompt = `You are an expert career counselor and industry analyst with deep knowledge of current job market trends, salary data, and career development paths. Analyze the following user profile and provide comprehensive, personalized career recommendations.

USER PROFILE:
- Name: ${formData.name}
- Age: ${formData.age}
- Education Level: ${formData.education}
- Interests: ${formData.interest}
- Learning Style: ${formData.learningStyle}
- Personality Type: ${formData.personality}
- Soft Skills: ${formData.softSkills}
- Technical Skills: ${formData.technicalSkills}
- Career Goals: ${formData.careerGoals}
- Preferred Work Environment: ${formData.preferredWork}

Please analyze this profile thoroughly and provide a detailed career analysis in EXACTLY this JSON format (ensure valid JSON structure):

{
  "summary": "A comprehensive 3-4 sentence summary analyzing the user's strengths, potential, and career readiness based on their profile",
  "topRecommendations": [
    {
      "title": "Specific Career Title",
      "match": "XX%",
      "description": "Detailed explanation of why this career fits their profile, including specific connections to their skills and interests",
      "requiredSkills": ["skill1", "skill2", "skill3", "skill4"],
      "growthOutlook": "Specific industry growth data and future prospects",
      "salaryRange": "Realistic salary range based on location and experience level in INR",
      "nextSteps": ["actionable step 1", "actionable step 2", "actionable step 3", "actionable step 4"]
    }
  ],
  "skillGaps": [
    {
      "skill": "Specific skill name",
      "importance": "High/Medium/Low",
      "howToAcquire": "Detailed, actionable advice on how to develop this skill"
    }
  ],
  "recommendedCourses": [
    {
      "title": "Specific course or certification name",
      "provider": "Platform or institution",
      "relevance": "How this course specifically helps their career goals",
      "priority": "High/Medium/Low"
    }
  ],
  "industryInsights": {
    "trends": ["current trend 1", "current trend 2", "current trend 3"],
    "opportunities": "Specific opportunities in recommended fields for someone with their background",
    "challenges": "Realistic challenges they might face and how to overcome them"
  },
  "actionPlan": {
    "immediate": ["specific action for next 30 days", "specific action for next 30 days"],
    "shortTerm": ["specific goal for 3-6 months", "specific goal for 3-6 months"],
    "longTerm": ["specific objective for 1-2 years", "specific objective for 1-2 years"]
  }
}

IMPORTANT INSTRUCTIONS:
1. Provide 3-5 career recommendations ranked by compatibility
2. Base salary ranges on current 2025 market data
3. Include both traditional and emerging career paths relevant to their profile
4. Consider their age, education level, and preferred work environment in recommendations
5. Ensure all advice is actionable and specific
6. Focus on realistic career transitions based on their current background
7. Return ONLY the JSON response, no additional text or formatting
8. Ensure the JSON is properly formatted and valid`;

    console.log("Generating AI response...");
    
    // Generate content using Gemini AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    console.log("Raw AI response received:", text);
    
    // Clean up the response to ensure it's valid JSON - FIXED REGEX
    text = text.replace(/``````/g, '').trim();
    
    // // Remove any potential markdown formatting
    // if (text.startsWith('```
    //   text = text.substring(3);
    // }
    // if (text.endsWith('```')) {
    //   text = text.substring(0, text.length - 3);
    // }
    
    // Additional cleanup for common JSON issues
    text = text.replace(/^[^{]*/, ''); // Remove anything before the first {
    text = text.replace(/[^}]*$/, ''); // Remove anything after the last }
    
    try {
      const recommendations = JSON.parse(text);
      console.log("Successfully parsed AI recommendations");
      return NextResponse.json(recommendations);
      
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Problematic text:", text);
      
      // Fallback response with user's data incorporated
      const fallbackResponse = {
        summary: `Based on your profile, ${formData.name}, you demonstrate strong potential in ${formData.interest || 'multiple'} areas. Your ${formData.education} education level and expressed interests in ${formData.technicalSkills || 'various technical areas'} position you well for several career paths. Your ${formData.personality} personality type and preference for ${formData.preferredWork || 'flexible'} work environments suggest you'd thrive in modern, collaborative roles.`,
        topRecommendations: [
          {
            title: "Technology Specialist",
            match: "88%",
            description: `Given your interest in ${formData.interest} and technical skills including ${formData.technicalSkills}, a technology specialist role would leverage your strengths. Your ${formData.learningStyle} learning style and ${formData.personality} personality type are well-suited for this field.`,
            requiredSkills: ["Technical Problem Solving", "Communication", "Continuous Learning", "Project Management"],
            growthOutlook: "Technology sector shows 15-25% growth with high demand for specialists",
            salaryRange: "$60,000 - $120,000 depending on specialization and location",
            nextSteps: [
              "Identify specific technology area to focus on",
              "Complete relevant online certifications",
              "Build portfolio projects showcasing your skills",
              "Network with professionals in your target field"
            ]
          },
          {
            title: "Business Analyst", 
            match: "82%",
            description: `Your combination of soft skills (${formData.softSkills}) and analytical mindset make you well-suited for business analysis. Your educational background and career goals align with this growth field.`,
            requiredSkills: ["Data Analysis", "Business Process Mapping", "Communication", "Problem Solving"],
            growthOutlook: "Strong 14% growth expected through 2032",
            salaryRange: "$65,000 - $100,000 annually",
            nextSteps: [
              "Learn business analysis fundamentals",
              "Get familiar with data analysis tools",
              "Practice process documentation",
              "Seek entry-level analyst positions"
            ]
          },
          {
            title: "Digital Marketing Specialist",
            match: "75%",
            description: `Your communication skills and interest in technology make digital marketing a viable career path. The creative and analytical aspects align with your profile.`,
            requiredSkills: ["Digital Marketing", "Analytics", "Content Creation", "Social Media Management"],
            growthOutlook: "Growing field with 10% annual growth expected",
            salaryRange: "$45,000 - $85,000 annually",
            nextSteps: [
              "Learn Google Analytics and social media platforms",
              "Create sample marketing campaigns",
              "Get certified in digital marketing",
              "Build a portfolio of marketing projects"
            ]
          }
        ],
        skillGaps: [
          {
            skill: "Industry-Specific Technical Skills",
            importance: "High",
            howToAcquire: "Take targeted online courses, complete practical projects, and seek mentorship in your chosen field"
          },
          {
            skill: "Professional Networking",
            importance: "Medium", 
            howToAcquire: "Join professional associations, attend industry events, and actively engage on LinkedIn"
          },
          {
            skill: "Advanced Data Analysis",
            importance: "Medium",
            howToAcquire: "Complete courses in Excel, SQL, or Python for data analysis, practice with real datasets"
          }
        ],
        recommendedCourses: [
          {
            title: "Professional Development Course",
            provider: "Online Learning Platform",
            relevance: "Builds foundational skills for your career transition",
            priority: "High"
          },
          {
            title: "Industry-Specific Certification",
            provider: "Industry Association",
            relevance: "Provides credentials for your target career field",
            priority: "High"
          },
          {
            title: "Communication and Leadership Skills",
            provider: "LinkedIn Learning",
            relevance: "Enhances soft skills crucial for career advancement",
            priority: "Medium"
          }
        ],
        industryInsights: {
          trends: ["Digital Transformation", "Remote Work Integration", "AI and Automation", "Sustainability Focus", "Skills-Based Hiring"],
          opportunities: "Growing demand for professionals who can bridge technical and business needs, especially in emerging technologies and sustainable practices",
          challenges: "Need to stay current with rapidly evolving technology and workplace practices. Competition for entry-level positions requires continuous skill development"
        },
        actionPlan: {
          immediate: [
            "Research specific roles in your field of interest",
            "Update resume and LinkedIn profile with current skills",
            "Identify 2-3 target companies or roles"
          ],
          shortTerm: [
            "Complete relevant certification or course",
            "Build professional network through events and online platforms",
            "Create portfolio projects demonstrating your skills"
          ],
          longTerm: [
            "Gain hands-on experience through internships or entry-level positions",
            "Develop expertise in chosen specialization",
            "Consider advanced education or leadership roles"
          ]
        }
      };
      
      return NextResponse.json(fallbackResponse);
    }
    
  } catch (error) {
    console.error("Error generating career recommendations:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to generate recommendations",
        details: error.message,
        fallback: {
          summary: "We encountered an issue generating your personalized recommendations. Please try again or contact support.",
          topRecommendations: [{
            title: "General Career Guidance Needed",
            match: "N/A",
            description: "Please resubmit your information for personalized career recommendations.",
            requiredSkills: [],
            growthOutlook: "N/A",
            salaryRange: "N/A", 
            nextSteps: ["Resubmit the career assessment form"]
          }],
          skillGaps: [],
          recommendedCourses: [],
          industryInsights: {
            trends: [],
            opportunities: "Please complete the assessment again",
            challenges: "Technical issue occurred"
          },
          actionPlan: {
            immediate: ["Retry the career assessment"],
            shortTerm: ["Contact support if issue persists"],
            longTerm: ["N/A"]
          }
        }
      },
      { status: 500 }
    );
  }
}

// Test endpoint
export async function GET() {
  try {
    // Test Gemini AI connection
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello");
    const response = await result.response;
    
    return NextResponse.json({ 
      message: "Career recommendations API with Gemini AI is working",
      geminiTest: response.text(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      message: "API route working but Gemini AI connection failed",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
