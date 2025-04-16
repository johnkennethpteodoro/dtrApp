"use client";
import { Ellipsis } from "lucide-react";
import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";
import SideBar from "../components/SideBar";
import LeaveRequestForm from "../components/LeaveRequestForm";
import { useEffect, useState, useCallback } from "react";
import { useSnapshot } from "valtio";
import { store } from "../_store";
function page() {
	const snap = useSnapshot(store);
	const [leaveRequest, setLeaveRequest] = useState<any[]>([]);

	const fetchLeaveRequests = useCallback(async () => {
		try {
			const response = await fetch("/api/issues");
			const data = await response.json();
			setLeaveRequest(Array.isArray(data) ? data : [data]);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, []);

	useEffect(() => {
		fetchLeaveRequests();
	}, [snap.isFetched, fetchLeaveRequests]);

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
							<div className="bg-white h-[500px]">
								<div className="flex justify-between items-center bg-zinc-950 px-4 py-3 text-white">
									<h1 className="font-bold">Leave Record</h1>
									<button className="bg-white text-black text-[12px] w-[115px] py-1.5">
										Filter
									</button>
								</div>
								<table className="w-full  bg-white ">
									<thead>
										<tr className="text-black text-left">
											<th className="text-[14px] font-semibold md:pl-5 xl:pl-8 pl-2 text-left py-2 pt-5">
												Leave Type
											</th>
											<th className="text-[14px] md:pl-5 font-semibold xl:pl-8 pl-2 text-left py-2 pt-5">
												Status
											</th>
											<th className="text-[14px] md:pl-5 font-semibold xl:pl-8 pl-2 text-left py-2 pt-5">
												Action
											</th>
										</tr>
									</thead>
									<tbody className="align-top">
										{leaveRequest.map((leaveRequest, index) => (
											<tr
												key={leaveRequest.id}
												className={`border-b border-zinc-200  ${
													index === leaveRequest.length - 1
														? "border-b-0"
														: ""
												}`}
											>
												<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 capitalize text-[13px] ">
													{leaveRequest.leave_type.toLowerCase()} Leave
												</td>
												<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 tracking-wider ">
													<button className="bg-yellow-500/40 capitalize py-0.5 -tracking-wider flex gap-1 items-center  justify-start px-3  rounded-full text-[12px] text-yellow-700">
														<div
															className={`w-1.5 h-1.5 rounded-full bg-yellow-700`}
														></div>
														{leaveRequest.status === "OPEN"
															? "Pending"
															: leaveRequest.status.toLowerCase()}
													</button>
												</td>
												<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 tracking-wider ">
													<button className=" bg-zinc-950 shadow py-1 px-3 rounded-sm">
														<Ellipsis color="white " size={15} />
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}

export default page;
