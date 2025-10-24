import type { FC } from "react";
import { cn } from "@/utils/tailwindMerge";
import type { BasicContainerProps } from "@/types/component";
import { HistoryIcon, MarkIcon } from "@/assests/icons";
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
    const activeRoute = currentPath === "/" ? "Mark" : "View";
    const activeClass = "bg-blue-600 font-semibold";
    return (
        <div className={cn("fixed bottom-0 left-0 right-0 z-50 text-white", className)}>
            <div className="flex justify-center">
                <button className={cn("flex bg-blue-500 flex-1 justify-center items-center py-2 px-4",
                    activeRoute === "Mark" ? activeClass : "")}
                    onClick={() => navigateTo("/")}
                >
                    <HistoryIcon className="w-6 h-6" />
                    <p className="ml-2">Mark</p>
                </button>

                <button className={cn("flex bg-blue-500 flex-1 justify-center items-center py-2 px-4",
                    activeRoute === "View" ? activeClass : "")}
                    onClick={() => navigateTo("/history")}
                >
                    <MarkIcon className="w-6 h-6" />
                    <p className="ml-2">View</p>
                </button>
            </div>
        </div>
    );
};

export default Footer;
