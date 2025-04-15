"use client";
import { Ellipsis } from "lucide-react";
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
							<div className="bg-white h-[500px]">
								<div className="flex justify-between items-center bg-zinc-950 px-4 py-3 text-white">
									<h1 className="font-bold">Leave Record</h1>
									<button className="bg-white text-black text-[12px] w-[115px] py-1.5">
										Select Month
									</button>
								</div>
								<table className="w-full  bg-white border border-zinc-200">
									<thead>
										<tr className="text-gray-400 text-left">
											<th className="text-[14px] font-medium text-left md:pl-5 xl:pl-8 pl-2 py-2 pt-4">
												Leave Type
											</th>
											<th className="text-[14px] md:pl-5 xl:pl-8 pl-2 font-medium  py-2 pt-4">
												Status
											</th>
											<th className="text-[14px] md:pl-5 xl:pl-8 pl-2 font-medium py-2 pt-4">
												Action
											</th>
										</tr>
									</thead>
									<tbody className="align-top">
										{leaveRequest.map((leaveRequest) => (
											<tr
												key={leaveRequest.id}
												className="border-b border-zinc-200"
											>
												<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 capitalize text-[13px]">
													{leaveRequest.leave_type.toLowerCase()}
												</td>
												<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 tracking-wider ">
													<button className="bg-yellow-400 py-1 px-3 text-white text-[11px] capitalize">
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
