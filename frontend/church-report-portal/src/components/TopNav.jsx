import React from "react";
import { IoMdNotificationsOutline,  IoIosLogOut } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ThemeToggle from "./ThemeToggle";
import NotificationDropdown from "./NotificationDropdown";

const TopNav = () => {
	return (
		<div className="p-4 shadow w-full glass-effect h-16 sticky mb-6 flex flex-col items-center z-50">
			<div className="flex justify-between md:justify-end items-center gap-3 h-full">

				<div className="p-2 rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-purple-800 lg:hidden">
				<RxHamburgerMenu className="w-5 h-5 dark:text-white" />
				</div>

        <div className="flex items-center gap-3">
				<NotificationDropdown />
				<div className="p-2 rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-purple-800">
        <IoPersonOutline className="w-5 h-5 dark:text-white" />
				</div>
			
      <ThemeToggle />
        </div>


				<div className="p-2 rounded-full flex justify-center items-center gap-1 shadow-md hidden">
        <IoIosLogOut className="w-5 h-5" />
          <span>Logout</span>
				</div>
			</div>
		</div>
	);
};

export default TopNav;
