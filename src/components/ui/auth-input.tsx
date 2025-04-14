import { cn } from "@/lib/utils"
import { type InputHTMLAttributes, forwardRef } from "react"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className="mb-4 w-full">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-200 mb-1.5">
        {label}
      </label>
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200",
          error && "border-red-500 focus:ring-red-500",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
})

FormInput.displayName = "FormInput"
