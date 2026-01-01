# 🚀 Deploy Frontend to GitHub Pages

## ✅ Setup Complete!

I've configured your project for GitHub Pages deployment, just like your Phase 1 project!

---

## 📋 What's Configured:

- ✅ Added `homepage` to `package.json`: `https://wunbof.github.io/eventhub`
- ✅ Added deploy scripts to `package.json`
- ✅ Installed `gh-pages` package

---

## 🚀 Deploy to GitHub Pages:

### Step 1: Build and Deploy

Run this command:
```bash
npm run deploy
```

This will:
1. Build your React app (`npm run build`)
2. Deploy to GitHub Pages (`gh-pages -d build`)
3. Push to `gh-pages` branch automatically

### Step 2: Enable GitHub Pages

1. **Go to your GitHub repository**: https://github.com/Wunbof/eventhub
2. **Click "Settings"**
3. **Scroll to "Pages"** (left sidebar)
4. **Under "Source"**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. **Click "Save"**

### Step 3: Wait for Deployment

- GitHub Pages takes 1-2 minutes to deploy
- You'll see a green checkmark when it's ready
- Your site will be live at: **https://wunbof.github.io/eventhub**

---

## 🧪 Test Your Deployment:

After deployment, test these URLs:

- **Home**: https://wunbof.github.io/eventhub/
- **Events**: https://wunbof.github.io/eventhub/events
- **Login**: https://wunbof.github.io/eventhub/login
- **Signup**: https://wunbof.github.io/eventhub/signup
- **Create Event**: https://wunbof.github.io/eventhub/create-event
- **Admin**: https://wunbof.github.io/eventhub/admin

---

## 🔧 Important Notes:

### API Configuration:
Your frontend is already configured to use:
```
https://eventhub-production-d62c.up.railway.app/api
```

This will work on GitHub Pages too!

### Router Configuration:
If you have routing issues, make sure `package.json` has:
```json
"homepage": "https://wunbof.github.io/eventhub"
```

This is already set! ✅

---

## 🔄 Update Deployment:

Whenever you make changes:

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

---

## 🐛 Troubleshooting:

### 404 Errors on Routes:
- Make sure `homepage` in `package.json` matches your GitHub Pages URL
- Check that you're using `BrowserRouter` (not `HashRouter`)

### API Not Working:
- Check browser console for CORS errors
- Verify backend URL is correct: `https://eventhub-production-d62c.up.railway.app/api`

### Build Fails:
- Make sure all dependencies are installed: `npm install`
- Check for any errors in the build output

---

## ✅ Deployment Checklist:

- [x] `homepage` added to `package.json`
- [x] `gh-pages` installed
- [x] Deploy scripts added
- [ ] Run `npm run deploy`
- [ ] Enable GitHub Pages in repository settings
- [ ] Test deployed site

---

## 🎉 You're Ready!

Just run:
```bash
npm run deploy
```

Then enable GitHub Pages in your repository settings, and you're done! 🚀

Your site will be live at: **https://wunbof.github.io/eventhub**

