# EventHub - Event Management System

![EventHub](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Project Description

EventHub is a comprehensive full-stack event management platform that allows users to create, manage, and register for events seamlessly. Built with React frontend and Node.js backend, this application streamlines event organization by handling scheduling, attendee registration, and event coordination in one place. Perfect for conferences, workshops, festivals, and social gatherings.

## ✨ Features

### Frontend Features
- **Event Discovery**: Browse and search through various events with filtering by category
- **Event Creation**: Create new events with detailed information (title, date, time, location, pricing, etc.)
- **User Authentication**: Secure login and signup system
- **Real-time Registration**: Register for events and manage your registrations
- **Responsive Design**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Interactive UI**: Modern, intuitive user interface with smooth animations and transitions
- **Form Validation**: Comprehensive form validation for creating events and contact forms
- **Category Filtering**: Filter events by categories (Conference, Workshop, Festival, Networking, etc.)
- **Search Functionality**: Search events by name or location
- **Admin Panel**: Complete admin dashboard for managing users and viewing statistics

### Backend Features
- **RESTful API**: Complete REST API with Express.js
- **User Authentication**: JWT-based authentication system
- **Database Integration**: MySQL database with proper relationships
- **CRUD Operations**: Full Create, Read, Update, Delete operations for events
- **Data Validation**: Server-side validation using express-validator
- **Error Handling**: Comprehensive error handling middleware
- **Security**: Password hashing with bcrypt, JWT tokens
- **Email Notifications**: Optional email notifications for registrations (using Nodemailer)
- **SMS Notifications**: Optional SMS notifications (using Twilio)

## 🛠️ Technologies Used

### Frontend
- **React 18.2.0** - JavaScript library for building user interfaces
- **React Router DOM 6.20.0** - Routing library for navigation
- **CSS3** - Styling with modern CSS features including Grid and Flexbox
- **JavaScript ES6+** - Modern JavaScript features
- **Context API** - State management for authentication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MySQL2** - MySQL database driver
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemailer** - Email notifications (optional)
- **Twilio** - SMS notifications (optional)

### Database
- **MySQL 8.0+** - Relational database management system

## 📁 Project Structure

```
event-management-system/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration and initialization
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── validation.js       # Input validation middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── events.js            # Event CRUD routes
│   │   └── admin.js             # Admin panel routes
│   ├── utils/
│   │   ├── email.js             # Email notification utilities
│   │   └── sms.js               # SMS notification utilities
│   ├── server.js                # Express server entry point
│   ├── package.json             # Backend dependencies
│   ├── env.example              # Environment variables template
│   └── .gitignore
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── EventCard.jsx
│   │   └── EventCard.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Events.jsx
│   │   ├── Events.css
│   │   ├── CreateEvent.jsx
│   │   ├── CreateEvent.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Signup.jsx
│   │   ├── Signup.css
│   │   ├── Admin.jsx
│   │   └── Admin.css
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager
- **MySQL** (version 8.0 or higher)
- **Git** for version control

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   - Create a MySQL database:
     ```sql
     CREATE DATABASE eventhub_db;
     ```
   - Or use your preferred MySQL client (phpMyAdmin, MySQL Workbench, etc.)

4. **Configure environment variables**
   - Copy `env.example` to `.env`:
     ```bash
     cp env.example .env
     ```
   - Edit `.env` file with your database credentials:
     ```env
     PORT=5000
     NODE_ENV=development
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password_here
     DB_NAME=eventhub_db
     JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
     JWT_EXPIRE=7d
     ```

5. **Start the backend server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```
   
   The server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to project root** (if not already there)
   ```bash
   cd ..
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL** (optional)
   - Create a `.env` file in the root directory:
     ```env
     REACT_APP_API_URL=http://localhost:5000/api
     ```
   - If not set, it defaults to `http://localhost:5000/api`

4. **Start the development server**
   ```bash
   npm start
   ```
   
   The application will open in your browser at `http://localhost:3000`

## 📊 Database Schema

### Users Table
- `id` (INT, Primary Key, Auto Increment)
- `username` (VARCHAR(50), Unique, Not Null)
- `email` (VARCHAR(100), Unique, Not Null)
- `password` (VARCHAR(255), Not Null) - Hashed with bcrypt
- `full_name` (VARCHAR(100))
- `phone` (VARCHAR(20))
- `role` (ENUM: 'user', 'admin', Default: 'user')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Events Table
- `id` (INT, Primary Key, Auto Increment)
- `title` (VARCHAR(200), Not Null)
- `description` (TEXT)
- `category` (VARCHAR(50), Not Null)
- `date` (DATE, Not Null)
- `time` (TIME, Not Null)
- `location` (VARCHAR(200), Not Null)
- `price` (DECIMAL(10, 2), Default: 0)
- `expected_attendees` (INT, Default: 0)
- `created_by` (INT, Foreign Key → users.id)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Registrations Table
- `id` (INT, Primary Key, Auto Increment)
- `user_id` (INT, Foreign Key → users.id)
- `event_id` (INT, Foreign Key → events.id)
- `registered_at` (TIMESTAMP)
- Unique constraint on (user_id, event_id)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Events
- `GET /api/events` - Get all events (with optional filters: category, search, page, limit)
- `GET /api/events/:id` - Get single event by ID
- `POST /api/events` - Create a new event (Protected)
- `PUT /api/events/:id` - Update an event (Protected - Creator or Admin only)
- `DELETE /api/events/:id` - Delete an event (Protected - Creator or Admin only)
- `POST /api/events/:id/register` - Register for an event (Protected)
- `DELETE /api/events/:id/register` - Cancel event registration (Protected)
- `GET /api/events/:id/registrations` - Get event registrations (Protected - Creator or Admin only)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (Protected - Admin only)
- `GET /api/admin/users` - Get all users (Protected - Admin only)
- `PUT /api/admin/users/:id/role` - Update user role (Protected - Admin only)
- `DELETE /api/admin/users/:id` - Delete a user (Protected - Admin only)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. When a user logs in or registers, they receive a token that must be included in the `Authorization` header for protected routes:

```
Authorization: Bearer <token>
```

Tokens are stored in `localStorage` and automatically included in API requests.

## 📱 Pages Overview

### 1. Home Page (/)
- Hero section with call-to-action buttons
- Features showcase highlighting platform capabilities
- Statistics section showing platform impact

### 2. About Page (/about)
- Company story and mission
- Core values presentation
- Team member showcase

### 3. Events Page (/events)
- List of all available events from database
- Category filtering
- Search functionality
- Event registration/cancellation (requires login)

### 4. Create Event Page (/create-event)
- Comprehensive form for creating new events
- Form validation with error messages
- Requires user authentication

### 5. Login Page (/login)
- User login form
- Email and password authentication
- Redirects to events page on success

### 6. Signup Page (/signup)
- User registration form
- Username, email, password validation
- Creates account and logs in automatically

### 7. Admin Panel (/admin)
- Dashboard statistics
- User management
- Event overview
- Role management (Admin only)

### 8. Contact Page (/contact)
- Contact form with validation
- Contact information display

## 🚢 Deployment

### Backend Deployment (Render/Railway)

1. **Prepare for deployment**
   - Ensure all environment variables are set in your hosting platform
   - Update database connection to use production database URL
   - Set `NODE_ENV=production`

2. **Deploy to Render**
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables in Render dashboard

3. **Deploy to Railway**
   - Connect your GitHub repository
   - Railway will auto-detect Node.js
   - Set environment variables in Railway dashboard
   - Deploy

### Frontend Deployment (GitHub Pages/Vercel/Netlify)

1. **Update API URL**
   - Update `REACT_APP_API_URL` in `.env` to your backend URL

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm install --save-dev gh-pages
   ```
   Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/event-management-system",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
   Then run:
   ```bash
   npm run deploy
   ```

4. **Deploy to Vercel/Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `build`
   - Add environment variable: `REACT_APP_API_URL`

## 🔄 Version Control

This project uses Git for version control. All commits are properly documented with clear commit messages.

### Example Commit Messages:
- `Initial commit: Setup React project structure`
- `Add: Backend API with Express and MySQL`
- `Add: User authentication with JWT`
- `Add: CRUD operations for events`
- `Add: Admin panel with user management`
- `Add: Email and SMS notification support`
- `Update: Frontend to connect with backend API`
- `Fix: Authentication token handling`

## 🧪 Testing the Application

1. **Create a test user account** via the Signup page
2. **Login** with your credentials
3. **Create an event** using the Create Event page
4. **Browse events** on the Events page
5. **Register for events** (requires login)
6. **Access admin panel** (requires admin role - manually set in database)

### Creating an Admin User

To create an admin user, you can either:
1. Manually update the database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
2. Or use the admin panel if you already have admin access

## 📸 Screenshots

*(Include screenshots of your application here after deployment)*

### Home Page
![Home Page Screenshot]

### Events Page
![Events Page Screenshot]

### Create Event Page
![Create Event Screenshot]

### Login Page
![Login Screenshot]

### Admin Panel
![Admin Panel Screenshot]

## 🔧 Optional Features Configuration

### Email Notifications

To enable email notifications, add to your `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### SMS Notifications

To enable SMS notifications, add to your `.env`:
```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## 🐛 Troubleshooting

### Backend Issues
- **Database connection error**: Check your MySQL credentials in `.env`
- **Port already in use**: Change `PORT` in `.env` or stop the process using port 5000
- **JWT errors**: Ensure `JWT_SECRET` is set in `.env`

### Frontend Issues
- **API connection error**: Check `REACT_APP_API_URL` in `.env` and ensure backend is running
- **CORS errors**: Ensure CORS is enabled in backend (already configured)
- **Authentication not working**: Check browser console for token errors

## 👥 Contributors

- **Your Name** - Developer

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React documentation
- Express.js documentation
- MySQL documentation
- React Router documentation
- Design inspiration from modern event platforms

## 📞 Support

For support, email info@eventhub.com or create an issue in the repository.

---

**Built with ❤️ using React and Node.js**
