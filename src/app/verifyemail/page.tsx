"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { AuthLayout } from "@/components/ui/auth-layout"
import { AuthCard } from "@/components/ui/auth-card"
import { LoadingButton } from "@/components/ui/loading-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>("")
  const [verified, setVerified] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  const verifyUserEmail = async (): Promise<void> => {
    try {
      setLoading(true)
      await axios.post("/api/users/verifyEmail", { token })
      setVerified(true)
      setError("")
    } catch (error:unknown) {
      console.error(error)
      setError("Invalid or expired token. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    } else {
      setLoading(false)
    }
  }, [token])

  return (
    <AuthLayout title="Email Verification" subtitle="Verifying your email address">
      <AuthCard>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 text-green-300 animate-spin mb-4" />
            <p className="text-gray-400">Verifying your email address...</p>
          </div>
        ) : verified ? (
          <div className="space-y-6">
            <Alert className="bg-green-900/20 border-green-800 text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your email has been verified successfully!</AlertDescription>
            </Alert>

            <div className="text-center">
              <LoadingButton onClick={() => router.push("/login")}>Continue to login</LoadingButton>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Alert className="bg-red-900/20 border-red-800 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>

            <div className="text-center">
              <p className="text-gray-400 mb-4">
                If you&apos;re having trouble verifying your email, please try again or contact support.
              </p>
              <Link href="/login" className="text-green-300 hover:underline">
                Return to login
              </Link>
            </div>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  )
}
