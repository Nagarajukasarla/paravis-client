import Input, { type InputProps } from "@/components/ui/Input";
import { cn } from "@/utils/tailwindMerge";
import { forwardRef } from "react";

type IconPosition = "left" | "right";

interface CInputProps extends Omit<InputProps, 'onChange' | 'className'> {
    value: any;
    placeholder?: string;
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
    styles?: string;
}

const CInput = forwardRef<HTMLInputElement, CInputProps>(({ 
    value, 
    placeholder, 
    onChange, 
    icon, 
    iconPosition = "left", 
    styles,
    ...restProps 
}, ref) => {
    const inputPadding = icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : "";

    return (
        <div className="relative">
            <Input
                ref={ref}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={cn(inputPadding, styles)}
                {...restProps}
            />
            {icon && (
                <div className={`absolute inset-y-0 flex items-center pointer-events-none ${iconPosition === "left" ? "left-0 pl-3" : "right-0 pr-3"}`}>
                    {icon}
                </div>
            )}
        </div>
    );
});

CInput.displayName = "CInput";
export default CInput;
