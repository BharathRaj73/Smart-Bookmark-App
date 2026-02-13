"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Bookmark {
  id: string;
  title: string;
  url: string;
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBookmarks(data);
  };

  const addBookmark = async () => {
    const trimmedTitle = title.trim();
    const trimmedUrl = url.trim();

    if (!trimmedTitle || !trimmedUrl) {
      alert("Please fill in both Title and URL.");
      return;
    }

    if (
      !trimmedUrl.startsWith("http://") &&
      !trimmedUrl.startsWith("https://")
    ) {
      alert("URL must start with http:// or https://");
      return;
    }

    try {
      new URL(trimmedUrl); // extra validation for valid URL format
    } catch {
      alert("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("bookmarks").insert([
      {
        title: trimmedTitle,
        url: trimmedUrl,
        user_id: user.id,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error adding bookmark.");
    } else {
      setTitle("");
      setUrl("");
      fetchBookmarks();
    }
  };

  const deleteBookmark = async (id: string) => {
    setDeletingId(id);
    await supabase.from("bookmarks").delete().eq("id", id);

    setTimeout(() => {
      fetchBookmarks();
      setDeletingId(null);
    }, 300);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchBookmarks();
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) fetchBookmarks();
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* ================= LOGIN SCREEN ================= */

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6">
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 p-10 rounded-3xl shadow-2xl text-center max-w-md w-full">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Smart Bookmark App
          </h1>

          <div className="text-sm text-white/80 mb-8 space-y-2">
            <p>✔ Secure Google Authentication</p>
            <p>✔ Private Bookmark Storage</p>
            <p>✔ Real-time Updates</p>
          </div>

          <button
            onClick={() =>
              supabase.auth.signInWithOAuth({ provider: "google" })
            }
            className="flex items-center justify-center gap-3 w-full bg-white text-gray-800 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300"
          >
            {/* Google SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.69 1.23 9.19 3.64l6.85-6.85C35.64 2.3 30.18 0 24 0 14.61 0 6.49 5.48 2.69 13.44l7.98 6.2C12.57 13.31 17.83 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24c0-1.56-.14-3.06-.4-4.5H24v9h12.7c-.55 2.96-2.2 5.47-4.7 7.17l7.2 5.6C43.98 36.63 46.5 30.77 46.5 24z"
              />
              <path
                fill="#FBBC05"
                d="M10.67 28.64A14.47 14.47 0 019.5 24c0-1.62.28-3.18.77-4.64l-7.98-6.2A23.94 23.94 0 000 24c0 3.82.92 7.43 2.29 10.84l8.38-6.2z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.18 0 11.64-2.05 15.52-5.58l-7.2-5.6c-2 1.35-4.55 2.18-8.32 2.18-6.17 0-11.43-3.81-13.33-9.14l-8.38 6.2C6.49 42.52 14.61 48 24 48z"
              />
            </svg>
            Sign In With Google
          </button>
          <p className="text-white/60 text-xs mt-8">
            Built with Next.js + Supabase
          </p>
        </div>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white px-6 py-12">
      {/* Navbar */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold tracking-wide">
          Smart Bookmark Dashboard
        </h1>

        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-medium transition hover:scale-105"
        >
          Logout
        </button>
      </div>

      {/* Glass Container */}
      <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Add Bookmark Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <input
            type="text"
            placeholder="Bookmark Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />

          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />

          <button
            onClick={addBookmark}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Bookmark"}
          </button>
        </div>

        {/* Empty State */}
        {bookmarks.length === 0 ? (
          <div className="text-center py-20 opacity-70 text-lg">
            🚀 No bookmarks yet.
            <br />
            Start building your smart collection.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks.map((bookmark) => {
              const domain = new URL(bookmark.url).hostname;

              return (
                <div
                  key={bookmark.id}
                  className={`group relative bg-white/20 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    deletingId === bookmark.id ? "opacity-0 scale-90" : ""
                  }`}
                >
                  {/* Title + Favicon */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${domain}`}
                      alt="favicon"
                      className="w-6 h-6"
                    />
                    <h2 className="font-semibold text-lg truncate">
                      {bookmark.title}
                    </h2>
                  </div>

                  {/* URL */}
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-400 hover:underline text-sm break-all transition"
                  >
                    {bookmark.url}
                  </a>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteBookmark(bookmark.id)}
                    className="absolute top-4 right-4 bg-red-500/20 text-red-400 px-4 py-1 text-xs rounded-full opacity-100 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
