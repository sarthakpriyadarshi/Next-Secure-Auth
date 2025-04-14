"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {useState} from "react";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log("User details", res.data);
        setData(res.data.data._id);
        toast.success("User details fetched successfully", { duration: 2000 });
    }

    async function handleLogout() {
        try {
            const res = await axios.get("/api/users/logout");
            console.log("Logout success", res.data);
            toast.success("Logout successful", { duration: 2000 });
            router.push('/login') // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="font-bold text-2xl">Profile</h1>
            <h2 className="text-white-400 bg-blue-900">{data=== 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <p className="text-gray-400">Welcome to your profile page!</p>
            <p className="text-gray-400">Here you can view and edit your profile information.</p>
            <button className="bg-blue-500 text-white rounded-md p-2 mb-4" onClick={getUserDetails}>Get User Details</button>
            <button className="bg-blue-500 text-white rounded-md p-2 mb-4" onClick={handleLogout}>Logout</button>
        </div>
    )
}