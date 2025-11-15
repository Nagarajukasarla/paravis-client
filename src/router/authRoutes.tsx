// authRoutes.tsx
import NoLayout from "@/components/layout/NoLayout";
import { lazy } from "react";
import { withSuspense } from "./utils/withSuspense";

const Login = lazy(() => import("@/pages/Login"));

const authRoutes = [
    {
        element: <NoLayout />,
        children: [{ path: "/login", element: withSuspense(<Login />) }],
    },
];

export default authRoutes;
