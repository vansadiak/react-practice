import { Link } from "react-router";
import { StatusBar } from "~/components/status";
import { FaReact } from "react-icons/fa";
import { Links } from "~/components/Links";

export function meta() {
  return [
    { title: "React Playground" },
    { name: "description", content: "Welcome to React Playground - Explore different React components" },
  ];
}



export default function Home() {
  return (<>
    <StatusBar />
    <div className="m-auto mt-10 mb-10 p-8 flex flex-col items-center justify-center text-center">
      <div className=" items-center justify-center mb-10 relative ">
        <div className="text-4xl font-bold flex mb-2 items-center gap-2">
          <div className="w-full">
            <span className="text-blue-500">React</span> Playground
          </div>
          <span className="text-blue-500 absolute right-[-20px] top-0">
            <FaReact className="duration-300 animate-pulse " style={{ animationDuration: '1s' }} />
          </span></div>
        <p className="text-lg">Explore Different Components and Patterns</p>
      </div>
          <div className="flex rounded-l flex-col bg-gray-50 hover:bg-gray-100 transition-all duration-300 p-4 items-center justify-center w-1/2 gap-8 relative overflow-hidden">
        <img
          src="https://illustrations.popsy.co/amber/engineer.svg"
          alt="React Development Team"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10 flex flex-col gap-8">
          <Links url="/todo">Todo List</Links>
          <Links url="/react-basics">User List</Links>
          <Links url="/tic-tac-toe">Tic Tac Toe</Links>
        </div>
      </div>
    </div>
    </>
    
  );
}
