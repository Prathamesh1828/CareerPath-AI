// app/api/recommendations/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Helper function for retry with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = attempt === maxRetries - 1;
      const is503 =
        error.message?.includes("503") || error.message?.includes("overloaded");
      const is429 =
        error.message?.includes("429") || error.message?.includes("quota");

      if ((is503 || is429) && !isLastAttempt) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(
          `⏳ Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }
}

export async function POST(request) {
  try {
    console.log("🚀 API route called with Gemini AI");

    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY is missing");
      return NextResponse.json(
        {
          error: "API key not configured",
          message: "GEMINI_API_KEY environment variable is not set",
        },
        { status: 500 }
      );
    }

    const formData = await request.json();
    console.log("📝 Form data received:", formData);

    // Prioritized list of models to try
    const modelsToTry = [
      "gemini-1.5-flash-002",
      "gemini-1.5-flash-latest",
      "gemini-1.5-flash-8b-latest",
      "gemini-1.5-pro-002",
      "gemini-1.5-pro-latest",
      "gemini-2.0-flash-exp",
      "gemini-2.5-flash-preview-09-2025",
    ];

    let successfulResponse = null;
    let lastError = null;

    // Try each model with retry logic
    for (const modelName of modelsToTry) {
      try {
        console.log(`\n🤖 Attempting model: ${modelName}`);

        const model = genAI.getGenerativeModel({ model: modelName });

        // Create a comprehensive prompt for career counseling across ALL fields
        const prompt = `You are an expert career counselor with deep knowledge across ALL career fields including Technology, Creative Arts, Business, Healthcare, Education, Counseling, Finance, Operations, Design, Marketing, and more. You understand diverse job markets, salary trends globally and in India, and career development paths across technical AND non-technical fields.

Analyze the following user profile and provide comprehensive, personalized career recommendations that match their ACTUAL interests, skills, and personality - not limited to just technical careers.

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

IMPORTANT GUIDELINES:
1. Consider ALL career fields: Technical (Software, Data, Cloud), Creative (Design, Video, Animation), Business (Management, Marketing, Sales), Healthcare (Nursing, Wellness, Therapy), Education (Teaching, Training, Counseling), Finance (Accounting, Investment), Operations, Psychology, Social Work, Legal, Journalism, Content Creation, etc.
2. Match careers to their ACTUAL interests and personality - if they show creative interests, recommend creative careers; if counseling skills, recommend counseling/psychology careers; if business interests, recommend business careers
3. Don't force technical careers on non-technical people
4. Include diverse salary ranges appropriate for Indian market across different fields
5. Provide realistic career paths for their education level and interests

Please analyze this profile thoroughly and provide a detailed career analysis in EXACTLY this JSON format:

{
  "summary": "A comprehensive 3-4 sentence summary analyzing the user's strengths, potential, and career readiness based on their ACTUAL profile and interests",
  "topRecommendations": [
    {
      "title": "Specific Career Title (matching their interests)",
      "match": "XX%",
      "description": "Detailed explanation of why this career fits their profile, personality, and interests",
      "requiredSkills": ["skill1", "skill2", "skill3", "skill4"],
      "growthOutlook": "Specific industry growth data and future prospects for this field",
      "salaryRange": "Realistic salary range in INR for this career in India",
      "nextSteps": ["step 1", "step 2", "step 3", "step 4"]
    }
  ],
  "skillGaps": [
    {
      "skill": "Specific skill name relevant to recommended careers",
      "importance": "High/Medium/Low",
      "howToAcquire": "Detailed advice on how to develop this skill with specific resources"
    }
  ],
  "recommendedCourses": [
    {
      "title": "Specific course name relevant to their field",
      "provider": "Platform or institution",
      "relevance": "How this course helps their career goals",
      "priority": "High/Medium/Low"
    }
  ],
  "industryInsights": {
    "trends": ["trend 1 in their industry", "trend 2", "trend 3"],
    "opportunities": "Specific opportunities in their recommended fields",
    "challenges": "Realistic challenges in their field and how to overcome them"
  },
  "actionPlan": {
    "immediate": ["action 1", "action 2"],
    "shortTerm": ["goal 1", "goal 2"],
    "longTerm": ["objective 1", "objective 2"]
  }
}

Provide 4-5 diverse career recommendations that genuinely match their profile. Include mix of:
- Primary careers matching their main interests
- Adjacent careers utilizing their transferable skills
- Growth careers in emerging areas of their field
- Stable careers with good work-life balance

IMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, no additional text.`;

        console.log(`⚙️ Generating content with ${modelName}...`);

        // Use retry logic for generateContent
        const result = await retryWithBackoff(
          () => model.generateContent(prompt),
          3,
          2000
        );

        const response = await result.response;
        let text = response.text();

        console.log(
          `✅ Response received from ${modelName} (${text.length} chars)`
        );

        // Clean up the response
        text = text.replace(/```\s*/g, "");
        text = text.trim();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          text = jsonMatch[0];
        }

        try {
          const recommendations = JSON.parse(text);

          // Validate response structure
          if (recommendations.summary && recommendations.topRecommendations) {
            console.log(
              `🎉 Successfully parsed recommendations from ${modelName}`
            );
            successfulResponse = recommendations;
            break;
          } else {
            throw new Error("Invalid response structure");
          }
        } catch (parseError) {
          console.error(
            `❌ JSON parsing failed for ${modelName}:`,
            parseError.message
          );
          lastError = parseError;
          continue;
        }
      } catch (modelError) {
        console.error(`❌ Model ${modelName} failed:`, modelError.message);
        lastError = modelError;

        if (
          modelError.message?.includes("503") ||
          modelError.message?.includes("429")
        ) {
          console.log("⏳ Waiting 3 seconds before trying next model...");
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }

        continue;
      }
    }

    // If we got a successful response, return it
    if (successfulResponse) {
      return NextResponse.json(successfulResponse);
    }

    // If all models failed, return fallback response
    console.log("⚠️ All models failed, using fallback response");
    return NextResponse.json(createFallbackResponse(formData));
  } catch (error) {
    console.error("💥 Unexpected error:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        error: "Failed to generate recommendations",
        message: error.message || "Unknown error occurred",
        fallback: createFallbackResponse({ name: "User" }),
      },
      { status: 500 }
    );
  }
}

