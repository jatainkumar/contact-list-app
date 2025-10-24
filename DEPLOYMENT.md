# Deployment Guide

This guide will walk you through deploying the Contact List Application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed locally

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository with the following settings:
   - Repository name: `contact-list-app` (or your preferred name)
   - Description: "A modern React contact list application with search and add functionality"
   - Visibility: Public
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)

3. Copy the repository URL (e.g., `https://github.com/yourusername/contact-list-app.git`)

## Step 2: Push Code to GitHub

Run the following commands in the `contact-list-app` directory:

```bash
# Add the remote repository
git remote add origin https://github.com/yourusername/contact-list-app.git

# Push the code
git branch -M main
git push -u origin main
```

Replace `yourusername` with your actual GitHub username.

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository:
   - Click "Import" next to your `contact-list-app` repository
   - If you don't see it, click "Adjust GitHub App Permissions" to grant access
4. Configure the project:
   - **Framework Preset**: Vite (should be auto-detected)
   - **Build Command**: `npm run build` (pre-filled)
   - **Output Directory**: `dist` (pre-filled)
   - **Install Command**: `npm install` (pre-filled)
5. Click "Deploy"
6. Wait for the deployment to complete (usually 1-2 minutes)
7. Your app will be live at `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project directory:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? `contact-list-app`
   - In which directory is your code located? `./`
   - Want to override the settings? **N**

5. For production deployment:
```bash
vercel --prod
```

## Step 4: Enable Automatic Deployments

Automatic deployments are enabled by default when you connect via Vercel Dashboard:

- **Main branch**: Automatically deploys to production
- **Other branches**: Create preview deployments
- **Pull requests**: Generate preview URLs for testing

To verify automatic deployments:
1. Go to your Vercel project dashboard
2. Click "Settings" → "Git"
3. Ensure "Production Branch" is set to `main`
4. Ensure "Automatic Deployments" is enabled

## Step 5: Verify Deployment

1. Visit your deployment URL
2. Test all functionality:
   - View contact list
   - Search for contacts
   - Add new contacts
   - Check responsive design on mobile
3. Check browser console for errors
4. Test on multiple browsers (Chrome, Firefox, Safari)

## Configuration Files

The project includes a `vercel.json` configuration file with the following settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

These settings ensure Vercel builds and deploys the application correctly.

## Updating the Deployment

After pushing changes to GitHub:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically detect the changes and redeploy your application.

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify the build works locally: `npm run build`

### 404 Errors

- Ensure `outputDirectory` is set to `dist` in Vercel settings
- Check that `index.html` exists in the dist folder after build

### Environment Variables

This application doesn't require environment variables, but if you add any:
1. Go to Vercel project → Settings → Environment Variables
2. Add your variables
3. Redeploy the application

## Custom Domain (Optional)

To add a custom domain:
1. Go to Vercel project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Monitoring

- View deployment logs in Vercel dashboard
- Monitor performance with Vercel Analytics (optional)
- Check error tracking in browser console

## Support

- Vercel Documentation: https://vercel.com/docs
- Vite Documentation: https://vitejs.dev/guide/
- React Documentation: https://react.dev/
