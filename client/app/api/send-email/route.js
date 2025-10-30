import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail (you can configure other email services)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_APP_PASSWORD, // Your app password
  },
});

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      age,
      currentEducation,
      careerGoals,
      specificRequirements,
      counselingType,
      preferredTime,
      urgencyLevel,
      budget,
      additionalInfo
    } = body;

    // Validate required fields
    if (!name || !email || !careerGoals) {
      return NextResponse.json(
        { error: 'Name, email, and career goals are required' },
        { status: 400 }
      );
    }

    // Email content
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; background: linear-gradient(135deg, #6C63FF, #4F46E5); color: white; padding: 25px; border-radius: 10px 10px 0 0; margin: -30px -30px 30px -30px; }
        .header h1 { margin: 0; font-size: 24px; }
        .section { margin: 20px 0; }
        .section h3 { color: #6C63FF; border-bottom: 2px solid #6C63FF; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
        .info-item { background: #f8f9fa; padding: 12px; border-radius: 8px; border-left: 4px solid #6C63FF; }
        .info-label { font-weight: bold; color: #333; }
        .info-value { color: #666; margin-top: 5px; }
        .priority { padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; font-size: 12px; }
        .high { background-color: #fee2e2; color: #dc2626; }
        .medium { background-color: #fef3c7; color: #d97706; }
        .low { background-color: #dcfce7; color: #16a34a; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 New Counselor Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">CareerPath AI - Counseling Services</p>
        </div>
        
        <div class="section">
          <h3>👤 Personal Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Full Name</div>
              <div class="info-value">${name}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email Address</div>
              <div class="info-value">${email}</div>
            </div>
            ${phone ? `
            <div class="info-item">
              <div class="info-label">Phone Number</div>
              <div class="info-value">${phone}</div>
            </div>
            ` : ''}
            ${age ? `
            <div class="info-item">
              <div class="info-label">Age</div>
              <div class="info-value">${age} years old</div>
            </div>
            ` : ''}
          </div>
        </div>

        <div class="section">
          <h3>🎯 Career Information</h3>
          <div class="info-item" style="margin-bottom: 15px;">
            <div class="info-label">Current Education/Status</div>
            <div class="info-value">${currentEducation || 'Not specified'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Career Goals</div>
            <div class="info-value">${careerGoals}</div>
          </div>
        </div>

        <div class="section">
          <h3>📋 Counseling Details</h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Counseling Type</div>
              <div class="info-value">${counselingType || 'General Counseling'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Preferred Time</div>
              <div class="info-value">${preferredTime || 'Flexible'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Budget Range</div>
              <div class="info-value">${budget || 'To be discussed'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Urgency Level</div>
              <div class="info-value">
                <span class="priority ${
                  urgencyLevel === 'High' ? 'high' : 
                  urgencyLevel === 'Medium' ? 'medium' : 'low'
                }">${urgencyLevel || 'Medium'}</span>
              </div>
            </div>
          </div>
        </div>

        ${specificRequirements ? `
        <div class="section">
          <h3>📝 Specific Requirements</h3>
          <div class="info-item">
            <div class="info-value">${specificRequirements}</div>
          </div>
        </div>
        ` : ''}

        ${additionalInfo ? `
        <div class="section">
          <h3>💬 Additional Information</h3>
          <div class="info-item">
            <div class="info-value">${additionalInfo}</div>
          </div>
        </div>
        ` : ''}

        <div class="footer">
          <p><strong>Action Required:</strong> Please respond to this counseling request within 24-48 hours.</p>
          <p style="margin-top: 15px; font-size: 12px;">📧 Reply directly to ${email} to schedule a consultation.</p>
          <p style="margin-top: 10px; font-size: 12px;">Generated by CareerPath AI • ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COUNSELOR_EMAIL || 'counselor@careerpath.ai', // Destination email
      subject: `🎓 New Counselor Request from ${name} - ${urgencyLevel || 'Medium'} Priority`,
      html: htmlContent,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        message: 'Counselor request sent successfully!',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send counselor request. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}