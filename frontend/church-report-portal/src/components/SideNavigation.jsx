import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { IoFolderOpenOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const SideNavigation = () => {
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
			<div className="card checkout-card svh-65 rounded-lg inset-y-0 left-0 w-64 p-6 pb-2 glass-effect shadow bg-[#ffffff6f]">
				<div className="flex flex-col justify-between h-full">
					<div>
						<div className="text-center flex justify-center items-center mb-4">
							<TbReportAnalytics className="w-10 h-10" />
						</div>

						<div id="scroll" className="flex-grow pb-4 overflow-y-auto">
							<ul className="space-y-4">
								{navLinks.map((link, index) => (
									<li key={index} className="nav-item">
										<Link
											className={`flex items-center gap-2 px-4 py-3 dark:text-white rounded ${
												location.pathname.includes(link.routeName)
													? "bg-blue-200 text-blue-800 dark:text-blue-800 "
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
	);
};

export default SideNavigation;
