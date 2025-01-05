"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <ChevronLeft onClick={() => router.back()} className="cursor-pointer" />
  );
};

export default BackButton;
