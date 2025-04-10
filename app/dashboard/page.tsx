import React from "react";
import Header from "../components/Header";
import MyAttendance from "../components/MyAttendance";
import ProtectedRoute from "../components/ProtectedRoute";
import LeaveRequest from "../components/LeaveRequest";

function page() {
	return (
		<ProtectedRoute>
			<div className="flex h-screen bg-gray-200">
				<div className="w-64 bg-white hidden md:block px-7 p-5">
					<h2 className="text-xl font-semibold text-center mb-10">TimeAxis</h2>
					<ul className="space-y-5 text-sm">
						<li>
							<a href="#" className="hover:underline">
								Dashboard
							</a>
						</li>
						<li>
							<a href="#" className=" hover:underline">
								Leave Request
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								My Profile
							</a>
						</li>
					</ul>
				</div>

				{/* Main Content */}
				<div className="flex-1 overflow-auto">
					<Header />
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 m-5">
						<div className="col-span-1 xl:col-span-2">
							<MyAttendance />
						</div>
						<div className="col-span-1 xl:col-span-1">
							<LeaveRequest />
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}

export default page;
