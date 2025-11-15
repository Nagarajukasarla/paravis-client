import React from "react";

interface UserProfileCardProps {
    name: string;
    employeeId: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ name, employeeId }) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <div className="mt-6 bg-white rounded-lg p-6 text-center space-y-4">
            
            <div>
                <p className="text-lg font-semibold text-gray-800">{name}</p>
                <p className="text-sm text-gray-600">Employee ID: {employeeId}</p>
                <p className="text-sm text-gray-600 mt-1">{currentDate}</p>
            </div>
        </div>
    );
};

export default UserProfileCard;
