import { Timer } from "lucide-react";

interface AttendanceSummaryProps {
    totalDays: number;
}

export default function AttendanceSummary({ totalDays }: AttendanceSummaryProps) {
    return (
        <div className="w-full bg-blue-500 text-white p-3 flex items-center justify-between relative overflow-hidden">
            
            {/* Background faded icon */}
            <Timer
                className="absolute left-2 top-1/2 -translate-y-1/2 w-20 h-20 opacity-20"
                strokeWidth={1.5}
            />

            {/* Text Section */}
            <div className="ml-28 flex items-end">
                <span className="text-sm opacity-90 mr-3">Attendance</span>
                <span className="text-3xl font-bold mr-3 ">{totalDays}</span>
                <span className="text-sm opacity-90">Days</span>
            </div>
        </div>
    );
}
