import React from "react";
import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
function page() {
	return (
		<ProtectedRoute>
			<div className="flex h-screen bg-gray-200">
				<SideBar />

				<div className="flex-1 overflow-auto">
					<Header />
					<Profile />
				</div>
			</div>
		</ProtectedRoute>
	);
}

export default page;
