import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/todos");
  }

  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen gap-4 md:gap-8 max-w-5xl mx-auto px-4 pt-2 pb-4">
        <div className="flex items-center justify-between">
          <Link
            href={"/login"}
            className="font-semibold font-sans text-lg md:text-xl text-start"
          >
            SKIP
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 md:gap-10 flex-grow">
          <Image
            src="/images/welcome/home1.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <h1 className=" font-bold text-xl md:text-4xl text-center">
            Manage your tasks
          </h1>
        </div>
        <div className="flex justify-end">
          <Button asChild className="bg-purple-400">
            <Link href="/firstscreen">Next</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
