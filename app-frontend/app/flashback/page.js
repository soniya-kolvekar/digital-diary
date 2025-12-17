"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FlashbackPage() {
  const router = useRouter();
  const [flashbacks, setFlashbacks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFlashback() {
      try {
        const res = await fetch("http://localhost:8080/entry/flashback", {
          headers: {
            Authorization: "Bearer testuser",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch flashback");
        }

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          
          setFlashbacks(data.slice(0, 3));
        } else {
          setError("No flashbacks yet");
        }
      } catch (err) {
        setError("Could not load flashback");
      }
    }

    fetchFlashback();
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
        Flashback ✨
      </h1>

      {error && (
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      )}

      {flashbacks.map((entry) => (
        <div
          key={entry.id}
          className="bg-blue-100 rounded-xl shadow-lg p-10 max-w-xl text-center font-[marcellus] mb-6"
        >
          <p className="text-sm text-gray-500 mb-2">
            📅 {new Date(entry.date).toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})}

          </p>

          <p className="text-xl text-black leading-relaxed">
            {entry.content}
          </p>
        </div>
      ))}

      <button
        type="button"
        className="bg-[#a1f1deff] p-3 h-10 w-30 text-black mt-6 rounded font-[marcellus] font-bold"
        onClick={() => router.push("/home")}
      >
        Back
      </button>
    </div>
  );
}