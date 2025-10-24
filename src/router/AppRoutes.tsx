import Spinner from "@/components/feature/Spinner";
import AppLayout from "@/components/layout/AppLayout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import RouteGuard from "./RouteGuard";

const Login = React.lazy(() => import("@/pages/Login"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const MarkAttendance = React.lazy(() => import("@/pages/MarkAttendance"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const AttendanceHistory = React.lazy(() => import("@/pages/AttendanceHistory"));

const AppRoutes: React.FC = () => (
    <React.Suspense fallback={<Spinner />}>
        <Routes>
            {/* Auth routes - No Layout */}
            <Route
                path="/login"
                element={<RouteGuard isAuthPage={true}>
                    <Login />
                </RouteGuard>}
            />

            {/* App Routes - With AppLayout */}
            <Route
                element={<RouteGuard>
                    <AppLayout />
                </RouteGuard>}
            >
                {/** @FIX , @Dependency ROUTING-PLAN  */}
                {/** ROUTING-PLAN: "/" should be authnetication page, if authenticated then redirect to "/dashboard". */}
                {/** ROUTING-PLAN: Later map each route a string or number with something to maintain active state in sider */}
                <Route index element={<MarkAttendance title="Mark Attendance" />} />
                <Route path="/history" element={<AttendanceHistory title="Attendance History" />} />
                <Route path="/profile" element={<Profile title="Profile" />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </React.Suspense>
);

export default AppRoutes;
