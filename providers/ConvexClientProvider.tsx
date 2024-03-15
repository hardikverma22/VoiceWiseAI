"use client";
import {ReactNode} from "react";
import {ConvexReactClient} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ClerkProvider, useAuth} from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export default function ConvexClientProvider({children}: {children: ReactNode}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
