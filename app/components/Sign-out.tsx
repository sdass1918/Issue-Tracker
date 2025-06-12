"use client";
import { signOut } from "next-auth/react";
import { Button } from "@radix-ui/themes";

export function SignOut() {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
}
