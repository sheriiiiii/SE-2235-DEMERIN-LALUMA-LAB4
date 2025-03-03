interface Todo {
  id: number;
  text: string;
}

interface TodoItemProps {
  todo: Todo;
  completeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, completeTodo }) => {
  return (
      <li className="list flex items-center justify-between">
          <span className="text-lg font-medium text-gray-900">
              {todo.text}
          </span>
          <button
              onClick={() => {
                  completeTodo(todo.id);
              }}
              className="ml-4 px-4 py-2 rounded-md bg-green-500 text-white font-semibold transition-colors duration-300 hover:bg-green-600"
          >
              Complete
          </button>
      </li>
  );
};

export default TodoItem;