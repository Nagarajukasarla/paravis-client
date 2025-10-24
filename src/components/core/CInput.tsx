import Input from "@/components/ui/Input";
import { cn } from "@/utils/tailwindMerge";

type IconPosition = "left" | "right";

interface CInputProps {
    value: any;
    placeholder?: string;
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
    styles?: string;
}

const CInput: React.FC<CInputProps> = ({ value, placeholder, onChange, icon, iconPosition = "left", styles }) => {
    const inputPadding = icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : "";

    return (
        <div className="relative">
            <Input
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={cn(inputPadding, styles)}
            />
            {icon && (
                <div className={`absolute inset-y-0 flex items-center pointer-events-none ${iconPosition === "left" ? "left-0 pl-3" : "right-0 pr-3"}`}>
                    {icon}
                </div>
            )}
        </div>
    );
};

export default CInput;
