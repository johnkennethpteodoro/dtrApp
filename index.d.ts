interface User {
	id: number;
	employee_id: string;
	full_name: string;
	position: string;
	department: string;
	employment_status: string;
	shift_schedule: string;
	immediate_supervisor: string;
	company_email: string;
	contact_number: string;
	employee_since: Date;
	address: string;
	role: "EMPLOYEE" | "MANAGER" | "HR" | "ADMIN"; // Assuming possible Role values

	// Relations
	leave_requests: LeaveRequest[];
	approved_requests: LeaveRequest[];

	created_at: Date;
	updated_at: Date;
}

interface LeaveRequestForm {
	id: number;
	status: Status;
	leave_type: LeaveType;
	start_date: string;
	end_date: string;
	reason: string;
	created_at: Date;
	updated_at: Date;
	comments?: string | null;
	total_days: number;
	employee_name: string;
	user_id: number;
	approved_by_id?: number | null;
	approved_by?: User | null;
}
