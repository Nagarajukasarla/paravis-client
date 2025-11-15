import React from "react";
import ProtectedRoute from "../guards/ProtectedRoute";

export const createProtectedLayout = (
    Layout: React.FC,
    children: { path: string; element: React.ReactElement }[]
) => ({
    element: (
        <ProtectedRoute>
            <Layout />
        </ProtectedRoute>
    ),
    children,
});
