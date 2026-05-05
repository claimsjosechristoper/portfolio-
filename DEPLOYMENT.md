# Portfolio Deployment to Google Cloud Run

Your portfolio website is now ready to deploy to Google Cloud Run (Project ID: `portfolio-495420`).

## Prerequisites

1. **Google Cloud SDK** installed on your machine
   - Download: https://cloud.google.com/sdk/docs/install
   - Or use: `choco install google-cloud-sdk` (if using Chocolatey on Windows)

2. **Docker** installed
   - Download: https://www.docker.com/products/docker-desktop

3. **Authenticated gcloud CLI**
   - Run: `gcloud auth login`
   - Set project: `gcloud config set project portfolio-495420`

## Deployment Steps

### Option 1: Deploy Using Cloud Run (Recommended)

```bash
# Navigate to your project directory
cd "r:\project\New folder.worktrees\copilot-deploy-google-cloud-run-portfolio-495420"

# Set the project
gcloud config set project portfolio-495420

# Deploy directly to Cloud Run
gcloud run deploy portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Option 2: Deploy Using Cloud Build (CI/CD)

This uses the included `cloudbuild.yaml` file:

```bash
gcloud builds submit --config cloudbuild.yaml
```

### Option 3: Build Locally & Push to Container Registry

```bash
# Build the Docker image
docker build -t gcr.io/portfolio-495420/portfolio:latest .

# Authenticate Docker with GCP
gcloud auth configure-docker

# Push to Container Registry
docker push gcr.io/portfolio-495420/portfolio:latest

# Deploy to Cloud Run
gcloud run deploy portfolio \
  --image gcr.io/portfolio-495420/portfolio:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Files Created

- **Dockerfile** - Containerizes your static site with nginx
- **.gcloudignore** - Specifies files to exclude from deployment
- **cloudbuild.yaml** - CI/CD configuration for automated builds
- **DEPLOYMENT.md** - This file

## What Happens

1. Your HTML, CSS, JS, and images are copied into an nginx container
2. The container listens on port 8080 (Cloud Run requirement)
3. nginx serves your static files with proper SPA routing support
4. The service is deployed as a managed Cloud Run service
5. You'll get a public HTTPS URL to access your portfolio

## After Deployment

Once deployed, you'll receive a URL like:
```
https://portfolio-<random>.a.run.app
```

### Monitor Your Service

```bash
# View logs
gcloud run logs read portfolio --limit 50

# View service details
gcloud run services describe portfolio --region us-central1

# Get the service URL
gcloud run services describe portfolio --region us-central1 --format='value(status.url)'
```

### Update Your Service

After making changes to your portfolio:

```bash
# Redeploy (uses the same approach as initial deployment)
gcloud run deploy portfolio --source . --region us-central1
```

## Troubleshooting

**Cannot find gcloud:**
- Ensure Google Cloud SDK is installed and in your PATH
- Restart your terminal after installing

**Docker authentication fails:**
- Run: `gcloud auth configure-docker`

**Deployment fails with permissions:**
- Ensure your GCP account has Cloud Run Admin role
- Check: https://console.cloud.google.com/iam-admin/

**CORS issues:**
- Modify nginx config in Dockerfile if needed

## Costs

Cloud Run pricing:
- First 2 million requests per month: FREE
- After that: ~$0.40 per million requests
- Always free tier applies
- No charges when your service isn't running

Learn more: https://cloud.google.com/run/pricing
