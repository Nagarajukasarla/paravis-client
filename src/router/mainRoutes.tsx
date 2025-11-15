import { lazy } from "react";
import AppLayout from "../components/layout/AppLayout";
import { createProtectedLayout } from "./utils/createProtectedLayout";
import { withSuspense } from "./utils/withSuspense";

const MarkAttendance = lazy(() => import("@/pages/MarkAttendance"));
const AttendanceHistory = lazy(() => import("@/pages/AttendanceHistory"));
const Profile = lazy(() => import("@/pages/Profile"));

const mainRoutes = [
    createProtectedLayout(AppLayout, [
        { path: "/", element: withSuspense(<MarkAttendance />) },
        { path: "/history", element: withSuspense(<AttendanceHistory title="Attendance History" />) },
        { path: "/profile", element: withSuspense(<Profile title="Profile" />) },
    ]),
];

export default mainRoutes;
