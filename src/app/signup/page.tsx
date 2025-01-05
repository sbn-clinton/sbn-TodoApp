"use client";

import { MailIcon, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GiPadlock } from "react-icons/gi";
import BackButton from "@/components/BackButton";
import SigninButton from "@/components/SigninButton";
import SubmitLogin from "@/components/SubmitLogin";
import { LoginWithCred } from "../server/action";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SignUpPage = () => {
  const router = useRouter();
  const { status } = useSession();
  if (status === "authenticated") {
    router.push("/todos");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await LoginWithCred(formData);
    if (status === "authenticated") {
      router.push("/todos");
    }
  };
  console.log(status);
  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto px-4 pt-4 pb-4 gap-5">
        <BackButton />
        <div className="flex flex-col gap-4  text-start md:text-center">
          <Image
            src="/images/welcome/home1.png"
            alt="Logo"
            width={100}
            height={100}
            className="self-center"
          />
          <div className="">
            <h1 className="text-xl font-extrabold md:text-4xl">
              Welcome to UpTodo{" "}
            </h1>
            <p className="text-xs md:text-lg">
              Create an account and join us now!
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4  md:w-1/2 md:mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className=" w-full">
              <div className="flex justify-between border border-gray-200 rounded-lg  w-full bg-white">
                <User className="text-gray-800 cursor-pointer self-center ml-1 w-4 h-4 md:w-6 md:h-6" />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className=" input-sm md:input-md rounded-lg  focus:outline-none focus:ring-0 text-black flex-1 "
                />
              </div>
            </div>
            <div className=" w-full">
              <div className="flex justify-between border border-gray-200 rounded-lg  w-full bg-white">
                <MailIcon className="text-gray-800 cursor-pointer self-center ml-1 w-4 h-4 md:w-6 md:h-6" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className=" input-sm md:input-md rounded-lg  focus:outline-none focus:ring-0 text-black flex-1 "
                />
              </div>
            </div>
            <div className=" w-full">
              <div className="flex justify-between border border-gray-200 rounded-lg  w-full bg-white">
                <GiPadlock className="text-gray-800 cursor-pointer self-center ml-1 w-4 h-4 md:w-6 md:h-6" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className=" input-sm md:input-md rounded-lg  focus:outline-none focus:ring-0 text-black flex-1 "
                />
              </div>
            </div>
            <SubmitLogin label="Sign up" />
          </form>
          <div className="flex-col flex gap-5">
            <p className="text-sm text-center md:text-lg font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-sky-400">
                Sign in
              </Link>
            </p>
            <SigninButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
