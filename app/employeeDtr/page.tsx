import React from "react";
import Header from "../components/Header";
import MyAttendance from "../components/MyAttendance";
import LeaveCredits from "../components/LeaveCredits";

function page() {
	return (
		<div className="bg-gray-200 h-screen">
			<Header />
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-5 mx-20 mt-10">
				<div className="col-span-1 xl:col-span-2">
					<MyAttendance />
				</div>
				<div className="col-span-1 xl:col-span-1">
					<LeaveCredits />
				</div>
			</div>
		</div>
	);
}

export default page;
