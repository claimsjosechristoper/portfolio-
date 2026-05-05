# Run Your Portfolio Locally

Your portfolio is ready to run on localhost! Choose one of the methods below:

## Method 1: Python (Easiest)

If you have Python 3 installed, run this command in your project folder:

```bash
python -m http.server 8000
```

Then open your browser and go to: **http://localhost:8000**

## Method 2: Node.js (http-server)

If you have Node.js installed:

```bash
npx http-server -p 8000 -c-1
```

Then open: **http://localhost:8000**

## Method 3: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` 
3. Select "Open with Live Server"
4. Your browser will open automatically

## Method 4: Using npm

If you have npm installed, you can also use:

```bash
npm install -g http-server
http-server -p 8000
```

---

## What to Test

Once the server is running, visit:

- **Homepage**: http://localhost:8000
- **Resume Page**: http://localhost:8000/resume.html (will display your PDF)
- **Resume PDF**: http://localhost:8000/resume.pdf

### Check These Features:
✅ Mobile navbar alignment (logo + icons on one line)
✅ Certificate section layout on mobile
✅ Resume PDF loads without Google sign-in
✅ All navigation links work
✅ Animations and effects display correctly

---

## Troubleshooting

**"Port 8000 already in use?"**
```bash
# Use a different port
python -m http.server 8001
# Then visit: http://localhost:8001
```

**"Python not found?"**
- Install Python: https://www.python.org/downloads/
- Or use Node.js Method 2 instead

**"Resume PDF not showing?"**
- Make sure `resume.pdf` is in your project root directory

---

## Once Satisfied, Deploy!

When you're happy with how it looks, deploy to Google Cloud Run:

```bash
gcloud run deploy portfolio --source . --region us-central1
```

🚀 Your portfolio will be live!
