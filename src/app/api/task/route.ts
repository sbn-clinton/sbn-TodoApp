import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  try {
    const data = await req.json();  // Parse the request body
    console.log("Request body data:", data);  // Log the received data to check its structure

    const { title, content, dueDate, category } = data;

    const parsedDueDate = dueDate ? new Date(dueDate) : null;
    
    if (parsedDueDate && isNaN(parsedDueDate.getTime())) {
      throw new Error("Invalid dueDate provided");
    }

    if (!data || !data.title) {
      throw new Error("Missing required fields in the request body");
    }

    const post = await prisma.todo.create({
      data: {
        title,
        content,
        category,
        dueDate: parsedDueDate,
        userEmail: email,
      },
    });

    return NextResponse.json(post, {status: 200 });
  
  } catch (error) {
    console.log("Error creating task:", error);
    return NextResponse.json({ message: "Error creating task", status: 500 });
  }
};


export const GET = async () => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  try {
    const response = await prisma.todo.findMany({
      where: {
        userEmail: email,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(response, {status: 200 });
  
  } catch (error) {
    console.log("Error fetching tasks:", error);
    return NextResponse.json({ message: "Error fetching tasks", status: 500 });
  }
}