import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet to render child routes
import TopNav from "../components/TopNav";

const DefaultLayout = () => {
  return (
    <div className="bg-[#f3f5f7] dark:bg-[#212121] min-h-screen">
      <div className="container min-h-screen mx-auto">
        <div className="relative flex justify-center items-center w-full min-h-screen">
          <div className="w-full">
            <div className="flex flex-col md:flex-row w-full gap-8">
              {/* Main Content */}
              <div className="flex-1">
                <TopNav />
                <div className="p-4 shadow w-full glass-effect">
                  <div className="svh-188" id="scroll">
                    <Outlet /> {/* This will render the nested route content */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
