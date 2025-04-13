import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const cardVariants = cva(
  "brutal-border bg-white p-6 relative",
  {
    variants: {
      variant: {
        default: "bg-white",
        secondary: "bg-secondary text-white",
        accent: "bg-accent text-white",
        destructive: "bg-destructive text-white",
      },
      hover: {
        default: "thread-item",
        none: "",
      }
    },
    defaultVariants: {
      variant: "default",
      hover: "default",
    },
  }
);

export interface BrutalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const BrutalCard = React.forwardRef<HTMLDivElement, BrutalCardProps>(
  ({ className, variant, hover, asChild = false, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(cardVariants({ variant, hover, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

BrutalCard.displayName = "BrutalCard";

export { BrutalCard, cardVariants };
