import React from "react";
import Header from "../components/Header";
// import MyAttendance from "../components/MyAttendance";
import ProtectedRoute from "../components/ProtectedRoute";
// import LeaveRequest from "../components/LeaveRequest";
import SideBar from "../components/SideBar";
function page() {
	return (
		<ProtectedRoute>
			<div className="flex h-screen bg-gray-200">
				<SideBar />

				<div className="flex-1 overflow-auto">
					<Header />
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 m-5">
						<div className="col-span-1 xl:col-span-2">{/* <LeaveRequest /> */}</div>
						<div className="col-span-1 xl:col-span-1">{/* <LeaveRequest /> */}</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}

export default page;
