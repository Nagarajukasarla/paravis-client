import { cn } from "@/utils/tailwindMerge";
import type { ButtonHTMLAttributes } from "react";
import type React from "react";

interface CButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const CButton: React.FC<CButtonProps> = ({ children, className, onClick, ...props }) => {
    return (
        <button
            className={cn(
                "bg-primary text-white border border-primary",
                "rounded-lg",
                "h-[max-content] w-[max-content]",
                "py-2 px-2",
                "hover:bg-primary-hover hover:border-primary-hover",
                "active:bg-primary-active active:border-primary-active",
                "text-text-t2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            onClick={onClick}
            {...props}
        >
            {children || "Button"}
        </button>
    );
};

export default CButton;
