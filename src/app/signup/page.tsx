'use client';
//used for making requests
import axios from "axios";

//base imports
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import loadConfig from "next/dist/server/config";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [button, buttonDisabled] = React.useState(false);
    
    const onSignUp = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user);
            console.log("Signup success", res.data);
            router.push("/login")
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(user.email && user.password && user.username) {
            buttonDisabled(false)
        } else {
            buttonDisabled(true)
        }
    }, [user])


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="font-bold text-2xl">{loading? "Processing": "Sign Up"}</h1>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="border-2 border-gray-300 rounded-md p-2 mb-4" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="border-2 border-gray-300 rounded-md p-2 mb-4" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="border-2 border-gray-300 rounded-md p-2 mb-4" />
            <button onClick={onSignUp} className="bg-blue-500 text-white rounded-md p-2 mb-4" disabled={button}>Sign Up</button>
            <p>Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>
        </div>
    )

}