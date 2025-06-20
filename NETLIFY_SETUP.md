# Netlify Deployment Setup Guide

## Step-by-Step Deployment Instructions

### 1. Prepare Your Supabase Project
Before deploying, ensure your Supabase project is ready:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Get your project credentials**:
   - Go to Settings → API
   - Copy your Project URL
   - Copy your anon/public key
3. **Run database migrations** (if using Supabase CLI):
   ```bash
   supabase db push
   ```

### 2. Deploy to Netlify

#### Option A: Deploy via Git (Recommended)
1. **Push your code to GitHub/GitLab/Bitbucket**
2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Branch: `main` (or your default branch)

#### Option B: Manual Deploy
1. **Build locally**:
   ```bash
   npm run build
   ```
2. **Drag and drop** the `dist` folder to Netlify

### 3. Configure Environment Variables
In your Netlify dashboard:

1. **Go to Site settings → Environment variables**
2. **Add these variables**:
   ```
   Variable name: VITE_SUPABASE_URL
   Value: https://your-project-id.supabase.co
   
   Variable name: VITE_SUPABASE_ANON_KEY
   Value: your-anon-key-here
   ```
3. **Save and redeploy**

### 4. Verify Build Settings
Check that Netlify detected these settings correctly:
- **Build command**: `npm ci && npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 (from netlify.toml)

### 5. Custom Domain (Optional)
1. **Go to Site settings → Domain management**
2. **Add custom domain** if you have one
3. **Configure DNS** as instructed by Netlify

## Environment Variables Checklist

### Required for Production
- [ ] `VITE_SUPABASE_URL` - Your Supabase project URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

### How to Find Your Supabase Credentials
1. Go to your [Supabase dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the values:
   - **Project URL** → Use for `VITE_SUPABASE_URL`
   - **anon public** key → Use for `VITE_SUPABASE_ANON_KEY`

## Common Deployment Issues & Solutions

### ❌ Build Fails: "vite: not found"
**Solution**: Ensure `vite` is in `devDependencies` and use `npm ci && npm run build`

### ❌ Build Fails: "terser not found"
**Solution**: Move `terser` from `devDependencies` to `dependencies`

### ❌ Blank screen after deployment
**Solution**: Check environment variables are set correctly in Netlify dashboard

### ❌ 404 on page refresh
**Solution**: Ensure `netlify.toml` has the SPA redirect rule (already included)

### ❌ Supabase connection errors
**Solution**: 
1. Verify environment variables are set
2. Check Supabase project is active
3. Ensure RLS policies are configured

## Build Optimization Tips

### 1. Enable Build Optimizations
Already configured in `netlify.toml`:
- CSS/JS bundling and minification
- Image compression
- Proper cache headers

### 2. Monitor Build Performance
- Check build logs in Netlify dashboard
- Monitor build time (should be under 5 minutes)
- Watch for memory usage warnings

### 3. Optimize Bundle Size
Current configuration includes:
- Code splitting for vendor libraries
- Tree shaking for unused code
- Terser minification

## Security Considerations

### Environment Variables
- ✅ Use `VITE_` prefix for client-side variables
- ✅ Never put server secrets in client environment variables
- ✅ Supabase anon key is safe for client-side use

### Headers
Already configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## Monitoring & Maintenance

### 1. Set Up Notifications
- Configure deploy notifications in Netlify
- Monitor Supabase usage in Supabase dashboard

### 2. Regular Updates
- Keep dependencies updated
- Monitor Netlify build minutes usage
- Check Supabase project health

### 3. Performance Monitoring
- Use Netlify Analytics (if enabled)
- Monitor Core Web Vitals
- Check error rates in browser console

## Support Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Supabase Docs**: https://supabase.com/docs
- **Vite Docs**: https://vitejs.dev/guide/

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy with Netlify CLI (optional)
npm install -g netlify-cli
netlify deploy --prod
```

Your Brandlytics application should now be successfully deployed to Netlify! 🚀