// Enhanced fallback response with diverse career options
function createFallbackResponse(formData) {
  const name = formData.name || "valued user";
  const interests = formData.interest || "diverse fields";
  const skills =
    formData.technicalSkills ||
    formData.softSkills ||
    "problem-solving and communication";
  const personality = formData.personality || "adaptable and motivated";
  const education = formData.education || "Bachelor's degree";

  // Determine career direction based on interests and skills
  const interestsLower = interests.toLowerCase();
  const skillsLower = skills.toLowerCase();

  // Check for different career inclinations
  const isTechnical =
    skillsLower.includes("programming") ||
    skillsLower.includes("coding") ||
    skillsLower.includes("software") ||
    interestsLower.includes("technology");

  const isCreative =
    interestsLower.includes("design") ||
    interestsLower.includes("art") ||
    interestsLower.includes("creative") ||
    skillsLower.includes("design");

  const isCounseling =
    interestsLower.includes("counseling") ||
    interestsLower.includes("psychology") ||
    interestsLower.includes("helping") ||
    skillsLower.includes("empathy");

  const isBusiness =
    interestsLower.includes("business") ||
    interestsLower.includes("management") ||
    interestsLower.includes("marketing") ||
    interestsLower.includes("sales");

  const isEducation =
    interestsLower.includes("teaching") ||
    interestsLower.includes("education") ||
    interestsLower.includes("training");

  const isHealthcare =
    interestsLower.includes("health") ||
    interestsLower.includes("medical") ||
    interestsLower.includes("wellness") ||
    interestsLower.includes("nursing");

  // Generate appropriate recommendations based on profile
  let topRecommendations = [];

  if (isCounseling) {
    topRecommendations = [
      {
        title: "Career Counselor",
        match: "92%",
        description: `Perfect match for your empathetic nature and interest in helping others. Career counseling combines psychology, communication skills, and understanding of diverse industries to guide individuals toward fulfilling careers. Your ${personality} personality makes you ideal for this role [web:74][web:80].`,
        requiredSkills: [
          "Active Listening & Empathy",
          "Career Assessment Tools",
          "Knowledge of Labor Market",
          "Communication Skills",
          "Counseling Techniques",
          "Cultural Sensitivity",
        ],
        growthOutlook:
          "Growing 8-10% annually as professionals seek career transitions and students need guidance. High demand in educational institutions, corporates, and private practice [web:71][web:74]",
        salaryRange:
          "₹3,50,000 - ₹12,00,000 per annum (Entry: ₹3.5-5L, Mid: ₹6-9L, Senior/Private Practice: ₹10-15L+)",
        nextSteps: [
          "Pursue M.A. in Psychology/Counseling or certification in Career Counseling",
          "Learn career assessment tools (Strong Interest Inventory, Myers-Briggs, Holland Code)",
          "Gain experience through internships at career counseling centers",
          "Develop knowledge of diverse career paths across industries",
          "Join professional associations like Career Development Association of India",
          "Build counseling practice with supervision from licensed professionals",
        ],
      },
      {
        title: "Clinical Psychologist / Therapist",
        match: "88%",
        description:
          "Excellent fit for your interest in understanding human behavior and helping people. Clinical psychology involves assessment, diagnosis, and treatment of mental health issues. Combines empathy, analytical skills, and evidence-based interventions.",
        requiredSkills: [
          "Psychological Assessment",
          "Therapeutic Techniques (CBT, DBT)",
          "Diagnostic Skills",
          "Empathy & Active Listening",
          "Research & Case Documentation",
          "Ethical Practice",
        ],
        growthOutlook:
          "Mental health awareness increasing rapidly in India. Demand up 40% post-pandemic. Growing acceptance of therapy and corporate mental health programs [web:66]",
        salaryRange:
          "₹4,00,000 - ₹15,00,000 per annum (Entry: ₹4-6L, Mid: ₹8-12L, Private Practice: ₹15L+)",
        nextSteps: [
          "Complete M.Phil/Ph.D in Clinical Psychology or M.A. in Counseling Psychology",
          "Get licensed (RCI registration for Clinical Psychologists in India)",
          "Complete supervised clinical hours (1000-1500 hours)",
          "Specialize in areas like Child Psychology, Trauma, Addiction, or Family Therapy",
          "Join professional bodies like Indian Association of Clinical Psychologists",
          "Consider starting private practice or joining hospitals/clinics",
        ],
      },
      {
        title: "Human Resources Specialist (Employee Wellbeing)",
        match: "85%",
        description:
          "Combines counseling skills with organizational psychology. HR specialists focused on employee wellbeing design programs for mental health, work-life balance, and career development within organizations.",
        requiredSkills: [
          "Organizational Psychology",
          "Conflict Resolution",
          "Training & Development",
          "Employee Assistance Programs",
          "HR Policies & Compliance",
          "Communication & Mediation",
        ],
        growthOutlook:
          "Companies prioritizing employee wellbeing post-pandemic. 25% growth in dedicated wellbeing roles. Every mid-to-large company needs HR specialists [web:66]",
        salaryRange:
          "₹4,50,000 - ₹18,00,000 per annum (Entry: ₹4.5-7L, Mid: ₹8-12L, Senior: ₹15-20L)",
        nextSteps: [
          "Get MBA in HR or Master's in Organizational Psychology",
          "Learn HR software and employee engagement tools",
          "Certifications: SHRM-CP, CIPD, or Wellbeing at Work certification",
          "Gain experience in recruitment, training, or employee relations",
          "Develop skills in designing wellness programs and EAP services",
          "Network with HR professionals through NHRD and similar forums",
        ],
      },
      {
        title: "School Counselor / Educational Psychologist",
        match: "90%",
        description:
          "Work directly with students, parents, and teachers to support academic, social, and emotional development. School counselors help students navigate challenges, make career decisions, and develop coping strategies [web:66].",
        requiredSkills: [
          "Child & Adolescent Psychology",
          "Educational Assessment",
          "Crisis Intervention",
          "Parent-Teacher Consultation",
          "IEP Development",
          "Group Counseling",
        ],
        growthOutlook:
          "Every school now requires counselors (CBSE mandate). Growing awareness of student mental health. Stable career with good work-life balance [web:66]",
        salaryRange:
          "₹3,00,000 - ₹10,00,000 per annum (Entry: ₹3-5L, Experienced: ₹6-8L, International Schools: ₹10-15L)",
        nextSteps: [
          "Complete M.Ed in Guidance & Counseling or M.A. in Educational Psychology",
          "Get trained in child/adolescent counseling techniques",
          "Learn special education and inclusive education practices",
          "Gain experience through school internships",
          "Stay updated on CBSE/ICSE counseling guidelines",
          "Consider specialization in learning disabilities or career guidance",
        ],
      },
    ];
  } else if (isCreative) {
    topRecommendations = [
      {
        title: "UI/UX Designer",
        match: "93%",
        description:
          "Perfect blend of creativity and problem-solving. UI/UX designers create intuitive, beautiful digital experiences. High demand across tech companies, startups, agencies, and e-commerce [web:69][web:70].",
        requiredSkills: [
          "Figma, Adobe XD, Sketch",
          "User Research & Testing",
          "Wireframing & Prototyping",
          "Design Systems",
          "HTML/CSS (Basic)",
          "Interaction Design",
        ],
        growthOutlook:
          "Growing 23% annually. Every digital product needs UX designers. Salaries comparable to software engineers. Remote opportunities abundant [web:69]",
        salaryRange:
          "₹4,00,000 - ₹20,00,000 per annum (Entry: ₹4-7L, Mid: ₹8-14L, Senior: ₹15-25L)",
        nextSteps: [
          "Master Figma through tutorials and courses (free on YouTube)",
          "Build portfolio with 5-7 case studies (redesign existing apps)",
          "Learn UX research methods and usability testing",
          "Take Google UX Design Certificate or Interaction Design Foundation courses",
          "Freelance on platforms like Upwork, Fiverr to gain experience",
          "Join design communities like Dribbble, Behance, and local design meetups",
        ],
      },
      {
        title: "Content Creator / Digital Marketing Specialist",
        match: "88%",
        description:
          "Create engaging content across platforms - videos, graphics, written content. Digital marketing combines creativity with strategy and data analysis. Highly in-demand skill across all industries [web:67][web:69].",
        requiredSkills: [
          "Content Writing & Copywriting",
          "Social Media Management",
          "SEO & SEM",
          "Video Editing (Premiere Pro, Final Cut)",
          "Graphic Design (Canva, Photoshop)",
          "Analytics (Google Analytics, Social Insights)",
        ],
        growthOutlook:
          "Booming field with 30%+ growth. Every business needs digital presence. Influencer economy, brand partnerships, freelance opportunities abundant [web:67]",
        salaryRange:
          "₹3,00,000 - ₹15,00,000 per annum (Entry: ₹3-5L, Mid: ₹6-10L, Senior/Agency: ₹12-18L, Independent: Variable)",
        nextSteps: [
          "Start personal brand on Instagram/YouTube/LinkedIn in your niche",
          "Learn content creation tools: Canva, CapCut, Adobe Suite",
          "Complete Google Digital Marketing & E-commerce Certificate",
          "Master SEO through courses like Moz Academy or Semrush Academy",
          "Build portfolio of content pieces with measurable results",
          "Freelance or intern with digital marketing agencies",
        ],
      },
      {
        title: "Graphic Designer / Visual Artist",
        match: "90%",
        description:
          "Transform ideas into visual stories. Work on branding, advertising, publications, digital media. Creative freedom combined with commercial applications [web:66].",
        requiredSkills: [
          "Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
          "Typography & Color Theory",
          "Branding & Identity Design",
          "Print & Digital Design",
          "Illustration",
          "Creative Conceptualization",
        ],
        growthOutlook:
          "Steady demand across advertising agencies, design studios, in-house creative teams, freelance market. E-commerce boom increasing need for product photography and design [web:66]",
        salaryRange:
          "₹2,50,000 - ₹12,00,000 per annum (Entry: ₹2.5-4.5L, Mid: ₹5-8L, Senior/Freelance: ₹10-15L+)",
        nextSteps: [
          "Master Adobe Creative Suite through online courses",
          "Build diverse portfolio with 15-20 projects (branding, posters, social media)",
          "Learn design fundamentals: typography, color, composition",
          "Freelance on Fiverr, 99designs to build experience",
          "Follow design trends on Behance, Dribbble",
          "Consider specialization: motion graphics, illustration, or branding",
        ],
      },
      {
        title: "Video Editor / Motion Graphics Designer",
        match: "87%",
        description:
          "Growing exponentially with video content dominance. Edit videos for YouTube, films, ads, corporate content. Motion graphics add animated elements to videos [web:69].",
        requiredSkills: [
          "Adobe Premiere Pro / Final Cut Pro",
          "After Effects (Motion Graphics)",
          "Color Grading & Correction",
          "Audio Editing",
          "Storytelling & Pacing",
          "VFX (Basic)",
        ],
        growthOutlook:
          "Video is 82% of internet traffic. Massive demand from YouTube creators, production houses, OTT platforms, brands. Remote work friendly [web:69]",
        salaryRange:
          "₹3,00,000 - ₹18,00,000 per annum (Entry: ₹3-5L, Mid: ₹6-10L, Senior/OTT: ₹12-20L)",
        nextSteps: [
          "Learn Premiere Pro and After Effects through YouTube/Skillshare",
          "Create demo reel showcasing various styles",
          "Offer free editing for small YouTubers to build portfolio",
          "Learn color grading and sound design",
          "Join editing communities and participate in contests",
          "Freelance on Upwork, Fiverr, or approach production houses",
        ],
      },
    ];
  } else if (isBusiness) {
    topRecommendations = [
      {
        title: "Digital Marketing Manager",
        match: "91%",
        description:
          "Lead digital marketing strategies across channels. Combine creativity, data analysis, and business strategy. High-impact role driving revenue growth [web:67][web:69].",
        requiredSkills: [
          "SEO, SEM, & PPC Advertising",
          "Social Media Marketing",
          "Email Marketing & Automation",
          "Marketing Analytics",
          "Content Strategy",
          "Budget Management",
        ],
        growthOutlook:
          "One of fastest-growing fields in India. 35% annual growth. Every business needs digital marketing. Progression to CMO roles possible [web:67]",
        salaryRange:
          "₹4,50,000 - ₹20,00,000 per annum (Entry: ₹4.5-7L, Mid: ₹8-14L, Senior: ₹15-25L)",
        nextSteps: [
          "Get certified: Google Ads, Google Analytics, HubSpot, Meta Blueprint",
          "Run campaigns for small businesses or personal projects",
          "Master one channel deeply (SEO, Paid Ads, or Social)",
          "Learn marketing automation tools (HubSpot, Marketo)",
          "Build case studies demonstrating ROI",
          "Network with marketing professionals on LinkedIn",
        ],
      },
      {
        title: "Business Analyst",
        match: "88%",
        description:
          "Bridge between business and technology. Analyze data, identify opportunities, solve problems. Critical role in every organization undergoing digital transformation [web:67][web:70].",
        requiredSkills: [
          "Data Analysis (Excel, SQL, Power BI)",
          "Business Process Modeling",
          "Requirements Gathering",
          "Stakeholder Management",
          "Problem-Solving",
          "Documentation",
        ],
        growthOutlook:
          "18% growth rate. High demand across consulting firms, tech companies, enterprises. Gateway to product management and strategy roles [web:70]",
        salaryRange:
          "₹5,00,000 - ₹18,00,000 per annum (Entry: ₹5-8L, Mid: ₹9-13L, Senior: ₹15-20L)",
        nextSteps: [
          "Learn SQL and Power BI/Tableau for data analysis",
          "Get CBAP or PMI-PBA certification",
          "Understand Agile and Scrum methodologies",
          "Practice creating business requirement documents",
          "Work on case studies analyzing business problems",
          "Join business analysis communities and forums",
        ],
      },
      {
        title: "Project Manager",
        match: "86%",
        description:
          "Lead teams and deliver projects on time and budget. Coordinate across departments, manage stakeholders, solve problems. Leadership role with clear career progression [web:66].",
        requiredSkills: [
          "Project Planning & Execution",
          "Agile & Scrum Methodologies",
          "Risk Management",
          "Team Leadership",
          "Stakeholder Communication",
          "Tools (Jira, Asana, MS Project)",
        ],
        growthOutlook:
          "Consistent demand across all industries. 15% growth. Project managers needed in IT, construction, healthcare, finance, and more [web:66]",
        salaryRange:
          "₹6,00,000 - ₹25,00,000 per annum (Entry: ₹6-9L, Mid: ₹10-16L, Senior/PMP: ₹18-30L)",
        nextSteps: [
          "Get PMP (Project Management Professional) certification",
          "Learn Agile/Scrum - get Certified Scrum Master (CSM)",
          "Master project management tools (Jira, Trello, Monday.com)",
          "Lead small projects to gain experience",
          "Develop soft skills: negotiation, conflict resolution",
          "Join PMI (Project Management Institute) local chapter",
        ],
      },
      {
        title: "Sales Manager / Business Development",
        match: "84%",
        description:
          "Drive revenue growth by acquiring new clients and expanding existing relationships. Combine relationship building, negotiation, and strategic thinking. High earning potential with commissions [web:66].",
        requiredSkills: [
          "Sales Strategy & Planning",
          "Client Relationship Management",
          "Negotiation & Persuasion",
          "Market Research",
          "CRM Software (Salesforce, HubSpot)",
          "Presentation Skills",
        ],
        growthOutlook:
          "Always in demand. Sales roles available across B2B, B2C, SaaS, real estate, BFSI. Performance-based compensation can be very lucrative [web:66]",
        salaryRange:
          "₹4,00,000 - ₹20,00,000+ per annum (Base: ₹4-8L + Commission: Variable, Top performers: ₹15-30L+)",
        nextSteps: [
          "Learn sales methodologies (SPIN Selling, Challenger Sale)",
          "Master CRM tools like Salesforce or HubSpot",
          "Develop industry expertise (choose SaaS, BFSI, Real Estate, etc.)",
          "Practice cold calling, email outreach, and closing techniques",
          "Join sales training programs or bootcamps",
          "Network extensively and build personal brand on LinkedIn",
        ],
      },
    ];
  } else if (isEducation) {
    topRecommendations = [
      {
        title: "Instructional Designer / E-Learning Specialist",
        match: "90%",
        description:
          "Design engaging online courses and training programs. Combines education, technology, and creativity. Growing rapidly with online education boom [web:66][web:67].",
        requiredSkills: [
          "Curriculum Design",
          "E-Learning Tools (Articulate, Adobe Captivate)",
          "Learning Management Systems",
          "Educational Technology",
          "Multimedia Content Creation",
          "Assessment Design",
        ],
        growthOutlook:
          "EdTech sector booming in India. 40% growth as companies shift to online training and education. Remote-friendly role [web:67]",
        salaryRange:
          "₹4,00,000 - ₹15,00,000 per annum (Entry: ₹4-6L, Mid: ₹7-11L, Senior: ₹12-18L)",
        nextSteps: [
          "Learn instructional design models (ADDIE, SAM)",
          "Master e-learning authoring tools (Articulate 360, Adobe Captivate)",
          "Get certified in instructional design or educational technology",
          "Build portfolio with sample courses on various topics",
          "Understand LMS platforms (Moodle, Canvas, Blackboard)",
          "Join instructional design communities online",
        ],
      },
      {
        title: "Corporate Trainer / Learning & Development Specialist",
        match: "88%",
        description:
          "Train employees on technical and soft skills. Design and deliver workshops, measure training effectiveness. People-facing role with impact on organizational growth [web:66].",
        requiredSkills: [
          "Training Delivery",
          "Adult Learning Principles",
          "Training Needs Analysis",
          "Presentation Skills",
          "Program Evaluation",
          "Facilitation Techniques",
        ],
        growthOutlook:
          "Every mid-to-large company has L&D function. Upskilling and reskilling priority post-pandemic. 20% growth in corporate training roles [web:66]",
        salaryRange:
          "₹3,50,000 - ₹12,00,000 per annum (Entry: ₹3.5-5.5L, Mid: ₹6-9L, Senior: ₹10-15L)",
        nextSteps: [
          "Get certification in Training & Development (ATD, CIPD)",
          "Develop expertise in a training area (Leadership, Sales, Technical)",
          "Learn to design engaging workshops and activities",
          "Practice public speaking and facilitation",
          "Understand training metrics and ROI measurement",
          "Join Association for Talent Development (ATD)",
        ],
      },
      {
        title: "Special Education Teacher",
        match: "92%",
        description:
          "Work with students with diverse learning needs. Rewarding career making real difference in children's lives. Growing awareness and demand for inclusive education [web:66].",
        requiredSkills: [
          "Special Education Methods",
          "IEP Development",
          "Behavioral Management",
          "Assistive Technology",
          "Differentiated Instruction",
          "Parent Communication",
        ],
        growthOutlook:
          "Inclusion mandates increasing demand. Every school needs special educators. Fulfilling career with job stability [web:66]",
        salaryRange:
          "₹3,00,000 - ₹10,00,000 per annum (Entry: ₹3-5L, Experienced: ₹6-8L, International/Specialist: ₹10-15L)",
        nextSteps: [
          "Get B.Ed or M.Ed in Special Education",
          "Specialize in specific needs (Autism, Learning Disabilities, etc.)",
          "Learn assistive technologies and adaptive teaching methods",
          "Gain practical experience through internships at special schools",
          "Get RCI (Rehabilitation Council of India) certification if applicable",
          "Stay updated on inclusive education policies and best practices",
        ],
      },
      {
        title: "Academic Content Writer / Curriculum Developer",
        match: "85%",
        description:
          "Create educational content for textbooks, online courses, test prep. Combine subject expertise with writing and pedagogy. Flexible work options including freelance [web:66].",
        requiredSkills: [
          "Subject Matter Expertise",
          "Curriculum Standards Knowledge",
          "Educational Content Writing",
          "Research Skills",
          "Editing & Proofreading",
          "Content Management",
        ],
        growthOutlook:
          "EdTech and publishing companies constantly need content creators. Test prep market especially strong in India. Freelance opportunities abundant [web:66]",
        salaryRange:
          "₹3,00,000 - ₹10,00,000 per annum (Entry: ₹3-4.5L, Experienced: ₹5-8L, Senior/Freelance: ₹8-12L+)",
        nextSteps: [
          "Build portfolio with sample lessons, questions, and educational content",
          "Understand curriculum frameworks (CBSE, ICSE, State boards)",
          "Master writing for different grade levels and subjects",
          "Learn educational content tools and style guides",
          "Freelance with EdTech companies and publishers",
          "Develop expertise in high-demand subjects (Math, Science, English)",
        ],
      },
    ];
  } else if (isHealthcare) {
    topRecommendations = [
      {
        title: "Registered Nurse / Healthcare Professional",
        match: "90%",
        description:
          "Provide direct patient care in hospitals, clinics, or community settings. Noble profession with job security and growth opportunities. Multiple specialization paths available [web:66][web:75].",
        requiredSkills: [
          "Clinical Skills & Patient Care",
          "Medical Knowledge",
          "Emergency Response",
          "Patient Communication",
          "Healthcare Technology",
          "Ethical Practice",
        ],
        growthOutlook:
          "Healthcare sector expanding rapidly. Aging population and health awareness driving 12% annual growth. High job security and respect [web:75]",
        salaryRange:
          "₹2,50,000 - ₹8,00,000 per annum (Entry: ₹2.5-4L, Mid: ₹5-6.5L, Senior/ICU/OT: ₹7-10L, Abroad: Much higher)",
        nextSteps: [
          "Complete B.Sc Nursing from recognized institution",
          "Clear Nursing Council registration exam",
          "Gain clinical experience through hospital rotations",
          "Consider specializations (ICU, Pediatric, Cardiac, etc.)",
          "Pursue M.Sc Nursing for career advancement",
          "Explore international opportunities (Gulf countries, UK, USA with NCLEX/IELTS)",
        ],
      },
      {
        title: "Nutritionist / Dietitian",
        match: "87%",
        description:
          "Help people improve health through nutrition. Work in hospitals, clinics, corporate wellness, sports, or private practice. Growing health consciousness increasing demand [web:66].",
        requiredSkills: [
          "Nutrition Science",
          "Diet Planning & Assessment",
          "Medical Nutrition Therapy",
          "Counseling Skills",
          "Food Science",
          "Health Education",
        ],
        growthOutlook:
          "Wellness industry booming. Diabetes, obesity management, sports nutrition all growing. Flexible practice options [web:66]",
        salaryRange:
          "₹2,50,000 - ₹10,00,000 per annum (Entry: ₹2.5-4L, Mid: ₹5-7L, Private Practice: ₹8-15L+)",
        nextSteps: [
          "Complete B.Sc/M.Sc in Nutrition & Dietetics",
          "Get registered with Indian Dietetic Association",
          "Gain clinical experience in hospitals",
          "Learn diet software and counseling techniques",
          "Consider specialization (Sports, Clinical, Pediatric)",
          "Build online presence to attract private clients",
        ],
      },
      {
        title: "Physiotherapist",
        match: "88%",
        description:
          "Help patients recover from injuries and manage pain through physical therapy. Work in hospitals, sports facilities, rehabilitation centers, or own practice [web:66][web:75].",
        requiredSkills: [
          "Manual Therapy Techniques",
          "Exercise Prescription",
          "Musculoskeletal Assessment",
          "Rehabilitation Planning",
          "Patient Education",
          "Electrotherapy & Modalities",
        ],
        growthOutlook:
          "Sports injuries, aging population, workplace ergonomics driving growth. Good work-life balance and job satisfaction [web:75]",
        salaryRange:
          "₹2,50,000 - ₹12,00,000 per annum (Entry: ₹2.5-4L, Hospital: ₹4-7L, Private Practice: ₹8-15L+)",
        nextSteps: [
          "Complete BPT (Bachelor of Physiotherapy) from recognized college",
          "Register with state physiotherapy council",
          "Gain experience in different settings (hospital, sports, neuro)",
          "Consider MPT for specialization (Orthopedic, Neuro, Sports)",
          "Learn latest techniques and certifications (Dry Needling, Manual Therapy)",
          "Start private practice or work with sports teams",
        ],
      },
      {
        title: "Mental Health Counselor / Therapist",
        match: "91%",
        description:
          "Provide therapy and support for mental health issues. Growing awareness making this critical profession. Flexible settings including private practice [web:66].",
        requiredSkills: [
          "Counseling Techniques",
          "Mental Health Assessment",
          "Therapeutic Modalities (CBT, DBT)",
          "Crisis Intervention",
          "Empathy & Listening",
          "Ethical Practice",
        ],
        growthOutlook:
          "40% increase in demand post-pandemic. Corporate EAP programs, schools, hospitals all hiring. Social stigma reducing [web:66]",
        salaryRange:
          "₹3,00,000 - ₹12,00,000 per annum (Entry: ₹3-5L, Experienced: ₹6-9L, Private Practice: ₹10-15L+)",
        nextSteps: [
          "Complete M.A. in Psychology/Counseling Psychology",
          "Get certified in specific therapeutic approaches",
          "Complete supervised clinical hours",
          "Register with RCI (Rehabilitation Council of India)",
          "Specialize in area (Trauma, Addiction, Couple, Child)",
          "Build practice through referrals and online presence",
        ],
      },
    ];
  } else if (isTechnical) {
    // Keep your original technical recommendations
    topRecommendations = [
      {
        title: "Full Stack Developer",
        match: "90%",
        description:
          "Build complete web applications from frontend to backend. Versatile role with high demand across startups and enterprises. Strong foundation for entrepreneurship [web:67][web:69].",
        requiredSkills: [
          "React/Angular/Vue.js",
          "Node.js/Express or Django/Flask",
          "SQL & NoSQL Databases",
          "REST APIs & GraphQL",
          "Git & Version Control",
          "Cloud Deployment (AWS/Azure)",
        ],
        growthOutlook:
          "Tech sector growing 25% annually in India. Remote work opportunities globally. Startups and product companies constantly hiring [web:67]",
        salaryRange:
          "₹5,00,000 - ₹25,00,000 per annum (Entry: ₹5-8L, Mid: ₹10-16L, Senior: ₹20-30L)",
        nextSteps: [
          "Build 5-6 full-stack projects showcasing CRUD operations",
          "Master one frontend framework (React recommended) and one backend (Node.js)",
          "Learn database design and API development",
          "Deploy projects on AWS/Vercel and create GitHub portfolio",
          "Contribute to open-source projects",
          "Apply to 5-10 positions weekly, practice coding interviews on LeetCode",
        ],
      },
      {
        title: "Data Analyst",
        match: "87%",
        description:
          "Extract insights from data to drive business decisions. Entry point to data science career. High demand across all industries from finance to healthcare [web:67][web:69].",
        requiredSkills: [
          "SQL & Data Querying",
          "Excel (Advanced) & Python",
          "Data Visualization (Tableau, Power BI)",
          "Statistics & Probability",
          "Business Intelligence",
          "Communication & Storytelling",
        ],
        growthOutlook:
          "Data-driven decision making critical. 30% growth rate. Path to Data Scientist, Analytics Manager roles [web:67]",
        salaryRange:
          "₹4,00,000 - ₹15,00,000 per annum (Entry: ₹4-6.5L, Mid: ₹7-11L, Senior: ₹12-18L)",
        nextSteps: [
          "Master SQL through W3Schools, LeetCode SQL problems",
          "Learn Python (Pandas, NumPy, Matplotlib) for data analysis",
          "Get certified in Power BI or Tableau",
          "Complete Google Data Analytics Certificate or similar",
          "Build 3-4 data analysis projects with insights and visualizations",
          "Join Kaggle competitions and learn from community",
        ],
      },
      {
        title: "Cloud DevOps Engineer",
        match: "88%",
        description:
          "Manage cloud infrastructure and automate deployment pipelines. Bridge between development and operations. Critical role in modern software delivery [web:67][web:69].",
        requiredSkills: [
          "AWS/Azure/GCP",
          "Docker & Kubernetes",
          "CI/CD (Jenkins, GitLab CI)",
          "Infrastructure as Code (Terraform)",
          "Linux & Scripting (Bash, Python)",
          "Monitoring (Prometheus, Grafana)",
        ],
        growthOutlook:
          "Cloud migration accelerating. 40% growth in DevOps roles. High job security and competitive salaries [web:67]",
        salaryRange:
          "₹6,00,000 - ₹22,00,000 per annum (Entry: ₹6-9L, Mid: ₹10-15L, Senior: ₹18-25L)",
        nextSteps: [
          "Start with AWS Free Tier, learn core services",
          "Get AWS Solutions Architect Associate certification",
          "Learn Docker and Kubernetes through hands-on labs",
          "Master one IaC tool (Terraform recommended)",
          "Build CI/CD pipelines for personal projects",
          "Join DevOps communities and practice on platforms like KodeKloud",
        ],
      },
      {
        title: "Cybersecurity Analyst",
        match: "85%",
        description:
          "Protect organizations from cyber threats. Ethical hacking, security audits, incident response. Growing critical with digitalization [web:67][web:69].",
        requiredSkills: [
          "Network Security",
          "Ethical Hacking & Penetration Testing",
          "Security Tools (Wireshark, Metasploit)",
          "Cloud Security",
          "Incident Response",
          "Compliance (ISO 27001, GDPR)",
        ],
        growthOutlook:
          "Cybersecurity threats increasing exponentially. 35% growth. Government and enterprise desperate for talent [web:67][web:69]",
        salaryRange:
          "₹5,00,000 - ₹20,00,000 per annum (Entry: ₹5-8L, Mid: ₹10-14L, Senior: ₹16-25L)",
        nextSteps: [
          "Get CEH (Certified Ethical Hacker) or CompTIA Security+ certification",
          "Learn penetration testing tools and techniques",
          "Practice on platforms like HackTheBox, TryHackMe",
          "Understand network protocols and security fundamentals",
          "Participate in bug bounty programs",
          "Join cybersecurity communities and stay updated on latest threats",
        ],
      },
    ];
  } else {
    // General diverse recommendations
    topRecommendations = [
      {
        title: "Project Coordinator / Business Operations",
        match: "86%",
        description:
          "Versatile role coordinating projects and operations across teams. Entry point to management careers. Applicable across all industries [web:66].",
        requiredSkills: [
          "Project Management",
          "Communication & Coordination",
          "MS Office Suite (Advanced)",
          "Time Management",
          "Problem Solving",
          "Stakeholder Management",
        ],
        growthOutlook:
          "Every organization needs coordinators. 12% steady growth. Clear path to project manager and operations manager roles [web:66]",
        salaryRange:
          "₹3,00,000 - ₹10,00,000 per annum (Entry: ₹3-5L, Mid: ₹6-8L, Senior: ₹9-12L)",
        nextSteps: [
          "Learn project management basics and tools (Trello, Asana, MS Project)",
          "Get Google Project Management Certificate or CAPM certification",
          "Develop strong communication and organizational skills",
          "Gain experience coordinating any projects (college, community, volunteer)",
          "Build proficiency in Excel, PowerPoint, and documentation",
          "Network with professionals in target industry",
        ],
      },
      {
        title: "Customer Success Manager",
        match: "84%",
        description:
          "Ensure customer satisfaction and retention. Bridge between product and customers. Growing importance in subscription and SaaS businesses [web:66].",
        requiredSkills: [
          "Customer Relationship Management",
          "Communication & Empathy",
          "Product Knowledge",
          "Problem Solving",
          "CRM Software",
          "Data Analysis (Basic)",
        ],
        growthOutlook:
          "SaaS and subscription economy driving 28% growth. Customer retention priority for businesses. Path to leadership roles [web:66]",
        salaryRange:
          "₹4,00,000 - ₹16,00,000 per annum (Entry: ₹4-6L, Mid: ₹7-11L, Senior: ₹13-18L)",
        nextSteps: [
          "Learn CRM tools like Salesforce, HubSpot, Zendesk",
          "Understand customer success metrics (NPS, Churn, LTV)",
          "Develop strong communication and problem-solving skills",
          "Get certified in customer success through platforms like SuccessHACKER",
          "Gain experience in customer-facing roles",
          "Join customer success communities and learn best practices",
        ],
      },
      {
        title: "Content Writer / Copywriter",
        match: "88%",
        description:
          "Create compelling written content for websites, ads, social media, blogs. Versatile skill applicable across industries. Freelance opportunities abundant [web:66].",
        requiredSkills: [
          "Writing & Editing",
          "SEO Fundamentals",
          "Research Skills",
          "Content Strategy",
          "Adaptability to Different Tones",
          "Basic Marketing Knowledge",
        ],
        growthOutlook:
          "Content marketing essential for businesses. 20% growth. Flexible work arrangements and freelance market strong [web:66]",
        salaryRange:
          "₹2,50,000 - ₹10,00,000 per annum (Entry: ₹2.5-4L, Mid: ₹5-7L, Senior/Freelance: ₹8-15L+)",
        nextSteps: [
          "Build portfolio with 10-15 diverse writing samples",
          "Learn SEO writing through free courses (HubSpot, Yoast)",
          "Start a blog or Medium publication to showcase expertise",
          "Freelance on Upwork, Fiverr, Contently",
          "Master copywriting formulas (AIDA, PAS)",
          "Network with marketers and agencies on LinkedIn",
        ],
      },
      {
        title: "Administrative Manager / Executive Assistant",
        match: "82%",
        description:
          "Support executives and manage office operations. Organizational backbone of companies. Stable career with respect and growth opportunities [web:66].",
        requiredSkills: [
          "Office Management",
          "Scheduling & Calendar Management",
          "Communication",
          "MS Office Suite",
          "Attention to Detail",
          "Discretion & Professionalism",
        ],
        growthOutlook:
          "Stable 5-8% growth. Every company needs administrative support. Path to office manager, chief of staff roles [web:66]",
        salaryRange:
          "₹2,50,000 - ₹12,00,000 per annum (Entry: ₹2.5-4L, Mid: ₹5-8L, Senior/EA to CXO: ₹10-15L)",
        nextSteps: [
          "Master MS Office Suite (Excel, PowerPoint, Word) at advanced level",
          "Get certified in office administration or executive assistant skills",
          "Develop organizational and multitasking abilities",
          "Learn business communication and etiquette",
          "Gain experience through internships in corporate offices",
          "Build reputation for reliability, discretion, and professionalism",
        ],
      },
    ];
  }

  // Generate appropriate skill gaps
  let skillGaps = [
    {
      skill: "Industry-Specific Knowledge",
      importance: "High",
      howToAcquire: `Research your target industry thoroughly. Follow industry publications, join professional associations, attend webinars and conferences. Informational interviews with professionals can provide insider perspectives.`,
    },
    {
      skill: "Professional Communication",
      importance: "High",
      howToAcquire: `Practice business writing and verbal communication. Take courses on platforms like Coursera (Business Writing, Communication Skills). Join Toastmasters for public speaking practice.`,
    },
    {
      skill: "Digital Literacy & Tools",
      importance: "Medium-High",
      howToAcquire: `Master tools relevant to your field - MS Office Suite for business roles, Adobe Creative Suite for creative roles, or specific platforms for your domain. YouTube tutorials and free courses available.`,
    },
  ];

  return {
    summary: `Based on your profile, ${name}, you show strong potential with your ${personality} personality and interests in ${interests}. Your ${education} education combined with skills in ${skills} position you well for diverse career paths. The recommendations below align with your unique strengths and aspirations, offering realistic pathways to professional success and fulfillment.`,
    topRecommendations,
    skillGaps,
    recommendedCourses: [
      {
        title: "Industry-Specific Professional Certificate",
        provider: "Coursera / edX / LinkedIn Learning",
        relevance:
          "Gain recognized credentials in your chosen field to boost employability and demonstrate commitment to professional development.",
        priority: "High",
      },
      {
        title: "Communication & Soft Skills Mastery",
        provider: "Toastmasters / Dale Carnegie / FutureLearn",
        relevance:
          "Develop critical interpersonal skills valued across all professions. Improve presentation, negotiation, and leadership abilities.",
        priority: "High",
      },
      {
        title: "Domain-Specific Tools & Software",
        provider: "YouTube / Udemy / Skillshare",
        relevance:
          "Master the tools used daily in your profession - from design software to data analysis tools to project management platforms.",
        priority: "Medium-High",
      },
    ],
    industryInsights: {
      trends: [
        "Remote and hybrid work models creating global opportunities",
        "Emphasis on continuous learning and skill adaptation",
        "Growing importance of personal branding and online presence",
        "Increasing demand for professionals with cross-functional skills",
        "AI and automation changing nature of work across all fields",
      ],
      opportunities:
        "Your profile opens doors in growing sectors aligned with your interests. Indian job market expanding across diverse fields - from creative economy to counseling services to business operations. Many roles now offer remote flexibility, enabling work with international companies at competitive salaries.",
      challenges:
        "Competition is intense across fields. Standing out requires combination of credentials, experience, and personal brand. Many roles have experience requirements, but strategic internships, volunteering, freelancing, and portfolio building can bridge this gap. Continuous learning essential as industries evolve rapidly.",
    },
    actionPlan: {
      immediate: [
        "Research top 5 target companies/organizations in your field",
        "Update LinkedIn profile highlighting relevant skills and aspirations",
        "Start building portfolio or work samples in your domain",
        "Join 2-3 professional communities (online and local) in your field",
        "Identify and enroll in one foundational course/certification",
        "Reach out to 3-5 professionals for informational interviews",
      ],
      shortTerm: [
        "Complete 1-2 relevant certifications in first 3-6 months",
        "Build substantial portfolio with 5-10 quality projects/samples",
        "Gain hands-on experience through internships, freelancing, or volunteering",
        "Network with 20+ professionals in target field",
        "Apply to 5-10 relevant positions weekly",
        "Develop personal brand through blog, portfolio site, or social media",
        "Attend industry events, workshops, and networking meetups",
      ],
      longTerm: [
        "Secure first professional role within 6-12 months",
        "Build expertise through continuous learning and practice",
        "Expand professional network and seek mentorship",
        "Consider specialization within chosen field (Year 2-3)",
        "Aim for mid-level positions with increased responsibility (Year 3-5)",
        "Develop leadership skills and mentor others",
        "Explore entrepreneurship, consulting, or senior roles (Year 5+)",
      ],
    },
  };
}

// Test endpoint
export async function GET() {
  try {
    const modelsToTry = [
      "gemini-1.5-flash-002",
      "gemini-1.5-flash-latest",
      "gemini-2.0-flash-exp",
    ];

    for (const modelName of modelsToTry) {
      try {
        const testModel = genAI.getGenerativeModel({ model: modelName });
        const result = await testModel.generateContent("Say hello");
        const response = await result.response;

        return NextResponse.json({
          status: "✅ Working",
          message:
            "Career recommendations API is operational - Supporting ALL career fields",
          model: modelName,
          geminiTest: response.text(),
          supportedFields:
            "Technical, Creative, Business, Healthcare, Education, Counseling, Finance, and more",
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.log(`Model ${modelName} failed:`, error.message);
        continue;
      }
    }

    return NextResponse.json(
      {
        status: "⚠️ Degraded",
        message:
          "API working but Gemini models unavailable - using comprehensive fallback mode",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "❌ Error",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
