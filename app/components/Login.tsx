"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

interface User {
	email: string;
	password: string;
	// Add other properties if needed
}

interface Data {
	users: User[];
}

function Login() {
	const router = useRouter();
	const [data, setData] = useState<Data | null>(null);
	const [loginAttempts, setLoginAttempts] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [loginDisabled, setLoginDisabled] = useState(true);
	const [passwordError, setPasswordError] = useState("");
	const [loginError, setLoginError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/data.json");
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				console.log("Failed to fetch", error);
			}
		};

		fetchData();
	}, []);

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (loginAttempts >= 3) {
			alert("Maximum limit of invalid password attempts reached. Please try again later.");
			return;
		}

		if (data) {
			const user = data.users.find((u: User) => u.email === email && u.password === password);
			if (user) {
				alert("Login successful! Redirecting to home page...");
				router.push("/employeeDtr");
			} else {
				setLoginAttempts((prevAttempts) => prevAttempts + 1);
				setLoginError("Invalid email or password. Please try again.");
			}
		}
	};

	return (
		<>
			<div className="w-[400px]">
				<div className="bg-white px-7 py-5 rounded-md ">
					<div className="flex flex-col items-center justify-center">
						<div className="mt-8 mb-4">
							<Clock color="black" size={48} />
						</div>
						<h1 className="text-xl font-bold mb-6">TimeAxis</h1>
					</div>

					<form onSubmit={handleSubmit} className="pb-20">
						<div>
							<label htmlFor="email" className="block mb-1 text-sm font-medium">
								Email
							</label>
							<input
								type="text"
								placeholder="Username or Email"
								value={email}
								onChange={handleEmailChange}
								className="border border-gray-200 py-2 px-3 rounded-sm w-full text-sm"
							/>
							{emailError && (
								<p style={{ color: "red", marginTop: "5px" }}>{emailError}</p>
							)}

							<label
								htmlFor="password"
								className="block mt-4 mb-1 text-sm font-medium"
							>
								Password
							</label>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
								className="border border-gray-200 py-2 px-3 rounded-sm w-full text-sm"
							/>
							{passwordError && (
								<p style={{ color: "red", marginTop: "5px" }}>{passwordError}</p>
							)}
						</div>

						<button
							type="submit"
							disabled={loginDisabled}
							className="mt-8 w-full text-center bg-blue-700 text-white rounded-lg py-2 font-medium"
						>
							Login
						</button>
					</form>
					{loginError && <p style={{ color: "red" }}>{loginError}</p>}
					{loginAttempts >= 3 && (
						<p style={{ color: "red" }}>
							Maximum limit of invalid password attempts reached. Please try again
							later.
						</p>
					)}
				</div>
			</div>
		</>
	);
}

export default Login;
