"use client";
import AudioNotesTable from "@/components/AudioNotesTable";
import {Loader} from "@/components/Loader";
import {Button} from "@/components/ui/button";
import {api} from "@/convex/_generated/api";
import {useQuery} from "convex/react";
import {Mic} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const notes = useQuery(api.audio.getNotes, {});
  console.log(notes);

  if (!notes)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex gap-1 justify-center items-center">
          <Loader />
          <span>Laoding Audio Notes</span>
        </div>
      </div>
    );

  if (notes && notes.length === 0)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col gap-5 justify-center items-center">
          <h2 className="text-2xl font-bold">Record your first Note</h2>
          <Image src="/record.svg" alt="record now" width={300} height={300} />
          <Link href="/record">
            <Button className="flex gap-2 w-full mt-5" size="lg">
              <Mic className="h-4 w-4" />
              <span className="text-base">Record</span>
            </Button>
          </Link>
        </div>
      </div>
    );

  return (
    <section
      className="h-full flex items-center flex-col
    lg:px-20 px-5 py-5 gap-5"
    >
      <div className="flex justify-end w-full items-end">
        <Link href="/record">
          <Button className="flex gap-2" size="lg">
            <Mic className="h-4 w-4" />
            <span className="text-base">Record</span>
          </Button>
        </Link>
      </div>
      <div className="flex justify-between w-full mb-5">
        <h1 className="font-semibold text-lg">Your Audio Recordings</h1>
        <div>Search Bar & Filters Placeholder</div>
      </div>
      <AudioNotesTable notes={notes} />
    </section>
  );
}
