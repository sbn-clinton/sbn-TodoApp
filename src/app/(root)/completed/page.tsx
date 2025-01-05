import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import { prisma } from "@/lib/prisma";
import { CircleCheck, CircleGaugeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const CompletedPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  const session = await auth();

  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  const todos = await prisma.todo.findMany({
    where: {
      userEmail: email,
      completed: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const searchedTodos = await prisma.todo.findMany({
    where: {
      userEmail: email,
      completed: true,
      OR: [
        {
          title: {
            contains: query,
          },
        },
        {
          content: {
            contains: query,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="font-sans">
      <div className="flex flex-col md:max-w-6xl gap-10 md:gap-14 md:mx-auto px-4 pt-5">
        <SearchForm query={query} />
        <div className="flex flex-col gap-4  text-start md:text-center">
          {query ? (
            <h1 className="text-base font-extrabold md:text-2xl">
              Search Results for {query}
            </h1>
          ) : (
            <h1 className="text-xl font-extrabold md:text-4xl">
              Completed Tasks List
            </h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-10 w-full">
            {searchedTodos && searchedTodos.length > 0
              ? searchedTodos.map((todo) => (
                  <Link
                    key={todo.slug}
                    href={`/todos/${todo.slug}`}
                    className="flex gap-4 w-full justify-between items-center bg-slate-300 text-slate-700 rounded-lg p-2 md:p-3"
                  >
                    <div className=" flex flex-col gap-1 md:gap-2">
                      <h1 className="text-base md:text-xl font-bold text-start">
                        {todo.title}
                      </h1>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-xs md:text-sm">
                          {new Date(todo.createdAt).toLocaleDateString()}
                        </p>
                        <div className="h-4 border  border-gray-500" />
                        <p className="text-xs md:text-sm">
                          {todo.dueDate
                            ? new Date(todo.dueDate).toLocaleDateString()
                            : "No due date"}
                        </p>
                      </div>
                    </div>
                    <div>
                      {todo.completed ? (
                        <CircleCheck className="text-green-600 cursor-pointer w-4 md:w-7 h-4 md:h-7" />
                      ) : (
                        <CircleGaugeIcon className="text-yellow-500 cursor-pointer w-4 md:w-7 h-4 md:h-7 " />
                      )}
                    </div>
                  </Link>
                ))
              : todos.map((todo) => (
                  <Link
                    key={todo.slug}
                    href={`/todos/${todo.slug}`}
                    className="flex gap-4 w-full justify-between items-center bg-slate-300 text-slate-700 rounded-lg p-2 md:p-3"
                  >
                    <div className=" flex flex-col gap-1 md:gap-2">
                      <h1 className="text-base md:text-xl font-bold text-start">
                        {todo.title}
                      </h1>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-xs md:text-sm">
                          {new Date(todo.createdAt).toLocaleDateString()}
                        </p>
                        <div className="h-4 border  border-gray-500" />
                        <p className="text-xs md:text-sm">
                          {todo.dueDate
                            ? new Date(todo.dueDate).toLocaleDateString()
                            : "No due date"}
                        </p>
                      </div>
                    </div>
                    <div>
                      {todo.completed ? (
                        <CircleCheck className="text-green-600 cursor-pointer w-4 md:w-7 h-4 md:h-7" />
                      ) : (
                        <CircleGaugeIcon className="text-yellow-500 cursor-pointer w-4 md:w-7 h-4 md:h-7 " />
                      )}
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedPage;
