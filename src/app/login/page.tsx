'use client';
//used for making requests
import axios from "axios";

//base imports
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import loadConfig from "next/dist/server/config";

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [isButtonDisabled, setButtonDisabled] = React.useState(false);
    console.log(isButtonDisabled)
    const onLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/login", user);
            console.log("Login success", res.data);
            if(res.data.success) {
                toast.success("Login successful")
                setLoading(false);
                router.push("/profile")
            } else {
                console.log("Login failed", res.data.message);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(user.email && user.password && user.username) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="font-bold text-2xl">{loading? "Processing": "Login"}</h1>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="border-2 border-gray-300 rounded-md p-2 mb-4" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="border-2 border-gray-300 rounded-md p-2 mb-4" />
            <button onClick={onLogin} className="bg-blue-500 text-white rounded-md p-2 mb-4 disabled={isButtonDisabled}">Login</button>
            <Link href="/forgotpassword" className="text-blue-500">Forgot Password?</Link>
            <p>Dont have an Account? <Link href="/signup" className="text-blue-500">Sign Up</Link></p>
        </div>
    )

}