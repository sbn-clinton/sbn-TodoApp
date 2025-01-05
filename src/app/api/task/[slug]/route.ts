import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {  NextResponse } from "next/server";


export const PATCH = async (req: Request, context: { params: Promise<{ slug: string }> } ) => {

  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  try {
     const slug = (await context.params).slug;
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
    

    const response = await prisma.todo.update({
      where: {
        slug 
      },
      data: {
        title,
        content,
        category,
        dueDate: parsedDueDate,
        userEmail: email,
      }
    }); 
    return NextResponse.json(response, {status: 200 });
  
  } catch (error) {
    console.log("Error updating task:", error);
    return NextResponse.json({ message: "Error updating task", status: 500 });
  }
}


export const DELETE = async (req: Request, context: { params:  Promise<{ slug: string }> }) => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  try {
    const slug = (await context.params).slug;
    const response = await prisma.todo.delete({
      where: {
        slug 
      }
    });
    return NextResponse.json(response, {status: 200 });
  
  } catch (error) {
    console.log("Error deleting task:", error);
    return NextResponse.json({ message: "Error deleting task", status: 500 });
  }
}


export const PUT = async (req: Request, context: { params: Promise<{ slug: string }> } ) => {

  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  try {
     const slug = (await context.params).slug;
    const data = await req.json();  // Parse the request body
    console.log("Request body data:", data);  // Log the received data to check its structure

    const { completed } = data;

    const response = await prisma.todo.update({
      where: {
        slug 
      },
      data: {
        completed
      }
    }); 
    return NextResponse.json(response, {status: 200 });
  
  } catch (error) {
    console.log("Error updating task:", error);
    return NextResponse.json({ message: "Error updating task", status: 500 });
  }
}
