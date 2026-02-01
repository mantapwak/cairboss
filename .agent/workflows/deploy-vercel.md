---
description: how to deploy CairBoss to Vercel
---

# Deploy CairBoss to Vercel

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub:
   ```bash
   cd /Users/baha/bugbounty/tools/invoiceGenerator
   git init
   git add .
   git commit -m "Initial commit: CairBoss invoice generator"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cairboss.git
   git push -u origin main
   ```

2. Go to https://vercel.com/new

3. Click **"Import Git Repository"** and select your GitHub repo

4. Configure Project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Click **"Deploy"**

6. Your app will be live at `https://cairboss.vercel.app` (or similar)

## Option 2: Deploy via Vercel CLI

// turbo-all
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project directory:
   ```bash
   cd /Users/baha/bugbounty/tools/invoiceGenerator
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - What's your project's name? **cairboss**
   - In which directory is your code located? **./***

5. For production deployment:
   ```bash
   vercel --prod
   ```

## Post-Deployment

After deployment, Vercel provides:
- **Production URL**: `https://cairboss.vercel.app`
- **Automatic HTTPS**
- **CI/CD** - Auto-deploys on every push to main branch
- **Preview URLs** for pull requests

## Custom Domain (Optional)

1. Go to your Vercel dashboard > Project Settings > Domains
2. Add your custom domain (e.g., `cairboss.com`)
3. Follow DNS configuration instructions provided by Vercel
