
import { Links } from "./Links"


export const StatusBar = () => {
    return (
        <div className='border-b-1 shadow-md border-gray-500'>
            <div className="flex w-[40%] mb-2 justify-between items-center p-4">
            <Links url="/">Home</Links>
            <Links url="/todo">Todo</Links>
            <Links url="/react-basics">User List</Links>
            <Links url="/tic-tac-toe">Tic Tac Toe</Links>
        </div>
        </div>
            
    )
}