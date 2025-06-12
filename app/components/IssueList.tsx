"use client";

import { useRouter } from "next/navigation";
import { IconButton, Tooltip, Badge } from "@radix-ui/themes";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { deleteIssue } from "@/prisma/actions";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "CLOSED" | "IN_PROGRESS";
}

export default function IssueList({ issues }: { issues: Issue[] }) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );
    if (!confirmDelete) return;

    try {
      await deleteIssue(id);
      router.refresh(); // Refreshes current route
    } catch (err) {
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <ul className="mt-4">
      {issues.map((issue) => (
        <li key={issue.id} className="border p-2 my-2 rounded">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{issue.title}</h3>
              <p className="text-sm text-muted">{issue.description}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <Badge
                color={
                  issue.status === "OPEN"
                    ? "green"
                    : issue.status === "CLOSED"
                    ? "red"
                    : "yellow"
                }
              >
                {issue.status}
              </Badge>
              <Tooltip content="Edit Issue">
                <Link href={`/issues/${issue.id}/modify`}>
                  <IconButton radius="full">
                    <Pencil2Icon className="w-4 h-4" />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip content="Delete issue">
                <IconButton
                  radius="full"
                  variant="soft"
                  color="red"
                  onClick={() => handleDelete(issue.id)}
                >
                  <TrashIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
