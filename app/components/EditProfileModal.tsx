"use client";
import { useEffect } from "react";

interface EditProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title: string;
	onConfirm: () => void;
}

function EditProfileModal({ isOpen, onClose, children, title, onConfirm }: EditProfileModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
			onClick={onClose}
		>
			<div
				className="bg-white  shadow-xl w-full max-w-md"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center p-4">
					<h3 className="text-xl font-semibold text-gray-900">{title}</h3>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-500">
						<span className="sr-only">Close</span>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div className="p-4">{children}</div>

				<div className="flex justify-end gap-2 p-4">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-200 text-gray-800  hover:bg-gray-300 transition"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							onConfirm(); // Call the onConfirm function
							onClose(); // Also close the modal
						}}
						className="px-4 py-2 bg-zinc-800 text-white  hover:bg-zinc-900 transition"
					></button>
				</div>
			</div>
		</div>
	);
}

export default EditProfileModal;
