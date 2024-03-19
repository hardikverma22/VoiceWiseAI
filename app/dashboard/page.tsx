"use client";
import AudioNotesTable from "@/components/AudioNotesTable";
import Loader from "@/components/Loader";
import {Button} from "@/components/ui/button";
import {api} from "@/convex/_generated/api";
import {useAction, useQuery} from "convex/react";
import {Mic, SearchIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {useState} from "react";

export default function page() {
  const notes = useQuery(api.audio.getNotes, {});
  const [filteredNotes, setFilteredNotes] = useState<typeof notes>();
  const [searchQuery, setSearchQuery] = useState("");
  const getSimilarNotes = useAction(api.together.similarNotes);

  const handleSearch = async () => {
    if (!notes || !notes.length) return;

    const scores = await getSimilarNotes({searchQuery: searchQuery});
    const scoreMap: Map<string, number> = new Map();
    for (const s of scores) {
      scoreMap.set(s.id, s.score);
    }
    const filteredResults = notes.filter((note) => (scoreMap.get(note._id) ?? 0) > 0.4);
    setFilteredNotes(filteredResults);
  };

  const finalNotes = filteredNotes ?? notes;
  if (!notes)
    return (
      <div className="flex justify-center items-center w-full h-full min-h-[calc(100dvh-72px)] mt-[72px]">
        <div className="flex gap-1 justify-center items-center">
          <Loader />
          <span>Laoding Audio Notes</span>
        </div>
      </div>
    );

  if (notes && notes.length === 0)
    return (
      <div className="flex justify-center items-center w-full h-full min-h-[calc(100dvh-72px)] mt-[72px]">
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
    <section className="h-full flex justify-start items-center flex-col pt-10">
      <div className="flex flex-col w-full shadow-lg h-full px-5">
        <div className="flex flex-col md:flex-row justify-between items-center w-full mb-5 border-b-2 border-gray-300 border-opacity-55 p-1">
          <h1 className="font-semibold text-lg text-left w-full md:w-fit align-text-bottom">
            Your Audio Recordings
          </h1>
          <div className="w-full md:w-fit flex gap-2 justify-center items-center ">
            <Input
              placeholder="Search in your notes..."
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value) {
                  setFilteredNotes(undefined);
                }
              }}
              value={searchQuery}
              onKeyUp={(e) => {
                if (e.key === "Enter" && searchQuery) handleSearch();
              }}
              className="border-2 border-gray-400"
            />
            <Button
              className="flex gap-2 border-2 border-gray-200 disabled:border-0"
              size="sm"
              variant="secondary"
              onClick={handleSearch}
              disabled={!searchQuery}
            >
              <SearchIcon className="h-4 w-4" />
            </Button>
            <Link href="/record">
              <Button
                className="flex gap-2 border-2 border-gray-400 hover:bg-gray-200"
                size="sm"
                variant="secondary"
              >
                <Mic className="h-4 w-4" />
                <span className="">Record</span>
              </Button>
            </Link>
          </div>
        </div>
        {finalNotes && <AudioNotesTable notes={finalNotes} />}
      </div>
    </section>
  );
}
