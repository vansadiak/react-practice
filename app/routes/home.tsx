import { Link } from "react-router";

export function meta() {
  return [
    { title: "React Playground" },
    { name: "description", content: "Welcome to React Playground - Explore different React components" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">React Playground</h1>
          <p className="text-xl text-gray-600">Explore different React components and patterns</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Link 
            to="/todo" 
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Todo List</h2>
              <p className="text-gray-600">Manage todos with filtering, editing, and local storage</p>
            </div>
          </Link>
          
          <Link 
            to="/react-basics" 
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">React Basics</h2>
              <p className="text-gray-600">Learn React fundamentals with user list example</p>
            </div>
          </Link>
          
          <Link 
            to="/tic-tac-toe" 
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tic Tac Toe</h2>
              <p className="text-gray-600">Play Tic Tac Toe with score tracking</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
