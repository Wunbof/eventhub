# Deployment Guide - EventHub Backend & Database

This guide covers deploying your Node.js backend and MySQL database to production.

## 🚀 Recommended Options

### Option 1: Railway (Easiest - Recommended) ⭐
- ✅ Free tier available
- ✅ Built-in MySQL database
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable setup

### Option 2: Render + PlanetScale
- ✅ Render: Free tier for backend
- ✅ PlanetScale: Free MySQL hosting
- ✅ Good for scaling

### Option 3: Render + Railway Database
- ✅ Render: Free tier for backend
- ✅ Railway: MySQL database addon

---

## 🚂 Option 1: Railway (Complete Solution)

### Step 1: Deploy MySQL Database

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Click "New" → "Database" → "Add MySQL"**
5. **Wait for database to be created**
6. **Click on the MySQL service**
7. **Go to "Variables" tab**
8. **Copy these values:**
   - `MYSQLHOST` (host)
   - `MYSQLPORT` (port)
   - `MYSQLDATABASE` (database name)
   - `MYSQLUSER` (username)
   - `MYSQLPASSWORD` (password)

### Step 2: Deploy Backend

1. **In Railway dashboard, click "New" → "GitHub Repo"**
2. **Select your EventHub repository**
3. **Railway will detect Node.js automatically**
4. **Set Root Directory**: `backend`
5. **Add Environment Variables:**
   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=<MYSQLHOST from database>
   DB_USER=<MYSQLUSER from database>
   DB_PASSWORD=<MYSQLPASSWORD from database>
   DB_NAME=<MYSQLDATABASE from database>
   JWT_SECRET=<generate a strong random string>
   JWT_EXPIRE=7d
   ```
6. **Click "Deploy"**
7. **Wait for deployment to complete**
8. **Copy the generated URL** (e.g., `https://your-app.up.railway.app`)

### Step 3: Update Frontend

1. **Update `src/services/api.js`:**
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-app.up.railway.app/api';
   ```

2. **Or create `.env` in frontend root:**
   ```env
   REACT_APP_API_URL=https://your-app.up.railway.app/api
   ```

3. **Deploy frontend to Vercel/Netlify/GitHub Pages**

---

## 🎨 Option 2: Render + PlanetScale

### Step 1: Deploy MySQL (PlanetScale)

1. **Go to PlanetScale**: https://planetscale.com
2. **Sign up/Login** with GitHub
3. **Click "Create database"**
4. **Name it**: `eventhub_db`
5. **Select region** (closest to you)
6. **Click "Create database"**
7. **Go to "Connect" tab**
8. **Copy connection string** or individual values:
   - Host
   - Username
   - Password
   - Database name
   - Port (usually 3306)

### Step 2: Deploy Backend (Render)

1. **Go to Render**: https://render.com
2. **Sign up/Login** with GitHub
3. **Click "New" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure:**
   - **Name**: `eventhub-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: `backend`
6. **Add Environment Variables:**
   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=<PlanetScale host>
   DB_USER=<PlanetScale username>
   DB_PASSWORD=<PlanetScale password>
   DB_NAME=eventhub_db
   JWT_SECRET=<generate a strong random string>
   JWT_EXPIRE=7d
   ```
7. **Click "Create Web Service"**
8. **Wait for deployment**
9. **Copy the URL** (e.g., `https://eventhub-backend.onrender.com`)

### Step 3: Update Frontend

Same as Railway option above.

---

## 🔧 Pre-Deployment Checklist

### Backend
- [ ] All environment variables set
- [ ] Database connection tested
- [ ] CORS configured (already done)
- [ ] Error handling in place
- [ ] Logging configured

### Database
- [ ] Database created
- [ ] Connection credentials saved
- [ ] Tables will be created automatically on first connection

### Frontend
- [ ] API URL updated to production backend
- [ ] Environment variables set
- [ ] Build tested locally

---

## 🔐 Generate Secure JWT Secret

Use this command to generate a secure JWT secret:

**Windows PowerShell:**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

**Linux/Mac:**
```bash
openssl rand -base64 64
```

**Or use online generator:**
https://randomkeygen.com/

---

## 📝 Environment Variables Template

### Backend (.env on Railway/Render)
```env
PORT=5000
NODE_ENV=production
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=eventhub_db
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=7d
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 🧪 Testing After Deployment

1. **Test backend health:**
   ```
   GET https://your-backend-url.com/api/health
   ```

2. **Test database connection:**
   - Try registering a user
   - Create an event
   - Check if data persists

3. **Test frontend:**
   - Make sure API calls work
   - Test authentication
   - Test CRUD operations

---

## 🐛 Troubleshooting

### Backend won't start
- Check environment variables
- Check build logs
- Verify database connection

### Database connection fails
- Verify credentials
- Check if database is accessible
- Test connection from local machine

### CORS errors
- Already configured in backend
- Make sure frontend URL is correct

### 404 errors
- Check API routes
- Verify base URL in frontend

---

## 📚 Additional Resources

- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **PlanetScale Docs**: https://planetscale.com/docs

---

**Ready to deploy?** Start with Railway - it's the easiest! 🚀

