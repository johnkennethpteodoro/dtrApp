"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserPen, Calendar, Clock } from "lucide-react";
function SideBar() {
	const currentPath = usePathname();
	const links = [
		{
			name: "Dashboard",
			icon: <LayoutDashboard color="black" size={18} />,
			path: "/dashboard",
		},
		{
			name: "Leave Request",
			icon: <Calendar color="black" size={18} />,
			path: "/leaveRequest",
		},
		{
			name: "My Profile",
			icon: <UserPen color="black" size={18} />,
			path: "/myProfile",
		},
	];
	return (
		<div className="w-64 bg-white hidden sm:hidden md:hidden xl:block lg:block px-7 p-5 shadow">
			<div className="flex gap-2 w-full justify-center">
				<Clock color="black" size={27} />
				<h2 className="text-xl font-semibold text-center mb-10">TimeAxis</h2>
			</div>
			<ul className="space-y-6 text-sm">
				{links.map((link) => (
					<li
						className={` ${
							link.path === currentPath
								? "text-zinc-950 font-semibold"
								: "text-zinc-500"
						} flex gap-2 hover:text-zinc-700`}
						key={link.path}
					>
						<Link href={link.path} className="flex gap-2">
							{link.icon}
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SideBar;
