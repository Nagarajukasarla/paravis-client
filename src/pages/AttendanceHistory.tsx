import SSelect from "@/components/core/CSelect";
import AttendanceEntry from "@/components/feature/AttendanceEntry";
import type { Option } from "@/types/component";
import React, { useState } from "react";

const AttendanceHistory: React.FC = () => {
    const [filter, setFilter] = useState<Option>({ key: "month", label: "This Month", value: "month" });

    const filterOptions: Option[] = [
        { key: "week", label: "This Week", value: "week" },
        { key: "month", label: "This Month", value: "month" },
        { key: "prevMonth", label: "Previous Month", value: "prevMonth" },

    ];

    const attendanceData = [
        { index: 1, inTime: "09:02 AM", outTime: "05:00 PM", isActive: true },
        { index: 2, inTime: "08:09 AM", outTime: "06:00 PM" },
        { index: 3, inTime: "08:59 AM", outTime: "06:00 PM" },
        { index: 4, inTime: "09:01 AM", outTime: "06:00 PM" },
        { index: 5, inTime: "09:01 AM", outTime: "--- ---" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#0E1425] px-4 py-8">
            <div className="w-full max-w-md">
                {/* Filter Dropdown */}
                <div className="flex justify-end mb-6">
                    <SSelect
                        options={filterOptions}
                        value={filter}
                        placeholder="Select Filter"
                        onValueChange={setFilter}
                    />
                </div>

                {/* Attendance Records */}
                <div className="space-y-3">
                    {attendanceData.map((record) => (
                        <AttendanceEntry
                            key={record.index}
                            index={record.index}
                            inTime={record.inTime}
                            outTime={record.outTime}
                            isActive={record.isActive}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttendanceHistory;
