import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
}

export function LoadingButton({ children, loading, loadingText, className, ...props }: LoadingButtonProps) {
  return (
    <Button className={cn("w-full", className)} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || "Loading..."}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
