import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

const createIssueSchema = z.object({
	leave_type: z.enum(["VACATION", "SICK", "UNPAID", "EMERGENCY"]),
	start_date: z.string().min(1),
	end_date: z.string().min(1),
	reason: z.string().min(1),
	total_days: z.number().min(1),
	employee_name: z.string().min(1),
	user_id: z.number(),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validation = createIssueSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json(validation.error.errors, { status: 400 });
		}

		const newIssue = await prisma.leaveRequest.create({
			data: {
				leave_type: body.leave_type,
				start_date: body.start_date,
				end_date: body.end_date,
				reason: body.reason,
				status: body.status,
				total_days: body.total_days,
				employee_name: body.employee_name,
				user_id: body.user_id,
			},
		});

		return NextResponse.json(newIssue, { status: 201 });
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

export async function GET() {
	try {
		const leaveRequests = await prisma.leaveRequest.findMany({
			orderBy: {
				created_at: "desc",
			},
		});

		return NextResponse.json(leaveRequests, { status: 200 });
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
