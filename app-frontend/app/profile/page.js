"use client";

import { useEffect, useState } from "react";
import { updateUserProfile, getUserProfile } from "../core/profileLogic";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/profile");
        return;
      }

      setEmail(firebaseUser.email);

      const profile = await getUserProfile(firebaseUser.uid);
      if (profile) setName(profile.name);
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className="bg-gradient-to-b from-[#C8E0F5] via-[#F3C9D8] to-[#FBC7E0] min-h-screen">
      <h1 className="text-black text-6xl font-bold font-[marcellus] py-16 text-center">
        Edit Profile
      </h1>

      <div className="flex justify-center">
        <div className="flex flex-col bg-white/30 backdrop-blur-md p-10 rounded-xl shadow-lg">

          {/* Email (readonly) */}
          <label className="text-gray-700 mb-1">Email</label>
          <input
            value={email}
            readOnly
            className="w-90 h-13 bg-[#E3E8F0] text-gray-600 rounded-[5px] px-7 mb-6 cursor-not-allowed"
          />

          {/* Name */}
          <label className="text-gray-700 mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-90 h-13 bg-[#E3E8F0] text-black rounded-[5px] px-7 mb-6"
          />

          <button
            className="w-50 h-13 bg-[#ECA49C] rounded-[5px] text-black font-bold font-[marcellus] hover:text-white hover:bg-[#a14e87] mx-auto"
            onClick={async () => {
              const user = auth.currentUser;
              if (!user) return;

              await updateUserProfile(user.uid, name);
              router.replace("/profile/view");
            }}
          >
            Update Profile
          </button>

        </div>
      </div>
    </div>
  );
}
