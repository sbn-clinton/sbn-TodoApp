"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";

const SigninButton = () => {
  return (
    <div className="flex gap-3 md:gap-5 items-center">
      <p className="text-sm md:text-lg font-medium">Sign in with :</p>
      <div
        className="p-1 md:p-2 rounded-md bg-gray-100 cursor-pointer"
        onClick={() => signIn("google", { redirectTo: "/todos" })}
      >
        <FcGoogle className="h-3 w-3 md:h-6 md:w-6 " />
      </div>
      <div
        className="p-1 md:p-2 rounded-md bg-gray-100 cursor-pointer"
        onClick={() => signIn("github", { redirectTo: "/todos" })}
      >
        <GrGithub className="text-black h-3 w-3 md:h-6 md:w-6" />
      </div>
    </div>
  );
};

export default SigninButton;
