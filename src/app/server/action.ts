"use server"

import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { IFormInput } from "@/lib/types";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const DeleteTodo = async (slug: string) => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  try {
    const todo = await prisma.todo.delete({
      where: {
        slug
      }
    });
    return todo;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateTodo = async (slug: string, data: IFormInput) => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  try {
    const todo = await prisma.todo.update({
      where: {
        slug
      },
      data: {
        title: data.title,
        content: data.content,
        dueDate: data.dueDate,
        category: data.category,
        userEmail: email
      }
    });
    return todo;
  } catch (error) {
    console.log(error);
  }
};

export const LoginWithCred = async (formdata: FormData) => {
  
  const rawData = {
    email: formdata.get("email"),
    name: formdata.get("name") ,
    password: formdata.get("password"),
  };

  const user = await prisma.user.findUnique({
    where: {
      email: rawData.email as string
    }
  });
  if (user) {
    console.log(user);
  }

  try {
     signIn("Credentials", {rawData, redirectTo: "/todos"});
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
     switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Unknown error";
      }
    }
    throw error;
  }
  revalidatePath("/todos");
}