"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Clock } from "lucide-react";

function Register() {
	const {} = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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

				<form onSubmit={handleSubmit} className="pb-16">
					<div>
						<label htmlFor="email" className="block mb-1 text-sm font-medium">
							Email
						</label>
						<input
							type="text"
							placeholder="Add your email"
							className="border border-gray-200 py-2 px-3  w-full text-sm focus:outline-zinc-950"
						/>

						<label htmlFor="password" className="block mt-4 mb-1 text-sm font-medium">
							Password
						</label>
						<input
							type="password"
							placeholder="Create your password"
							className="border border-gray-200 py-2 px-3 focus:outline-zinc-950 w-full text-sm"
						/>
					</div>

					<button
						type="submit"
						className="mt-8 w-full text-center bg-zinc-950 text-white py-2 font-medium "
					>
						Register
					</button>
				</form>
			</div>
			<h1 className="mt-2 text-sm text-center">
				Already have an account?
				<a href="/" className="ms-1 text-zinc-900 underline font-bold">
					Login
				</a>
			</h1>
		</div>
	);
}

export default Register;
