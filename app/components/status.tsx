import { Link } from "react-router"


export const StatusBar = () => {
    return (
            <div className="flex w-[40%] mb-8 justify-between items-center p-4 bg-gray-100">
            <Link to="/">Home</Link>
            <Link to="/todo">Todo</Link>
            <Link to="/react-basics">React Basics</Link>
            <Link to="/tic-tac-toe">Tic Tac Toe</Link>
        </div>
    )
}