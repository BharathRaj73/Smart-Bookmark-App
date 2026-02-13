# Smart Bookmark App

- Smart Bookmark App is a secure web application that allows users to save and manage their personal bookmarks.
- Users can sign in using Google Authentication.
- Each user can only access their own saved bookmarks.
- The application features a modern UI with smooth animations and real-time updates.

---

## Tech Stack

**Frontend:** Next.js, Tailwind CSS  
**Backend & Database:** Supabase (PostgreSQL)  
**Authentication:** Google OAuth  

---

## Features

- Google Login Authentication  
- Protected Dashboard  
- Add Bookmarks (Title + URL)  
- URL Validation (`http://` or `https://` required)  
- Delete Bookmarks with animation  
- Favicon preview for each link  
- Real-time data updates  
- Responsive design  

---

## Challenges Faced

### 1. Row Level Security (RLS)
Database operations initially failed due to missing RLS policies.  
Created policies allowing users to access only their own bookmarks using `auth.uid()`.

### 2. Session Not Updating After Login
UI was not reflecting login state immediately.  
Solved using `supabase.auth.onAuthStateChange()` listener.

### 3. Data Not Refreshing After Insert
New bookmarks were not visible without page refresh.  
Created reusable `fetchBookmarks()` function triggered after insert/delete.

### 4. Invalid URL Inputs
Users could enter malformed URLs.  
Implemented strict validation enforcing `http://` or `https://` and verified using `new URL()`.

---

## Run Locally

Clone the repository

```bash
git clone https://github.com/BharathRaj73/Smart-Bookmark-App.git

Navigate into project directory
cd Smart-Bookmark-App

Install dependencies
npm install

Create .env.local file in root directory
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

Start development server
npm run dev

Open browser:
http://localhost:3000

Project Structure
app/
 ├── page.tsx
 ├── globals.css
lib/
 ├── supabase.ts

