"use client";

import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { AlertCircle, AudioLines } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Hero() {
  const { openSignInPopupOrRedirect } = useAuth();
  return (
    <section
      className="w-full 
                flex justify-center items-center flex-col gap-10
                min-h-[calc(100dvh-72px)] mt-[72px] 
                bg-[url('/abstract.png')]
                rounded-b-3xl
                lg:px-20 px-5"
    >
      <h1
        className="font-bold text-center
                    text-3xl md:text-5xl lg:text-7xl lg:max-w-5xl"
      >
        Transform Voice into Action Anywhere, Anytime
      </h1>
      <h2
        className="text-center flex flex-col gap-1
      text-lg md:text-2xl lg:text-3xl lg:max-w-5xl
      text-gray-500"
      >
        <p>Empower Your Conversations</p>
        <p>
          Transforming <span className="font-bold text-purple-950">Speech</span>{" "}
          into <span className="font-bold text-purple-950">Action</span>
        </p>
      </h2>
      <Button disabled onClick={() => {}} className="flex gap-2" size="lg">
        <AudioLines className="h-5 w-5" />
        Try Now
      </Button>
      <Alert
        variant="destructive"
        className="max-w-md mx-auto mt-8 bg-red-50 border-red-300"
      >
        <div className="flex items-start flex-col">
          <div className="flex gap-2 items-center">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-lg font-semibold text-red-800">
              Service Unavailable
            </AlertTitle>
          </div>
          <AlertDescription className="text-red-700 mt-1">
            Our service is currently down due to Replicate AI maintenance. We
            apologize for the inconvenience and will be back soon.
          </AlertDescription>
        </div>
      </Alert>
    </section>
  );
}
