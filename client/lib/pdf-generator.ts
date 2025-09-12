import jsPDF from 'jspdf';

interface AnalysisData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  overallScore: number;
  sections: {
    [key: string]: {
      score: number;
      status: string;
      feedback: string;
    };
  };
  keywords: {
    present: string[];
    missing: string[];
  };
  suggestions: string[];
  atsCompatibility: {
    score: number;
    issues: string[];
  };
  strengths: string[];
  weaknesses: string[];
}

export const generateResumePDF = (analysisData: AnalysisData, fileName: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  let yPosition = 20;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  };

  // Helper function to check if we need a new page
  const checkNewPage = (currentY: number, requiredSpace: number) => {
    if (currentY + requiredSpace > pdf.internal.pageSize.height - 20) {
      pdf.addPage();
      return 20;
    }
    return currentY;
  };

  // Header
  pdf.setFontSize(20);
  pdf.setFont(undefined, 'bold');
  pdf.text('Resume Analysis Report', margin, yPosition);
  yPosition += 15;

  // Date
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += 15;

  // Personal Information
  yPosition = checkNewPage(yPosition, 40);
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('Personal Information', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setFont(undefined, 'normal');
  yPosition = addText(`Name: ${analysisData.personalInfo.name}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Email: ${analysisData.personalInfo.email}`, margin, yPosition + 5, pageWidth - 2 * margin);
  yPosition = addText(`Phone: ${analysisData.personalInfo.phone}`, margin, yPosition + 5, pageWidth - 2 * margin);
  yPosition = addText(`Location: ${analysisData.personalInfo.location}`, margin, yPosition + 5, pageWidth - 2 * margin);
  yPosition += 15;

  // Overall Score
  yPosition = checkNewPage(yPosition, 30);
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('Overall Score', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.text(`${analysisData.overallScore}/100`, margin, yPosition);
  yPosition += 15;

  // Section Scores
  yPosition = checkNewPage(yPosition, 80);
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('Section Analysis', margin, yPosition);
  yPosition += 10;

  Object.entries(analysisData.sections).forEach(([section, data]) => {
    yPosition = checkNewPage(yPosition, 25);
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1).replace('_', ' ');
    pdf.text(`${sectionTitle}: ${data.score}/100 (${data.status.replace('_', ' ')})`, margin, yPosition);
    yPosition += 5;
    
    pdf.setFont(undefined, 'normal');
    yPosition = addText(data.feedback, margin + 5, yPosition, pageWidth - 2 * margin - 5, 10);
    yPosition += 10;
  });

  // Keywords
  yPosition = checkNewPage(yPosition, 60);
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('Keywords Analysis', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text(`Keywords Found (${analysisData.keywords.present.length}):`, margin, yPosition);
  yPosition += 5;
  
  pdf.setFont(undefined, 'normal');
  yPosition = addText(analysisData.keywords.present.join(', '), margin + 5, yPosition, pageWidth - 2 * margin - 5, 10);
  yPosition += 10;

  yPosition = checkNewPage(yPosition, 30);
  pdf.setFont(undefined, 'bold');
  pdf.text(`Missing Keywords (${analysisData.keywords.missing.length}):`, margin, yPosition);
  yPosition += 5;
  
  pdf.setFont(undefined, 'normal');
  yPosition = addText(analysisData.keywords.missing.join(', '), margin + 5, yPosition, pageWidth - 2 * margin - 5, 10);
  yPosition += 15;

  // ATS Compatibility
  yPosition = checkNewPage(yPosition, 40);
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('ATS Compatibility', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.text(`Score: ${analysisData.atsCompatibility.score}/100`, margin, yPosition);
  yPosition += 10;

  if (analysisData.atsCompatibility.issues.length > 0) {
    pdf.setFontSize(12);
    pdf.text('Issues to Address:', margin, yPosition);
    yPosition += 5;
    
    pdf.setFont(undefined, 'normal');
    analysisData.atsCompatibility.issues.forEach((issue) => {
      yPosition = checkNewPage(yPosition, 15);
      yPosition = addText(`• ${issue}`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 10);
      yPosition += 3;
    });
  }
  yPosition += 15;

  // Strengths
  yPosition = checkNewPage(yPosition, 40);
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('Strengths', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setFont(undefined, 'normal');
  analysisData.strengths.forEach((strength) => {
    yPosition = checkNewPage(yPosition, 15);
    yPosition = addText(`• ${strength}`, margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 3;
  });
  yPosition += 15;

  // Improvement Suggestions
  yPosition = checkNewPage(yPosition, 40);
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('Improvement Suggestions', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setFont(undefined, 'normal');
  analysisData.suggestions.forEach((suggestion) => {
    yPosition = checkNewPage(yPosition, 15);
    yPosition = addText(`• ${suggestion}`, margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 3;
  });

  // Save the PDF
  const pdfFileName = `Resume_Analysis_${fileName.replace(/\.[^/.]+$/, "")}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(pdfFileName);
};
