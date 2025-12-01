"use client";
import { login, createAccount, resetEmail,logout } 
from "./core/auth";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
   <div className="md:flex flex-row flex-col bg-white dark:bg-black md:h-screen  md:mt-10 -mt-40 ">
                   
                     <div className="md:ml-130 ml-10">  <h1 className="text-black dark:text-white text-3xl font-bold  md:mt-25 mt-90 font-[marcellus] ">Digital Diary</h1></div>
                   <div className="md:-ml-63 ml-11"> <h6 className="text-gray-700 dark:text-gray-500 md:mt-38 mt-5  font-[lato]">Enter your email and password</h6></div>
                    <div className="flex flex-col md:-ml-56 ml-10">
                        <input className="md:w-90 w-70 h-13 bg-gray-300 text-black rounded-[5px] md:mt-50 mt-5 px-7 "type="email"placeholder="Email*" onChange={(e) => setEmail(e.target.value)}
                        />
                         <input className="md:w-90 w-70 h-13 bg-gray-300 text-black rounded-[5px] mt-5 items-center justify-center px-7 " type="password"placeholder="xxxxxx"onChange={(e)=>setPassword(e.target.value)}
                       />
                        <button className="md:w-50 w-40 h-13 bg-gray-800 rounded-[5px] mt-5 text-white  justify-center items-center md:mx-20  hover:bg-[#7b4c2b]"onClick={async(event)=>{
                          console.log(email,password);
                          await login (email,password);
                        }}>Login
                      </button>
                      <button className="md:w-50 w-40 h-13 bg-gray-800 rounded-[5px] mt-5 text-white  justify-center items-center md:mx-20   hover:bg-[#7b4c2b]"onClick={async(event)=>{
                          console.log(email,password);
                          await createAccount (email,password);
                       0 }}>Sign Up
                      </button>
                      <button className="md:w-50 w-50 h-13 bg-gray-800 rounded-[5px] mt-5  text-white justify-center items-center md:mx-20 hover:bg-[#7b4c2b]"onClick={async(event)=>{
                          console.log(email,password);
                          await resetEmail(email,password);
                        }}>Send Reset Email
                      </button>
                       <div className=" flex flex-row ">  <h6 className="text-gray-700 dark:text-gray-500 md:ml-0 ml-2 mt-5 "> Don't have an account?</h6><h6 className="text-red-500 underline mt-5 ml-2"> Register Now!</h6></div>
                    </div>
           </div>
  );
}
