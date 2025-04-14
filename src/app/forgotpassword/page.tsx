"use client"

import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { AuthLayout } from "@/components/ui/auth-layout"
import { AuthCard } from "@/components/ui/auth-card"
import { FormInput } from "@/components/ui/form-input"
import { LoadingButton } from "@/components/ui/loading-button"
import { ArrowLeft, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  async function handleForgotPassword(): Promise<void> {
    if (!email) {
      setError("Please enter your email address.")
      setSuccess(null)
      return
    }

    try {
      setLoading(true)
      const res = await axios.post("/api/users/sendResetEmail", { email })
      setSuccess(res.data.message || "Reset link sent successfully. Please check your email.")
      setError(null)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred. Please try again.")
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
      setSuccess(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email address to receive a reset link">
      <AuthCard>
        {success && (
          <Alert className="mb-6 bg-green-900/20 border-green-800 text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 bg-red-900/20 border-red-800 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <FormInput
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <LoadingButton loading={loading} loadingText="Sending..." onClick={handleForgotPassword}>
            <Mail className="mr-2 h-4 w-4" /> Send reset link
          </LoadingButton>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-green-300 hover:underline transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-1 h-3 w-3" /> Back to login
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
