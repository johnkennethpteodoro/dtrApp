import React from "react";

function Header() {
	return (
		<>
			<div className="w-full bg-black ">
				<div className="flex py-5 pt-8 justify-between px-10">
					<h1 className="text-2xl text-white font-bold">
						Time<span className="text-blue-400">Axis</span>
					</h1>
					<ul className="flex text-white gap-10 font-semibold text-sm">
						<li>
							<a href="">My Request</a>
						</li>
						<li>
							<a href="">My Account</a>
						</li>
						<li>
							<a href="">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Header;
