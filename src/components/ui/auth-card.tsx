import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AuthCardProps {
  children: ReactNode
  className?: string
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div className={cn(
      "w-full max-w-md mx-auto overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg shadow-xl border border-white/10 p-8",
      className
    )}>
      {children}
    </div>
  )
}
