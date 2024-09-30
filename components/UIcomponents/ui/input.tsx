import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
            className={ cn(
          "flex h-12 w-full rounded-lg border border-neutral-200 text-neutral-700 bg-white px-4 py-6 text-lg file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-neutral-300 placeholder:text-base focus-visible:outline-none focus-visible:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary-300 transition-[border] ease-in-out",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
