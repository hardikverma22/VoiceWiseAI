import {FileSignatureIcon} from "lucide-react";
import Image from "next/image";
import {ReactNode} from "react";

const How = () => {
  return (
    <section
      className="min-h-[calc(100dvh-72px)] mt-[72px]
        flex flex-col gap-6 items-center
        w-full max-w-screen-2xl 
        text-center 
        md:text-start 
        lg:flex-row lg:gap-12 
        2xl:gap-32"
    >
      <div className="flex w-full min-w-full max-w-lg flex-1 items-center justify-center rounded-2xl bg-slate-50 py-32 lg:min-w-[370px]">
        <Image
          src="/audioplayer.svg"
          alt=""
          width={512}
          height={600}
          sizes="100vw"
          className="h-[300px] w-[300px] md:h-[345px] md:w-[512px]"
        />
      </div>
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="flex max-w-xl flex-col gap-4">
          <h3 className="text-3xl font-semibold tracking-wide">
            Streamline Your Workflow with Automated Transcription & <br />
            Action Item Management
          </h3>
          <h4 className="text-lg font-normal tracking-tight text-slate-500">
            Unlock Efficiency with AI-powered Transcription and
            <br /> Action Item Summarization
          </h4>
        </div>
        <div className="grid w-full grid-flow-row justify-items-start gap-x-16 gap-y-12 md:grid-cols-2 lg:gap-x-16 2xl:gap-x-32">
          <IconCard
            icon={<FileSignatureIcon className="size-8" />}
            headline="Automated Transcription"
            desc="Record your meetings, interviews, or lectures effortlessly & our AI will convert it into accurate text transcripts"
          />
          <IconCard
            icon={<FileSignatureIcon className="size-8" />}
            headline="Action Item Summarization"
            desc="Our advanced AI algorithms analyze the content of your audio recordings and generate concise summaries of action items"
          />
          <IconCard
            icon={<FileSignatureIcon className="size-8" />}
            headline="Effortless Management"
            desc="Seamlessly organize and manage action items with our intuitive management tool, manage due dates and much more."
          />
          <IconCard
            icon={<FileSignatureIcon className="size-8" />}
            headline="Recording Playback"
            desc="Whether it's a week, a month, or even a year later, you can rely on our system to store and maintain your recordings securely."
          />
        </div>
      </div>
    </section>
  );
};

function IconCard({icon, headline, desc}: {icon: ReactNode; headline: string; desc: string}) {
  return (
    <article
      className="flex w-full flex-col items-center 
                    gap-6 md:max-w-[400px] md:items-start
                    shadow-lg px-2 py-1
                    bg-gradient-to-b from-purple-50 via-slate-50 to-white"
    >
      <div className="flex gap-2">
        {icon}
        <span className="text-lg font-semibold tracking-tight">{headline}</span>
      </div>
      <p className="text-slate-500 max-w-[280px]">{desc}</p>
    </article>
  );
}

export default How;
