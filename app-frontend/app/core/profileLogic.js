import { database } from "../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

/* Save  Update profile */
export async function updateUserProfile(uid, name) {
  await setDoc(
    doc(database, "users", uid),
    {
      name,
      profileCompleted: true, // ✅ FLAG
      updatedAt: new Date(),
    },
    { merge: true }
  );
}

/* Get profile */
export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(database, "users", uid));
  return snap.exists() ? snap.data() : null;
};
