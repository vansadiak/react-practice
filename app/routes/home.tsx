import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { UserList } from "../components/ReactBasics";
import { MainGrid } from "../components/TicTacToe";
import { TodoList } from "~/components/todoList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <TodoList />
    </div>
  );
}
