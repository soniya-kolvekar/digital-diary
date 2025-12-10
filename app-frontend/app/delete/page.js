"use client";

import { useState } from "react";

export default function DeleteEntryPage() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  async function handleDelete(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`http://localhost:8000/entry/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer testuser", // Same as Add Entry page
        },
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage(`❌ Failed: ${err.error || "Unknown error"}`);
        return;
      }

      setMessage("✅ Entry deleted successfully!");
      setId("");

    } catch (error) {
      setMessage("❌ Failed to connect to server");
    }
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #9cc8edff 0%, #F3C9D8 45%, #FBC7E0 100%)",
      }}
      className="min-h-screen"
    >
      <h1 className="text-5xl font-bold ml-20 text-black font-[marcellus] py-20">
        Delete Diary Entry
      </h1>

      <form
        onSubmit={handleDelete}
        className="flex flex-col gap-4 mt-5 ml-20 w-[60%]"
      >
        <input
          type="text"
          value={id}
          placeholder="Enter Entry ID to delete"
          onChange={(e) => setId(e.target.value)}
          required
          className="text-black p-3 text-lg border border-gray-300 rounded-md bg-white"
        />

        <button
          type="submit"
          className="p-3 text-lg rounded-md mt-2"
          style={{
            backgroundColor: "#a1f1deff",
            color: "black",
          }}
        >
          Delete Entry
        </button>
      </form>

      {message && (
        <p className="ml-20 mt-4 text-black font-bold text-lg">{message}</p>
      )}
    </div>
  );
}
