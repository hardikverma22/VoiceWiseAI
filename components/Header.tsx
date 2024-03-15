"use client";
import {Loader} from "@/components/Loader";
import {Button} from "@/components/ui/button";
import {SignInButton, UserButton} from "@clerk/nextjs";
import {AuthLoading, Authenticated, Unauthenticated} from "convex/react";
import Link from "next/link";

export const Header = () => {
  return (
    <nav
      className="border-b bottom-2 border-gray-200
                sticky top-0 z-50
                container flex justify-between items-center
                lg:px-20 px-5 py-5 mx-auto"
    >
      <Link href="/">
        <div className="flex items-center">
          <span className="text-xl font-bold">VoiceWise</span>
          <span className="text-2xl font-bold text-purple-600">AI</span>
        </div>
      </Link>
      <div className="flex gap-5 items-center">
        <Link
          href="/dashboard"
          className="hover:underline hover:underline-offset-2 text-md font-medium"
        >
          Recordings
        </Link>
        <Link
          href="/actionitems"
          className="hover:underline hover:underline-offset-2 text-md font-medium"
        >
          <div className="flex items-center">Action Items</div>
        </Link>
        <AuthLoading>
          <Loader />
        </AuthLoading>
        <Authenticated>
          <UserButton />
        </Authenticated>
        <Unauthenticated>
          <SignInButton mode="modal" />
        </Unauthenticated>
      </div>
    </nav>
  );
};
