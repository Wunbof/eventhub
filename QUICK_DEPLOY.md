# 🚀 Quick Deployment Guide

## Fastest Way to Deploy (Railway - 10 minutes)

### 1️⃣ Create Database (2 min)
1. Go to https://railway.app → Sign up
2. New Project → New → Database → Add MySQL
3. Wait for creation
4. Click MySQL → Variables tab
5. **Copy all 5 values** (MYSQLHOST, MYSQLPORT, MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD)

### 2️⃣ Deploy Backend (5 min)
1. Same project → New → GitHub Repo
2. Select your repo
3. **Set Root Directory: `backend`** ⚠️
4. Variables tab → Add:
   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=<paste MYSQLHOST>
   DB_USER=<paste MYSQLUSER>
   DB_PASSWORD=<paste MYSQLPASSWORD>
   DB_NAME=<paste MYSQLDATABASE>
   JWT_SECRET=<random-64-char-string>
   JWT_EXPIRE=7d
   ```
5. Generate JWT_SECRET: https://randomkeygen.com/
6. Deploy → Wait → Copy URL

### 3️⃣ Update Frontend (2 min)
1. Create `.env` in root:
   ```env
   REACT_APP_API_URL=https://your-backend.up.railway.app/api
   ```
2. Test: `npm start`
3. Deploy frontend to Vercel/Netlify

### 4️⃣ Done! ✅

**Total time: ~10 minutes**

---

## 📝 Quick Reference

**Backend URL**: `https://your-app.up.railway.app`  
**Health Check**: `https://your-app.up.railway.app/api/health`  
**Frontend API**: Update `.env` with backend URL

---

**Detailed guide**: See `RAILWAY_DEPLOY.md`

