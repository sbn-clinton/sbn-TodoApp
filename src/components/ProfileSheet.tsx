import { auth, signOut } from "@/auth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { prisma } from "@/lib/prisma";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProfileSheet = async () => {
  const session = await auth();

  const email = session?.user?.email;
  const name = session?.user?.name;
  const img = session?.user?.image;

  if (!email || !name) {
    redirect("/login");
  }

  const completedTasks = await prisma.todo.count({
    where: {
      userEmail: email,
      completed: true,
    },
  });

  const pendingTasks = await prisma.todo.count({
    where: {
      userEmail: email,
      completed: false,
    },
  });

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-1">
            <User className="w-6 h-6 md:w-10 md:h-10" />
            <p className="text-sm md:text-lg font-bold">Profile </p>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="bg-gradient-to-b from-[#1253AA] to-[#05243E] text-white rounded-t-3xl"
      >
        <SheetHeader>
          {/* Accessible Title */}

          <div className="px-4 py-8 flex flex-col  gap-3 md:gap-8 md:w-1/2 md:mx-auto">
            <SheetTitle className="text-center">Profile</SheetTitle>
            <div className="flex flex-col items-center justify-center gap-4 md:gap-7">
              {img ? (
                <Image
                  src={img}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="self-center rounded-full"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center text-black font-extrabold text-4xl md:text-6xl">
                  {name.slice(0, 1)}
                </div>
              )}

              <p className="text-center text-lg md:text-2xl font-bold">
                {name}
              </p>
              <div className="flex justify-between items-center  w-full md:w-4/5">
                <Link href="/completed">
                  <button className="btn text-xs md:text-base btn-sm md:btn-md  btn-outline btn-info">
                    {completedTasks} Completed Task
                  </button>
                </Link>
                <Link href="/pending">
                  <button className="btn text-xs md:text-base btn-sm md:btn-md  btn-outline btn-info">
                    {pendingTasks} Pending Task
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button className="btn text-xs md:text-base btn-sm md:btn-md  btn-error">
                    <LogOut className="w-4 h-4 md:w-7 md:h-7" />
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
