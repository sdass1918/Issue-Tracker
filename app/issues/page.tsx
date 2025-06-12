import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </div>
  );
};

export default page;
