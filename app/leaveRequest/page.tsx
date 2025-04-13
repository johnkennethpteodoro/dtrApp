"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";
import SideBar from "../components/SideBar";
import { format, differenceInDays, isBefore, isToday } from "date-fns";

type FormErrors = {
	startDate?: string;
	endDate?: string;
};

function page() {
	const [leaveType, setLeaveType] = useState("");
	const [totalDays, setTotalDays] = useState(0);
	const [endDate, setEndDate] = useState("");
	const [startDate, setStartDate] = useState("");
	const [errors, setErrors] = useState<FormErrors>({});

	useEffect(() => {
		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);

			// Calculate total days (inclusive)
			const days = differenceInDays(end, start) + 1;
			setTotalDays(days > 0 ? days : 0);
		} else {
			setTotalDays(0);
		}
	}, [startDate, endDate]);

	const validateStartDate = (date: string) => {
		const today = new Date();
		const selectedDate = new Date(date);
		const newErrors = { ...errors };

		if (leaveType === "vacation" && isBefore(selectedDate, today) && !isToday(selectedDate)) {
			newErrors.startDate = "Vacation cannot be scheduled for past dates";
		} else {
			delete newErrors.startDate;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value;
		if (validateStartDate(date)) {
			setStartDate(date);

			if (!endDate || new Date(endDate) < new Date(date)) {
				setEndDate(date);
			}
		}
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value;
		if (new Date(date) >= new Date(startDate)) {
			setEndDate(date);
			setErrors((prev) => ({ ...prev, endDate: "" }));
		} else {
			setErrors((prev) => ({ ...prev, endDate: "End date cannot be before start date" }));
		}
	};

	const handleLeaveTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLeaveType(e.target.value);
	};

	const today = format(new Date(), "yyyy-MM-dd");
	const minEndDate = startDate || today;

	return (
		<ProtectedRoute>
			<div className="flex h-screen bg-gray-200">
				<SideBar />

				<div className="flex-1 overflow-auto">
					<Header />
					<div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-10 m-5">
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
					<div className="col-span-1">
						<div className="bg-white shadow p-7 m-5">
							<h1 className="font-extrabold capitalize text-[18px] mb-5">
								Submit Leave Request
							</h1>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Leave Type <span className="text-red-500">*</span>
								</label>

								<select
									value={leaveType}
									onChange={handleLeaveTypeChange}
									className="select mt-1 block w-full pl-3 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm"
									required
								>
									<option value="" disabled>
										Select leave Type
									</option>
									<option value="sick">Sick</option>
									<option value="vacation">Vacation</option>
									<option value="unpaid">Unpaid</option>
									<option value="emergency">Emergency</option>
								</select>
							</div>

							<div className="grid grid-cols-1 xl:grid xl:grid-cols-3 gap-4 mt-5">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Start Date <span className="text-red-500">*</span>
									</label>

									<input
										type="date"
										id="startDate"
										value={startDate}
										onChange={handleStartDateChange}
										min={leaveType === "vacation" ? today : undefined}
										className={`mt-1 block w-full px-3 py-2 border ${
											errors.startDate ? "border-red-500" : "border-gray-300"
										} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
										required
									/>
									{errors.startDate && (
										<p className="mt-1 text-sm text-red-600">
											{errors.startDate}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="endDate"
										className="block text-sm font-medium text-gray-700"
									>
										End Date <span className="text-red-500">*</span>
									</label>
									<input
										type="date"
										id="endDate"
										value={endDate}
										onChange={handleEndDateChange}
										min={minEndDate}
										className={`mt-1 block w-full px-3 py-2 border ${
											errors.endDate ? "border-red-500" : "border-gray-300"
										} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
										required
									/>
									{errors.endDate && (
										<p className="mt-1 text-sm text-red-600">
											{errors.endDate}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="endDate"
										className="block text-sm font-medium text-gray-700"
									>
										Total Leave Days
									</label>
									<input
										type="number"
										value={totalDays}
										onChange={handleEndDateChange}
										min="0"
										className=" mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										required
										disabled
									/>
									{totalDays > 0 && (
										<p className="text-xs text-gray-500 mt-1">
											{format(new Date(startDate), "MMM d, yyyy")} to{" "}
											{format(new Date(endDate), "MMM d, yyyy")}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}

export default page;
