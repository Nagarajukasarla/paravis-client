
import type { FC } from "react";
import type { BasicPageProps } from "@/types/component";
import UserProfile from "@/components/feature/UserProfile";

interface ProfileProps extends BasicPageProps { }

const Profile: FC<ProfileProps> = () => {
    return <UserProfile
        name="Nagaraju Kasarla"
        employeeId="EMP12345"
        shiftTime="09:00 AM - 06:00 PM"
        totalDays={30}
        attendedDays={26}
        leaves={4}
        imageUrl="/images/Parvis.png"
        onLogout={() => console.log("Logging out...")}
        onResign={() => console.log("Resign request sent")}
    />

}

export default Profile;
