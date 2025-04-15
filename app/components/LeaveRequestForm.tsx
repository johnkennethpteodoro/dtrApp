"use client";
import React, { useEffect } from "react";
import { format, differenceInDays, isBefore, isToday } from "date-fns";
import { useForm } from "react-hook-form";

enum Status {
	OPEN = "OPEN",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
	CANCELLED = "CANCELLED",
}
enum LeaveType {
	VACATION = "VACATION",
	SICK = "SICK",
	UNPAID = "UNPAID",
	EMERGENCY = "EMERGENCY",
	DEFAULT = "DEFAULT",
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
			id: 42, // Example ID
			status: Status.OPEN,
			leave_type: LeaveType.DEFAULT,
			start_date: "",
			end_date: "",
			reason: "",
			comments: "Team notified via email",
			total_days: 0,
			employee_name: "Kenneth Villarin",
			user_id: 12,
			approved_by_id: 5,
			approved_by: {
				id: 5,
				employee_id: "MGR-789",
				full_name: "Jane Doe",
				position: "Engineering Manager",
				department: "Engineering",
				employment_status: "Full-time",
				shift_schedule: "9 AM - 5 PM",
				immediate_supervisor: "CTO",
				company_email: "jane.doe@company.com",
				contact_number: "+1234567890",
				employee_since: new Date("2020-01-15"),
				address: "123 Management Ave, City",
				role: "MANAGER",
				created_at: new Date(),
				updated_at: new Date(),
			},
		},
	});

	const watchStartDate = watch("start_date");
	const watchEndDate = watch("end_date");
	const watchLeaveType = watch("leave_type");

	useEffect(() => {
		if (watchStartDate && watchEndDate) {
			const start = new Date(watchStartDate);
			const end = new Date(watchEndDate);

			// Calculate total days (inclusive)
			const days = differenceInDays(end, start) + 1;
			setValue("total_days", days > 0 ? days : 0);
		} else {
			setValue("total_days", 0);
		}
	}, [watchStartDate, watchEndDate, setValue]);

	const validateStartDate = (date: string) => {
		const today = new Date();
		const selectedDate = new Date(date);

		if (
			watchLeaveType === "VACATION" &&
			isBefore(selectedDate, today) &&
			!isToday(selectedDate)
		) {
			setError("start_date", {
				type: "manual",
				message: "Vacation cannot be scheduled for past dates",
			});
			return false;
		} else {
			clearErrors("start_date");
			return true;
		}
	};

	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value;

		if (validateStartDate(date)) {
			setValue("start_date", date);

			if (!watchEndDate || new Date(watchEndDate) < new Date(date)) {
				setValue("end_date", date);
			}
		}
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value;
		if (new Date(date) >= new Date(watchStartDate)) {
			setValue("end_date", date);
			clearErrors("end_date");
		} else {
			setError("end_date", {
				type: "manual",
				message: "End date cannot be before start date",
			});
		}
	};

	const today = format(new Date(), "yyyy-MM-dd");
	const minEndDate = watchStartDate || today;

	const onSubmit = async (data: LeaveRequestForm) => {
		console.log("Submitting data:", data);
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
					<input type="hidden" {...register("id")} />
					<input type="hidden" {...register("status")} />
					<input type="hidden" {...register("user_id")} />
					<input type="hidden" {...register("employee_name")} />
					<input type="hidden" {...register("approved_by_id")} />
					<input type="hidden" {...register("comments")} />
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Leave Type <span className="text-red-500">*</span>
					</label>
					<select
						className="select mt-1 block w-full pl-3 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm"
						{...register("leave_type", { required: "Leave type is required" })}
					>
						<option value="DEFAULT" disabled>
							Select leave Type
						</option>
						<option value="SICK">Sick</option>
						<option value="VACATION">Vacation</option>
						<option value="UNPAID">Unpaid</option>
						<option value="EMERGENCY">Emergency</option>
					</select>
					{errors.leave_type && (
						<p className="mt-1 text-sm text-red-600">{errors.leave_type.message}</p>
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
							min={watchLeaveType === "VACATION" ? today : undefined}
							className={`mt-1 block w-full px-3 py-2 border ${
								errors.start_date ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
							{...register("start_date", {
								required: "Start date is required",
								onChange: handleStartDateChange,
							})}
						/>
						{errors.start_date && (
							<p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>
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
								errors.end_date ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
							{...register("end_date", {
								required: "End date is required",
								onChange: handleEndDateChange,
							})}
						/>
						{errors.end_date && (
							<p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>
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
							{...register("total_days")}
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
