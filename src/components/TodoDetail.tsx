"use client";

import { Calendar, CircleCheck, CircleGaugeIcon } from "lucide-react";
import { BiSolidCategory } from "react-icons/bi";
import BackButton from "@/components/BackButton";
import EditForm from "@/components/EditForm";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const TodoDetail = ({
  slug,
  title,
  content,
  createdAt,
  dueDate,
  completed,
  category,
}: {
  slug: string;
  title: string;
  content: string;
  createdAt: Date;
  dueDate: Date | null;
  completed: boolean;
  category: Category;
}) => {
  const [iscompleted, setIsCompleted] = useState(completed);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const toggleCompleted = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/task/${slug}`, {
        completed: !iscompleted,
      });
      console.log("Task updated successfully, status:", response.status);
      setIsCompleted(!iscompleted);
      router.refresh();
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen pt-5  ">
      <div className="flex flex-col gap-8 md:max-w-6xl md:mx-auto px-4">
        <div className="flex items-center gap-1 md:gap-2">
          <BackButton />
          <h1 className="text-base md:text-2xl font-bold">Task Detail</h1>
        </div>
        <div className="flex flex-col gap-4 md:gap-8 md:w-2/3 md:mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 md:gap-5">
              <h1 className="text-base md:text-2xl font-bold">{title}</h1>
              <EditForm
                slug={slug}
                title={title}
                content={content}
                category={category}
              />
            </div>
            <div className="flex flex-row gap-2 md:gap-5">
              <div className="flex gap-1 md:gap-2 items-center justify-center">
                <Calendar className="font-light w-3 h-3 md:w-6 md:h-6" />
                <p className="text-xs md:text-sm font-light">
                  {createdAt
                    ? new Date(createdAt).toLocaleDateString()
                    : "No due date"}
                </p>
              </div>
              <div className="h-5 border" />
              <div className="flex gap-1 md:gap-2 items-center justify-center">
                <BiSolidCategory className="font-light w-3 h-3 md:w-6 md:h-6" />
                <p className="text-xs md:text-sm font-light">{category}</p>
              </div>
              <div className="h-5 border" />
              <div className="flex gap-1 md:gap-2 items-center justify-center">
                <Calendar className="font-light w-3 h-3 md:w-6 md:h-6" />
                <p className="text-xs md:text-sm font-light">
                  {dueDate
                    ? new Date(dueDate).toLocaleDateString()
                    : "No due date"}
                </p>
              </div>
            </div>
          </div>
          <hr className="w-full" />
          <div className="font-semibold text-xs md:text-base">{content}</div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center justify-center gap-1 md:gap-3 py-1 px-2  md:py-2 md:px-4 rounded-md shadow-md shadow-gray-600 cursor-pointer">
              <input
                type="checkbox"
                disabled={isLoading}
                checked={iscompleted}
                onChange={toggleCompleted}
                className="checkbox checkbox-xs md:checkbox-md"
              />
              <p className=" text-xs md:text-base">Done</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 md:gap-3 py-1 px-2  md:py-2 md:px-4 rounded-md shadow-md shadow-gray-600 cursor-pointer">
              {iscompleted ? (
                <CircleCheck className="text-green-500 w-3 h-3 md:w-7 md:h-7" />
              ) : (
                <CircleGaugeIcon className="text-yellow-500 w-3 h-3 md:w-7 md:h-7" />
              )}
              {iscompleted ? (
                <p className=" text-xs md:text-base">Completed</p>
              ) : (
                <p className=" text-xs md:text-base">Pending</p>
              )}
            </div>
            <DeleteButton slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
