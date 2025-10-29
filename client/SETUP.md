# CareerPath AI - Setup Instructions

## 🚀 Quick Setup Guide

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory and add the following:

```env
# Gemini AI API Key (Required for resume analysis)
GEMINI_API_KEY=your-gemini-api-key-here

# Email Configuration (Required for counselor requests)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password
COUNSELOR_EMAIL=counselor@yourcompany.com
```

### 3. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Replace `your-gemini-api-key-here` in your `.env.local` file

### 4. Set Up Email Configuration (Optional)

For the counselor request feature to work:

1. **Gmail Setup:**
   - Use a Gmail account for sending emails
   - Enable 2-Step Verification in your Google account
   - Generate an App Password:
     - Go to Google Account Settings
     - Security → 2-Step Verification → App passwords
     - Generate a password for "Mail"
     - Copy the 16-character password (spaces will be ignored)

2. **Update Environment Variables:**
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_APP_PASSWORD=abcd efgh ijkl mnop  # Your app password
   COUNSELOR_EMAIL=where-to-send-requests@company.com
   ```

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🔧 Troubleshooting

### Resume Analyzer Issues

**Error: "API configuration error: GEMINI_API_KEY is not configured"**
- Solution: Make sure you've created the `.env.local` file and added your Gemini API key

**Error: "Failed to analyze resume"**
- Check that your API key is valid and active
- Ensure the uploaded file is a valid PDF, DOC, or DOCX file
- Check the browser console for more detailed error messages

**Error: "models/gemini-1.5-flash is not found" or similar model errors**
- The app now automatically tries multiple Gemini models
- Common working models: `gemini-1.5-pro`, `gemini-pro-vision`, `gemini-pro`
- If you have a newer API key, `gemini-1.5-pro` should work
- For older API keys, `gemini-pro-vision` or `gemini-pro` may be available

**Error: "No supported Gemini model could be initialized"**
- Your API key might be restricted or expired
- Try generating a new API key from Google AI Studio
- Check the Gemini API status and available models

### Email Issues

**Error: "Failed to send counselor request"**
- Verify your Gmail credentials are correct
- Make sure you're using an App Password, not your regular Gmail password
- Check that 2-Step Verification is enabled on your Google account

### General Issues

**Port 3000 in use:**
- The app will automatically try port 3001, 3002, etc.
- Or manually specify: `npm run dev -- --port 3002`

**Build/Runtime Errors:**
- Clear Next.js cache: `rm -rf .next` (or `Remove-Item -Recurse -Force .next` on Windows)
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

## 📁 Project Structure

```
client/
├── app/
│   ├── api/
│   │   ├── analyze-resume/     # Resume analysis endpoint
│   │   └── send-email/         # Email sending endpoint
│   ├── dashboard/
│   │   ├── counselor/          # Counselor request page
│   │   └── resume-analyzer/    # Resume analyzer page
│   └── globals.css             # Global styles
├── components/
│   └── ui/                     # Reusable UI components
├── lib/
│   └── pdf-generator.ts        # PDF report generation
├── .env.local                  # Environment variables (create this)
├── .env.example               # Environment template
└── SETUP.md                   # This file
```

## 🎯 Features

### ✅ Implemented
- **Resume Analyzer**: AI-powered resume analysis with Gemini AI
- **Counselor Request**: Professional counseling request system
- **PDF Reports**: Downloadable analysis reports
- **Responsive Design**: Mobile-first responsive UI
- **Modern UI**: Beautiful gradients, animations, and hover effects

### 📧 Email Features
- **HTML Email Templates**: Beautiful, professional email formatting
- **Comprehensive Forms**: Detailed counselor request forms
- **Validation**: Form validation with error handling
- **Success States**: Confirmation pages and notifications

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives
- **AI**: Google Gemini AI for resume analysis
- **Forms**: React Hook Form with Zod validation
- **PDF**: jsPDF for report generation
- **Email**: Nodemailer with Gmail SMTP

## 🔐 Security Notes

- Never commit your `.env.local` file to version control
- Use App Passwords instead of regular Gmail passwords
- Keep your API keys secure and rotate them regularly
- The `.env.example` file is safe to commit (contains no real credentials)

## 🆘 Need Help?

1. Check the browser console for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Try clearing Next.js cache and rebuilding

## 🌟 Production Deployment

When deploying to production:

1. Set environment variables in your hosting platform
2. Use production-grade email service (optional upgrade from Gmail)
3. Configure proper CORS settings if needed
4. Set up proper error monitoring

---

**Happy coding! 🚀**