# Netlify + Vite + Supabase Deployment Guide

This guide helps you deploy your Brandlytics application to Netlify with proper Supabase configuration.

## 🚀 Quick Deployment Steps

### 1. Prepare Your Repository
Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Connect to Netlify
1. Go to [Netlify](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose your Git provider and repository
4. Select the branch to deploy (usually `main` or `master`)

### 3. Configure Build Settings
Netlify should auto-detect these settings, but verify:
- **Build command**: `npm ci && npm run build`
- **Publish directory**: `dist`
- **Node version**: `18` (set in netlify.toml)

### 4. Set Environment Variables
In your Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add these required variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 5. Deploy
Click "Deploy site" and wait for the build to complete.

## 🔧 Troubleshooting Common Issues

### Issue 1: "vite: not found" Error
**Symptoms**: Build fails with "vite: not found" or "command not found: vite"

**Solutions**:
1. **Check package.json**: Ensure `vite` is in `devDependencies`
2. **Update build command**: Use `npm ci && npm run build` instead of just `npm run build`
3. **Clear build cache**: In Netlify dashboard, go to Deploys → Trigger deploy → Clear cache and deploy
4. **Check Node version**: Ensure you're using Node 18+ (set in netlify.toml)

```json
// package.json - Correct setup
{
  "devDependencies": {
    "vite": "^5.4.8"
  }
}
```

### Issue 2: "terser not found" Error
**Symptoms**: Build fails with "terser not found" during minification

**Solutions**:
1. **Move terser to dependencies**:
   ```json
   {
     "dependencies": {
       "terser": "^5.36.0"
     }
   }
   ```
2. **Alternative**: Disable terser in vite.config.ts:
   ```js
   export default defineConfig({
     build: {
       minify: false, // or 'esbuild'
     }
   });
   ```

### Issue 3: Blank Screen / "Missing Supabase environment variables"
**Symptoms**: Site loads but shows blank screen, console shows Supabase errors

**Solutions**:
1. **Set environment variables in Netlify**:
   - Go to Site settings → Environment variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Redeploy the site

2. **Check variable names**: Must start with `VITE_` for Vite to include them
3. **Verify Supabase project**: Ensure your Supabase project is active and URLs are correct
4. **Check browser console**: Look for specific error messages

### Issue 4: 404 Errors on Page Refresh
**Symptoms**: Direct URLs or page refresh returns 404

**Solutions**:
1. **Check netlify.toml redirects**:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
2. **Alternative**: Add `_redirects` file in `public/` folder:
   ```
   /*    /index.html   200
   ```

### Issue 5: Build Timeout or Memory Issues
**Symptoms**: Build takes too long or runs out of memory

**Solutions**:
1. **Optimize build**:
   ```js
   // vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             ui: ['@radix-ui/react-dialog']
           }
         }
       }
     }
   });
   ```
2. **Increase build timeout**: Contact Netlify support for larger projects

### Issue 6: CSS/Assets Not Loading
**Symptoms**: Site loads but styling is broken

**Solutions**:
1. **Check asset paths**: Ensure all imports use relative paths
2. **Verify build output**: Check that CSS files are in `dist/assets/`
3. **Check headers**: Ensure proper cache headers in netlify.toml

## 📋 Pre-Deployment Checklist

- [ ] Code is pushed to Git repository
- [ ] `package.json` has correct dependencies
- [ ] `netlify.toml` is configured properly
- [ ] Supabase project is set up and active
- [ ] Environment variables are ready
- [ ] Build works locally (`npm run build`)
- [ ] Preview works locally (`npm run preview`)

## 🔍 Debugging Commands

### Local Testing
```bash
# Test build locally
npm run build

# Test production build locally
npm run preview

# Check for build issues
npm run build -- --debug

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Netlify CLI (Optional)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Test build locally with Netlify environment
netlify build

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

## 🌐 Environment Variables Reference

### Required Variables
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional Variables
```bash
VITE_APP_NAME=Brandlytics
VITE_APP_VERSION=1.0.0
```

## 📞 Getting Help

### Netlify Support
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://community.netlify.com/)
- [Netlify Status](https://www.netlifystatus.com/)

### Vite Support
- [Vite Documentation](https://vitejs.dev/)
- [Vite GitHub Issues](https://github.com/vitejs/vite/issues)

### Supabase Support
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)

## 🔄 Continuous Deployment

Once set up, your site will automatically redeploy when you push to your connected Git branch. You can:

1. **Monitor deployments**: Check the Deploys tab in Netlify dashboard
2. **Set up notifications**: Configure Slack/email notifications for deploy status
3. **Use deploy previews**: Automatically generated for pull requests
4. **Branch deploys**: Set up staging environments for different branches

## 🎯 Performance Optimization

### Build Optimization
```js
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
});
```

### Netlify Optimization
```toml
# netlify.toml
[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.images]
  compress = true
```

This guide should help you successfully deploy and troubleshoot your Brandlytics application on Netlify!