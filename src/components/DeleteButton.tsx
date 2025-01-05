"use client";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/task/${slug}`);
      console.log("Task deleted successfully, status:", response.status);
      router.push("/todos");
      router.refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      aria-disabled={isLoading}
      onClick={handleDelete}
      className="flex flex-col items-center justify-center gap-1 md:gap-3 py-1 px-2  md:py-2 md:px-4 rounded-md shadow-md shadow-gray-600 cursor-pointer"
    >
      <Trash2 className="text-red-500 w-3 h-3 md:w-7 md:h-7" />
      <p className=" text-xs md:text-base">Delete</p>
    </div>
  );
};

export default DeleteButton;
