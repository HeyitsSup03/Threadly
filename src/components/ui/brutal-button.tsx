import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "brutal-btn inline-flex items-center justify-center whitespace-nowrap text-lg font-bold uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
        accent: "bg-accent text-white hover:bg-accent/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border-4 border-primary bg-white text-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-primary hover:text-white",
      },
      size: {
        default: "px-6 py-2",
        sm: "px-4 py-1 text-base",
        lg: "px-8 py-3 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const BrutalButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

BrutalButton.displayName = "BrutalButton";

export { BrutalButton, buttonVariants };
