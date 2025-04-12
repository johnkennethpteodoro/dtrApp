import React from "react";
import Link from "next/link";
import { LayoutDashboard, UserPen, Calendar, Clock } from "lucide-react";
function SideBar() {
	return (
		<div className="w-64 bg-white hidden sm:hidden md:hidden xl:block lg:block px-7 p-5 shadow">
			<div className="flex gap-2 w-full justify-center">
				<Clock color="black" size={27} />
				<h2 className="text-xl font-semibold text-center mb-10">TimeAxis</h2>
			</div>
			<ul className="space-y-5 text-sm">
				<li className="flex gap-2">
					<LayoutDashboard color="black" size={18} />
					<Link href="/dashboard" className="hover:underline">
						Dashboard
					</Link>
				</li>
				<li className="flex gap-2">
					<Calendar color="black" size={18} />
					<Link href="/leaveRequest" className=" hover:underline">
						Leave Request
					</Link>
				</li>
				<li className="flex gap-2">
					<UserPen color="black" size={18} />
					<Link href="/myProfile" className="hover:underline">
						My Profile
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default SideBar;
