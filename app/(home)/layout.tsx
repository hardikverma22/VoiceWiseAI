import type {Metadata} from "next";
import {Lexend} from "next/font/google";
import "../globals.css";
import {Header} from "@/components/Header";
import {Toaster} from "@/components/ui/sonner";

import ConvexClientProvider from "@/providers/ConvexClientProvider";
import {cn} from "@/lib/utils";
import Progress from "@/components/Progress";

const lexend = Lexend({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "VoiceWiseAI",
  description: "Transform Voice into Action Anywhere, Anytime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body className={cn(lexend.className, "")}>
          <Header />
          <main className="z-10 min-h-[calc(100dvh-72px)] mt-[72px]">
            {children}
            <Progress />
          </main>
          <Toaster theme="light" position="bottom-left" />
        </body>
      </html>
    </ConvexClientProvider>
  );
}
