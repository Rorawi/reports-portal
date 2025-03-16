import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ThemeToggle from "./ThemeToggle";
import NotificationDropdown from "./NotificationDropdown";
import { NoClickEffectSearchComponent } from "./SearchInput";

const TopNav = () => {
	return (
		<div className="sticky px-4 lg:px-0 mb-3 flex flex-col-reverse lg:flex-row justify-between lg:items-center z-50">
			<div className="flex justify-between lg:justify-end lg:items-center gap-3 px-3 py-2 bg-white dark:bg-[#212121] rounded-full shadow">
				<NoClickEffectSearchComponent />
			</div>
			<div className="flex justify-between md:justify-end items-center gap-3">
				<div className="hidden lg:block">

			<div className="flex justify-between md:justify-end items-center gap-3 px-3 py-2 bg-white dark:bg-[#212121] rounded-full shadow ">
				<ThemeToggle className="" />
			</div>
				</div>
			<div className="flex justify-between lg:justify-end lg:items-center w-full gap-3 px-3 py-2 bg-white dark:bg-[#212121] rounded-full shadow  mb-3 lg:mb-0">
				<div className="p-2 rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-[#333333] lg:hidden">
					<RxHamburgerMenu className="w-5 h-5 dark:text-white" />
				</div>

				<div className="flex items-center gap-3">
					<NotificationDropdown />
					<div className="p-2 rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-[#333333]">
						<IoPersonOutline className="w-5 h-5 dark:text-white" />
					</div>
				</div>
			</div>
			</div>
		</div>
	);
};

export default TopNav;
