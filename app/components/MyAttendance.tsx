"use client";
import React, { useState } from "react";

interface TimeRecord {
	id: number;
	timeIn: string;
	timeOut?: string;
	date: string;
}

const MyAttendance: React.FC = () => {
	const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const recordsPerPage: number = 10;

	const handleTimeInOut = () => {
		const now = new Date();
		const date = now.toLocaleDateString();
		const time = now.toLocaleTimeString();

		setTimeRecords((prevRecords) => {
			const lastRecord = prevRecords[0]; // Check the first record instead of the last

			if (!lastRecord || lastRecord.timeOut) {
				return [{ id: prevRecords.length + 1, timeIn: time, date }, ...prevRecords]; // Prepend new record
			} else {
				return prevRecords.map(
					(record, index) => (index === 0 ? { ...record, timeOut: time } : record) // Update the first record
				);
			}
		});
	};

	const indexOfLastRecord: number = currentPage * recordsPerPage;
	const indexOfFirstRecord: number = indexOfLastRecord - recordsPerPage;
	const currentRecords: TimeRecord[] = timeRecords.slice(indexOfFirstRecord, indexOfLastRecord);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const isTimeIn = timeRecords.length === 0 || timeRecords[timeRecords.length - 1].timeOut;

	return (
		<div className="bg-white h-full rounded-b-xl rounded-t-xl pb-5">
			<div className="flex justify-between w-full bg-black py-8 px-5 rounded-t-xl">
				<h1 className="text-white font-bold text-xl">My Attendance</h1>
				<button
					onClick={handleTimeInOut}
					className={`rounded-sm px-4 font-semibold border py-2 ${
						isTimeIn ? "bg-white text-black" : "bg-black text-white cursor-pointer"
					}`}
				>
					{isTimeIn ? "Time In" : "Time Out"}
				</button>
			</div>

			<table className="w-full p-8 bg-white rounded-b-sm ">
				<thead>
					<tr className="text-gray-400 text-left">
						<th className="text-[15px] font-medium px-8 py-2 pt-5">Date</th>
						<th className="text-[15px] font-medium px-8 py-2 pt-5">Time In</th>
						<th className="text-[15px] font-medium px-8 py-2 pt-5">Time Out</th>
					</tr>
				</thead>
				<tbody className="align-top">
					{currentRecords.map((record, index) => (
						<tr
							key={record.id}
							className={`border-b border-black text-[14px] ${
								index === currentRecords.length - 1 ? "border-b-0" : ""
							}`}
						>
							<td className="px-8 py-2">{record.date}</td>
							<td className="px-8 py-2">{record.timeIn}</td>
							<td className="px-8 py-2">{record.timeOut || "-"}</td>
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
								className="mx-1 px-3 py-1 bg-blue-500 text-white rounded"
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
