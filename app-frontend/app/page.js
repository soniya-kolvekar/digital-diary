"use client";
import { login, createAccount, resetEmail,logout } 
from "./core/auth";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
<div className="flex flex-row bg-gradient-to-b from-[#C8E0F5] via-[#F3C9D8] to-[#FBC7E0]">
   <div className="md:flex flex-row flex-col   md:h-screen   md:mt-10 -mt-40 ">
            
                     <div className="md:ml-140 ml-10 flex  justify-items items-center">  <h1 className="text-black text-3xl font-bold -mt-180  font-[marcellus] -mx-60 ">Digital Diary</h1></div>
                   <div className="md:-ml-63 ml-11"> <h6 className="text-gray-700 md:mt-38 mt-5  font-[lato] ">Enter your email and password</h6></div>
                    <div className="flex flex-col md:-ml-56 ml-10">
                        <input className="md:w-90 w-70 h-13 bg-[#E3E8F0] text-black rounded-[5px] md:mt-50 mt-5 px-7 "type="email"placeholder="Email*" onChange={(e) => setEmail(e.target.value)}
                        />
                         <input className="md:w-90 w-70 h-13 bg-[#E3E8F0] text-black rounded-[5px] mt-5 items-center justify-center px-7 " type="password"placeholder="xxxxxx"onChange={(e)=>setPassword(e.target.value)}
                       />
                        <button className="md:w-50 w-40 h-13 bg-[#ECA49C]  rounded-[5px] mt-5 text-black hover:text-white justify-center items-center md:mx-20  hover:bg-[#7b4c2b]"onClick={async(event)=>{
                          console.log(email,password);
                          await login (email,password);
                        }}>Login
                      </button>
                      <button className="md:w-50 w-40 h-13  bg-[#ECA49C] rounded-[5px] mt-5 text-black hover:text-white justify-center items-center md:mx-20   hover:bg-[#7b4c2b]"onClick={async(event)=>{
                          console.log(email,password);
                          await createAccount (email,password);
                       0 }}>Sign Up
                      </button>
                      <button className="md:w-50 w-50 h-13 bg-[#ECA49C] rounded-[5px] mt-5  text-black hover:text-white justify-center items-center md:mx-20 hover:bg-[#7b4c2b]"onClick={async(event)=>{
                          console.log(email,password);
                          await resetEmail(email,password);
                        }}>Send Reset Email
                      </button>
                      
                       <div className=" flex flex-row ">  <h6 className="text-gray-700 md:ml-0 ml-2 mt-5 "> Don't have an account?</h6><h6 className="text-red-500 underline mt-5 ml-2"> Register Now!</h6></div>
                   
                    </div>
                    
           </div>
            <div className="flex flex-row mx-10 ">   <img src="https://images.squarespace-cdn.com/content/v1/64acedcb87ea253648175060/06ec9fc6-ccee-40f8-a3a6-b10101a47da2/Self-Love-Digital-Journal.jpg?format=2500w"className="h-130 w-130 mt-35"/></div>   
                   
           </div>
          
  );
}
