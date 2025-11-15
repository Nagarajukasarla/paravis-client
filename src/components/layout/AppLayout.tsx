import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout: React.FC = () => {
    return (
        <>
            <div className="w-full h-screen flex flex-col">
                <div className="flex flex-col">
                    <Header className="h-16 px-2 z-50 sticky top-0" />
                    <div className="flex-1 overflow-y-auto pb-14">
                        <Outlet />
                    </div>

                    {/* Footer */}
                    <Footer className="bottom-0"/>
                </div>
            </div>
        </>
    );
};

export default AppLayout;
