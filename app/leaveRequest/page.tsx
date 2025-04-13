import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";
import SideBar from "../components/SideBar";
import LeaveRequestForm from "../components/LeaveRequestForm";

function page() {
	return (
		<ProtectedRoute>
			<div className="flex h-screen bg-gray-200">
				<SideBar />

				<div className="flex-1 overflow-auto">
					<Header />
					<div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 m-5">
						<div className="bg-white h-full pb-5 shadow">
							<div className="bg-zinc-900 py-4 px-5 ">
								<h1 className="text-white font-bold text-sm text-center">
									Sick Leave
								</h1>
							</div>
							<h1 className="py-2 text-center text-[45px] font-extrabold">12</h1>
						</div>
						<div className="bg-white h-full pb-5 shadow">
							<div className="bg-zinc-900 py-4 px-5 ">
								<h1 className="text-white font-bold text-sm text-center">
									Vacation Leave
								</h1>
							</div>
							<h1 className="py-2 text-center text-[45px] font-extrabold">7</h1>
						</div>
						<div className="bg-white h-full pb-5 shadow">
							<div className="bg-zinc-900 py-4 px-5 ">
								<h1 className="text-white font-bold text-sm text-center">
									Unpaid Leave
								</h1>
							</div>
							<h1 className="py-2 text-center text-[45px] font-extrabold">5</h1>
						</div>
						<div className="bg-white h-full pb-5 shadow">
							<div className="bg-zinc-900 py-4 px-5 ">
								<h1 className="text-white font-bold text-sm text-center">
									Emergency Leave
								</h1>
							</div>
							<h1 className="py-2 text-center text-[45px] font-extrabold">8</h1>
						</div>
					</div>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 m-5">
						<div className="col-span-1 lg:col-span-1 xl:col-span-2">
							<div className="col-span-1">
								<LeaveRequestForm />
							</div>
						</div>
						<div className="col-span-1">
							<div className="bg-white shadow p-7">
								<h1 className="font-extrabold capitalize text-[18px] mb-5">
									Leave Record
								</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}

export default page;
