import { StatusBar } from "~/components/status";
import { TodoList } from "../components/todoList";

export function meta() {
  return [
    { title: "Todo List" },
    { name: "description", content: "Manage your todos with filtering and editing capabilities" },
  ];
}

export default function Todo() {
  return (
    <div>
      <StatusBar />
      <TodoList />
    </div>
  );
} 