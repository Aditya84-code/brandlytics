# Complete Netlify + Vite + Supabase Deployment Guide

## 🚨 Critical Steps to Fix Deployment Issues

### Step 1: Fix package.json Dependencies
**Issue**: Vite must be in `devDependencies`, not `dependencies`

**Solution**: 
- Ensure `vite` is listed under `devDependencies` in `package.json`
- Move `terser` to `dependencies` if build minification fails

### Step 2: Clean Local Dependencies
**Commands to run locally**:
```bash
# Delete existing dependencies
rm -rf node_modules
rm package-lock.json

# Reinstall fresh dependencies
npm install

# Commit the updated files
git add package.json package-lock.json
git commit -m "Fix dependencies for Netlify deployment"
git push
```

### Step 3: Update netlify.toml Configuration
**Key changes made**:
- Build command: `npm install && npm run build` (not `npm ci`)
- Node version: `18`
- Environment: `NODE_ENV = "development"` during build
- Removed problematic `NPM_FLAGS`

### Step 4: Set Supabase Environment Variables in Netlify
**Required variables**:
1. Go to Netlify Dashboard → Your Site → Site settings → Environment variables
2. Add these variables:
   ```
   VITE_SUPABASE_URL = https://ervhjafxnhgpfnqosrtk.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVydmhqYWZ4bmhncGZucW9zcnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDQ5NTcsImV4cCI6MjA2NDc4MDk1N30.ARaYmgtIyZ-QTGmpucif9aTOiJWnis_u7QcPqgYDlgg
   ```

### Step 5: Clear Netlify Build Cache
1. Go to Netlify Dashboard → Your Site → Deploys
2. Click "Trigger deploy" → "Clear cache and deploy"

## 🔧 Detailed Troubleshooting Steps

### Problem 1: "vite: not found" Error
**Causes**:
- Vite in `dependencies` instead of `devDependencies`
- `NODE_ENV=production` skipping devDependencies
- Corrupted `node_modules` or `package-lock.json`

**Solutions**:
1. ✅ Move `vite` to `devDependencies`
2. ✅ Set `NODE_ENV = "development"` in netlify.toml
3. ✅ Use `npm install` instead of `npm ci`
4. ✅ Clean reinstall dependencies locally

### Problem 2: "Missing Supabase environment variables"
**Causes**:
- Environment variables not set in Netlify dashboard
- Incorrect variable names (must start with `VITE_`)
- Variables set but not deployed

**Solutions**:
1. ✅ Set variables in Netlify dashboard (not in code)
2. ✅ Use exact variable names: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. ✅ Redeploy after setting variables

### Problem 3: Build Cache Issues
**Causes**:
- Stale build cache with old dependencies
- Cached environment variables

**Solutions**:
1. ✅ Clear cache and redeploy
2. ✅ Use "Clear cache and deploy" option

## 📋 Pre-Deployment Checklist

### Local Environment
- [ ] `vite` is in `devDependencies`
- [ ] `node_modules` and `package-lock.json` deleted and reinstalled
- [ ] Local build works: `npm run build`
- [ ] Local preview works: `npm run preview`
- [ ] Changes committed and pushed to Git

### Netlify Configuration
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Node version: `18`
- [ ] Environment variables set:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`

### Deployment
- [ ] Build cache cleared
- [ ] Fresh deployment triggered
- [ ] No console errors about missing environment variables
- [ ] App loads without blank screen

## 🚀 Step-by-Step Deployment Process

### 1. Local Fixes (Run these commands)
```bash
# Clean dependencies
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Test build locally
npm run build
npm run preview

# Commit changes
git add .
git commit -m "Fix Netlify deployment configuration"
git push
```

### 2. Netlify Dashboard Setup
1. **Site Settings** → **Environment variables**
2. **Add variable**: `VITE_SUPABASE_URL` = `https://ervhjafxnhgpfnqosrtk.supabase.co`
3. **Add variable**: `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVydmhqYWZ4bmhncGZucW9zcnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDQ5NTcsImV4cCI6MjA2NDc4MDk1N30.ARaYmgtIyZ-QTGmpucif9aTOiJWnis_u7QcPqgYDlgg`
4. **Save variables**

### 3. Deploy
1. **Deploys** → **Trigger deploy** → **Clear cache and deploy**
2. **Monitor build logs** for any errors
3. **Test deployed site** for functionality

## 🔍 Common Error Messages & Solutions

### "vite: not found"
```bash
# Solution: Ensure vite is in devDependencies and NODE_ENV allows dev deps
```

### "Missing Supabase environment variables"
```bash
# Solution: Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify dashboard
```

### "Build failed with exit code 1"
```bash
# Solution: Check build logs, usually dependency or environment variable issues
```

### "Page not found" on refresh
```bash
# Solution: Ensure SPA redirects are configured in netlify.toml
```

## 📞 Getting Help

### Build Logs Analysis
1. Go to **Deploys** → Click on failed deploy
2. **View function logs** or **View build logs**
3. Look for specific error messages

### Testing Locally
```bash
# Test production build locally
npm run build
npm run preview

# Check for environment variable issues
echo $VITE_SUPABASE_URL
```

### Netlify Support Resources
- [Netlify Build Troubleshooting](https://docs.netlify.com/configure-builds/troubleshooting-tips/)
- [Environment Variables Guide](https://docs.netlify.com/environment-variables/overview/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)

## ✅ Success Indicators

Your deployment is successful when:
- ✅ Build completes without "vite: not found" error
- ✅ No console errors about missing Supabase variables
- ✅ App loads with content (not blank screen)
- ✅ Authentication and database features work
- ✅ Page refreshes work correctly (no 404s)

## 🔄 If Issues Persist

1. **Double-check environment variables** in Netlify dashboard
2. **Verify Git repository** has latest changes
3. **Test build locally** with exact same Node version (18)
4. **Contact Netlify support** with build logs if issues continue

Remember: Most deployment issues are caused by missing environment variables or dependency configuration problems. Following this guide step-by-step should resolve 95% of common issues.