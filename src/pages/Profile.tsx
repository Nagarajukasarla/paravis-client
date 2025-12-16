
import Spinner from "@/components/feature/Spinner";
import type { BasicPageProps } from "@/types/component";
import { LogOut, UserX } from "lucide-react";
import { type FC } from "react";
import { useUserData } from "../hooks/useUserData";

interface ProfileProps extends BasicPageProps { }

const Profile: FC<ProfileProps> = () => {
    const { user, loading } = useUserData();
    const onLogout = () => console.log("Logging out...");
    const onResign = () => console.log("Resign request sent");

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col items-center px-6 bg-gray-50">
            {/* Profile Card */}
            <div className="w-full max-w-md overflow-hidden">
                {/* Header Section */}
                <div className=" text-primary flex flex-col items-center py-6">
                    <img
                        src={user?.imageUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                    />
                    <h2 className="text-2xl font-bold mt-3">{user?.name}</h2>
                    <p className="text-sm font-bold">{user?.empId}</p>
                </div>

                {/* Shift Details */}
                <div className="px-6 py-4 border-b">
                    <h3 className="font-semibold text-gray-700 mb-1">Shift Timing</h3>
                    <p className="text-blue-700 font-medium">{user?.shiftTimings?.start.split("+")[0]} - {user?.shiftTimings?.end.split("+")[0]}</p>
                </div>

                {/* Attendance Stats */}
                <div className="px-6 py-4 grid grid-cols-3 text-center gap-2">
                    <div className="bg-blue-50 rounded-lg py-3">
                        <p className="text-xs text-gray-500">Total Days</p>
                        <p className="text-lg font-semibold text-blue-700">{user?.totalDays}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg py-3">
                        <p className="text-xs text-gray-500">Attended</p>
                        <p className="text-lg font-semibold text-green-700">{user?.attended.length}</p>
                    </div>
                    <div className="bg-red-50 rounded-lg py-3">
                        <p className="text-xs text-gray-500">Leaves</p>
                        <p className="text-lg font-semibold text-red-700">{user?.leaves.length}</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between px-6 mt-4">
                    <button
                        onClick={onLogout}
                        className="flex items-center justify-center 
                                    bg-primary hover:bg-primary-hover 
                                    text-white py-2 px-4 rounded-xl 
                                    shadow-sm transition

                                "
                    >
                        <LogOut size={18} className="mr-2" /> Logout
                    </button>
                    <button
                        onClick={onResign}
                        className="flex items-center justify-center
                                    bg-red-600 hover:bg-red-700 
                                    text-white py-2 px-4 rounded-xl 
                                    shadow-sm transition
                                "
                    >
                        <UserX size={18} className="mr-2" /> Resign
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Profile;
