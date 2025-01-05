import { Category } from "@prisma/client";

export type Todo = {
    title: string;
    content: string;
    dueDate: Date;
    dueTime: Date;
}

export interface IFormInput {
  title: string;
  content: string;
  dueDate?: string;
  dueTime?: string;
  category: Category
}