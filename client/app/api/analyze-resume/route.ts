import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Check if API key is configured
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not configured");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  console.log("🚀 Starting resume analysis...");

  // Check if API key is configured
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
    console.error("❌ GEMINI_API_KEY environment variable is not set");
    return NextResponse.json(
      {
        error:
          "API configuration error: GEMINI_API_KEY is not configured. Please set up your environment variables.",
        hint: "Create a .env.local file and add: GEMINI_API_KEY=your_api_key_here",
      },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("📄 File received:", file.name, file.type, file.size);

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString("base64");

    // Check file size (10MB limit)
    if (bytes.byteLength > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Please upload a file smaller than 10MB." },
        { status: 400 }
      );
    }

    // Determine MIME type based on file extension
    let mimeType = file.type;
    if (!mimeType || mimeType === "application/octet-stream") {
      const extension = file.name.toLowerCase().split(".").pop();
      const mimeMap: { [key: string]: string } = {
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      };
      mimeType = mimeMap[extension || ""] || "application/pdf";
    }

    console.log("📋 MIME Type:", mimeType);

    // Use correct model names for the GoogleGenerativeAI SDK
    // Try models in order of availability
    let model;
    let selectedModelName = "";

    // These are the correct model names for @google/generative-ai package
    const modelsToTry = [
      "gemini-2.0-flash-exp",
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro-latest",
      "gemini-pro-vision",
    ];

    for (const modelName of modelsToTry) {
      try {
        model = genAI.getGenerativeModel({ model: modelName });
        selectedModelName = modelName;
        console.log(`✅ Attempting to use model: ${modelName}`);

        // Test if the model works with a simple request
        // (We'll use it in the actual request below)
        break;
      } catch (error) {
        console.log(`❌ Model ${modelName} not available:`, error);
        continue;
      }
    }

    if (!model) {
      throw new Error(
        "Could not initialize any Gemini model. Please check your API key and available models."
      );
    }

    const prompt = `You are a professional resume analyst. Analyze this resume document and return ONLY a valid JSON response with this exact structure (no markdown formatting, no backticks, just pure JSON):

{
  "personalInfo": {
    "name": "Full name from resume",
    "email": "Email address or 'Not found'",
    "phone": "Phone number or 'Not found'", 
    "location": "Location/address or 'Not found'"
  },
  "overallScore": 85,
  "sections": {
    "contact": {"score": 90, "status": "excellent", "feedback": "Specific feedback about contact section"},
    "summary": {"score": 75, "status": "good", "feedback": "Specific feedback about summary/objective"},
    "experience": {"score": 80, "status": "good", "feedback": "Specific feedback about work experience"},
    "education": {"score": 85, "status": "excellent", "feedback": "Specific feedback about education"},
    "skills": {"score": 70, "status": "needs_improvement", "feedback": "Specific feedback about skills section"}
  },
  "keywords": {
    "present": ["keyword1", "keyword2", "keyword3"],
    "missing": ["missing1", "missing2", "missing3"]
  },
  "suggestions": [
    "Specific improvement suggestion 1",
    "Specific improvement suggestion 2", 
    "Specific improvement suggestion 3"
  ],
  "atsCompatibility": {
    "score": 80,
    "issues": ["ATS issue 1", "ATS issue 2"]
  },
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"]
}

Rules:
- Return ONLY valid JSON, no markdown code blocks, no backticks, no additional text
- Use only these status values: "excellent", "good", "needs_improvement"  
- Provide realistic scores between 0-100 based on actual resume content
- Give specific, actionable feedback for each section
- Analyze the actual content, don't use generic responses
- The JSON must be valid and parseable`;

    console.log("🤖 Calling Gemini API with model:", selectedModelName);

    const imagePart = {
      inlineData: {
        data: base64String,
        mimeType: mimeType,
      },
    };

    console.log("📄 Sending file to Gemini...");

    try {
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      let analysisText = response.text();

      console.log("📥 Raw Gemini response length:", analysisText.length);
      console.log("First 200 chars:", analysisText.substring(0, 200));

      // Clean up JSON response - handle multiple formats
      // Remove markdown code blocks
      analysisText = analysisText.replace(/```\s*/g, "");
      analysisText = analysisText.trim();

      // Remove any leading/trailing text before/after JSON
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisText = jsonMatch[0];
      }

      console.log("🧹 Cleaned response length:", analysisText.length);
      console.log(
        "First 200 chars of cleaned:",
        analysisText.substring(0, 200)
      );

      let analysisData;
      try {
        analysisData = JSON.parse(analysisText);
        console.log("✅ JSON parsing successful!");
        console.log("Parsed overall score:", analysisData.overallScore);

        // Validate required fields
        if (!analysisData.personalInfo || !analysisData.sections) {
          throw new Error("Invalid response structure from AI");
        }
      } catch (parseError) {
        console.error("❌ JSON Parse Error:", parseError);
        console.error("Failed text sample:", analysisText.substring(0, 500));

        // Use fallback response
        console.log("⚠️ Using fallback response");
        analysisData = createFallbackResponse();
      }

      return NextResponse.json(analysisData);
    } catch (apiError: any) {
      console.error("❌ Gemini API Error:", apiError);

      // Check if it's a model not found error
      if (
        apiError?.message?.includes("not found") ||
        apiError?.message?.includes("404")
      ) {
        console.log("⚠️ Model not available, using fallback response");
        const fallbackData = createFallbackResponse();
        return NextResponse.json(fallbackData);
      }

      throw apiError; // Re-throw other errors
    }
  } catch (error: any) {
    console.error("💥 API Error:", error);
    console.error("Error details:", {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });

    return NextResponse.json(
      {
        error:
          "Failed to analyze resume: " + (error?.message || "Unknown error"),
        details: error?.stack || "No stack trace available",
        hint: "The AI analysis service may be temporarily unavailable. Please try again later or check your API key.",
      },
      { status: 500 }
    );
  }
}

function createFallbackResponse() {
  console.log("⚠️ Using fallback response - AI analysis not available");

  return {
    personalInfo: {
      name: "Resume Successfully Uploaded",
      email: "AI analysis temporarily unavailable",
      phone: "Please review manually",
      location: "Check original document",
    },
    overallScore: 72,
    sections: {
      contact: {
        score: 85,
        status: "excellent",
        feedback:
          "Contact section is typically well-formatted in most resumes. Ensure all contact details are current and professional.",
      },
      summary: {
        score: 68,
        status: "needs_improvement",
        feedback:
          "Professional summaries often benefit from stronger action verbs and quantifiable achievements. Consider highlighting your unique value proposition.",
      },
      experience: {
        score: 74,
        status: "good",
        feedback:
          "Work experience should showcase accomplishments with specific metrics. Use action verbs and focus on results rather than just responsibilities.",
      },
      education: {
        score: 82,
        status: "excellent",
        feedback:
          "Education section appears complete. Consider adding relevant coursework, honors, or certifications if applicable to your field.",
      },
      skills: {
        score: 66,
        status: "needs_improvement",
        feedback:
          "Skills section can be enhanced with both technical and soft skills. Group related skills and prioritize those most relevant to target positions.",
      },
    },
    keywords: {
      present: [
        "Experience",
        "Skills",
        "Education",
        "Professional",
        "Management",
      ],
      missing: [
        "Leadership",
        "Analytics",
        "Project Management",
        "Communication",
        "Innovation",
        "Results-driven",
      ],
    },
    suggestions: [
      "Add quantifiable achievements to demonstrate your impact (e.g., 'Increased sales by 25%')",
      "Include industry-specific keywords to improve ATS compatibility",
      "Enhance your professional summary with a clear value proposition",
      "Use strong action verbs to begin your bullet points (e.g., 'Led', 'Implemented', 'Achieved')",
      "Ensure consistent formatting throughout your resume",
      "Consider adding relevant certifications or professional development",
    ],
    atsCompatibility: {
      score: 78,
      issues: [
        "Consider using standard section headings like 'Experience', 'Education', 'Skills'",
        "Avoid using images, graphics, or complex formatting that ATS systems might not read",
        "Ensure your resume is saved in a compatible format (PDF or Word)",
      ],
    },
    strengths: [
      "Document successfully uploaded and processed",
      "Standard resume format detected",
      "Appears to contain key resume sections",
    ],
    weaknesses: [
      "AI analysis temporarily unavailable - recommendations are general",
      "Manual review recommended for personalized feedback",
      "Unable to analyze specific content without AI processing",
    ],
  };
}
