import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("todo", "routes/todo.tsx"),
  route("react-basics", "routes/react-basics.tsx"),
  route("tic-tac-toe", "routes/tic-tac-toe.tsx")
] satisfies RouteConfig;
