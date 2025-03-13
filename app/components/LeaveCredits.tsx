import React from "react";

function LeaveCredits() {
	return (
		<div>
			<div>
				<div className="flex justify-between w-full bg-blue-800 py-8 px-5 rounded-t-lg">
					<h1 className="text-white font-bold text-xl">Leave Credits</h1>
					<button className="ounded-sm px-4 py-2 font-semibold bg-white text-black rounded-sm">
						Apply
					</button>
				</div>

				<div className="w-full bg-white rounded-b-lg px-8 pt-5">
					<h1 className="text-center mb-4 text-gray-400">Leaves</h1>
					<div className="flex justify-between border-b border-gray-300 mb-2">
						<h1>Vacation</h1> <h1>7</h1>
					</div>
					<div className="flex justify-between pt-3 border-b border-gray-300 mb-2">
						<h1>Sick</h1> <h1>5</h1>
					</div>
					<div className="flex justify-between pt-3 border-b border-gray-300 mb-2">
						<h1>Berreavement</h1> <h1>3</h1>
					</div>
					<div className="flex justify-between pt-3 border-b border-gray-300 mb-2">
						<h1>Emergency Leave</h1> <h1>3</h1>
					</div>
					<div className="flex justify-between pt-3 border-b border-gray-300 mb-2">
						<h1>Offset Leave</h1> <h1>0</h1>
					</div>
					<div className="flex justify-between pt-3 pb-9">
						<h1>Compensatory Time Off</h1> <h1>0</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LeaveCredits;
