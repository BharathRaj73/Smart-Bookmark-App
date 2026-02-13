🚀 Smart Bookmark App

A modern, secure, Google-authenticated bookmark manager built with the MERN stack.

Designed with clean UI, strong validation, and production-ready architecture principles.

🌟 Overview

Smart Bookmark App is a full-stack web application that allows users to securely save, manage, and delete bookmarks using Google authentication.

The project focuses on:

Clean authentication flow

Professional UI/UX

Proper validation and error handling

Modern React architecture


🔐 Key Features

🔑 Google OAuth Authentication

🔒 Protected Routes

➕ Add Bookmarks (Title + URL)

❌ Delete Bookmarks with smooth animation

🌐 URL validation (http:// or https:// enforced)

🖼 Auto-fetched favicon preview

📱 Responsive design

🎨 Glassmorphism UI landing page

🧠 Engineering Highlights

Implemented client-side URL validation to prevent malformed links

Designed protected route structure for authenticated access

Used reusable React components for clean architecture

Optimized state management to prevent unnecessary re-renders

Focused on UX polish (animations, hover states, micro-interactions)

🛠 Tech Stack

Frontend

React.js

Tailwind CSS

Google OAuth


Authentication

Google OAuth 2.0


📸 Application Flow

User lands on premium styled login page

Authenticates using Google

Redirected to dashboard

Adds bookmarks with validation

Bookmarks displayed as modern cards

Delete functionality with visual feedback

⚡ Installation & Setup
# Clone the repository
git clone <your-repo-url>

# Navigate to project
cd smart-bookmark-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install


Create .env file in backend:

MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id


Run project:

# Backend
npm run dev

# Frontend
npm start

🎯 Why This Project Stands Out

Unlike basic CRUD apps, this project demonstrates:

Authentication handling

Production-style validation

Clean UI architecture

Real-world SaaS-like UX

Full-stack integration

This project reflects practical engineering thinking beyond academic exercises.

👨‍💻 Author

Bharath Raj C
B.Tech – Computer Science
Full Stack Developer (MERN)
