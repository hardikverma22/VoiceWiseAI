"use client";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {api} from "@/convex/_generated/api";
import {Doc, Id} from "@/convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {Trash} from "lucide-react";
import Link from "next/link";
import {MouseEvent} from "react";

export default function AudioNotesTable({
  notes,
}: {
  notes: (Doc<"audioNotes"> & {count: number})[] | undefined | null;
}) {
  const deleteNote = useMutation(api.audio.removeNote);

  const handleDeleteNote = (e: MouseEvent<HTMLButtonElement>, noteId: Id<"audioNotes">) => {
    e.stopPropagation();
    deleteNote({id: noteId});
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full overflow-ellipsis">
          {/* <TableHead className="w-[100px]">Invoice</TableHead> */}
          <TableHead className="max-w-[500px]">Title</TableHead>
          <TableHead>Generation Time</TableHead>
          <TableHead className="text-center">Tasks</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {notes?.map((note) => (
          <Link href={`recording/${note._id}`} legacyBehavior={true}>
            <TableRow key={note._id} className="cursor-pointer">
              <TableCell
                className="max-w-[400px] font-medium truncate"
                title={note.title ?? "New Note"}
              >
                {note.title ?? "New Note"}
              </TableCell>
              <TableCell>
                {new Date(note._creationTime).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-center">{note.count}</TableCell>
              <TableCell className="text-right p-1">
                <Button
                  onClick={(e) => handleDeleteNote(e, note._id)}
                  variant="link"
                  className="text-right hover:scale-105 duration-300 transition-all hover:text-red-500"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}
