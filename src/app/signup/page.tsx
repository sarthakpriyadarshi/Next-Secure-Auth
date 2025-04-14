"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { AuthLayout } from "@/components/ui/auth-layout"
import { AuthCard } from "@/components/ui/auth-card"
import { FormInput } from "@/components/ui/form-input"
import { LoadingButton } from "@/components/ui/loading-button"
import { ArrowRight, UserPlus } from "lucide-react"

interface UserData {
  email: string
  password: string
  username: string
}

interface FormErrors {
  email: string
  password: string
  username: string
}

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData>({
    email: "",
    password: "",
    username: "",
  })
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
    username: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: "",
      password: "",
      username: "",
    }

    if (!user.email) newErrors.email = "Email is required"
    if (!user.password) newErrors.password = "Password is required"
    if (user.password && user.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (!user.username) newErrors.username = "Username is required"

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const onSignUp = async (): Promise<void> => {
    if (!validateForm()) return

    try {
      setLoading(true)
      await axios.post("/api/users/signup", user)
      toast.success("Account created successfully! Please check your email to verify your account.")
      router.push("/login")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Signup failed")
      } else {
        toast.error("An unexpected error occurred")
      }
      console.error("Signup error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <AuthLayout title="Create an account" subtitle="Sign up to get started with our platform">
      <AuthCard>
        <div className="space-y-4">
          <FormInput
            label="Username"
            id="username"
            type="text"
            placeholder="Choose a username"
            value={user.username}
            error={errors.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <FormInput
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            error={errors.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <FormInput
            label="Password"
            id="password"
            type="password"
            placeholder="Create a password"
            value={user.password}
            error={errors.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <LoadingButton
            loading={loading}
            loadingText="Creating account..."
            disabled={isButtonDisabled}
            onClick={onSignUp}
            className="mt-2"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Create account
          </LoadingButton>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline transition-colors inline-flex items-center">
              Sign in <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
