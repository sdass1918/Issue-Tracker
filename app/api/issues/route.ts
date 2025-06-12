import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";
import { issueSchema } from "../../issueSchema";
import getSession from "@/app/auth-config/getSession";



export async function POST(request: NextRequest) {
    const session = await getSession();
    if(!session || !session.user?.email) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        const body = await request.json();
        const parsedBody = issueSchema.safeParse(body);
        if(!parsedBody.success) {
            return NextResponse.json(parsedBody.error.errors, { status: 400 });
        }

        const { title, description, status } = parsedBody.data;
        
        const newIssue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description,
                status: body.status,
                userId: session.user.email,
            },
        });
        return NextResponse.json(newIssue, { status: 201 });
    }
    catch (error) {
        console.error("Error parsing JSON:", error);
        return new Response("Invalid JSON", { status: 400 });
    }
}