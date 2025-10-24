import React from "react";
import CameraPreview from "@/components/feature/CameraPreview";
import UserProfileCard from "@/components/feature/UserProfileCard";
import type { BasicPageProps } from "@/types/component";

interface MarkAttendanceProps extends BasicPageProps { }

const MarkAttendance: React.FC<MarkAttendanceProps> = ({ title }) => {
    const handleMarkAttendance = () => {
        console.log("Attendance marked successfully!");
    };

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="w-full max-w-md p-6">
                {/* Camera View */}
                <CameraPreview />

                {/* User Info */}
                <UserProfileCard name="Jane Doe" employeeId="E12345" onMarkAttendance={handleMarkAttendance} />
            </div>
        </div>
    );
};

export default MarkAttendance;
