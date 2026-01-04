# Dwarika E-commerce Platform

A full-stack e-commerce platform for jewelry with a complete admin dashboard for managing products, users, orders, and banners.

## Features

### Frontend (Customer)
- Beautiful, responsive jewelry-themed design
- Product browsing and search
- Featured collections
- Shopping cart functionality
- Checkout process
- Cash on delivery payment option
- Product details with quantity selection

### Admin Dashboard
- **Product Management**: Create, read, update, and delete products
- **User Management**: Manage customer and admin accounts
- **Order Management**: View and update order statuses, track payments
- **Banner Management**: Manage homepage banners and promotional content
- **Dashboard Statistics**: View total products, users, orders, and revenue

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dwarika
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

**Note**: For production, use a strong, random JWT_SECRET and a secure MongoDB connection string.

### 4. Start MongoDB

Make sure MongoDB is running on your system. If using a local installation:

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### 5. Create Admin User

Run the admin creation script:

```bash
cd server
node scripts/createAdmin.js
```

This will create an admin user with:
- Email: `admin@dwarika.com`
- Password: `admin123`

You can customize the email and password:
```bash
node scripts/createAdmin.js your-email@example.com your-password
```

**Important**: Change the admin password after first login!

### 6. Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

### 7. Start the Frontend Development Server

In a new terminal:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

### 8. Access the Application

- **Customer Frontend**: `http://localhost:5173`
- **Admin Dashboard**: `http://localhost:5173/admin`

## API Endpoints

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get single user (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Orders
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order (admin only)
- `POST /api/orders` - Create order (public)
- `PUT /api/orders/:id` - Update order (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)
- `GET /api/orders/stats/summary` - Get order statistics (admin only)

### Banners
- `GET /api/banners` - Get all banners (public, filtered by active)
- `GET /api/banners/:id` - Get single banner (public)
- `POST /api/banners` - Create banner (admin only)
- `PUT /api/banners/:id` - Update banner (admin only)
- `DELETE /api/banners/:id` - Delete banner (admin only)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

## Project Structure

```
dwarika-main/
├── server/                 # Backend server
│   ├── models/            # MongoDB models
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Banner.js
│   ├── routes/            # API routes
│   │   ├── products.js
│   │   ├── users.js
│   │   ├── orders.js
│   │   ├── banners.js
│   │   └── auth.js
│   ├── middleware/        # Middleware functions
│   │   └── auth.js
│   ├── scripts/           # Utility scripts
│   │   └── createAdmin.js
│   ├── server.js          # Main server file
│   └── package.json
├── src/                   # Frontend React app
│   ├── admin/             # Admin dashboard
│   │   └── AdminDashboard.jsx
│   ├── utils/             # Utility functions
│   │   └── api.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── ...
└── package.json
```

## Admin Dashboard Features

### Dashboard
- Overview statistics (products, users, orders, revenue)
- Quick access to all management sections

### Product Management
- View all products in a table
- Add new products with full details
- Edit existing products
- Delete products
- Filter by status (active, inactive, out of stock)
- Set featured products

### User Management
- View all users (customers and admins)
- Create new users
- Edit user details and roles
- Suspend/activate users
- Change user passwords

### Order Management
- View all orders with details
- Update order status (pending, confirmed, processing, shipped, delivered, cancelled)
- View order details including items and shipping address
- Track payment status

### Banner Management
- Create promotional banners
- Set banner position (hero, featured, sidebar, footer)
- Activate/deactivate banners
- Add links to banners

## Security Notes

- All admin routes are protected with JWT authentication
- Passwords are hashed using bcryptjs
- Admin-only routes require both authentication and admin role
- Change default admin credentials in production
- Use environment variables for sensitive data
- Implement rate limiting for production
- Use HTTPS in production

## Development

### Running in Development Mode

Frontend (with hot reload):
```bash
npm run dev
```

Backend (with auto-restart):
```bash
cd server
npm run dev
```

### Building for Production

Frontend:
```bash
npm run build
```

Backend:
```bash
cd server
npm start
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the MONGODB_URI in `.env` file
- Verify MongoDB is accessible from your network

### Admin Login Issues
- Make sure you've created an admin user using the script
- Check that the user has `role: 'admin'` in the database
- Verify JWT_SECRET is set in `.env`

### API Connection Issues
- Ensure backend server is running on port 5000
- Check CORS settings if accessing from different origin
- Verify API_URL in frontend code matches backend URL

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
