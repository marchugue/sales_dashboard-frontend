---
description: How to deploy the frontend to Vercel
---

# Deploy to Vercel

## Prerequisites
1. Vercel account (vercel.com)
2. Vercel CLI installed: `npm i -g vercel`
3. Logged in to Vercel: `vercel login`

## Deployment Steps

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```
- Follow the prompts to authenticate

### 3. Deploy from project directory
```bash
cd d:\data_analyst\frontend
vercel
```

### 4. First-time setup (if prompted)
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No** (or Yes if updating)
- Project name: Enter your preferred name
- Directory: `./` (current directory)

### 5. For subsequent deployments
```bash
vercel --prod
```

## Alternative: Deploy via Git

1. Push code to GitHub (already done)
2. Go to vercel.com/dashboard
3. Click "Add New Project"
4. Import your GitHub repository
5. Framework preset: **Vite**
6. Root directory: `./`
7. Build command: `npm run build`
8. Output directory: `dist`
9. Click **Deploy**

## Environment Variables (if needed)
In Vercel dashboard → Project Settings → Environment Variables:
- `VITE_API_URL`: Your backend API URL

## Important Notes
- Backend must be deployed separately (e.g., Railway, Render, Heroku)
- Update API URL in `.env` or Vercel environment variables
- Free tier includes 100GB bandwidth per month
