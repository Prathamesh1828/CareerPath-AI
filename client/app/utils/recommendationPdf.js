// utils/recommendationPdf.ts

import jsPDF from "jspdf";

// Removed TypeScript interface and type annotations for JavaScript compatibility

export const downloadCareerPDF = (recommendations, userName) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 20;

  // Header
  doc.setFillColor(59, 130, 246); // Blue color
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Career-Path AI", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Career Recommendations Report", pageWidth / 2, 32, {
    align: "center",
  });

  yPosition = 50;
  doc.setTextColor(0, 0, 0);

  // User Name
  if (userName) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Prepared for: ${userName}`, margin, yPosition);
    yPosition += 10;
  }

  // Date
  doc.setFontSize(10);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString()}`,
    margin,
    yPosition
  );
  yPosition += 15;

  // Recommendations
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Your Top Career Matches", margin, yPosition);
  yPosition += 10;

  recommendations.forEach((recommendation, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }

    // Career Title
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 12, "F");

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);
    doc.text(
      `${index + 1}. ${recommendation.career}`,
      margin + 5,
      yPosition + 3
    );

    doc.setFontSize(12);
    doc.setTextColor(0, 150, 0);
    doc.text(
      `Match Score: ${recommendation.score}%`,
      pageWidth - margin - 40,
      yPosition + 3
    );

    yPosition += 15;
    doc.setTextColor(0, 0, 0);

    // Description
    if (recommendation.description) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const splitDescription = doc.splitTextToSize(
        recommendation.description,
        pageWidth - 2 * margin - 10
      );
      doc.text(splitDescription, margin + 5, yPosition);
      yPosition += splitDescription.length * 5 + 5;
    }

    // Skills
    if (recommendation.skills && recommendation.skills.length > 0) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Required Skills:", margin + 5, yPosition);
      yPosition += 5;

      doc.setFont("helvetica", "normal");
      recommendation.skills.forEach((skill) => {
        doc.text(`• ${skill}`, margin + 10, yPosition);
        yPosition += 5;
      });
      yPosition += 3;
    }

    // Salary Range
    if (recommendation.salaryRange) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Salary Range: ", margin + 5, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(recommendation.salaryRange, margin + 35, yPosition);
      yPosition += 7;
    }

    // Job Growth
    if (recommendation.jobGrowth) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Job Growth: ", margin + 5, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(recommendation.jobGrowth, margin + 30, yPosition);
      yPosition += 7;
    }

    // Education
    if (recommendation.education) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Education Required: ", margin + 5, yPosition);
      doc.setFont("helvetica", "normal");
      const splitEducation = doc.splitTextToSize(
        recommendation.education,
        pageWidth - 2 * margin - 50
      );
      doc.text(splitEducation, margin + 45, yPosition);
      yPosition += splitEducation.length * 5 + 3;
    }

    // Top Companies
    if (recommendation.topCompanies && recommendation.topCompanies.length > 0) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Top Hiring Companies:", margin + 5, yPosition);
      yPosition += 5;

      doc.setFont("helvetica", "normal");
      const companiesText = recommendation.topCompanies.join(", ");
      const splitCompanies = doc.splitTextToSize(
        companiesText,
        pageWidth - 2 * margin - 10
      );
      doc.text(splitCompanies, margin + 10, yPosition);
      yPosition += splitCompanies.length * 5 + 8;
    }

    yPosition += 5;
  });

  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${totalPages} | Career-Path AI © ${new Date().getFullYear()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }

  // Save the PDF
  doc.save(`career-recommendations-${new Date().getTime()}.pdf`);
};

// Alternative function for single career path download
export const downloadSingleCareerPDF = (
  careerPath,
  description,
  skills,
  courses,
  projects
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(careerPath, pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Career Roadmap", pageWidth / 2, 32, { align: "center" });

  yPosition = 55;
  doc.setTextColor(0, 0, 0);

  // Description
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Overview", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const splitDesc = doc.splitTextToSize(description, pageWidth - 2 * margin);
  doc.text(splitDesc, margin, yPosition);
  yPosition += splitDesc.length * 5 + 10;

  // Skills
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Required Skills", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  skills.forEach((skill) => {
    if (yPosition > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(`• ${skill}`, margin + 5, yPosition);
    yPosition += 6;
  });
  yPosition += 10;

  // Courses
  if (courses && courses.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Recommended Courses", margin, yPosition);
    yPosition += 8;

    courses.forEach((course, index) => {
      if (yPosition > pageHeight - 25) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${course.title}`, margin + 5, yPosition);
      yPosition += 6;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      if (course.platform) {
        doc.text(`Platform: ${course.platform}`, margin + 10, yPosition);
        yPosition += 5;
      }
      yPosition += 3;
    });
    yPosition += 10;
  }

  // Projects
  if (projects && projects.length > 0) {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Recommended Projects", margin, yPosition);
    yPosition += 8;

    projects.forEach((project, index) => {
      if (yPosition > pageHeight - 25) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${project.title}`, margin + 5, yPosition);
      yPosition += 6;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      if (project.description) {
        const splitProjectDesc = doc.splitTextToSize(
          project.description,
          pageWidth - 2 * margin - 10
        );
        doc.text(splitProjectDesc, margin + 10, yPosition);
        yPosition += splitProjectDesc.length * 5 + 3;
      }
      yPosition += 3;
    });
  }

  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${totalPages} | Career-Path AI © ${new Date().getFullYear()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }

  // Save
  doc.save(`${careerPath.toLowerCase().replace(/\s+/g, "-")}-roadmap.pdf`);
};
