"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleForgotPassword() {
        if (!email) {
            setError("Please enter your email address.");
            setSuccess(null);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("/api/users/sendResetEmail", { email });
            setSuccess(res.data.message || "Reset link sent successfully.");
            setError(null);
            console.log("Forgot password success", res.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
            setSuccess(null);
            console.error("Forgot password failed", err);
        } finally {
            setLoading(false);
        }
    }

    function handleLogin() {
        router.push("/login");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
            <h2 className="text-gray-300 mb-6">Enter your email address to receive a reset link.</h2>
            
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 text-white rounded-md p-2 mb-4 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}

            <button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 mb-4 w-full max-w-sm disabled:opacity-50"
                onClick={handleForgotPassword}
                disabled={loading}
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <button
                className="text-blue-300 hover:underline"
                onClick={handleLogin}
            >
                Back to Login
            </button>
        </div>
    );
}
