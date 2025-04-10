"use client";
import { LogOut } from "lucide-react";
import React from "react";
import { useAuth } from "../context/AuthContext";
function Header() {
	const { logout, user } = useAuth();
	return (
		<>
			<div className="w-full ">
				<div className="flex py-4 justify-between items-center border-b border-zinc-300 px-6">
					<h1 className="text-xl capitalize font-bold">
						Welcome <span className="">{user?.username}</span>
					</h1>
					<ul className="flex  gap-10 font-semibold text-sm">
						<li>
							<button onClick={() => logout()} className="flex gap-2 items-center">
								<LogOut color="black" size={18} />
								<h1>Logout</h1>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Header;
