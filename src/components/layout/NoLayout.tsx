import React from "react";
import { Outlet } from "react-router-dom";

const NoLayout: React.FC = () => {
    return (
        <div className="px-2 md:px-8 lg:px-16 pb-16 md:pb-0">
            <Outlet />
        </div>
    );
};

export default NoLayout;
    