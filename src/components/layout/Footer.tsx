import { HistoryIcon, MarkIcon } from "@/assests/icons";
import type { BasicContainerProps } from "@/types/component";
import { cn } from "@/utils/tailwindMerge";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

interface FooterProps extends BasicContainerProps { }

export const Footer: FC<FooterProps> = ({ className }) => {
    const currentPath = window.location.pathname;

    const navigate = useNavigate();
    const navigateTo = (path: string) => {
        if (currentPath !== path) {
            navigate(path);
        }
    };
    // get current path
    console.log(currentPath);
    const activeClass = "border-t border-blue-600 font-bold text-primary-active";

    return (
        <div className={cn("fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-blue-100 to-blue-200", className)}>
            <div className="flex justify-center">
                <button className={cn("flex bg-transparent text-primary-hover  flex-1 justify-center items-center py-2 px-4",
                    currentPath === "/" ? activeClass : "")}
                    onClick={() => navigateTo("/")}
                >
                    <HistoryIcon className="w-6 h-6" />
                    <p className="ml-2">Mark</p>
                </button>

                <button className={cn("flex bg-transparent text-primary-hover flex-1 justify-center items-center py-2 px-4",
                    currentPath === "/history" ? activeClass : "")}
                    onClick={() => navigateTo("/history")}
                >
                    <MarkIcon className="w-6 h-6" />
                    <p className="ml-2">History</p>
                </button>
            </div>
        </div>
    );
};

export default Footer;
