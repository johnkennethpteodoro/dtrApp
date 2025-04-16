"use client";
import React, { useState, useEffect } from "react";

function LeaveRequest() {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		// Update time every second
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		// Clean up the interval on component unmount
		return () => clearInterval(timer);
	}, []);

	// Format time (e.g., "12:00 AM")
	const formattedTime = currentTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	// Format date (e.g., "Wednesday, April 16, 2025")
	const formattedDate = currentTime.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="bg-white h-[400px] pb-5 shadow flex justify-center items-center">
			<div className="text-center">
				<h1 className="font-extrabold text-[60px]">{formattedTime}</h1>
				<p>{formattedDate}</p>
			</div>
		</div>
	);
}

export default LeaveRequest;
