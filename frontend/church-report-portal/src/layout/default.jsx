import React,{ useState } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet to render child routes
import TopNav from "../components/TopNav";
import SideNavigation from "../components/SideNavigation";

const DefaultLayout = () => {
const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-[#f3f5f7] dark:bg-[#171717] min-h-screen">
      <div className="container min-h-screen mx-auto">
        <div className="relative flex justify-center items-center w-full min-h-screen">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row w-full gap-8">
              {/* Side Navigation */}
              <SideNavigation className="w-full lg:w-1/4" isOpen={isOpen} setIsOpen={setIsOpen} />

              {/* Main Content */}
              <div className="flex-1">
                <TopNav isOpen={isOpen} setIsOpen={setIsOpen}/>
                <div className="p-4 lg:p-0 w-full">
                  <div className="svh-143" id="scroll">
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
