// src/routes/utils/withSuspense.tsx
import React from "react";
import Spinner from "@/components/feature/Spinner";

/**
 * Wraps a component with Suspense and a fallback Spinner.
 * Example usage: withSuspense(<MyLazyComponent />)
 */
export const withSuspense = (element: React.ReactElement) => (
    <React.Suspense fallback={<Spinner />}>{element}</React.Suspense>
);
