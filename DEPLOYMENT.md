# Deploying to Vercel

This guide shows how to deploy both frontend and backend to Vercel.

## Prerequisites

- GitHub account with your code pushed
- Vercel account (free tier works)

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `contact-list-app` repository

### 2. Configure Project

**Framework Preset:** Vite

**Root Directory:** `./` (leave as default)

**Build Command:** `npm run vercel-build`

**Output Directory:** `dist`

**Install Command:** `npm install`

### 3. Environment Variables (Optional)

No environment variables needed for basic setup.

### 4. Deploy

Click **"Deploy"** and wait for the build to complete.

## How It Works

The deployment uses:

- **Frontend:** Built with Vite and served as static files
- **Backend:** Runs as Vercel serverless functions in `/api`
- **Database:** Uses in-memory storage (resets on each deployment)

### API Routes

All API calls are automatically routed:
- `/api/login` → Backend serverless function
- `/api/contacts` → Backend serverless function
- Everything else → Frontend static files

### Important Notes

⚠️ **Database Limitation:** The JSON file database resets on each deployment because Vercel serverless functions are stateless.

**For Production:** Consider using:
- **Vercel KV** (Redis)
- **Vercel Postgres**
- **MongoDB Atlas**
- **Supabase**
- **PlanetScale**

## Alternative: Separate Deployments

If you prefer to deploy backend separately:

### Frontend Only on Vercel
1. Remove `vercel.json`
2. Deploy normally
3. Update `src/services/api.js` with your backend URL

### Backend on Railway/Render
1. Create new project on Railway or Render
2. Connect GitHub repo
3. Set root directory to `server`
4. Deploy

## Testing Deployment

After deployment:
1. Visit your Vercel URL
2. Click "Try Demo Login"
3. Add/delete contacts to test API

## Troubleshooting

**API not working:**
- Check Vercel function logs
- Verify `/api` routes are configured
- Check browser console for CORS errors

**Build fails:**
- Ensure all dependencies are in root `package.json`
- Check build logs for specific errors

**Database resets:**
- This is expected with file-based storage on Vercel
- Upgrade to a proper database for persistence

## Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

Need help? Check [Vercel Documentation](https://vercel.com/docs)
