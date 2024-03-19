"use client";
import Loader from "@/components/Loader";
import {SignInButton, UserButton} from "@clerk/nextjs";
import {AuthLoading, Authenticated, Unauthenticated, useConvexAuth} from "convex/react";
import Link from "next/link";

export const Header = () => {
  const {isAuthenticated} = useConvexAuth();
  return (
    <header
      className="w-full fixed top-0 z-[1000] dark:bg-black bg-white
    border-b bottom-2 border-gray-300 h-fit"
    >
      <nav
        className="container flex justify-between items-start
                lg:px-20 px-5 py-5"
      >
        <Link href={isAuthenticated ? "/dashboard" : "/"}>
          <div className="flex items-center">
            <span className="text-xl font-bold">VoiceWise</span>
            <span className="text-2xl font-bold text-purple-600">AI</span>
          </div>
        </Link>
        <div className="flex gap-5 items-center">
          <AuthLoading>
            <Loader />
          </AuthLoading>
          <Authenticated>
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
            <UserButton afterSignOutUrl="/" />
          </Authenticated>
          <Unauthenticated>
            <SignInButton mode="modal" />
          </Unauthenticated>
        </div>
      </nav>
    </header>
  );
};
