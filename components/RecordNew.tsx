import {Button} from "@/components/ui/button";
import {Mic} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RecordNew = () => {
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
};

export default RecordNew;
