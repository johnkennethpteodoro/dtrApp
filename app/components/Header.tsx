"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
function Header() {
	const { logout, user } = useAuth();
	return (
		<>
			<div className="w-full ">
				<div className="flex py-4 justify-between items-center px-10">
					<h1 className="text-2xl  font-bold">
						Welcome <span className="text-blue-400">{user?.username}</span>
					</h1>
					<ul className="flex  gap-10 font-semibold text-sm">
						<li>
							<button onClick={() => logout()}>Logout</button>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Header;
