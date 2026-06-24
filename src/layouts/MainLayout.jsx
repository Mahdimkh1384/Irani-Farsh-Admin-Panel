import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="min-h-screen bg-bg-primary transition-colors">
            <Sidebar />
            <div className="lg:mr-[370px] lg:ml-8 sm:px-2.5 lg:p-0 flex flex-col gap-y-10">
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
