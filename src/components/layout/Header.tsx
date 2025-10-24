import type { FC } from "react";
import type { BasicContainerProps } from "@/types/component";
import { cn } from "@/utils/tailwindMerge";
import { useNavigate } from "react-router-dom";

interface HeaderProps extends BasicContainerProps { }

const Header: FC<HeaderProps> = ({ className }) => {
    const navigate = useNavigate();
    const navigateToProfile = () => navigate("/profile");
    return (
        <div className={cn("bg-blue-700 text-white p-2 border-b", className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center ">
                    <img src="/images/Parvis.png" className="rounded-full w-10 h-10 mr-2" alt="Parvis" />
                    <h1 className="text-xl font-bold">Parvis</h1>
                </div>
                <div className="flex items-center">
                    <button className="text-white px-4 py-2 rounded" onClick={navigateToProfile}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                            <path
                                d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;