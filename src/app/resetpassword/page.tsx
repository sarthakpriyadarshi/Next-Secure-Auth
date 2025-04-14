"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { AuthLayout } from "@/components/ui/auth-layout"
import { AuthCard } from "@/components/ui/auth-card"
import { FormInput } from "@/components/ui/form-input"
import { LoadingButton } from "@/components/ui/loading-button"
import { KeyRound } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string>("")
  const [reset, setReset] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const validatePasswords = (): boolean => {
    if (!password) {
      setError("Password is required")
      return false
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const resetPassword = async (): Promise<void> => {
    if (!validatePasswords()) return

    try {
      setLoading(true)
      const res = await axios.post("/api/users/forgotPassword", {
        token,
        password,
        confirmPassword,
      })

      if (res.data.success) {
        setReset(true)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (error: unknown) {
      setError("Invalid or expired token. Please try again.")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  return (
    <AuthLayout title="Reset Password" subtitle="Create a new password for your account">
      <AuthCard>
        {error && (
          <Alert className="mb-6 bg-red-900/20 border-red-800 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {reset ? (
          <Alert className="mb-6 bg-green-900/20 border-green-800 text-green-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Password reset successful! Redirecting to login...</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <FormInput
              label="New Password"
              id="password"
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormInput
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <LoadingButton loading={loading} loadingText="Resetting..." onClick={resetPassword}>
              <KeyRound className="mr-2 h-4 w-4" /> Reset Password
            </LoadingButton>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  )
}
