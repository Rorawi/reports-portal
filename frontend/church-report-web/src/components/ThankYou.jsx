import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const ThankYou = ({ reportId }) => {
	return (
		<div className="">
			<div className="flex flex-col items-center justify-center svh-188">
				<h1 className="text-6xl text-center font-bold text-gray-600 dark:text-gray-300">
					Thank you!🎉
				</h1>

				<Link
					to={`/reports/${reportId}`}
					className="mt-5 w-fit flex-shrink-0 flex items-center gap-2 cursor-pointer dark:text-white group hover:text-orange-600"
				>
					<FaEye className="w-4 h-4 dark:text-white group-hover:text-orange-600" />
					<span className="group-hover:text-orange-600"> View report</span>
				</Link>
			</div>
		</div>
	);
};

export default ThankYou;
