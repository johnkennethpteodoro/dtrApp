"use client";
import Image from "next/image";
import React from "react";
import { useAuth } from "../context/AuthContext";
function Profile() {
	const { user } = useAuth();
	return (
		<>
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 m-5">
				<div className="col-span-1 lg:col-span-1 xl:col-span-2">
					<div className="bg-white pb-5 shadow \ relative">
						<div className="bg-zinc-900 h-[150px] px-5">
							<div className="h-[123px] w-[123px] bg-white top-[90px] rounded-full absolute left-[34px]  flex items-center justify-center">
								<Image
									src="/me.jpeg"
									alt="Profile picture"
									className="h-[120px] w-[120px] rounded-full"
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div className=" bg-zinc-700 text-white rounded-sm py-1.5 px-3 top-[170px] right-[34px] absolute">
								<h1 className="text-[12px] font-semibold shadow">
									<span className="mr-2">🏆</span>Titanium Awardee, Q3 2024
								</h1>
							</div>
						</div>
						<div className="px-8 mt-[70px]">
							<h1 className="font-extrabold capitalize text-[20px]">
								{user?.username} Teodoro
							</h1>
							<p className="text-[13px] text-zinc-500">Software Engineer</p>
							<div className="mt-3 flex gap-2">
								<button className="bg-zinc-950 text-white text-[13px] w-[145px] py-1.5">
									Edit Profile
								</button>
								<button className="bg-zinc-950 text-white text-[13px] w-[145px] py-1.5">
									Change Password
								</button>
							</div>
						</div>

						<div className="px-8 mt-[30px]">
							<div className="flex justify-between items-center bg-zinc-950 px-4 py-3 text-white">
								<h1 className="font-bold">April</h1>{" "}
								<button className="bg-white text-black text-[12px] w-[115px] py-1.5">
									Select Month
								</button>
							</div>
							<table className="w-full p-8 bg-white border border-zinc-200">
								<thead>
									<tr className="text-gray-400 text-left">
										<th className="text-[15px] font-medium text-left md:pl-5 xl:pl-8 pl-2 py-2 pt-5">
											Date
										</th>
										<th className="text-[15px] md:pl-5 xl:pl-8 pl-2 font-medium  py-2 pt-5">
											Time In
										</th>
										<th className="text-[15px] md:pl-5 xl:pl-8 pl-2 font-medium py-2 pt-5">
											Time Out
										</th>
									</tr>
								</thead>
								<tbody className="align-top">
									<tr className="border-b border-zinc-200 text-[14px]">
										<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2">
											April 12, 2025
										</td>
										<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 tracking-wider">
											4:46:35 PM
										</td>
										<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 tracking-wider">
											4:46:35 PM
										</td>
									</tr>
									<tr className="text-[14px]">
										<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2">
											April 12, 2025
										</td>
										<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 tracking-wider">
											4:46:35 PM
										</td>
										<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 tracking-wider">
											4:46:35 PM
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="col-span-1">
					<div className="bg-white shadow p-7">
						<h1 className="font-extrabold capitalize text-[18px] mb-5">
							Profile Details
						</h1>

						<ul className="space-y-1.5">
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Employee ID:</h1>
								<h1>QX20230401</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Full Name:</h1>
								<h1>John Kenneth Teodoro</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Position:</h1>
								<h1>Software Engineer</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Department:</h1>
								<h1>Engineering Development</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Employment Status:</h1>
								<h1>Full-time</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Shift Schedule:</h1>
								<h1>8:00 AM - 5:30 PM</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Immediate Supervisor:</h1>
								<h1>Liziel Dugaduga</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Company Email:</h1>
								<h1>jkstrike@company.com</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Contact Number:</h1>
								<h1>+63 956 469 5206</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Employee Since:</h1>
								<h1>September 1, 2023</h1>
							</li>
							<li className="flex text-[14px] gap-2">
								<h1 className="font-semibold">Address:</h1>
								<h1>Commonwealth, Quezon City</h1>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
