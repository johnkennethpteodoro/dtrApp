import React from "react";

function LeaveRequest() {
	return (
		<div className="bg-white h-full pb-5">
			<div className="flex justify-between w-full bg-zinc-900 py-4 px-5 items-center">
				<h1 className="text-white font-bold text-lg">Leave Request</h1>
				<button className={`px-4 text-[13px] tracking-wider font-extrabold bg-white  py-2`}>
					Request
				</button>
			</div>
		</div>
	);
}

export default LeaveRequest;
