import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { IoFolderOpenOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { TbReportSearch } from "react-icons/tb";

const SideNavigation = (isOpen, setIsOpen) => {
	const location = useLocation(); // Get the current location

	const navLinks = [
		{
			icon: <MdOutlineDashboard />,
			navName: "Dashboard",
			routeName: "/dashboard",
		},
		{
			icon: <IoFolderOpenOutline />,
			navName: "Reports",
			routeName: "/reports",
		},
	];

	return (
		<div>
			{/* <div
				className="sidebar-overlay lg:hidden absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 z-40"
				onClick={() => setIsOpen(!isOpen)}
			></div> */}
			<div className="card checkout-card svh-65 rounded-lg inset-y-0 left-0 w-64 pb-2">
				<div className="flex flex-col justify-between h-full">
					<div className="h-full">
						<div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#212121] rounded-2xl shadow mb-3">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-full flex justify-center items-center shadow-md cursor-pointer dark:bg-[#333333]">
									<TbReportSearch className="w-5 h-5 dark:text-white" />
								</div>
								<span className="font-bold dark:text-white">
									Church Report Portal
								</span>
							</div>
						</div>
						<div className="rounded-2xl bg-white shadow dark:bg-[#212121]">
							<div
								id="scroll"
								className="flex-grow svh-188 pb-4 overflow-y-auto  p-4"
							>
								<ul className="space-y-4">
									{navLinks.map((link, index) => (
										<li key={index} className="nav-item">
											<Link
												className={`flex items-center gap-2 px-4 py-3 dark:text-white rounded-md ${
													location.pathname.includes(link.routeName)
														? "bg-blue-200 text-white dark:bg-[#333333]"
														: "hover:bg-blue-100 hover:dark:text-blue-800"
												}`}
												to={link.routeName}
											>
												<span className="nav-icon">{link.icon}</span>
												<p className="text-sm font-medium">{link.navName}</p>
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="mb-3">
								<ul className="space-y-4">
									<li className="nav-item">
										<Link className="flex items-center gap-2 px-4 py-3 dark:text-white rounded hover:text-red-700 dark:hover:text-red-700 transition-colors">
											<span className="nav-icon">
												<IoLogOutOutline />
											</span>
											<p className="text-sm font-medium">Logout</p>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideNavigation;
