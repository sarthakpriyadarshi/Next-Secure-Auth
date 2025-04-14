"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { User, Mail, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserData {
  _id?: string
  username?: string
  email?: string
  [key: string]: unknown
}

interface ProfilePageProps {
  params: {
    id: string
  }
}


export default function ProfilePage({ params }: ProfilePageProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        // This is a placeholder - in a real app, you'd have an API endpoint to fetch user by ID
        const res = await axios.get("/api/users/me")
        setUserData(res.data.data)
      } catch (error) {
        setError("Failed to load user profile")
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-pulse rounded-full bg-primary/20"></div>
          <p className="mt-4 text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
        <div className="max-w-md rounded-xl bg-white/5 backdrop-blur-lg shadow-xl border border-white/10 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <User className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Profile Not Found</h1>
          <p className="text-gray-400 mb-6">
            The user profile you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
          </p>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Your Profile
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg shadow-xl border border-white/10">
          <div className="relative h-48 bg-gradient-to-r from-primary/20 to-primary/10">
            <div className="absolute -bottom-16 left-8">
              <div className="h-32 w-32 rounded-full border-4 border-gray-900 bg-gray-800 flex items-center justify-center">
                <User className="h-16 w-16 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-20 px-8 pb-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">{userData?.username || "User"}</h1>
              <p className="text-gray-400">User ID: {params.id}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="rounded-lg bg-gray-800/50 p-4">
                  <h3 className="mb-4 text-lg font-medium text-white">User Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                        <User className="h-5 w-5 text-gray-300" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Username</p>
                        <p className="text-white">{userData?.username || "Not available"}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                        <Mail className="h-5 w-5 text-gray-300" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white">{userData?.email || "Not available"}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                        <Calendar className="h-5 w-5 text-gray-300" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Member Since</p>
                        <p className="text-white">April 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-gray-800/50 p-4">
                  <h3 className="mb-4 text-lg font-medium text-white">Activity</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                      <p className="text-gray-300">Last active</p>
                      <p className="text-sm text-gray-400">Today</p>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                      <p className="text-gray-300">Posts</p>
                      <p className="text-sm text-gray-400">0</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-gray-300">Comments</p>
                      <p className="text-sm text-gray-400">0</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-800/50 p-4">
                  <h3 className="mb-4 text-lg font-medium text-white">Bio</h3>
                  <p className="text-gray-300">No bio available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
