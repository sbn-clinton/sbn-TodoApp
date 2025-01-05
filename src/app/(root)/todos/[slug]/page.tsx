import TodoDetail from "@/components/TodoDetail";
import { prisma } from "@/lib/prisma";

interface SingleTodoPageProps {
  params: {
    slug: string;
  };
}

const SingleTodoPage = async ({ params }: SingleTodoPageProps) => {
  const slug = (await params).slug;

  const todo = await prisma.todo.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!todo) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const { title, content, dueDate, createdAt, completed, category } = todo;

  return (
    <TodoDetail
      slug={slug}
      title={title}
      content={content}
      createdAt={createdAt}
      dueDate={dueDate}
      completed={completed}
      category={category}
    />
  );
};

export default SingleTodoPage;
