import { getAllIssues } from "@/prisma/actions";
import IssueList from "./components/IssueList"; // Client Component
import getSession from "./auth-config/getSession";
import SignIn from "./components/Sign-in";

export default async function Home() {
  // const session = await getSession(); // ✅ wait for the session
  // if (!session?.user) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <SignIn />
  //     </div>
  //   );
  // }
  const issues = await getAllIssues();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">All Issues</h2>
      <IssueList issues={issues} />
    </div>
  );
}
