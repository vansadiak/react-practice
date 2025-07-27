import { useLocalStorage } from "~/hooks/useLocalStorage"
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { useState, useRef } from "react";
import { defaultTodoFilterModel, Filter, type TFilter, type TSingleSelectFilter, type TTextFilter } from "./filters";

type TTodoListModel = {
    title: string,
    todos: TTodo[]
}

type TTodo = {
    id: string,
    title: string,
    completed: boolean,
    description: string,
    isEditing: boolean,
}

type TodoAction = 
    | { type: 'ADD_TODO' }
    | { type: 'TOGGLE_COMPLETE'; id: string }
    | { type: 'TOGGLE_EDIT'; id: string }
    | { type: 'UPDATE_TITLE'; id: string; title: string }
    | { type: 'UPDATE_DESCRIPTION'; id: string; description: string }
    | { type: 'DELETE_TODO'; id: string }

const defaultTodoListModel: TTodoListModel = {
    title: 'Todo List',
    todos: [],
}

interface ITodoProps {
    todo: TTodo,
    onTodoAction: (action: TodoAction) => void
}

const Todo = ({ todo, onTodoAction }: ITodoProps) => {
    return (
        <div className="flex gap-2 border-2 border-grey-300 rounded-md p-2 mb-4 relative">
            <div>
                <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onClick={() => onTodoAction({ type: 'TOGGLE_COMPLETE', id: todo.id })} 
                />
            </div>
            <div className="flex flex-col gap-2 w-[80%]">
                {
                    todo.isEditing ? (
                        <div>
                            <textarea 
                                className="border-2 rounded-md p-2 w-full" 
                                value={todo.title} 
                                onChange={(e) => onTodoAction({ type: 'UPDATE_TITLE', id: todo.id, title: e.target.value })} 
                            />
                        </div>
                    ) : (
                        <div className="break-all">{todo.title}</div>
                    )
                }
                {
                    todo.isEditing ? (
                        <div>
                            <textarea 
                                className="border-2 rounded-md p-2 w-full" 
                                value={todo.description} 
                                onChange={(e) => onTodoAction({ type: 'UPDATE_DESCRIPTION', id: todo.id, description: e.target.value })} 
                            />
                        </div>
                    ) : (
                        <div className="break-all">{todo.description}</div>
                    )
                }
            </div>
            <div className="flex gap-2 m-2 bg-white rounded-md p-2">
                <div className="flex">
                    {
                        !todo.isEditing ? (
                            <FaEdit 
                                onClick={() => onTodoAction({ type: 'TOGGLE_EDIT', id: todo.id })} 
                                className="cursor-pointer" 
                            />
                        ) : (
                            <FaSave 
                                onClick={() => onTodoAction({ type: 'TOGGLE_EDIT', id: todo.id })} 
                                className="cursor-pointer text-green-500" 
                            />
                        )
                    }
                </div>
                <div className="flex text-red-500">
                    <FaTrash 
                        onClick={() => onTodoAction({ type: 'DELETE_TODO', id: todo.id })} 
                        className="cursor-pointer" 
                    />
                </div>
            </div>
        </div>
    )
}

export const TodoList = () => {
    const [todoListModel, setTodoListModel] = useLocalStorage<TTodoListModel>('todoListModel', defaultTodoListModel);
    const [filterModel, setFilterModel] = useLocalStorage<TFilter<string>>('filterModel', defaultTodoFilterModel);

    const handleTodoAction = (action: TodoAction) => {
        switch (action.type) {
            case 'ADD_TODO':
                setTodoListModel({
                    ...todoListModel,
                    todos: [...todoListModel.todos, {
                        id: Date.now().toString(),
                        title: 'New Todo',
                        completed: false,
                        description: 'Description',
                        isEditing: true
                    }]
                });
                break;

            case 'TOGGLE_COMPLETE':
                setTodoListModel({
                    ...todoListModel,
                    todos: todoListModel.todos.map((todo) => 
                        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
                    )
                });
                break;

            case 'TOGGLE_EDIT':
                setTodoListModel({
                    ...todoListModel,
                    todos: todoListModel.todos.map((todo) => 
                        todo.id === action.id ? { ...todo, isEditing: !todo.isEditing } : todo
                    )
                });
                break;

            case 'UPDATE_TITLE':
                setTodoListModel({
                    ...todoListModel,
                    todos: todoListModel.todos.map((todo) => 
                        todo.id === action.id ? { ...todo, title: action.title } : todo
                    )
                });
                break;

            case 'UPDATE_DESCRIPTION':
                setTodoListModel({
                    ...todoListModel,
                    todos: todoListModel.todos.map((todo) => 
                        todo.id === action.id ? { ...todo, description: action.description } : todo
                    )
                });
                break;

            case 'DELETE_TODO':
                setTodoListModel({
                    ...todoListModel,
                    todos: todoListModel.todos.filter((todo) => todo.id !== action.id)
                });
                break;
        }
    };

    const getFilteredTodos = () => {
        let filtered = todoListModel.todos;

        filterModel.forEach(filter => {
            if (filter.filterType === 'SINGLE_SELECT') {
                const statusFilter = filter;
                const selectedStatuses = statusFilter.filterValue
                    .filter(v => v.value)
                    .map(v => v.key === 'completed');

                if (selectedStatuses.length > 0) {
                    filtered = filtered.filter(todo =>
                        selectedStatuses.includes(todo.completed)
                    );
                }
            } else if (filter.filterType === 'TEXT_SEARCH') {
                const searchFilter = filter;
                if (searchFilter.filterValue) {
                    filtered = filtered.filter(todo =>
                        todo.title.toLowerCase().includes(searchFilter.filterValue.toLowerCase()) ||
                        todo.description.toLowerCase().includes(searchFilter.filterValue.toLowerCase())
                    );
                }
            }
        });

        return filtered;
    };

    const filteredTodos = getFilteredTodos();

    return (
        <>
            <div className='m-auto mt-10 mb-10 w-6/8 h-[90vh] relative border-2 border-blue-300 rounded-md p-8 flex flex-col'>
                <div className='text-center text-xl font-semibold h-[10%] flex items-center justify-center'>
                    {todoListModel.title}
                </div>
                <div className='border-2 border-blue-300 rounded-md p-2 absolute top-0 right-0 m-4'>
                    <button onClick={() => handleTodoAction({ type: 'ADD_TODO' })}>Add Todo</button>
                </div>
                <div className='p-2 absolute top-0 left-0 m-4'>
                    <Filter filterModel={filterModel} setFilterModel={setFilterModel} />
                </div>
                <div className='flex gap-16 justify-between h-[90%] overflow-y-auto p-8'>
                    <div className="w-1/2">
                        {filteredTodos.filter((todo) => !todo.completed).map((todo) => (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                onTodoAction={handleTodoAction}
                            />
                        ))}
                    </div>
                    <div className="w-1/2">
                        {filteredTodos.filter((todo) => todo.completed).map((todo) => (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                onTodoAction={handleTodoAction}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}