import { MailIcon } from "lucide-react";
import Image from "next/image";
import { GiPadlock } from "react-icons/gi";
import BackButton from "@/components/BackButton";
import SigninButton from "@/components/SigninButton";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import SubmitLogin from "@/components/SubmitLogin";

const LoginPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/todos");
  }

  return (
    <div className="font-sans">
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto px-4 pt-4 pb-4 gap-5">
        <BackButton />
        <div className="flex flex-col gap-4 text-start md:text-center">
          <Image
            src="/images/welcome/home1.png"
            alt="Logo"
            width={100}
            height={100}
            className="self-center"
          />
          <div>
            <h1 className="text-xl font-extrabold md:text-4xl">
              Welcome Back to UpTodo
            </h1>
            <p className="text-xs md:text-lg">Have another productive day!</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:w-1/2 md:mx-auto">
          <form
            action={async (formData) => {
              "use server";

              try {
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;

                if (!email || !password) {
                  throw new Error("Email and password are required.");
                }

                const result = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                });

                if (result?.error) {
                  console.error("Login failed:", result.error);
                  throw new Error(result.error);
                }

                redirect("/todos");
              } catch (error) {
                console.error("Error during login:", error);
              }
            }}
            className="flex flex-col gap-4"
          >
            <div className="w-full">
              <div className="flex justify-between border border-gray-200 rounded-lg w-full bg-white">
                <MailIcon className="text-gray-800 cursor-pointer self-center ml-1 w-4 h-4 md:w-6 md:h-6" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-sm md:input-md rounded-lg focus:outline-none focus:ring-0 text-black flex-1"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between border border-gray-200 rounded-lg w-full bg-white">
                <GiPadlock className="text-gray-800 cursor-pointer self-center ml-1 w-4 h-4 md:w-6 md:h-6" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-sm md:input-md rounded-lg focus:outline-none focus:ring-0 text-black flex-1"
                />
              </div>
            </div>
            <SubmitLogin label="Sign in" />
          </form>
          <div className="flex-col flex gap-5">
            <p className="text-sm text-center md:text-lg font-medium">
              Dont&apos;t have an account?{" "}
              <span className="text-sky-400">Sign up</span>
            </p>
            <SigninButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
