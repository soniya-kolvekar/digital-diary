"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EntriesPage() {
  const router = useRouter();

  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editMood, setEditMood] = useState("");

  const [filterMood, setFilterMood] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState(""); 
  const [showAll, setShowAll] = useState(true);


  async function loadEntries() {
    const res = await fetch("http://localhost:8080/entry/all", {
      headers: { Authorization: "Bearer testuser" },
    });

    if (!res.ok) return;
    const data = await res.json();
    setEntries(data);
  }

  useEffect(() => {
    loadEntries();
  }, []);


  async function deleteEntry(id) {
    const res = await fetch(
      `http://localhost:8080/entry/delete?uid=testuser&id=${id}`,
      {
        method: "DELETE",
        headers: { Authorization: "Bearer testuser" },
      }
    );

    if (res.ok) {
      setMessage("Entry deleted successfully!");
      loadEntries();
    } else {
      setMessage("Failed to delete entry.");
    }
  }


  function startEdit(entry) {
    setEditId(entry.id);
    setEditTitle(entry.title);
    setEditContent(entry.content);
    setEditMood(entry.mood);
  }

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


  const filteredEntries = entries
    .filter((entry) => {
      if (showAll) return true;

      if (filterMood) return entry.mood === filterMood;

      if (filterDate) {
        const entryDate = new Date(entry.created_at)
          .toISOString()
          .split("T")[0];
        return entryDate === filterDate;
      }

      return true;
    })
    .sort((a, b) => {
      if (!sortOrder) return 0;

      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      return sortOrder === "latest"
        ? dateB - dateA
        : dateA - dateB;
    });

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

      {message && (
        <p className="text-[#a1f1deff] text-xl font-bold mb-5">{message}</p>
      )}

    
      <div className="flex gap-4 mb-6">
        
        <button
          onClick={() => {
            setShowAll(true);
            setFilterMood("");
            setFilterDate("");
            setSortOrder("");
          }}
          className="p-2 rounded border text-black"
        >
          All Entries
        </button>

        <select
          value={filterMood}
          onChange={(e) => {
            setFilterMood(e.target.value);
            setShowAll(false);
            setFilterDate("");
          }}
          className="p-2 border rounded text-black"
        >
          <option value="">Select Mood</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😔 Sad</option>
          <option value="angry">😡 Angry</option>
          <option value="excited">🤩 Excited</option>
          <option value="stressed">😫 Stressed</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setShowAll(false);
          }}
          className="p-2 border rounded text-black"
        >
          <option value="">Sort By</option>
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
            setShowAll(false);
            setFilterMood("");
          }}
          className="p-2 border rounded text-black"
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white p-8 rounded-xl shadow-md text-black"
          >
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

                <button className="bg-green-300 p-3 rounded font-bold">
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
                <h2 className="text-2xl font-bold">{entry.title}</h2>
                <p className="text-sm italic">
                  Date: {new Date(entry.created_at).toLocaleDateString()}
                </p>
                <p className="mt-2">{entry.content}</p>
                <p className="italic">Mood: {entry.mood}</p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => startEdit(entry)}
                    className="bg-[#a1f1deff] px-4 py-2 rounded font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="bg-[#a1f1deff] px-4 py-2 rounded font-bold"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <button
        className="mt-10 bg-[#a1f1deff] p-3 rounded font-bold flex flex-col text-black"
        onClick={() => router.push("/home")}
      >
        Back
      </button>
    </div>
  );
}
