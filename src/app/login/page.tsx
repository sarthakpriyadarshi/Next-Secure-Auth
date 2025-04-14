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
import { ArrowRight, LogIn } from "lucide-react"

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

export default function LoginPage() {
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
    if (!user.username) newErrors.username = "Username is required"

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const onLogin = async (): Promise<void> => {
    if (!validateForm()) return

    try {
      setLoading(true)
      const res = await axios.post("/api/users/login", user)

      if (res.data.success) {
        toast.success("Login successful")
        router.push("/profile")
      } else {
        toast.error(res.data.message || "Login failed")
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Login failed")
      }
      console.error("Login error:", error)
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
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      <AuthCard>
        <div className="space-y-4">
          <FormInput
            label="Username"
            id="username"
            type="text"
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            value={user.password}
            error={errors.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <div className="flex justify-end">
            <Link href="/forgotpassword" className="text-sm text-primary hover:underline transition-colors">
              Forgot password?
            </Link>
          </div>

          <LoadingButton
            loading={loading}
            loadingText="Signing in..."
            disabled={isButtonDisabled}
            onClick={onLogin}
            className="mt-2"
          >
            <LogIn className="mr-2 h-4 w-4" /> Sign in
          </LoadingButton>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline transition-colors inline-flex items-center">
              Sign up <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
