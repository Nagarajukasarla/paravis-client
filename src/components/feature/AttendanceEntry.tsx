import React from "react";

export type MarkColor = "blue" | "red" | "gray";

interface AttendanceEntryProps {
    index: number;
    inTime: string;
    outTime: string;
    markColor?: MarkColor;
}

const AttendanceEntry: React.FC<AttendanceEntryProps> = ({ index, inTime, outTime, markColor = "gray" }) => {
    // const timeColor = outTime === "--- ---" ? "text-gray-400" : "text-red-500";

    const entryColor = {
        "blue": "ring-1 ring-blue-500 bg-blue-50",
        "red": "ring-1 ring-red-500 bg-red-50",
        "gray": "ring-1 ring-gray-500 bg-gray-50"
    }[markColor];

    const markColorClass = {
        "blue": "bg-blue-600",
        "red": "bg-red-600",
        "gray": "bg-gray-400"
    }[markColor];

    return (
        <div
            className={`flex items-center justify-between bg-white rounded-xl px-4 py-3 mb-3 shadow-sm border
                ${entryColor}`}
        >
            {/* Index Circle */}
            <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-white text-sm
                    ${markColorClass}
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
                        OUT: <span className="text-blue-600">{outTime}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AttendanceEntry;
