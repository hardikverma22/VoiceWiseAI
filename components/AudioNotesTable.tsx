"use client";
import ConfirmDeletionAlertDialog from "@/components/ConfirmDeletion";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Doc} from "@/convex/_generated/dataModel";
import Link from "next/link";

export default function AudioNotesTable({notes}: {notes: (Doc<"audioNotes"> & {count: number})[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full overflow-ellipsis">
          <TableHead className="max-w-[500px]">Title</TableHead>
          <TableHead>Generation Time</TableHead>
          <TableHead className="text-center">Tasks</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {notes?.map((note) => (
          <Link href={`recording/${note._id}`} legacyBehavior={true} key={note._id}>
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
              <TableCell className="text-center p-1" onClick={(e) => e.preventDefault()}>
                <ConfirmDeletionAlertDialog noteId={note._id} />
              </TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}
