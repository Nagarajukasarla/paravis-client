import React from "react";
import CameraPreview from "@/components/feature/CameraPreview";
import UserProfileCard from "@/components/feature/UserProfileCard";

const MarkAttendance: React.FC = () => {
    const handleMarkAttendance = () => {
        console.log("Attendance marked successfully!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                {/* Camera View */}
                <CameraPreview />

                {/* User Info */}
                <UserProfileCard name="Jane Doe" employeeId="E12345" onMarkAttendance={handleMarkAttendance} />
            </div>
        </div>
    );
};

export default MarkAttendance;
