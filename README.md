🚀 Smart Bookmark App

A full-stack bookmark management application built with Next.js, Supabase, and Tailwind CSS.

This project allows users to securely sign in using Google OAuth and manage their personal bookmarks with a modern, responsive UI.

🌟 Features

🔐 Google Authentication (OAuth)
➕ Add bookmarks with validation
❌ Delete bookmarks with animation
🌐 URL validation (http:// / https:// enforced)
🖼 Automatic favicon preview
📱 Fully responsive design
🎨 Glassmorphism styled login page
⚡ Real-time updates with Supabase

🛠 Tech Stack

Frontend: Next.js 
Backend & Database: Supabase 
Authentication: Google OAuth
Styling: Tailwind CSS
Deployment Ready: Vercel compatible

🧠 Challenges Faced & How I Solved Them
1️⃣ Supabase Row Level Security (RLS) Issues

Problem:
Initially, insert and fetch operations failed because RLS was enabled but policies were not configured.

Solution:
I created proper RLS policies to:
Allow authenticated users to insert their own bookmarks.
Allow users to fetch only their own records using user_id = auth.uid().
This improved security and prevented cross-user data access.

2️⃣ Session Not Persisting After Login

Problem:
After Google login, session was not updating immediately on UI.

Solution:
Implemented supabase.auth.onAuthStateChange() listener to properly track authentication state and refresh bookmarks on login.

3️⃣ Data Not Showing After Insert

Problem:
After adding a bookmark, it didn’t appear immediately unless the page was refreshed.

Solution:
Created a reusable fetchBookmarks() function and triggered it after successful insert and delete operations.

This ensured real-time UI updates without page reload.

4️⃣ URL Validation & Error Handling

Problem:
Users could enter invalid URLs like google.com, which caused broken links.

Solution:
Implemented strict validation:

Ensured URL starts with http:// or https://
Used new URL() constructor to validate format
Displayed meaningful alerts for invalid input

5️⃣ Next.js Dev Server Lock Error

Problem:
Encountered .next/dev/lock error due to multiple dev instances.

Solution:
Terminated running processes and removed duplicate lockfiles to ensure clean development environment.

📂 Project Structure
app/
 ├── page.tsx
 ├── globals.css
lib/
 ├── supabase.ts
.env.local

⚙️ Installation

Clone repository

git clone https://github.com/BharathRaj73/Smart-Bookmark-App
cd smart-bookmark-app


Install dependencies

npm install


Create .env.local

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key


Run project

npm run dev


🎯 What I Learned

Implementing secure authentication with OAuth
Managing state in Next.js App Router
Working with Supabase RLS policies
Designing production-style UI with Tailwind
Handling real-time data updates cleanly
Debugging environment & lockfile issues

🚀 Future Improvements

Edit bookmark feature
Search & filter functionality
Bookmark categories
User profile section
Drag-and-drop reordering
