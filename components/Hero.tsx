"use client";

import useAuth from "@/hooks/useAuth";
import {Button} from "@/components/ui/button";
import {AudioLines} from "lucide-react";

export default function Hero() {
  const {openSignInPopupOrRedirect} = useAuth();
  return (
    <section
      className="w-full h-full 
                flex justify-center items-center flex-col gap-10"
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
          Transforming <span className="font-bold text-purple-950">Speech</span> into{" "}
          <span className="font-bold text-purple-950">Action</span>
        </p>
      </h2>
      <Button onClick={openSignInPopupOrRedirect} className="flex gap-2" size="lg">
        <AudioLines className="text-yellow-500 h-5 w-5" />
        Try Now
      </Button>
    </section>
  );
}
