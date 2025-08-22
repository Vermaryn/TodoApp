import { useState, useEffect } from "react";

export default function App() {
  const [title, setTitle] = useState("");

  // Initialize todos directly from localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // Save todos to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Todo App ⚡</h1>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Add a new task..."
            className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring"
          />
          <button
            type="submit"
            className="rounded-xl mx-2 px-4 py-2 bg-black text-white"
          >
            Add task
          </button>
        </form>

        {/* Todo List */}
        <ul>
          {todos.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between my-2"
            >
              <div
                className={`flex-1 break-words min-w-0 ${
                  t.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {t.title}
              </div>

              <div className="flex gap-2 items-center mx-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() =>
                    setTodos(
                      todos.map((todo) =>
                        todo.id === t.id
                          ? { ...todo, completed: !todo.completed }
                          : todo
                      )
                    )
                  }
                />
                <button
                  onClick={() =>
                    setTodos(todos.filter((todo) => todo.id !== t.id))
                  }
                  className="bg-red-600 text-white rounded-xl py-1 px-2 mx-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
