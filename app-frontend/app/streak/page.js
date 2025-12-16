"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StreakPage() {
    const router=useRouter();
  const [streak, setStreak] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStreak() {
      try {
        const res = await fetch("http://localhost:8080/entry/streak", {
          headers: {
            "Authorization": "Bearer testuser", // same as other pages
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch streak");
        }

        const data = await res.json();

        // backend may return number OR {streak:number}
        setStreak(typeof data === "number" ? data : data.streak);
      } catch (err) {
        setError("Could not load streak");
      }
    }

    fetchStreak();
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #9cc8edff 0%, #F3C9D8 45%, #FBC7E0 100%)",
      }}
      className="min-h-screen flex flex-col items-center"
    >
      <h1 className="text-5xl font-bold text-black font-[marcellus] py-20">
        Your Writing Streak
      </h1>

      {error && (
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      )}

      {streak !== null && (
        <div className="bg-white rounded-xl shadow-lg p-10 text-center">
          <p className="text-7xl font-bold text-black">{streak}</p>
          <p className="text-xl mt-4 text-gray-700">
            🔥 Days in a row
          </p>
        </div>
      )}
        <button
  type="button"
  className="bg-[#a1f1deff] p-3 h-10 w-30 text-black mt-4 -ml-20 rounded font-bold"
  onClick={() => router.push("/home")}
>
  Back
</button>
    </div>
  );
}
