import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BackButton2 from "@/components/BackButton2";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SecondScreen = async () => {
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
        <div className="flex flex-col items-center justify-center gap-4 md:gap-8 flex-grow">
          <Image
            src="/images/welcome/home2.png"
            alt="Logo"
            width={200}
            height={200}
          />
          <div className="flex gap-2 md:gap-4 items-center">
            <div className="w-8 md:w-12  rounded-lg border-2 border-gray-600 bg-gray-600"></div>
            <div className="w-8 md:w-12  rounded-lg border-2 border-gray-300 bg-gray-100"></div>
            <div className="w-8 md:w-12  rounded-lg border-2 border-gray-600 bg-gray-600"></div>
          </div>

          <div className="flex flex-col gap-2 md:gap-8 items-center justify-center max-w-2xl">
            <h1 className=" font-bold text-xl md:text-4xl text-center">
              Create daily routine
            </h1>
            <p className="text-center text-xs md:text-base text-wrap">
              In Uptodo you can your personalized routine to stay on top of your
              game
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <BackButton2 />
          <Button asChild className="bg-purple-500">
            <Link href="/thirdscreen">Next</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecondScreen;
