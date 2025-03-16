import React from "react";
import errorImg from "../../assets/images/error.png";

const ErrorState = ({ error }) => {
	console.log("ErrorState received error:", error); // Debug log

	return (
		<div className="">
			<div className="flex flex-col items-center justify-center svh-188">
				<img
					src={errorImg}
					alt=""
					width={100}
					height={100}
					className="mb-3"
				/>
				<h2 className="text-center text-gray-600 dark:text-gray-300">
					Error
				</h2>
					<h4 className="text-center py-4 text-red-500">{error || "Somethings went wrong"}</h4>
			</div>
		</div>
	);
};

export default ErrorState;
