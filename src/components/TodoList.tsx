import { useState } from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";

interface Todo {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const completeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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
