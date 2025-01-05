"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const BackButton2 = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="cursor-pointer">
      Back
    </Button>
  );
};

export default BackButton2;
