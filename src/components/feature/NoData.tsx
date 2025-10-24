import React from "react";

interface NoDataProps {
    /**
     * Title of the no data message
     */
    title?: string;
    /**
     * Message of the no data message
     */
    message?: string;
    /**
     * Custom icon to display (optional)
     */
    icon?: React.ReactNode;
}

/**
 * No data component
 */
const NoData: React.FC<NoDataProps> = ({
    title = "No Data Found",
    message = "No data available",
    icon = (
        <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    ),
}) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-5 box-border">
            <div className="flex flex-col items-center text-center max-w-md">
                <div className="mb-4">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-200 mb-1">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default NoData;