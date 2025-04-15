"use client";
import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";
import SideBar from "../components/SideBar";
import LeaveRequestForm from "../components/LeaveRequestForm";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { store } from "../_store";
function page() {
	const snap = useSnapshot(store);
	const [leaveRequest, setLeaveRequest] = useState<any[]>([]);
	useEffect(() => {
		const fetchLeaveRequestData = async () => {
			try {
				const response = await fetch("/api/issues", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await response.json();

				const result = Array.isArray(data) ? data : [data];
				setLeaveRequest(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchLeaveRequestData();
	}, [snap.isFetch]);

	return (
		<ProtectedRoute>
			<div className="flex h-screen bg-gray-200">
				<SideBar />

				<div className="flex-1 overflow-auto">
					<Header />
					<div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 m-5">
						<div className="bg-white h-full pb-5 shadow">
							<div className="bg-zinc-900 py-4 px-5 ">
								<h1 className="text-white font-bold text-sm text-center">
									Sick Leave
								</h1>
							</div>
							<h1 className="py-2 text-center text-[45px] font-extrabold">12</h1>
						</div>
						<div className="bg-white h-full pb-5 shadow">
							<div className="bg-zinc-900 py-4 px-5 ">
								<h1 className="text-white font-bold text-sm text-center">
									Vacation Leave
								</h1>
							</div>
							<h1 className="py-2 text-center text-[45px] font-extrabold">7</h1>
						</div>
						<div className="bg-white h-full pb-5 shadow">
							<div className="bg-zinc-900 py-4 px-5 ">
								<h1 className="text-white font-bold text-sm text-center">
									Unpaid Leave
								</h1>
							</div>
							<h1 className="py-2 text-center text-[45px] font-extrabold">5</h1>
						</div>
						<div className="bg-white h-full pb-5 shadow">
							<div className="bg-zinc-900 py-4 px-5 ">
								<h1 className="text-white font-bold text-sm text-center">
									Emergency Leave
								</h1>
							</div>
							<h1 className="py-2 text-center text-[45px] font-extrabold">8</h1>
						</div>
					</div>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 m-5">
						<div className="col-span-1 lg:col-span-1 xl:col-span-2">
							<div className="col-span-1">
								<LeaveRequestForm />
							</div>
						</div>
						<div className="col-span-1">
							<div className="bg-white shadow p-7">
								<h1 className="font-extrabold capitalize text-[18px] mb-5">
									Leave Record
								</h1>
								{leaveRequest.map((leaveRequest) => (
									<div
										key={leaveRequest.id}
										className="bg-gray-100 p-4 mb-4 rounded"
									>
										<h2 className="text-lg font-bold">
											{leaveRequest.leave_type}
										</h2>
										<p>
											{leaveRequest.start_date} - {leaveRequest.end_date}
										</p>
										<p>{leaveRequest.reason}</p>
										<p>Status: {leaveRequest.status}</p>
										<p>Total Days: {leaveRequest.total_days}</p>
										<p>Employee Name: {leaveRequest.employee_name}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}

export default page;
