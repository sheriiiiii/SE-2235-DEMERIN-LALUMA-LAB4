import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import axios from "axios";

interface Todo {
    id: number;
    text: string;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const API_URL = "http://localhost:3001/todos";

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(API_URL);
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = async (text: string) => {
        try {
            const response = await axios.post(API_URL, { text });
            setTodos((prevTodos) => [...prevTodos, response.data]);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const completeTodo = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Error completing todo:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    To-Do List
                </h1>
                <AddTodoForm addTodo={addTodo} />
                <ul className="space-y-4">
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} completeTodo={completeTodo} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;