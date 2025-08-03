import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-lime-600 text-white hover:bg-lime-700 hover:shadow-md hover:-translate-y-0.5 shadow-sm",
        destructive: "bg-red-600 text-white hover:bg-red-700 hover:shadow-md hover:-translate-y-0.5 shadow-sm",
        outline: "border-2 border-lime-600 text-lime-600 bg-transparent hover:bg-lime-600 hover:text-white hover:shadow-md hover:-translate-y-0.5",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md hover:-translate-y-0.5 border border-gray-200",
        ghost: "hover:bg-lime-50 hover:text-lime-900 text-gray-700",
        link: "text-lime-600 underline-offset-4 hover:underline hover:text-lime-700",
        agricultural: "text-white shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700",
        professional: "bg-white text-lime-600 border-2 border-lime-600 hover:bg-lime-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-16 px-12 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }