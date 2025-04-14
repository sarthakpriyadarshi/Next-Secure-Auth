"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');

    const verifyUserEmail = async () => {
        try {
            const res = await axios.post("/api/users/verifyEmail", { token });
            console.log("Email verified successfully", res.data);
            setVerified(true);
        } catch (error) {
            setError("Invalid or expired token. Please try again.");
            console.error("Email verification failed", error);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || '');
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="font-bold text-2xl">Verify Email</h1>
            <h2>{token ? `${token}`: "no token"}</h2>
            {verified && <p className="text-green-500">Email verified successfully!</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}