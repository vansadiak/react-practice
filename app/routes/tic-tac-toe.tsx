import { StatusBar } from "~/components/status";
import { MainGrid } from "../components/TicTacToe";

export function meta() {
  return [
    { title: "Tic Tac Toe" },
    { name: "description", content: "Play Tic Tac Toe with score tracking" },
  ];
}

export default function TicTacToe() {
  return (
    <div>
      <StatusBar />
      <MainGrid />
    </div>
  );
} 