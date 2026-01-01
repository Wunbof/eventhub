# ✅ Railway Database Setup - Ready to Deploy!

## 🎯 Your Railway MySQL Credentials

I've configured everything for you! Here's what you need:

### Database Connection Info:
- **Host (Internal)**: `mysql.railway.internal` (use this in Railway backend)
- **Host (External)**: `switchback.proxy.rlwy.net` (for testing from local)
- **Port**: `3306` (internal) or `31509` (external)
- **Database**: `railway`
- **User**: `root`
- **Password**: `RgYjXgwXQnVInzWbkjzrjXgVSHAgXJpz`

---

## 🚀 Next Steps: Deploy Backend

### Step 1: Add Environment Variables in Railway

1. **Go to your Railway project**
2. **Click on your backend service** (or create one if you haven't)
3. **Go to "Variables" tab**
4. **Add these variables:**

```
PORT=5000
NODE_ENV=production
DB_HOST=mysql.railway.internal
DB_USER=root
DB_PASSWORD=RgYjXgwXQnVInzWbkjzrjXgVSHAgXJpz
DB_NAME=railway
JWT_SECRET=<generate-64-char-random-string>
JWT_EXPIRE=7d
```

### Step 2: Generate JWT_SECRET

**Quick way - PowerShell:**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

**Or use online:** https://randomkeygen.com/
- Copy a "CodeIgniter Encryption Keys" (64 characters)

### Step 3: Deploy

1. **Railway will auto-deploy** when you add variables
2. **Or click "Deploy"** manually
3. **Wait for deployment** (2-5 minutes)
4. **Check logs** to see:
   - ✅ Database connection established
   - ✅ Database tables initialized successfully
   - 🚀 Server running on port 5000

### Step 4: Get Your Backend URL

1. **Click on backend service**
2. **Go to "Settings"**
3. **Click "Generate Domain"**
4. **Copy the URL** (e.g., `https://your-app.up.railway.app`)

---

## ✅ Verify Deployment

### Test Health Endpoint:
```
GET https://your-backend-url.up.railway.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "EventHub API is running"
}
```

### Test Database Connection:
The backend will automatically:
- ✅ Connect to MySQL
- ✅ Create all tables (users, events, registrations)
- ✅ Be ready to accept requests

---

## 🎨 Update Frontend

1. **Create `.env` in project root:**
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

4. **Deploy frontend** to Vercel/Netlify

---

## 📋 Quick Checklist

- [x] Database created on Railway
- [x] Database credentials obtained
- [ ] Backend service created on Railway
- [ ] Root directory set to `backend`
- [ ] Environment variables added
- [ ] JWT_SECRET generated and added
- [ ] Backend deployed
- [ ] Health endpoint tested
- [ ] Frontend API URL updated
- [ ] Frontend deployed

---

## 🔍 Troubleshooting

### Backend won't connect to database
- ✅ Make sure `DB_HOST=mysql.railway.internal` (not external URL)
- ✅ Verify all credentials match
- ✅ Check Railway logs for errors

### Tables not created
- ✅ Check logs - they're created automatically on first connection
- ✅ Look for "Database tables initialized successfully"

### 404 errors
- ✅ Make sure backend URL is correct
- ✅ Check that backend is deployed and running

---

## 🎉 You're Almost Done!

Your database is ready. Just:
1. Deploy backend with the environment variables above
2. Update frontend with backend URL
3. Deploy frontend

**Everything is configured!** 🚀

