import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-dark focus:ring-primary/20",
        destructive:
          "bg-error text-white shadow-sm hover:bg-error-dark focus:ring-error/20",
        outline:
          "border border-border bg-background text-foreground shadow-sm hover:bg-muted hover:text-foreground focus:ring-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-dark focus:ring-secondary/20",
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground focus:ring-primary/20",
        link: "text-primary underline-offset-4 hover:underline focus:ring-primary/20",
        success:
          "bg-success text-white shadow-sm hover:bg-success-dark focus:ring-success/20",
        warning:
          "bg-warning text-white shadow-sm hover:bg-warning-dark focus:ring-warning/20",
        info:
          "bg-info text-white shadow-sm hover:bg-info-dark focus:ring-info/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
