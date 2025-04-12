import React from "react";

function Profile() {
	return (
		<div className="m-5">
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 m-5">
				<div className="col-span-1 xl:col-span-2">
					<div className="bg-white pb-5 shadow h-[500px] relative">
						<div className="bg-zinc-900 h-[150px] px-5">
							<div className="h-[123px] w-[123px] bg-white top-[90px] rounded-full absolute left-[] flex items-center justify-center">
								<img
									src="/me.jpeg"
									alt="Profile picture"
									className="h-[120px] w-[120px] rounded-full"
									loading="lazy"
									decoding="async"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-1 xl:col-span-1">
					<div className="bg-white h-[500px] pb-5 shadow"></div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
