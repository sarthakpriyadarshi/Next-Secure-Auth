"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"
import { LogOut, User, Settings, Shield, Mail, UserCircle } from "lucide-react"
import { LoadingButton } from "@/components/ui/loading-button"

interface UserData {
  _id?: string
  username?: string
  email?: string
  [key: string]: unknown
}


export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingAction, setLoadingAction] = useState<boolean>(false)

  const getUserDetails = async (): Promise<void> => {
    try {
      setLoadingAction(true)
      const res = await axios.get("/api/users/me")
      setUserData(res.data.data)
      toast.success("User details fetched successfully")
    } catch (error) {
      toast.error("Failed to fetch user details")
      console.error("Error fetching user details:", error)
    } finally {
      setLoadingAction(false)
    }
  }

  async function handleLogout(): Promise<void> {
    try {
      setLoadingAction(true)
      await axios.get("/api/users/logout")
      toast.success("Logged out successfully")
      router.push("/login")
    } catch (error) {
      toast.error("Failed to log out")
      console.error("Logout failed:", error)
    } finally {
      setLoadingAction(false)
    }
  }

  useEffect(() => {
    const fetchInitialData = async (): Promise<void> => {
      try {
        const res = await axios.get("/api/users/me")
        setUserData(res.data.data)
      } catch (error) {
        console.error("Error fetching initial user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Your Profile</h1>
          <LoadingButton onClick={handleLogout} loading={loadingAction} loadingText="Logging out...">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </LoadingButton>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="col-span-1">
            <div className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg shadow-xl border border-white/10">
              <div className="flex flex-col items-center p-8">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 text-green-300">
                  <UserCircle className="h-16 w-16" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">{userData?.username || "User"}</h2>
                <p className="text-gray-400">{userData?.email || "No email"}</p>

                {userData?._id && (
                  <Link
                    href={`/profile/${userData._id}`}
                    className="mt-4 inline-flex items-center text-sm text-green-300 hover:underline"
                  >
                    <User className="mr-1 h-3 w-3" /> View public profile
                  </Link>
                )}
              </div>

              <div className="border-t border-white/10 p-4">
                <LoadingButton
                  className="outline w-full"
                  onClick={getUserDetails}
                  loading={loadingAction}
                  loadingText="Refreshing..."
                >
                  <Shield className="mr-2 h-4 w-4" /> Refresh user data
                </LoadingButton>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg shadow-xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>

              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-gray-400">User ID</p>
                  <p className="font-mono text-white bg-gray-800/50 p-2 rounded overflow-x-auto">
                    {userData?._id || "Not available"}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm text-gray-400">Username</p>
                    <div className="flex items-center space-x-2 bg-gray-800/50 p-2 rounded">
                      <User className="h-4 w-4 text-gray-400" />
                      <p className="text-white">{userData?.username || "Not set"}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <p className="text-sm text-gray-400">Email</p>
                    <div className="flex items-center space-x-2 bg-gray-800/50 p-2 rounded">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-white">{userData?.email || "Not set"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-gray-400">Account Status</p>
                  <div className="flex items-center space-x-2 bg-gray-800/50 p-2 rounded">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <p className="text-white">Active</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <LoadingButton className="flex-1">
                  <Settings className="mr-2 h-4 w-4" /> Edit Profile
                </LoadingButton>
                <LoadingButton className="flex-1">
                  <Shield className="mr-2 h-4 w-4" /> Security Settings
                </LoadingButton>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg shadow-xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <LogOut className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white">Last login</p>
                      <p className="text-sm text-gray-400">Today at 10:30 AM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white">Email verified</p>
                      <p className="text-sm text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white">Account created</p>
                      <p className="text-sm text-gray-400">7 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
