import React from "react";

interface UserProfileCardProps {
    name: string;
    employeeId: string;
    onMarkAttendance: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ name, employeeId, onMarkAttendance }) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 text-center space-y-4">
            <div className="flex items-center justify-center">
                <img
                    src="/images/user-avatar.png"
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                />
            </div>
            <div>
                <p className="text-lg font-semibold text-gray-800">{name}</p>
                <p className="text-sm text-gray-600">Employee ID: {employeeId}</p>
                <p className="text-sm text-gray-600 mt-1">{currentDate}</p>
            </div>

            <button
                onClick={onMarkAttendance}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
            >
                MARK ATTENDANCE
            </button>
        </div>
    );
};

export default UserProfileCard;
