// "use client";

// import { useState } from "react";

// export default function DeleteEntryPage() {
//   const [id, setId] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleDelete(e) {
//     e.preventDefault();

//     const res = await fetch("http://localhost:8000/delete-entry", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     });

//     if (res.ok) {
//       setMessage("Entry deleted successfully!");
//       setId("");
//     } else {
//       setMessage("Failed to delete entry.");
//     }
//   }

//   return (
//     <div
//       style={{
//         background:
//           "linear-gradient(to bottom, #C8E0F5 0%, #F3C9D8 45%, #FBC7E0 100%)",
//       }}
//       className="min-h-screen"
//     >
//       <h1 className="text-5xl font-bold ml-20 text-black font-[marcellus] py-20">
//         Delete Diary Entry
//       </h1>

//       <form
//         onSubmit={handleDelete}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "12px",
//           marginTop: "20px",
//         }}
//       >
//         <input
//           type="text"
//           value={id}
//           placeholder="Enter Entry ID to Delete"
//           onChange={(e) => setId(e.target.value)}
//           required
//           style={{
//             padding: "10px",
//             fontSize: "16px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//           }}
//           className="text-black w-100 ml-20 -mt-10"
//         />

//         <button
//           type="submit"
//           style={{
//             backgroundColor: "#F5A1A1", // soft pastel red (matches theme)
//             color: "black",
//             padding: "12px",
//             fontSize: "16px",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//           className="w-100 ml-20 mt-3"
//         >
//           Delete Entry
//         </button>
//       </form>

//       {message && (
//         <p
//           style={{
//             marginTop: "15px",
//             color: "green",
//             fontWeight: "bold",
//             marginLeft: "80px",
//           }}
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }
