import { FcCalendar } from "react-icons/fc";
import FormSheet from "./FormSheet";
import ProfileSheet from "./ProfileSheet";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-inherit bg-opacity-10 backdrop-blur-md">
      <div className="flex items-center justify-between px-10 py-4 md:p-8 max-w-3xl mx-auto">
        <Link
          href={"/todos"}
          className="flex flex-col items-center justify-center gap-1"
        >
          <FcCalendar className="w-6 h-6 md:w-10 md:h-10" />
          <p className="text-sm md:text-lg font-bold">Todos </p>
        </Link>
        <FormSheet />
        <ProfileSheet />
      </div>
    </div>
  );
};

export default Navbar;
