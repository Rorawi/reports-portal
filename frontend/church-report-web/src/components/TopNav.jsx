import React from "react";
import { IoMdNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ThemeToggle from "./ThemeToggle";
import NotificationDropdown from "./NotificationDropdown";

const TopNav = () => {
	return (
		<div className="px-2 md:px-4 py-4 shadow w-full  glass-effect h-16 sticky mb-6 flex flex-col items-center z-50">
			<div className="flex justify-between items-center gap-3 h-full">
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full justify-center items-center shadow-md cursor-pointer bg-blue-600 hidden">
						<RxHamburgerMenu className="w-5 h-5 text-white" />
					</div>
					<h4 className="text-xl font-semibold dark:text-white">
						Report
					</h4>
					
				</div>

				<div>
					<div className="flex items-center gap-3">
						<NotificationDropdown />
						<div className="p-2 rounded-full flex justify-center items-center shadow-md cursor-pointer bg-blue-600">
							<IoPersonOutline className="w-5 h-5 text-white" />
						</div>

						<ThemeToggle />
					</div>
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
