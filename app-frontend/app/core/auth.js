import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
export async function createAccount(email, password) {
  try {
    let result = await createUserWithEmailAndPassword(auth,email, password);
    await sendEmailVerification(result.user)
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function login(email, password) {
    try {
    let result = await signInWithEmailAndPassword(auth,email, password);
    return result;
    }catch (error) {
    console.log(error);
  }
 }
export async function logout(email, password) {
     try {
    let result = await signOut();
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function resetEmail(email){
    return await sendPasswordResetEmail(auth,email)
}