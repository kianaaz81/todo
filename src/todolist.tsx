import React, { useEffect, useState } from "react";
import bgimg from "./assests/new.jpg";
import { Todo } from "./todo";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodo = localStorage.getItem("todos");
    return savedTodo ? JSON.parse(savedTodo) : [];
  });
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("Saved todos to Local Storage:", todos);
  }, [todos]);

  const addToDO = () => {
    if (inputValue.trim() === "") return;

    const newToDo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newToDo]);
    setInputValue("");
  };

  const removeToDo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  return (
    <div
      className=" min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="flex items-center justify-center pt-50">
        <h1 className="text-4xl font-mono font-black text-red-800 bg-gray-100 opacity-70 pr-8 pl-8 rounded-4xl ">
          To-Do List
        </h1>
      </div>
      <div className="flex items-center justify-center mt-5">
        <input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-white bg-gray-100 opacity-70 rounded-md w-70 p-1"
        ></input>
        <button
          onClick={addToDO}
          className="bg-white w-10 h-10 rounded-full ml-5 flex items-center justify-center"
        >
          <span className="opacity-50 text-4xl">+</span>
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-md bg-white opacity-70 ml-5"
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
        </select>
      </div>
      <div className="flex items-center justify-center">
        <ul className="mt-6 w-100">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border border-gray-300 m-2 bg-white opacity-60 rounded-lg"
            >
              <span className="font-mono font-black flex-grow">
                {todo.text}
              </span>
              <div>
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  {todo.completed ? "Uncomplete" : "complete"}
                </button>
                <button
                  onClick={() => removeToDo(todo.id)}
                  className="text-gray-500"
                >
                  <span className="text-xl">🗑️</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;

