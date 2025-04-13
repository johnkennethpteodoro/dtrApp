"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
	email: string;
	password?: string;
	username: string;
}

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<boolean>;
	register: (email: string, password: string, username: string) => Promise<boolean>;
	logout: () => void;
	loading: boolean;
	error: string | null;
	loginAttempts: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [loginAttempts, setLoginAttempts] = useState(0);
	const [usersData, setUsersData] = useState<User[]>([]);
	const router = useRouter();

	// Load user data on initial render
	useEffect(() => {
		const fetchData = async () => {
			console.log("Fetching user data...", usersData);
			try {
				const response = await fetch("/data.json");
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const jsonData = await response.json();
				setUsersData(jsonData.users);
			} catch (error) {
				console.error("Failed to fetch user data", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, [usersData]);

	const login = async (email: string, password: string): Promise<boolean> => {
		if (loginAttempts >= 3) {
			setError("Maximum login attempts reached. Please try again later.");
			return false;
		}

		try {
			const foundUser = usersData.find((u) => u.email === email && u.password === password);
			console.log("Found user:", foundUser);

			if (foundUser) {
				const userData = { email: foundUser.email, username: foundUser.username };
				setUser(userData);
				localStorage.setItem("user", JSON.stringify(userData));
				setLoginAttempts(0);
				setError(null);

				router.push("/dashboard");
				return true;
			} else {
				setLoginAttempts((prev) => prev + 1);
				setError("Invalid email or password");
				return false;
			}
		} catch (err) {
			console.error("Login error:", err);
			setError("Login failed. Please try again.");
			return false;
		}
	};

	const register = async (
		email: string,
		password: string,
		username: string
	): Promise<boolean> => {
		try {
			const userExists = usersData.some((user) => user.email === email);
			if (userExists) {
				setError("Email already in use");
				return false;
			}

			const usernameTaken = usersData.some((u) => u.username === username);
			if (usernameTaken) {
				setError("Username already taken");
				return false;
			}

			const newUser: User = {
				email,
				password,
				username,
			};

			const updatedUsersData = [...usersData, newUser];
			setUsersData(updatedUsersData);

			const userData = { email: newUser.email, username: newUser.username };
			setUser(userData);
			localStorage.setItem("user", JSON.stringify(userData));
			setError(null);

			router.push("/");
			return true;
		} catch (err) {
			console.error("Register error:", err);
			setError("Register failed. Please try again.");
			return false;
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		router.push("/");
	};

	return (
		<AuthContext.Provider
			value={{ user, login, logout, register, loading, error, loginAttempts }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
