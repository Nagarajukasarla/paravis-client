
import { useEffect, useState, type FC } from "react";
import { userService } from "@/api/userService";
import APIResponse from "@/classes/APIResponse";
import { getUser } from "@/utils/user";
import { LogOut, UserX } from "lucide-react";
import Spinner from "@/components/feature/Spinner";
interface ProfileProps extends BasicPageProps { }

const Profile: FC<ProfileProps> = () => {
    const [name, setName] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [shiftTime, setShiftTime] = useState<string[]>([]);
    const [totalDays, setTotalDays] = useState<number>(0);
    const [attendedDays, setAttendedDays] = useState<number>(0);
    const [leaves, setLeaves] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const currentUser: PartialUser = getUser();
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await userService.getUser(currentUser.id);
                if (response.code === APIResponse.SUCCESS) {
                    const user = response.data;
                    const totalDays = user?.presentDays.length??0;
                    const leaves = user?.leaves.length??0;
                    const attendedDays = (totalDays - leaves);

                    setName(user?.name??"");
                    setUserId(user?.id??"");
                    setImageUrl("./images/Parvis.png");
                    setShiftTime(user?.shiftTimings??[]);
                    setTotalDays(totalDays < 0 ? 0 : totalDays);
                    setAttendedDays(attendedDays < 0 ? 0 : attendedDays);
                    setLeaves(leaves < 0 ? 0 : leaves);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

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
                        src={imageUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                    />
                    <h2 className="text-2xl font-bold mt-3">{name}</h2>
                    <p className="text-sm opacity-80">Employee ID: {userId}</p>
                </div>

                {/* Shift Details */}
                <div className="px-6 py-4 border-b">
                    <h3 className="font-semibold text-gray-700 mb-1">Shift Timing</h3>
                    <p className="text-blue-700 font-medium">{shiftTime[0]} - {shiftTime[1]}</p>
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
                <div className="flex flex-col px-6 mt-2">
                    <button
                        onClick={onLogout}
                        className="flex items-center justify-center mb-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow-sm transition"
                    >
                        <LogOut size={18} className="mr-5"/> Logout
                    </button>
                    <button
                        onClick={onResign}
                        className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl shadow-sm transition"
                    >
                        <UserX size={18} className="mr-5"/> Resign
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Profile;
