"use client";

import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const SubmitLogin = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button className="py-4 bg-purple-500" disabled>
      {pending ? "Submitting..." : label}
    </Button>
  );
};

export default SubmitLogin;
