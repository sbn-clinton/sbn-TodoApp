import { FaSearch } from "react-icons/fa";
import Form from "next/form";

const SearchForm = ({ query }: { query?: string }) => {
  console.log("Search parameter:", query);
  return (
    <div className=" w-[80%]">
      <Form
        action="/todos"
        scroll={false}
        className="flex justify-between border border-gray-200 rounded-lg  w-full  bg-slate-100"
      >
        <input
          defaultValue={query}
          name="query"
          placeholder="Search for a task"
          className=" input-sm md:input-md rounded-lg text-black flex-1 focus:outline-none focus:ring-0"
        />
        <button type="submit">
          <FaSearch className="text-gray-800 cursor-pointer self-center mx-1 font-bold" />
        </button>
      </Form>
    </div>
  );
};

export default SearchForm;
