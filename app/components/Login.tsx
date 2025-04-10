"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Clock } from "lucide-react";

function Login() {
	const { login, error, loginAttempts } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [loginDisabled, setLoginDisabled] = useState(true);
	const [passwordError, setPasswordError] = useState("");

	const validateEmail = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		if (!validateEmail(value)) {
			setEmailError("Please enter a valid email address.");
		} else {
			setEmailError("");
		}
		updateLoginButton(value, password);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		if (value.length < 4) {
			setPasswordError("Password must be at least 4 characters long.");
			setLoginDisabled(true);
		} else {
			setPasswordError("");
			setLoginDisabled(false);
		}
		updateLoginButton(email, value);
	};

	const updateLoginButton = (email: string, password: string) => {
		if (validateEmail(email) && password.length >= 4) {
			setLoginDisabled(false);
		} else {
			setLoginDisabled(true);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Login button clicked");
		if (loginAttempts >= 3) {
			alert("Maximum limit of 3 invalid password attempts reached. Please try again later.");

			return;
		}
		await login(email, password);
	};

	return (
		<div className="w-[400px]">
			<div className="bg-white px-7 py-5 ">
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
							placeholder="Username or Email"
							value={email}
							onChange={handleEmailChange}
							className="border border-gray-200 py-2 px-3  w-full text-sm focus:outline-none"
						/>
						{emailError && (
							<p className="text-sm" style={{ color: "red", marginTop: "5px" }}>
								{emailError}
							</p>
						)}

						<label htmlFor="password" className="block mt-4 mb-1 text-sm font-medium">
							Password
						</label>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
							className="border border-gray-200 py-2 px-3 focus:outline-none w-full text-sm"
						/>
						{passwordError && (
							<p className="text-sm" style={{ color: "red", marginTop: "5px" }}>
								{passwordError}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={loginDisabled}
						className="mt-8 w-full text-center bg-zinc-950 text-white py-2 font-medium "
					>
						Login
					</button>
					{error && (
						<p className="mt-2 text-center text-sm" style={{ color: "red" }}>
							{error}
						</p>
					)}

					{loginAttempts >= 3 && (
						<p className="mt-2 text-center text-sm" style={{ color: "red" }}>
							Maximum limit of invalid password attempts reached. Please try again
							later.
						</p>
					)}
				</form>
			</div>
		</div>
	);
}

export default Login;
