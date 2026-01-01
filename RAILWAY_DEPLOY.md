# Railway Deployment - Step by Step Guide

## 🚂 Deploying EventHub to Railway

Railway is the easiest option - it handles both backend and database!

---

## 📋 Step 1: Prepare Your Repository

1. **Make sure all code is committed and pushed to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

---

## 🗄️ Step 2: Deploy MySQL Database

1. **Go to**: https://railway.app
2. **Sign up/Login** (use GitHub for easy integration)
3. **Click "New Project"**
4. **Click "New" → "Database"**
5. **Select "Add MySQL"**
6. **Wait for database to be created** (takes ~1 minute)
7. **Click on the MySQL service** in your project
8. **Go to "Variables" tab** - you'll see:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLDATABASE`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   
   **📝 Copy these values - you'll need them!**

---

## 🚀 Step 3: Deploy Backend

1. **In the same Railway project, click "New"**
2. **Select "GitHub Repo"**
3. **Authorize Railway** to access your GitHub
4. **Select your EventHub repository**
5. **Railway will auto-detect Node.js**

6. **Configure the service:**
   - **Name**: `eventhub-backend` (or any name)
   - **Root Directory**: `backend` ⚠️ **IMPORTANT!**
   - **Build Command**: (auto-detected, should be `npm install`)
   - **Start Command**: (auto-detected, should be `npm start`)

7. **Go to "Variables" tab** and add these:

   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=<paste MYSQLHOST from database>
   DB_USER=<paste MYSQLUSER from database>
   DB_PASSWORD=<paste MYSQLPASSWORD from database>
   DB_NAME=<paste MYSQLDATABASE from database>
   JWT_SECRET=<generate a random string - see below>
   JWT_EXPIRE=7d
   ```

   **Generate JWT_SECRET:**
   - Use: https://randomkeygen.com/ (CodeIgniter Encryption Keys)
   - Or PowerShell: `-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})`
   - Copy a 64-character random string

8. **Click "Deploy"** (or it auto-deploys)
9. **Wait for deployment** (2-5 minutes)
10. **Once deployed, click on the service**
11. **Go to "Settings" → "Generate Domain"**
12. **Copy the URL** (e.g., `https://eventhub-backend-production.up.railway.app`)

---

## ✅ Step 4: Verify Deployment

1. **Test health endpoint:**
   ```
   https://your-backend-url.up.railway.app/api/health
   ```
   Should return: `{"status":"OK","message":"EventHub API is running"}`

2. **Test database connection:**
   - The backend will automatically create tables on first connection
   - Check Railway logs to see if connection succeeded

3. **Test API:**
   ```
   POST https://your-backend-url.up.railway.app/api/auth/register
   ```
   With body:
   ```json
   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

---

## 🎨 Step 5: Update Frontend

1. **Create `.env` file in project root** (frontend):
   ```env
   REACT_APP_API_URL=https://your-backend-url.up.railway.app/api
   ```

2. **Or update `src/services/api.js`:**
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url.up.railway.app/api';
   ```

3. **Test locally:**
   ```bash
   npm start
   ```
   Make sure API calls work

4. **Deploy frontend** to Vercel/Netlify/GitHub Pages

---

## 🔍 Step 6: Check Logs

1. **In Railway dashboard, click on your backend service**
2. **Go to "Deployments" tab**
3. **Click on latest deployment**
4. **View logs** to see:
   - Build progress
   - Server startup
   - Database connection status
   - Any errors

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module"
**Fix**: Make sure `Root Directory` is set to `backend`

### Issue: "Database connection failed"
**Fix**: 
- Double-check environment variables
- Make sure database service is running
- Verify credentials match database variables

### Issue: "Port already in use"
**Fix**: Railway handles this automatically, but make sure `PORT` env var is set

### Issue: "Tables not created"
**Fix**: Check logs - tables are created automatically on first connection

---

## 📊 Railway Dashboard Features

- **Metrics**: See CPU, Memory usage
- **Logs**: Real-time application logs
- **Variables**: Manage environment variables
- **Settings**: Configure domain, scaling, etc.
- **Deployments**: View deployment history

---

## 💰 Railway Pricing

- **Free Tier**: $5 credit/month
- **Hobby Plan**: $5/month (if you exceed free tier)
- **Perfect for student projects!**

---

## ✅ Deployment Checklist

- [ ] Database created on Railway
- [ ] Database variables copied
- [ ] Backend service created
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] JWT_SECRET generated and added
- [ ] Deployment successful
- [ ] Health endpoint working
- [ ] Database connection verified
- [ ] Frontend API URL updated
- [ ] Frontend tested locally
- [ ] Frontend deployed

---

## 🎉 You're Done!

Your backend and database are now live on Railway!

**Next**: Deploy your frontend to Vercel/Netlify and connect it to your Railway backend.

---

**Need help?** Check Railway docs: https://docs.railway.app

