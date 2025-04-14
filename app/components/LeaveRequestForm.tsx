"use client";
import React, { useEffect } from "react";
import { format, differenceInDays, isBefore, isToday } from "date-fns";
import { useForm } from "react-hook-form";

interface LeaveRequestForm {
	reason: string;
	leaveType: string;
	totalDays: number;
	endDate: string;
	startDate: string;
}

function LeaveRequestForm() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<LeaveRequestForm>({
		defaultValues: {
			reason: "",
			leaveType: "",
			totalDays: 0,
			endDate: "",
			startDate: "",
		},
	});

	const watchStartDate = watch("startDate");
	const watchEndDate = watch("endDate");
	const watchLeaveType = watch("leaveType");

	useEffect(() => {
		if (watchStartDate && watchEndDate) {
			const start = new Date(watchStartDate);
			const end = new Date(watchEndDate);

			// Calculate total days (inclusive)
			const days = differenceInDays(end, start) + 1;
			setValue("totalDays", days > 0 ? days : 0);
		} else {
			setValue("totalDays", 0);
		}
	}, [watchStartDate, watchEndDate, setValue]);

	const validateStartDate = (date: string) => {
		const today = new Date();
		const selectedDate = new Date(date);

		if (
			watchLeaveType === "vacation" &&
			isBefore(selectedDate, today) &&
			!isToday(selectedDate)
		) {
			setError("startDate", {
				type: "manual",
				message: "Vacation cannot be scheduled for past dates",
			});
			return false;
		} else {
			clearErrors("startDate");
			return true;
		}
	};

	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value;
		if (validateStartDate(date)) {
			setValue("startDate", date);

			if (!watchEndDate || new Date(watchEndDate) < new Date(date)) {
				setValue("endDate", date);
			}
		}
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value;
		if (new Date(date) >= new Date(watchStartDate)) {
			setValue("endDate", date);
			clearErrors("endDate");
		} else {
			setError("endDate", {
				type: "manual",
				message: "End date cannot be before start date",
			});
		}
	};

	const today = format(new Date(), "yyyy-MM-dd");
	const minEndDate = watchStartDate || today;

	const onSubmit = async (data: LeaveRequestForm) => {
		try {
			const response = await fetch("/api/issues", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const responseData = await response.json();
			console.log("Form submitted successfully:", responseData);
			return responseData;
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	return (
		<div>
			<form className="bg-white shadow p-7" onSubmit={handleSubmit(onSubmit)}>
				<h1 className="font-extrabold capitalize text-[18px] mb-5">Submit Leave Request</h1>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Leave Type <span className="text-red-500">*</span>
					</label>
					<select
						className="select mt-1 block w-full pl-3 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm"
						{...register("leaveType", { required: "Leave type is required" })}
					>
						<option value="" disabled>
							Select leave Type
						</option>
						<option value="sick">Sick</option>
						<option value="vacation">Vacation</option>
						<option value="unpaid">Unpaid</option>
						<option value="emergency">Emergency</option>
					</select>
					{errors.leaveType && (
						<p className="mt-1 text-sm text-red-600">{errors.leaveType.message}</p>
					)}
				</div>

				<div className="grid grid-cols-1 xl:grid xl:grid-cols-3 gap-4 mt-5">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Start Date <span className="text-red-500">*</span>
						</label>
						<input
							type="date"
							id="startDate"
							min={watchLeaveType === "vacation" ? today : undefined}
							className={`mt-1 block w-full px-3 py-2 border ${
								errors.startDate ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
							{...register("startDate", {
								required: "Start date is required",
								onChange: handleStartDateChange,
							})}
						/>
						{errors.startDate && (
							<p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="endDate"
							className="block text-sm font-medium text-gray-700"
						>
							End Date <span className="text-red-500">*</span>
						</label>
						<input
							type="date"
							id="endDate"
							min={minEndDate}
							className={`mt-1 block w-full px-3 py-2 border ${
								errors.endDate ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
							{...register("endDate", {
								required: "End date is required",
								onChange: handleEndDateChange,
							})}
						/>
						{errors.endDate && (
							<p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="endDate"
							className="block text-sm font-medium text-gray-700"
						>
							Total Leave Days
						</label>
						<input
							type="number"
							min="0"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							disabled
							{...register("totalDays")}
						/>
						{watchStartDate && watchEndDate && watchStartDate && watchEndDate && (
							<p className="text-xs text-gray-500 mt-1">
								{format(new Date(watchStartDate), "MMM d, yyyy")} to{" "}
								{format(new Date(watchEndDate), "MMM d, yyyy")}
							</p>
						)}
					</div>
				</div>

				<div className="mt-5">
					<label htmlFor="reason" className="block text-sm font-medium text-gray-700">
						Reason <span className="text-red-500">*</span>
					</label>
					<textarea
						id="reason"
						rows={3}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none sm:text-sm"
						{...register("reason", { required: "Reason is required" })}
					/>
					{errors.reason && (
						<p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
					)}
				</div>

				<button
					type="submit"
					className="mt-4 px-4 py-2 text-[14px] bg-zinc-950 text-white rounded focus:outline-none"
				>
					Submit Leave Request
				</button>
			</form>
		</div>
	);
}

export default LeaveRequestForm;
