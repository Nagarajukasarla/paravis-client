import React from "react";

interface AttendanceEntryProps {
    index: number;
    inTime: string;
    outTime: string;
    isActive?: boolean;
}

const AttendanceEntry: React.FC<AttendanceEntryProps> = ({ index, inTime, outTime, isActive = false }) => {
    const timeColor = outTime === "--- ---" ? "text-gray-400" : "text-red-500";

    return (
        <div
            className={`flex items-center justify-between bg-white rounded-xl px-4 py-3 mb-3 shadow-sm border
                ${isActive ? "ring-2 ring-blue-500 bg-blue-50" : ""}
            `}
        >
            {/* Index Circle */}
            <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-white text-sm
                    ${isActive ? "bg-blue-600" : "bg-gray-400"}
                `}
            >
                {index}
            </div>

            {/* IN/OUT Times */}
            <div className="flex flex-col flex-1 ml-4 text-sm">
                <div className="flex justify-between">
                    <p className="text-gray-800 font-medium">
                        IN: <span className="text-blue-600">{inTime}</span>
                    </p>
                    <p className="text-gray-800 font-medium">
                        OUT: <span className={timeColor}>{outTime}</span>
                    </p>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>IN: {inTime}</span>
                    <span>OUT: {outTime === "--- ---" ? "--- ---" : outTime}</span>
                </div>
            </div>
        </div>
    );
};

export default AttendanceEntry;
