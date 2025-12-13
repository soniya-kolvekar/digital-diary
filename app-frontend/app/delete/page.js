"use client";

import { useEffect, useState } from "react";

export default function EntriesPage() {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editMood, setEditMood] = useState("");

  // Load all entries on page load
  async function loadEntries() {
    const res = await fetch("http://localhost:8080/entry/all", {
      headers: {
        Authorization: "Bearer testuser",
      },
    });

    if (!res.ok) return;

    const data = await res.json();
    setEntries(data);
  }

  useEffect(() => {
    loadEntries();
  }, []);

  // -------------------------------------
  // DELETE ENTRY
  // -------------------------------------
  async function deleteEntry(id) {
    const res = await fetch(
      `http://localhost:8080/entry/delete?uid=testuser&id=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer testuser",
        },
      }
    );

    if (res.ok) {
      setMessage("Entry deleted successfully!");
      loadEntries();
    } else {
      setMessage("Failed to delete entry.");
    }
  }

  // -------------------------------------
  // OPEN EDIT FORM
  // -------------------------------------
  function startEdit(entry) {
    setEditId(entry.id);
    setEditTitle(entry.title);
    setEditContent(entry.content);
    setEditMood(entry.mood);
  }

  // -------------------------------------
  // UPDATE ENTRY
  // -------------------------------------
  async function updateEntry(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/entry/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer testuser",
      },
      body: JSON.stringify({
        id: editId,
        title: editTitle,
        content: editContent,
        mood: editMood,
      }),
    });

    if (res.ok) {
      setMessage("Entry updated successfully!");
      setEditId(null);
      loadEntries();
    } else {
      setMessage("Failed to update entry.");
    }
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #9cc8edff 0%, #F3C9D8 45%, #FBC7E0 100%)",
      }}
      className="min-h-screen p-10"
    >
      <h1 className="text-5xl font-bold text-black font-[marcellus] mb-10">
        Your Diary Entries
      </h1>

      {/* Success / Error Message */}
      {message && (
        <p className="text-green-700 text-xl font-bold mb-5">{message}</p>
      )}

      {/* Entries List */}
      <div className="flex flex-col gap-6">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white p-5 rounded-xl shadow-md text-black"
          >
            {/* If editing this entry */}
            {editId === entry.id ? (
              <form onSubmit={updateEntry} className="flex flex-col gap-3">
                <input
                  className="p-3 border rounded"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <textarea
                  className="p-3 border rounded"
                  rows={4}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <select
                  className="p-3 border rounded"
                  value={editMood}
                  onChange={(e) => setEditMood(e.target.value)}
                >
                  <option value="happy">😊 Happy</option>
                  <option value="sad">😔 Sad</option>
                  <option value="angry">😡 Angry</option>
                  <option value="excited">🤩 Excited</option>
                  <option value="stressed">😫 Stressed</option>
                </select>

                <button
                  type="submit"
                  className="bg-green-300 p-3 rounded font-bold"
                >
                  Update Entry
                </button>

                <button
                  type="button"
                  className="bg-gray-300 p-3 rounded font-bold"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h2 className="text-3xl font-bold">{entry.title}</h2>
                <p className="mt-2">{entry.content}</p>
                <p className="mt-1 italic">Mood: {entry.mood}</p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => startEdit(entry)}
                    className="bg-yellow-300 px-4 py-2 rounded font-bold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="bg-red-300 px-4 py-2 rounded font-bold"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
