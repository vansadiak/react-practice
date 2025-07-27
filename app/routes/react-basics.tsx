import { StatusBar } from "~/components/status";
import { UserList } from "../components/ReactBasics";

export function meta() {
  return [
    { title: "React Basics" },
    { name: "description", content: "Learn React fundamentals with user list example" },
  ];
}

export default function ReactBasics() {
  return (
    <div>
      <StatusBar />
      <UserList />
    </div>
  );
} 