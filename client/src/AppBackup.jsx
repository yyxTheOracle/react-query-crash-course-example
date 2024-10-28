import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

export default function App() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject("Error Message..."),
  });

  const mutation = useMutation({
    mutationFn: (title) =>
      wait(1000).then(() => {
        POSTS.push({ id: nanoid(), title });
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (query.isFetching) {
    return <div>isFetching...</div>;
  }

  if (query.isError) {
    return <pre>{JSON.stringify(query.error)}</pre>;
  }

  return (
    <div>
      {query.data.map(({ id, title }) => (
        <div key={id}>{title}</div>
      ))}

      <button
        onClick={() => {
          mutation.mutate("A New Post");
        }}
        disabled={mutation.isLoading}
      >
        Add
      </button>
    </div>
  );
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
