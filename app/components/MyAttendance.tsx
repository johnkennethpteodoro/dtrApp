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

const MyAttendance: React.FC = () => {
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

	return (
		<div className="bg-white h-full pb-5 shadow">
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
					<tr className="text-gray-400 text-left">
						<th className="text-[15px] font-medium xl:pl-8 pl-2 text-left py-2 pt-5">
							Date
						</th>
						<th className="text-[15px] font-medium xl:pl-8 pl-2 text-left py-2 pt-5">
							Time In
						</th>
						<th className="text-[15px] font-medium xl:pl-8 pl-2 text-left py-2 pt-5">
							Time Out
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
							<td className="text-left xl:pl-8 pl-2 py-2">
								{formatDate(record.date)}
							</td>
							<td className="text-left xl:pl-8 pl-2 py-2 tracking-wider">
								{record.timeIn}
							</td>
							<td className="text-left xl:pl-8 pl-2 py-2 tracking-wider">
								{record.timeOut || "-"}
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
};

export default MyAttendance;
