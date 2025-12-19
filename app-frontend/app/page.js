"use client";

import { login, createAccount, resetEmail, logout } from "./core/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      setEmail("");
      setPassword("");
      router.replace("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className=" bg-gradient-to-b from-[#C8E0F5] via-[#F3C9D8] to-[#FBC7E0] min-h-screen">
      <h1 className="text-black text-6xl ml-120 font-bold font-[marcellus] py-16">
        Digital Diary
      </h1>

      <div className="flex flex-row">
        <div className=" ml-60 w-full">
          <h6 className="text-gray-700 ml-65">Enter your credentials</h6>
        </div>

        <div className="flex flex-col -ml-345">
          {error && (
            <p className="text-red-600 mb-3 font-semibold">{error}</p>
          )}

          <input
            className="md:w-90 w-70 h-13 bg-[#E3E8F0] text-black rounded-[5px] mt-10 px-7"
            type="email"
            placeholder="Email*"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="md:w-90 w-70 h-13 bg-[#E3E8F0] text-black rounded-[5px] mt-5 px-7"
            type="password"
            placeholder="xxxxxx"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="md:w-50 w-40 h-13 bg-[#ECA49C] rounded-[5px] mt-5 text-black hover:text-white justify-center items-center md:mx-20 hover:bg-[#a14e87]"
            onClick={async () => {
              try {
                await login(email, password);
                router.replace("/home");     
              } catch (err) {
                setError("Invalid email or password");
              }
            }}
          >
            Login
          </button>

          <button
            className="md:w-50 w-40 h-13 bg-[#ECA49C] rounded-[5px] mt-5 text-black hover:text-white justify-center items-center md:mx-20 hover:bg-[#a14e87]"
            onClick={async () => {
              try {
                await createAccount(email, password);
                router.replace("/signup");
              } catch {
                setError("Signup failed");
              }
            }}
          >
            Sign Up
          </button>

          <button
            className="md:w-50 w-50 h-13 bg-[#ECA49C] rounded-[5px] mt-5 text-black hover:text-white justify-center items-center md:mx-20 hover:bg-[#a14e87]"
            onClick={async () => {
              try {
                await resetEmail(email);
                alert("Reset email sent");
              } catch {
                setError("Reset failed");
              }
            }}
          >
            Send Reset Email
          </button>

        

          <div className="flex flex-row">
            <h6 className="text-gray-700 ml-10 mt-5">
              Don't have an account?
            </h6>
            <h6
              className="text-[#ECA49C] underline mt-5 ml-2"
              onClick={() => router.replace("/signup")}
            >
              Sign Up!
            </h6>
          </div>
        </div>

        <div className="flex flex-row mx-10">
          <img
            src="https://images.squarespace-cdn.com/content/v1/64acedcb87ea253648175060/06ec9fc6-ccee-40f8-a3a6-b10101a47da2/Self-Love-Digital-Journal.jpg?format=2500w"
            className="h-105 w-110"
          />
        </div>
      </div>
    </div>
  );
}