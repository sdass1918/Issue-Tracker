import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";
import { issueSchema } from "../../../issueSchema";


export async function GET(
  req: NextRequest
) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split("/").pop());

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  return NextResponse.json(issue);
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split("/").pop());
  const body = await req.json();
  const parsed = issueSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.errors, { status: 400 });
  }

  const { title, description, status } = parsed.data;

  const updatedIssue = await prisma.issue.update({
    where: { id: Number(id) },
    data: { title, description, status },
  });

  return NextResponse.json(updatedIssue);
}


// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const parsedBody = issueSchema.safeParse(body);
//         if(!parsedBody.success) {
//             return NextResponse.json(parsedBody.error.errors, { status: 400 });
//         }

//         const { title, description, status } = parsedBody.data;
        
//         const newIssue = await prisma.issue.create({
//             data: {
//                 title: body.title,
//                 description: body.description,
//                 status: body.status,
//             },
//         });
//         return NextResponse.json(newIssue, { status: 201 });
//     }
//     catch (error) {
//         console.error("Error parsing JSON:", error);
//         return new Response("Invalid JSON", { status: 400 });
//     }
// }

export async function DELETE(
  req: NextRequest,
) {
  const url = new URL(req.url)
  const id = Number(url.pathname.split("/").pop());

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id } });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({ where: { id } });

  return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 });
}