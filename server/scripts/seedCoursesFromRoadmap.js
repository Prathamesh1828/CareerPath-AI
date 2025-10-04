import mongoose from "mongoose";
import Course from "../models/course.js";
import { initialMockRoadmapData } from "../data/roadmapData.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URL || "mongodb://localhost:27017/career-roadmap";

// Generate realistic lecture structure for courses
function generateLecturesForCourse(courseName, duration) {
  const hoursNum = parseInt(duration) || 20;
  const numLectures = Math.ceil(hoursNum / 2.5); // ~2.5 hours per lecture

  const sectionTitles = [
    "Introduction and Fundamentals",
    "Core Concepts",
    "Practical Applications",
    "Advanced Topics",
    "Best Practices",
    "Real-world Projects",
    "Testing and Debugging",
    "Deployment and Production",
  ];

  const sections = [];
  const lecturesPerSection = Math.ceil(numLectures / 4); // Distribute across 4 main sections

  for (
    let sectionIdx = 0;
    sectionIdx < Math.min(4, sectionTitles.length);
    sectionIdx++
  ) {
    const lectures = [];

    for (let i = 1; i <= lecturesPerSection; i++) {
      lectures.push({
        title: `${sectionTitles[sectionIdx]} - Lesson ${i}`,
        duration: `${15 + Math.floor(Math.random() * 25)} mins`,
        description: `Learn about ${courseName.toLowerCase()} - ${sectionTitles[
          sectionIdx
        ].toLowerCase()}`,
        order: i,
      });
    }

    sections.push({
      title: sectionTitles[sectionIdx],
      description: `${sectionTitles[sectionIdx]} for ${courseName}`,
      lectures,
      order: sectionIdx + 1,
    });
  }

  return sections;
}

// Convert roadmap data to Course documents
function convertRoadmapToCourses() {
  const allCourses = [];

  console.log("Processing career paths...\n");

  Object.entries(initialMockRoadmapData).forEach(
    ([careerPathId, roadmapData]) => {
      console.log(`📌 Processing: ${careerPathId}`);

      if (!roadmapData) {
        console.warn(`⚠️  No data found for career path: ${careerPathId}`);
        return;
      }

      if (!roadmapData.phases || !Array.isArray(roadmapData.phases)) {
        console.warn(`⚠️  No phases found for career path: ${careerPathId}`);
        return;
      }

      roadmapData.phases.forEach((phase) => {
        if (!phase) {
          console.warn(`⚠️  Invalid phase in ${careerPathId}`);
          return;
        }

        if (!phase.courses || !Array.isArray(phase.courses)) {
          console.warn(
            `⚠️  No courses found in phase "${
              phase.title || phase.id
            }" for ${careerPathId}`
          );
          return;
        }

        console.log(
          `   Phase: ${phase.title} - ${phase.courses.length} courses`
        );

        phase.courses.forEach((course) => {
          if (!course || !course.name) {
            console.warn(`⚠️  Invalid course in phase "${phase.title}"`);
            return;
          }

          const courseDoc = {
            name: course.name,
            platform: course.platform || "Unknown",
            duration: course.duration || "N/A",
            rating: course.rating || 0,
            url: course.url || "",
            completed: course.completed || false,
            careerPath: careerPathId,
            phaseId: phase.id,
            phaseTitle: phase.title,
            sections: generateLecturesForCourse(course.name, course.duration),
          };

          allCourses.push(courseDoc);
        });
      });
    }
  );

  return allCourses;
}

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding process...\n");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Check if roadmap data exists
    if (
      !initialMockRoadmapData ||
      Object.keys(initialMockRoadmapData).length === 0
    ) {
      throw new Error(
        "No roadmap data found! Please check your roadmapData.js file."
      );
    }

    console.log(
      `📊 Found ${
        Object.keys(initialMockRoadmapData).length
      } career paths in data\n`
    );

    // Clear existing courses
    const deleteResult = await Course.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing courses\n`);

    // Convert and insert courses
    const coursesToInsert = convertRoadmapToCourses();

    if (coursesToInsert.length === 0) {
      throw new Error(
        "No courses were generated from roadmap data! Check data structure."
      );
    }

    console.log(
      `\n📦 Preparing to insert ${coursesToInsert.length} courses...`
    );

    const insertedCourses = await Course.insertMany(coursesToInsert);
    console.log(`✅ Successfully inserted ${insertedCourses.length} courses\n`);

    // Display detailed summary
    console.log("📊 Seeded Courses Summary by Career Path:");
    console.log("─".repeat(60));

    const summary = {};
    insertedCourses.forEach((course) => {
      if (!summary[course.careerPath]) {
        summary[course.careerPath] = {
          count: 0,
          totalLectures: 0,
          phases: new Set(),
        };
      }
      summary[course.careerPath].count++;
      summary[course.careerPath].totalLectures += course.totalLectures || 0;
      summary[course.careerPath].phases.add(course.phaseId);
    });

    Object.entries(summary).forEach(([path, stats]) => {
      console.log(`\n📚 ${path.toUpperCase()}`);
      console.log(`   Courses: ${stats.count}`);
      console.log(`   Lectures: ${stats.totalLectures}`);
      console.log(`   Learning Phases: ${stats.phases.size}`);
    });

    console.log("\n" + "─".repeat(60));
    console.log(`\n🎉 Database seeding completed successfully!`);
    console.log(`   Total Courses: ${insertedCourses.length}`);
    console.log(
      `   Total Lectures: ${insertedCourses.reduce(
        (sum, c) => sum + (c.totalLectures || 0),
        0
      )}`
    );
    console.log(`   Career Paths: ${Object.keys(summary).length}\n`);

    // Disconnect and exit
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    console.error("\nStack trace:", error.stack);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
