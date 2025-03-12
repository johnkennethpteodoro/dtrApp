import Login from "./components/Login";

export default function Home() {
	return (
		<>
			<div className="bg-gray-100 h-screen">
				<div className="flex justify-center w-full h-screen items-center">
					<Login />
				</div>
			</div>
		</>
	);
}
