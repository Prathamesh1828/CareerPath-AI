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

    // Prioritized list of models to try - ordered by availability and speed
    const modelsToTry = [
      "gemini-1.5-flash-002", // Stable version
      "gemini-1.5-flash-latest", // Latest stable
      "gemini-1.5-flash-8b-latest", // Lighter, faster
      "gemini-1.5-pro-002", // Pro version
      "gemini-1.5-pro-latest", // Latest pro
      "gemini-2.0-flash-exp", // Experimental (may be overloaded)
      "gemini-2.5-flash-preview-09-2025", // Preview version
    ];

    let successfulResponse = null;
    let lastError = null;

    // Try each model with retry logic
    for (const modelName of modelsToTry) {
      try {
        console.log(`\n🤖 Attempting model: ${modelName}`);

        const model = genAI.getGenerativeModel({ model: modelName });

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
      "description": "Detailed explanation of why this career fits their profile",
      "requiredSkills": ["skill1", "skill2", "skill3", "skill4"],
      "growthOutlook": "Specific industry growth data and future prospects",
      "salaryRange": "Realistic salary range in INR",
      "nextSteps": ["step 1", "step 2", "step 3", "step 4"]
    }
  ],
  "skillGaps": [
    {
      "skill": "Specific skill name",
      "importance": "High/Medium/Low",
      "howToAcquire": "Detailed advice on how to develop this skill"
    }
  ],
  "recommendedCourses": [
    {
      "title": "Specific course name",
      "provider": "Platform or institution",
      "relevance": "How this course helps their career goals",
      "priority": "High/Medium/Low"
    }
  ],
  "industryInsights": {
    "trends": ["trend 1", "trend 2", "trend 3"],
    "opportunities": "Specific opportunities in recommended fields",
    "challenges": "Realistic challenges and how to overcome them"
  },
  "actionPlan": {
    "immediate": ["action 1", "action 2"],
    "shortTerm": ["goal 1", "goal 2"],
    "longTerm": ["objective 1", "objective 2"]
  }
}

IMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, no additional text.`;

        console.log(`⚙️ Generating content with ${modelName}...`);

        // Use retry logic for generateContent
        const result = await retryWithBackoff(
          () => model.generateContent(prompt),
          3,
          2000 // 2 second initial delay
        );

        const response = await result.response;
        let text = response.text();

        console.log(
          `✅ Response received from ${modelName} (${text.length} chars)`
        );
        console.log("First 200 chars:", text.substring(0, 200));

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
            break; // Exit loop on success
          } else {
            throw new Error("Invalid response structure");
          }
        } catch (parseError) {
          console.error(
            `❌ JSON parsing failed for ${modelName}:`,
            parseError.message
          );
          console.error("Problematic text:", text.substring(0, 300));
          lastError = parseError;
          continue; // Try next model
        }
      } catch (modelError) {
        console.error(`❌ Model ${modelName} failed:`, modelError.message);
        lastError = modelError;

        // If it's a 503 or 429, wait a bit before trying next model
        if (
          modelError.message?.includes("503") ||
          modelError.message?.includes("429")
        ) {
          console.log("⏳ Waiting 3 seconds before trying next model...");
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }

        continue; // Try next model
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

// Helper function to create fallback response
function createFallbackResponse(formData) {
  const name = formData.name || "valued user";
  const interests = formData.interest || "technology and innovation";
  const skills = formData.technicalSkills || "programming and architecture";
  const goals = formData.careerGoals || "Cloud Solution Architect";

  return {
    summary: `Based on your profile, ${name}, you demonstrate strong potential in ${interests}. Your ${
      formData.education || "Bachelor's"
    } education and technical skills in ${skills} position you excellently for cloud architecture roles. With your goal of becoming a ${goals}, you're on the right path and have the foundational skills needed to succeed in this growing field.`,
    topRecommendations: [
      {
        title: "Cloud Solutions Architect",
        match: "95%",
        description: `Perfect match for your stated goal. Your technical skills in ${skills}, combined with your interest in ${interests}, make you an ideal candidate for cloud architecture roles. Your ${
          formData.personality || "confident and experienced"
        } nature will help you lead technical discussions and design scalable solutions.`,
        requiredSkills: [
          "AWS/Azure/GCP Platform Expertise",
          "System Design & Architecture",
          "Infrastructure as Code (Terraform, CloudFormation)",
          "Networking & Security",
          "Cost Optimization",
          "DevOps & CI/CD",
        ],
        growthOutlook:
          "Cloud computing market in India growing at 25% CAGR. Demand for cloud architects expected to increase by 30% by 2027",
        salaryRange:
          "₹12,00,000 - ₹35,00,000 per annum (varies by experience: 3-5 years: ₹12-18L, 5-8 years: ₹20-28L, 8+ years: ₹30-35L+)",
        nextSteps: [
          "Get AWS Solutions Architect Associate certification (3-4 months study)",
          "Build 3-4 real-world cloud projects showcasing multi-tier architectures",
          "Learn Terraform and Infrastructure as Code practices",
          "Contribute to open-source cloud projects on GitHub",
          "Join AWS User Groups and attend cloud architecture meetups",
          "Practice system design problems on platforms like SystemsExpert",
        ],
      },
      {
        title: "DevOps Engineer",
        match: "88%",
        description: `Excellent stepping stone toward cloud architecture. Your programming skills and understanding of architectures make this a natural fit. DevOps provides hands-on experience with cloud platforms, automation, and deployment pipelines - all crucial for solution architects.`,
        requiredSkills: [
          "CI/CD Pipeline Design (Jenkins, GitLab CI, GitHub Actions)",
          "Container Orchestration (Docker, Kubernetes)",
          "Scripting (Python, Bash, PowerShell)",
          "Monitoring & Logging (Prometheus, Grafana, ELK Stack)",
          "Cloud Platforms (AWS, Azure, GCP)",
          "Version Control (Git)",
        ],
        growthOutlook:
          "DevOps engineer demand up 40% in India. Critical role for digital transformation initiatives across industries",
        salaryRange:
          "₹6,00,000 - ₹20,00,000 per annum (Entry: ₹6-9L, Mid: ₹10-15L, Senior: ₹16-20L+)",
        nextSteps: [
          "Master Docker and Kubernetes through hands-on labs",
          "Set up CI/CD pipelines for personal projects",
          "Get certified: AWS DevOps Engineer or Kubernetes CKA",
          "Automate infrastructure deployment using Terraform",
          "Learn monitoring tools and implement observability",
          "Contribute to DevOps communities and write technical blogs",
        ],
      },
      {
        title: "Site Reliability Engineer (SRE)",
        match: "82%",
        description: `Combines your technical abilities with system thinking. SRE focuses on building reliable, scalable systems using software engineering principles. This role provides deep understanding of system architecture, perfect for your cloud architect aspirations.`,
        requiredSkills: [
          "System Design & Reliability",
          "Programming (Python, Go)",
          "Linux System Administration",
          "Performance Tuning & Optimization",
          "Incident Management",
          "SLI/SLO/SLA Definition",
        ],
        growthOutlook:
          "Growing 35% annually as companies prioritize reliability. High demand in product companies and startups",
        salaryRange:
          "₹8,00,000 - ₹25,00,000 per annum (varies by company stage and size)",
        nextSteps: [
          "Read 'Site Reliability Engineering' by Google",
          "Learn Linux system internals and performance tuning",
          "Build high-availability architectures in projects",
          "Master incident response and post-mortem processes",
          "Get comfortable with monitoring, alerting, and on-call rotations",
          "Practice chaos engineering principles",
        ],
      },
      {
        title: "Cloud Platform Engineer",
        match: "85%",
        description: `Directly aligned with your interests in cloud and data. This role involves building and maintaining cloud infrastructure, perfect for developing the expertise needed for solution architecture. Offers hands-on experience with real-world cloud challenges.`,
        requiredSkills: [
          "Cloud Platform Expertise (AWS, Azure, GCP)",
          "Infrastructure Automation",
          "Networking & Security",
          "Cost Management",
          "Database Management",
          "API Design",
        ],
        growthOutlook:
          "Strong 28% growth as enterprises accelerate cloud migration. Critical role in cloud-first organizations",
        salaryRange: "₹7,00,000 - ₹22,00,000 per annum",
        nextSteps: [
          "Deep dive into one cloud platform (recommend AWS or Azure)",
          "Build multi-region, fault-tolerant architectures",
          "Learn cloud networking, VPCs, and security best practices",
          "Implement cost optimization strategies",
          "Get platform-specific certifications",
          "Work on migration projects (on-prem to cloud)",
        ],
      },
    ],
    skillGaps: [
      {
        skill: "AWS/Azure/GCP Hands-on Experience",
        importance: "High",
        howToAcquire:
          "Start with AWS Free Tier. Complete AWS Solutions Architect Associate course on A Cloud Guru or Adrian Cantrill's course. Build 3-4 projects: VPC setup, auto-scaling web app, serverless application, data pipeline. Join AWS Community Days and online meetups.",
      },
      {
        skill: "System Design & Architecture Patterns",
        importance: "High",
        howToAcquire:
          "Study system design fundamentals on ByteByteGo, SystemsExpert, or Designing Data-Intensive Applications book. Practice designing systems like WhatsApp, Netflix, Uber. Understand microservices, event-driven architecture, CQRS, and CAP theorem.",
      },
      {
        skill: "Infrastructure as Code (IaC)",
        importance: "High",
        howToAcquire:
          "Learn Terraform through HashiCorp tutorials. Start with simple EC2 provisioning, progress to complex multi-tier architectures. Practice with AWS CloudFormation. Understand state management, modules, and best practices. Build reusable infrastructure templates.",
      },
      {
        skill: "Kubernetes & Container Orchestration",
        importance: "Medium-High",
        howToAcquire:
          "Complete Kubernetes for Beginners course. Set up local cluster with Minikube or Kind. Deploy sample applications, configure networking, storage. Learn Helm charts. Consider CKA certification. Practice on platforms like KillerCoda or Kodekloud.",
      },
      {
        skill: "Cloud Security & Compliance",
        importance: "High",
        howToAcquire:
          "Study AWS Well-Architected Framework security pillar. Learn IAM policies, encryption, network security. Understand compliance requirements (GDPR, SOC2). Consider AWS Security Specialty certification. Follow cloud security best practices and blogs.",
      },
      {
        skill: "Cost Optimization & FinOps",
        importance: "Medium",
        howToAcquire:
          "Learn cloud pricing models. Use AWS Cost Explorer, Azure Cost Management. Study Reserved Instances, Savings Plans, Spot Instances. Practice right-sizing resources. Read FinOps Foundation resources. Implement tagging strategies for cost allocation.",
      },
    ],
    recommendedCourses: [
      {
        title: "AWS Solutions Architect Associate (SAA-C03)",
        provider: "A Cloud Guru / Adrian Cantrill / Stephane Maarek (Udemy)",
        relevance:
          "Essential certification for cloud architecture. Covers core AWS services, best practices, and solution design patterns. Industry-recognized credential that significantly boosts employability.",
        priority: "High",
      },
      {
        title: "System Design Interview Course",
        provider: "ByteByteGo / SystemsExpert / Exponent",
        relevance:
          "Teaches how to design scalable systems - critical for solution architects. Prepares you for technical interviews and real-world architecture decisions. Covers load balancing, caching, databases, microservices.",
        priority: "High",
      },
      {
        title: "Terraform for Beginners to Advanced",
        provider: "HashiCorp Learn / KodeKloud / Udemy",
        relevance:
          "IaC is mandatory for modern cloud architects. Terraform is the most popular tool. Enables automation, version control, and reproducible infrastructure. Essential for DevOps and cloud roles.",
        priority: "High",
      },
      {
        title: "Kubernetes Fundamentals & CKA Certification",
        provider: "KodeKloud / A Cloud Guru / Linux Foundation",
        relevance:
          "Container orchestration expertise is increasingly required for cloud roles. Kubernetes powers modern cloud-native applications. CKA certification demonstrates practical skills.",
        priority: "Medium-High",
      },
      {
        title: "Designing Data-Intensive Applications (Book + Course)",
        provider: "Martin Kleppmann (O'Reilly) / Educative.io",
        relevance:
          "Deep dive into distributed systems, databases, and data processing. Essential knowledge for designing robust cloud architectures. Highly regarded in the industry.",
        priority: "Medium-High",
      },
      {
        title: "Azure Solutions Architect Expert (AZ-305)",
        provider: "Microsoft Learn / Pluralsight / Udemy",
        relevance:
          "Second most popular cloud platform. Multi-cloud skills highly valued. Azure strong in enterprise and hybrid cloud scenarios. Expands your market opportunities.",
        priority: "Medium",
      },
      {
        title: "DevOps Bootcamp / Cloud DevOps Engineer Nanodegree",
        provider: "Udacity / Udemy / Linux Academy",
        relevance:
          "Comprehensive DevOps training covering CI/CD, infrastructure automation, monitoring. Bridges gap between development and operations - key for cloud architects.",
        priority: "Medium",
      },
    ],
    industryInsights: {
      trends: [
        "Multi-cloud and hybrid cloud strategies gaining prominence (60% of enterprises use 2+ clouds)",
        "Serverless and event-driven architectures reducing operational overhead",
        "AI/ML integration into cloud platforms (AWS SageMaker, Azure ML, GCP Vertex AI)",
        "Edge computing and 5G enabling new cloud use cases",
        "FinOps and cloud cost optimization becoming critical business functions",
        "Kubernetes becoming standard for container orchestration (90% adoption in cloud-native apps)",
        "GitOps and Infrastructure as Code for automated, version-controlled infrastructure",
        "Zero Trust Security models replacing traditional perimeter-based security",
        "Observability (not just monitoring) with OpenTelemetry and distributed tracing",
      ],
      opportunities: `India's cloud market is booming with ₹1.3 trillion expected by 2028. Major opportunities in:

🚀 **Startups & Product Companies**: Building cloud-native applications, need architects to design scalable systems

🏢 **Enterprise Digital Transformation**: Legacy companies migrating to cloud, huge demand for migration expertise

💼 **Cloud Consulting Firms**: TCS, Infosys, Wipro, Accenture, Deloitte hiring cloud architects for client projects

🌐 **Global Remote Opportunities**: Cloud skills enable remote work for US/EU companies at 2-3x Indian salaries

📊 **Industry-Specific Cloud Solutions**: Healthcare, fintech, e-commerce, logistics need domain + cloud expertise

Your specific combination of interests (Technology, Cloud, Data) positions you perfectly for:
- Data platform architect roles (building data lakes, warehouses on cloud)
- Cloud-native application architect
- Multi-cloud integration specialist`,
      challenges: `**Competition & Certification Fatigue**: Many professionals pursuing cloud certifications. Stand out with:
- Real project experience over just certifications
- Contributing to open source cloud projects
- Building public portfolio demonstrating architecture skills
- Writing technical blogs/creating content

**Rapid Technology Change**: Cloud services update constantly. Combat with:
- Continuous learning mindset (dedicate 5-7 hours/week)
- Following AWS, Azure, GCP release notes and blogs
- Joining cloud communities (Reddit r/aws, AWS Discord, local meetups)
- Hands-on labs and experimentation

**Experience Paradox**: Entry-level roles need experience. Bridge gap by:
- Freelancing on Upwork/Fiverr for small cloud projects
- Internships at startups (even remote/part-time)
- Building impressive side projects showcasing cloud skills
- Contributing to open-source cloud tools
- Creating detailed case studies of personal projects

**Interview Preparation**: Cloud architect interviews test system design, problem-solving. Prepare by:
- Practicing 50+ system design problems
- Understanding trade-offs in architecture decisions
- Studying real-world architectures (AWS Architecture Blog, Azure Reference Architectures)
- Mock interviews with peers or platforms like Pramp`,
    },
    actionPlan: {
      immediate: [
        "⚡ Set up AWS Free Tier account TODAY - start exploring core services (EC2, S3, RDS, Lambda)",
        "📚 Purchase/start AWS Solutions Architect Associate course (choose: Adrian Cantrill, Stephane Maarek, or A Cloud Guru)",
        "💻 Create GitHub account and start documenting learning journey - commit daily progress",
        "🎯 Define specific 3-month goal: Pass SAA-C03 certification exam",
        "🔍 Join AWS India Community, local cloud meetups, and online Discord/Slack groups",
        "📝 Set up LinkedIn profile highlighting cloud interests - follow cloud thought leaders",
        "🏗️ Start first project: Deploy simple 3-tier web application on AWS (frontend, backend, database)",
      ],
      shortTerm: [
        "📜 **Month 1-3**: Complete AWS SAA course and pass certification exam (study 2-3 hours daily)",
        "🔨 **Build 4 Portfolio Projects**: (1) Serverless application with Lambda + API Gateway, (2) CI/CD pipeline with CodePipeline/Jenkins, (3) Infrastructure as Code with Terraform, (4) Multi-AZ high-availability architecture",
        "📖 Read 'Designing Data-Intensive Applications' - 1 chapter per week",
        "🤝 Network with 20+ cloud professionals on LinkedIn - request informational interviews",
        "💼 Apply to 3-5 DevOps/Cloud Engineer positions weekly (even if slightly underqualified)",
        "✍️ Write 2-3 technical blog posts about your cloud learning journey (publish on Dev.to, Medium, or HashNode)",
        "🎓 Complete Terraform beginner course and build IaC templates for all projects",
        "📊 Track progress: Create spreadsheet monitoring applications sent, interviews, skills learned",
      ],
      longTerm: [
        "🎯 **Month 6-12**: Land first cloud role (DevOps Engineer, Cloud Engineer, or Junior Solutions Architect - ₹6-10L range)",
        "📚 **Year 1-2**: Gain hands-on production experience. Work on real cloud migrations, scaling challenges, cost optimization. Pursue AWS Solutions Architect Professional or specialty certifications (Security, Advanced Networking, or Data Analytics)",
        "🚀 **Year 2-3**: Transition to Cloud Solutions Architect role (₹12-18L range). Lead architecture discussions, design complex systems, mentor junior engineers",
        "🏆 **Year 3-5**: Become Senior Cloud Solutions Architect (₹20-30L range). Design enterprise-scale architectures, drive cloud strategy, handle multi-million dollar cloud budgets. Consider specializing in specific domain (FinTech, HealthTech, E-commerce)",
        "🌟 **Year 5+**: Principal Architect / Cloud Architect Lead (₹35L+ or VP Engineering roles). Define company-wide cloud strategy, evaluate new technologies, represent company at conferences. Option to become independent consultant (₹10-15L/month potential)",
        "📈 **Continuous**: Build personal brand through speaking at conferences, maintaining popular technical blog, contributing to major open-source projects, creating YouTube content on cloud architecture",
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
          message: "Career recommendations API is operational",
          model: modelName,
          geminiTest: response.text(),
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
          "API working but Gemini models unavailable - using fallback mode",
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
