# Resume PDF Setup

Your resume HTML page has been updated to display a local PDF file instead of Google Drive.

## What Changed

✅ **Removed**: Google Drive authentication requirement
✅ **Added**: Direct PDF viewing and download capability  
✅ **Updated**: No more sign-in prompts

## How to Complete Setup

### Step 1: Copy the Resume PDF

Copy your resume PDF file to the project root directory:

**From**: `c:\Users\claim\Downloads\My Resume.pdf`  
**To**: `r:\project\New folder.worktrees\copilot-deploy-google-cloud-run-portfolio-495420\resume.pdf`

**Windows Command** (Run in Command Prompt or PowerShell):
```
copy "c:\Users\claim\Downloads\My Resume.pdf" "r:\project\New folder.worktrees\copilot-deploy-google-cloud-run-portfolio-495420\resume.pdf"
```

Or manually:
1. Open `c:\Users\claim\Downloads\`
2. Copy `My Resume.pdf`
3. Navigate to your project folder
4. Paste and rename it to `resume.pdf` (if needed)

### Step 2: Verify the File

After copying, your project structure should look like:
```
r:\project\New folder.worktrees\copilot-deploy-google-cloud-run-portfolio-495420\
├── index.html
├── resume.html (updated ✓)
├── resume.pdf (NEW - copy your PDF here)
├── styles.css
├── script.js
├── Dockerfile
├── cloudbuild.yaml
└── ...
```

### Step 3: Test Locally

Open `resume.html` in your browser to verify the PDF displays correctly.

## What Users Will See

When visitors click "View Resume" on your portfolio:
- The resume page opens without any login requirement
- The PDF is displayed directly in the browser
- A "Download PDF" button allows them to save it locally

## Deployment

When you deploy to Google Cloud Run, the `resume.pdf` file will be included automatically in the container. No additional configuration needed!

```bash
gcloud run deploy portfolio --source . --region us-central1
```

Done! Your resume will be live without Google Drive dependencies. ✨
