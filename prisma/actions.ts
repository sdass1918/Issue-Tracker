import prisma from './client';
import axios from "axios";
import getSession from '@/app/auth-config/getSession';


export async function getAllIssues() {
  const session = await getSession();
  if (!session || !session.user?.email) {
    return [];
  }
  const issues = await prisma.issue.findMany({
    where: { userId: session.user.email },
    orderBy: { createdAt: "desc" },
  }); 
  return issues;
}



export async function deleteIssue(id: number) {
  try {
    const res = await axios.delete(`/api/issues/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete issue:", error);
    throw error;
  }
}
