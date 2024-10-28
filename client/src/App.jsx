import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

export default function App() {
  return <div>React Query</div>;
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
