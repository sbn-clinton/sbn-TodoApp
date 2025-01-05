"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircleIcon } from "lucide-react";
import { BiCheckSquare, BiNotepad } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "@/lib/types";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSheet = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!data.title) {
      console.error("Title is required.");
      return;
    }

    try {
      const response = await axios.post("/api/task", data);
      console.log("Task created successfully, status:", response.status);
      setIsOpen(false);
      reset();
      router.push("/todos");
      router.refresh();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div
          className="flex flex-col items-center justify-center gap-1"
          onClick={() => setIsOpen(true)}
        >
          <PlusCircleIcon className="w-6 h-6 md:w-10 md:h-10" />
          <p className="text-sm md:text-lg font-bold">Create</p>
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="text-slate-100 bg-gray-300 rounded-t-3xl"
      >
        <SheetHeader>
          <div className="px-4 py-8 flex flex-col gap-4 md:gap-8 md:w-1/2 md:mx-auto">
            <SheetTitle className="text-center md:text-xl">
              Create Task
            </SheetTitle>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Title Input */}
              <div className="flex justify-between border border-[#05243E] rounded-lg w-full bg-[#05243E]">
                <BiCheckSquare className="text-gray-200 cursor-pointer self-center ml-1" />
                <input
                  type="text"
                  {...register("title", {
                    required: true,
                  })}
                  placeholder="Task Title"
                  className="input-sm md:input-md rounded-lg flex-1 w-full focus:outline-none focus:ring-0 bg-[#05243E] text-gray-200"
                  required
                />
              </div>
              {errors.title && (
                <p className="text-red-500">Title is required.</p>
              )}

              {/* Description Input */}
              <div className="flex justify-between border border-[#05243E] rounded-lg w-full bg-[#05243E]">
                <BiNotepad className="text-gray-200 cursor-pointer self-start ml-1 mt-2" />
                <textarea
                  {...register("content")}
                  placeholder="Task Description"
                  className="textarea-sm focus:outline-none focus:ring-0 md:textarea-md rounded-lg flex-1 w-full bg-[#05243E] text-gray-200"
                />
              </div>

              {/* Date and Time Inputs */}
              <div className="flex items-center justify-between gap-4 md:gap-5 w-full">
                <div className="flex justify-between border border-gray-800 rounded-lg w-1/2">
                  <input
                    type="date"
                    {...register("dueDate")}
                    className="input-sm md:input-md rounded-lg flex-1 bg-[#05243E] text-gray-200 focus:outline-none focus:ring-0 text-xs md:text-sm"
                  />
                </div>
                <div className="flex justify-between border border-gray-800 rounded-lg w-1/2">
                  <select
                    {...register("category")}
                    className="select select-sm md:select-md select-bordered w-full focus:outline-none focus:ring-0   bg-[#05243E] text-gray-200 text-xs md:text-sm"
                  >
                    <option defaultValue="">Select a category</option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="educational">Educational</option>
                    <option value="family">Family</option>
                    <option value="bills">Bills</option>
                    <option value="friends">Friends</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-center px-2 gap-4 md:gap-5 w-full">
                <button
                  type="button"
                  className="btn-sm md:btn-md btn btn-outline w-1/2 btn-info"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-sm md:btn-md btn w-1/2 btn-info"
                >
                  {isSubmitting && (
                    <span className="loading loading-spinner loading-sm md:loading-md" />
                  )}
                  Create
                </button>
              </div>
            </form>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default FormSheet;
