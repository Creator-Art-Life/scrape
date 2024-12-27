import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Sign() {
  return (
    <div className="ml-1">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button variant={"outline"}>Sign In</Button>
        </Link>
      </SignedOut>
    </div>
  );
}
