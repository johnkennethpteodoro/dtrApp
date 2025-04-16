"use client";
import React, { useState } from "react";
import Modal from "./Modal";

interface TimeRecord {
	id: number;
	timeIn: string;
	timeOut?: string;
	date: string;
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};

function MyAttendance() {
	const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const recordsPerPage: number = 10;
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleTimeInOut = () => {
		const now = new Date();
		const date = now.toLocaleDateString();
		const time = now.toLocaleTimeString();

		setTimeRecords((prevRecords) => {
			const lastRecord = prevRecords[0]; // Check newest record

			if (!lastRecord || lastRecord.timeOut) {
				// Add new Time In at START of array
				return [{ id: Date.now(), timeIn: time, date }, ...prevRecords];
			} else {
				// Update the newest record with Time Out
				return [{ ...lastRecord, timeOut: time }, ...prevRecords.slice(1)];
			}
		});
	};

	const shouldTimeIn = timeRecords.length === 0 || timeRecords[0].timeOut;

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = timeRecords.slice(indexOfFirstRecord, indexOfLastRecord);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const getTimeStatus = (timeStr: string) => {
		const expectedHour = 8;
		const timeInDate = new Date(`1970-01-01 ${timeStr}`);
		const hours = timeInDate.getHours();

		if (hours > expectedHour)
			return { status: "Not on time", class: "bg-red-500/40 text-red-900 font-meduim" };
		else if (hours < expectedHour)
			return { status: "Early", class: "bg-yellow-500/40 text-yellow-700 font-meduim" };
		else return { status: "On Time", class: "bg-green-500" };
	};

	return (
		<div className="bg-white h-[580px] pb-5 shadow">
			<div className="flex justify-between w-full bg-zinc-900 py-4 px-5 items-center">
				<h1 className="text-white font-bold text-lg">My Attendance</h1>
				<button
					onClick={() => setIsModalOpen(true)}
					className={`px-4 text-[13px] tracking-wider font-extrabold  py-2 ${
						shouldTimeIn
							? "bg-white text-black border-black border"
							: "bg-black text-white border border-white"
					}`}
				>
					{shouldTimeIn ? "Time In" : "Time Out"}
				</button>
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title={` Confirm to ${shouldTimeIn ? "Time In" : "Time Out"}`}
					shouldTimeIn={shouldTimeIn}
					onConfirm={handleTimeInOut}
				>
					<p className="text-gray-600">
						Are you sure you want to {shouldTimeIn ? "clock in" : "clock out"} now?
					</p>
				</Modal>
			</div>

			<table className="w-full p-8 bg-white">
				<thead>
					<tr className="text-black text-left">
						<th className="text-[14px] font-semibold md:pl-5 xl:pl-8 pl-2 text-left py-2 pt-5">
							Date
						</th>
						<th className="text-[14px] md:pl-5 font-semibold xl:pl-8 pl-2 text-left py-2 pt-5">
							Time In
						</th>
						<th className="text-[14px] md:pl-5 font-semibold xl:pl-8 pl-2 text-left py-2 pt-5">
							Time Out
						</th>
						<th className="text-[14px] md:pl-5 font-semibold xl:pl-8 pl-2 text-left py-2 pt-5">
							Status
						</th>
					</tr>
				</thead>
				<tbody className="align-top">
					{currentRecords.map((record, index) => (
						<tr
							key={record.id}
							className={`border-b border-zinc-200 text-[14px] ${
								index === currentRecords.length - 1 ? "border-b-0" : ""
							}`}
						>
							<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2">
								{formatDate(record.date)}
							</td>
							<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2">{record.timeIn}</td>
							<td className="text-left xl:pl-8 md:pl-5 pl-2 py-2 ">
								{record.timeOut || "-"}
							</td>
							<td className={`text-left xl:pl-8 md:pl-5 pl-2 py-2  `}>
								<button
									className={`py-0.5 -tracking-wider flex gap-1 items-center  justify-start px-3  rounded-full text-[12px] ${
										getTimeStatus(record.timeIn).class
									}`}
								>
									<div
										className={`w-1.5 h-1.5 rounded-full   ${
											getTimeStatus(record.timeIn).class
										}`}
									></div>
									{getTimeStatus(record.timeIn).status}
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{timeRecords.length > recordsPerPage && (
				<div className="flex justify-center mt-4">
					{Array.from(
						{ length: Math.ceil(timeRecords.length / recordsPerPage) },
						(_, i) => (
							<button
								key={i + 1}
								onClick={() => paginate(i + 1)}
								className={`mx-1 px-3 py-1 ${
									currentPage === i + 1
										? "bg-zinc-950 text-white"
										: "bg-gray-200 text-gray-700"
								}`}
							>
								{i + 1}
							</button>
						)
					)}
				</div>
			)}
		</div>
	);
}

export default MyAttendance;
