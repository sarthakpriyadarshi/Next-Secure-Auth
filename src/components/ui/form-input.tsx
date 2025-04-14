import { cn } from "@/lib/utils"
import { type InputHTMLAttributes, forwardRef } from "react"

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    // Generate a unique ID if none is provided
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`

    return (
      <div className="mb-4 w-full">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-200 mb-1.5">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500" id={`${inputId}-error`} role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-400" id={`${inputId}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"
