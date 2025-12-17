"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "../../core/profileLogic";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ViewProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [flashbacks, setFlashbacks] = useState([]);
  const [error, setError] = useState("");

  const router = useRouter();
  const auth = getAuth();

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setFlashbacks([]);
        setError("");
        router.replace("/signup");
        return;
      }

      setUser(firebaseUser);
      setFlashbacks([]);
    });

    return () => unsubscribe();
  }, [auth, router]);

  // Fetch user profile
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        if (!data || !data.profileCompleted) {
          router.replace("/profile");
          return;
        }
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [user, router]);

  // Fetch flashbacks
  useEffect(() => {
    if (!user) return;

    const fetchFlashbacks = async () => {
      try {
        const res = await fetch("http://localhost:8080/entry/flashback", {
          method: "GET",
          headers: {
            "Authorization": "Bearer testuser", // temporarily use same UID as EntriesPage
            "Content-Type": "application/json"
          },
          cache: "no-store"
        });

        if (!res.ok) throw new Error("Failed to fetch flashbacks");

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFlashbacks(data);
          setError("");
        } else {
          setFlashbacks([]);
          setError("No entries yet");
        }
      } catch (err) {
        console.error(err);
        setFlashbacks([]);
        setError("Could not load entries");
      }
    };

    fetchFlashbacks();
  }, [user]);

  if (!user || !profile) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C8E0F5] via-[#F3C9D8] to-[#FBC7E0] flex flex-row ">

      {/* Profile Card */}
      <div className="w-full flex justify-center mt-20">
        <div className="bg-white/40 backdrop-blur-md p-10 rounded-xl shadow-xl w-[500px] h-[320px]">
          <h1 className="text-3xl font-bold mb-6 text-center font-[marcellus] text-black">My Profile</h1>
          <p className="mb-4 text-black"><b>Email:</b> {user.email}</p>
          <p className="mb-6 text-black"><b>Name:</b> {profile.name}</p>

          <button
            className="w-full bg-[#ECA49C] py-2 rounded hover:bg-[#a14e87] font-bold font-[marcellus]"
            onClick={() => router.push("/profile")}
          >
            Edit Profile
          </button>

          <button
            className="w-full bg-[#ECA49C] py-2 mt-3 rounded hover:bg-[#a14e87] font-bold font-[marcellus]"
            onClick={() => router.push("/home")}
          >
            Go to Home
          </button>
        </div>
      </div>

      {/* Flashbacks Section */}
      <div className="w-full mt-20 flex flex-col items-center">
        <h2 className="text-4xl font-bold font-[marcellus] text-center mb-6 text-black">Entries ✨</h2>

        {error && <p className="text-red-600 text-lg font-semibold text-center mb-6">{error}</p>}

        {flashbacks.map((entry) => (
          <div key={entry.id} className="bg-blue-100 rounded-xl shadow-lg p-10 max-w-xl w-full text-center font-[marcellus] mb-6">
            <p className="text-sm text-gray-500 mb-2">
              📅 {new Date(entry.created_at || entry.date).toLocaleString("en-IN", { 
                day: "2-digit", 
                month: "short", 
                year: "numeric", 
                hour: "2-digit", 
                minute: "2-digit", 
                hour12: true 
              })}
            </p>
            <p className="text-xl text-black leading-relaxed">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
