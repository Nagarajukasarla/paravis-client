import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import mainRoutes from "./mainRoutes";
// import authRoutes from "./authRoutes";
import React from "react";
import authRoutes from "./authRoutes";

const NotFound = lazy(() => import("@/pages/NotFound"));

const router = createBrowserRouter([
    ...authRoutes,
    ...mainRoutes,
    // ...authRoutes,
    {
        path: "*",
        element: React.createElement(NotFound),
    },
]);

export default router;
