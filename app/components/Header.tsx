"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
function Header() {
	const { logout, user } = useAuth();
	const [showMenu, setShowMenu] = useState(false);
	const handleShowMenu = () => {
		setShowMenu(!showMenu);
	};
	return (
		<>
			<div className="w-full">
				<div className="flex py-4 justify-between items-center border-b border-zinc-300 px-6 ">
					<h1 className="text-xl capitalize font-bold">
						Welcome <span className="">{user?.username}</span>
					</h1>
					<ul className="flex gap-10 font-semibold text-sm">
						<li>
							<button onClick={() => logout()} className="flex gap-2 items-center">
								<LogOut color="black" size={18} />
								<h1>Logout</h1>
							</button>
						</li>
					</ul>
				</div>
				<div className=" py-3 xl:hidden lg:hidden md:block sm:block border-b bg-zinc-100 border-zinc-300 px-5 block">
					<div className="w-full text-right flex justify-end items-center">
						<button onClick={handleShowMenu}>
							<Menu color="black" size={18} />
						</button>
					</div>
					<div>
						{showMenu && (
							<u className="text-sm list-none space-y-1">
								<li>
									<Link href="/dashboard">Dashboard</Link>
								</li>
								<li>
									<Link href="/leaveRequest">Leave Request</Link>
								</li>
								<li>
									<Link href="/myProfile">Profile</Link>
								</li>
							</u>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
