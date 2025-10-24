# MongoDB Atlas Setup Guide

Follow these steps to set up MongoDB Atlas for your Contact List app.

## 1. Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign In"**
3. Create an account (free tier available)

## 2. Create a Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select a cloud provider and region (choose closest to you)
4. Name your cluster (e.g., "ContactList")
5. Click **"Create"**

Wait 3-5 minutes for cluster creation.

## 3. Create Database User

1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `contactapp`
5. Click **"Autogenerate Secure Password"** (save this!)
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

## 4. Configure Network Access

1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your specific IP for better security
4. Click **"Confirm"**

## 5. Get Connection String

1. Click **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://contactapp:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `/contactlist` before the `?`

Final format:
```
mongodb+srv://contactapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/contactlist?retryWrites=true&w=majority
```

## 6. Configure Your App

### Local Development

1. Create `.env` file in `server` folder:
```bash
cd server
cp .env.example .env
```

2. Edit `.env` and add your connection string:
```
MONGODB_URI=mongodb+srv://contactapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/contactlist?retryWrites=true&w=majority
PORT=3001
```

### Vercel Deployment

1. Go to your Vercel project
2. Click **"Settings"** → **"Environment Variables"**
3. Add variable:
   - Name: `MONGODB_URI`
   - Value: Your connection string
4. Click **"Save"**
5. Redeploy your app

## 7. Test Connection

Start your server:
```bash
cd server
npm start
```

You should see:
```
✅ MongoDB connected successfully
✅ Demo user created
✅ Sample contacts created
🚀 Server running on http://localhost:3001
```

## 8. View Your Data

1. Go to MongoDB Atlas dashboard
2. Click **"Browse Collections"**
3. You'll see:
   - `users` collection (demo user)
   - `contacts` collection (sample contacts)

## Security Best Practices

For production:

1. **Use specific IP addresses** instead of "Allow from Anywhere"
2. **Create separate users** for different environments
3. **Use environment variables** - never commit credentials
4. **Enable audit logs** in Atlas
5. **Set up backups** (available in paid tiers)

## Troubleshooting

**Connection timeout:**
- Check network access settings
- Verify IP whitelist includes your IP
- Check firewall settings

**Authentication failed:**
- Verify username and password
- Check connection string format
- Ensure user has correct permissions

**Database not found:**
- Database is created automatically on first write
- Check database name in connection string

## Free Tier Limits

MongoDB Atlas Free Tier (M0):
- 512 MB storage
- Shared RAM
- No backups
- Perfect for development and small apps

Need more? Upgrade to paid tier for:
- More storage
- Dedicated resources
- Automated backups
- Advanced security

---

Need help? Check [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
