# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

### 2. Configure Backend

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dwarika
JWT_SECRET=change-this-to-a-random-secret-key
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running. If you don't have MongoDB installed:

**Option A: Install MongoDB locally**
- Download from https://www.mongodb.com/try/download/community
- Start the service

**Option B: Use MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string and update `MONGODB_URI` in `.env`

### 4. Create Admin User

```bash
cd server
node scripts/createAdmin.js
```

Default credentials:
- Email: `admin@dwarika.com`
- Password: `admin123`

**⚠️ IMPORTANT: Change the password after first login!**

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Access the Application

- **Customer Site**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongosh` or `mongo`
- Verify the connection string in `server/.env`
- For Atlas, ensure your IP is whitelisted

### Port Already in Use
- Backend: Change `PORT` in `server/.env`
- Frontend: Vite will automatically use the next available port

### Admin Login Not Working
- Make sure you ran `node scripts/createAdmin.js`
- Check MongoDB to verify admin user exists
- Try creating admin again with custom credentials:
  ```bash
  node scripts/createAdmin.js your-email@example.com your-password
  ```

### API Connection Issues
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Ensure `API_URL` in frontend matches backend URL

## Next Steps

1. **Add Products**: Login to admin dashboard and add products
2. **Create Banners**: Add promotional banners for homepage
3. **Test Order Flow**: Add products to cart, checkout, and place order
4. **Manage Orders**: View and update orders in admin dashboard

## Production Deployment

For production:
1. Change `JWT_SECRET` to a strong random string
2. Use a secure MongoDB connection (Atlas recommended)
3. Set `NODE_ENV=production`
4. Build frontend: `npm run build`
5. Use a process manager like PM2 for backend
6. Set up HTTPS
7. Configure environment variables securely

