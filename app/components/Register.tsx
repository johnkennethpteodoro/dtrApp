"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Clock } from "lucide-react";

function Register() {
	const { register, error } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await register(email, password, username);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	return (
		<div className="w-[400px]">
			<div className="bg-white px-7 py-5 shadow">
				<div className="flex flex-col items-center justify-center">
					<div className="mt-8 mb-2">
						<Clock color="black" size={48} />
					</div>
					<h1 className="text-xl font-bold mb-6">TimeAxis</h1>
				</div>

				{error && <div className="text-red-500 text-sm mb-4">{error}</div>}

				<form onSubmit={handleSubmit} className="pb-16">
					<div>
						<label htmlFor="username" className="block mb-1 text-sm font-medium">
							Username
						</label>
						<input
							type="text"
							placeholder="Choose a username"
							value={username}
							onChange={handleUsernameChange}
							className="border border-gray-200 py-2 px-3 w-full text-sm focus:outline-zinc-950"
							required
						/>

						<label htmlFor="email" className="block mt-4 mb-1 text-sm font-medium">
							Email
						</label>
						<input
							type="email"
							placeholder="Add your email"
							value={email}
							onChange={handleEmailChange}
							className="border border-gray-200 py-2 px-3 w-full text-sm focus:outline-zinc-950"
							required
						/>

						<label htmlFor="password" className="block mt-4 mb-1 text-sm font-medium">
							Password
						</label>
						<input
							type="password"
							placeholder="Create your password"
							value={password}
							onChange={handlePasswordChange}
							className="border border-gray-200 py-2 px-3 focus:outline-zinc-950 w-full text-sm"
							required
							minLength={6}
						/>
					</div>

					<button
						type="submit"
						className="mt-8 w-full text-center bg-zinc-950 text-white py-2 font-medium"
					>
						Register
					</button>
				</form>
			</div>
			<h1 className="mt-2 text-sm text-center">
				Already have an account?
				<Link href="/" className="ms-1 text-zinc-900 underline font-bold">
					Login
				</Link>
			</h1>
		</div>
	);
}

export default Register;
