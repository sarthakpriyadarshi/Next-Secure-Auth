"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState('');
    const [reset, setReset] = useState(false);
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const resetPassword = async () => {
        try {
            const res = await axios.post("/api/users/forgotPassword", { token, password, confirmPassword });
            if(res.data.success) {
                console.log("Password Reset Sucessful")
                setReset(true);
            }
            console.log("Password Reset Successful", res.data);
            router.push("/login")
            console.log(error)
        } catch (error) {
            setError("Invalid or expired token. Please try again.");
            console.error("Password Reset Failed", error);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || '');
    }, []);


    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="font-bold text-2xl">Reset Password</h1>
            <h2>{token ? `${token}`: "no token"}</h2>
            <label htmlFor="password">New Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-300 rounded-md p-2 mb-4" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border-2 border-gray-300 rounded-md p-2 mb-4" />
            <button onClick={resetPassword} className="bg-blue-500 text-white rounded-md p-2 mb-4">Reset Password</button>
        </div>
    )
}