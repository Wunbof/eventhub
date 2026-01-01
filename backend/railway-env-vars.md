# Railway Environment Variables Configuration

## ✅ Your MySQL Database Credentials

Use these values in your Railway backend service:

```
PORT=5000
NODE_ENV=production
DB_HOST=mysql.railway.internal
DB_USER=root
DB_PASSWORD=RgYjXgwXQnVInzWbkjzrjXgVSHAgXJpz
DB_NAME=railway
JWT_SECRET=<generate-a-random-64-character-string>
JWT_EXPIRE=7d
```

## 🔐 Generate JWT_SECRET

Use one of these methods:

**Option 1: Online Generator**
- Go to: https://randomkeygen.com/
- Copy a "CodeIgniter Encryption Keys" (64 characters)

**Option 2: PowerShell**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

**Option 3: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📝 Steps to Add in Railway

1. Go to your Railway backend service
2. Click "Variables" tab
3. Add each variable one by one:
   - Click "New Variable"
   - Add name and value
   - Click "Add"

## ✅ Complete Variable List

Copy and paste these (replace JWT_SECRET with generated value):

```
PORT=5000
NODE_ENV=production
DB_HOST=mysql.railway.internal
DB_USER=root
DB_PASSWORD=RgYjXgwXQnVInzWbkjzrjXgVSHAgXJpz
DB_NAME=railway
JWT_SECRET=YOUR_GENERATED_SECRET_HERE
JWT_EXPIRE=7d
```

