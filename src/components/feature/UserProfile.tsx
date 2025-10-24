import { LogOut, UserX } from "lucide-react";
import React from "react";

interface UserProfileProps {
    name: string;
    employeeId: string;
    shiftTime: string;
    totalDays: number;
    attendedDays: number;
    leaves: number;
    imageUrl?: string;
    onLogout?: () => void;
    onResign?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
    name,
    employeeId,
    shiftTime,
    totalDays,
    attendedDays,
    leaves,
    imageUrl = "/images/profile-placeholder.png",
    onLogout,
    onResign,
}) => {
    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-8 bg-gray-50">
            {/* Profile Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-blue-700 text-white flex flex-col items-center py-6">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                    />
                    <h2 className="text-2xl font-bold mt-3">{name}</h2>
                    <p className="text-sm opacity-80">Employee ID: {employeeId}</p>
                </div>

                {/* Shift Details */}
                <div className="px-6 py-4 border-b">
                    <h3 className="font-semibold text-gray-700 mb-1">Shift Timing</h3>
                    <p className="text-blue-700 font-medium">{shiftTime}</p>
                </div>

                {/* Attendance Stats */}
                <div className="px-6 py-4 grid grid-cols-3 text-center gap-2">
                    <div className="bg-blue-50 rounded-lg py-3">
                        <p className="text-xs text-gray-500">Total Days</p>
                        <p className="text-lg font-semibold text-blue-700">{totalDays}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg py-3">
                        <p className="text-xs text-gray-500">Attended</p>
                        <p className="text-lg font-semibold text-green-700">{attendedDays}</p>
                    </div>
                    <div className="bg-red-50 rounded-lg py-3">
                        <p className="text-xs text-gray-500">Leaves</p>
                        <p className="text-lg font-semibold text-red-700">{leaves}</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 px-6 pb-6 mt-2">
                    <button
                        onClick={onLogout}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow-sm transition"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                    <button
                        onClick={onResign}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl shadow-sm transition"
                    >
                        <UserX size={18} /> Resign
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
