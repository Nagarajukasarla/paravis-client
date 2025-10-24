import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/tailwindMerge";

// updated to only use theme-defined colors
const inputVariants = cva(
    "flex w-full rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            size: {
                default: "h-10 px-3 py-2",
                sm: "h-9 px-2.5 py-1.5",
                lg: "h-11 px-5 py-3",
            },
            variant: {
                primary: "bg-background text-foreground border border-border-normal",
                link: "bg-transparent underline underline-offset-4 text-primary",
            },
        },
        defaultVariants: {
            size: "default",
            variant: "primary",
        },
    }
);

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
        VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { className, size, variant, ...rest } = props;
    return <input className={cn(inputVariants({ size, variant }), className)} ref={ref} {...rest} />;
});

Input.displayName = "Input";

export default Input;
