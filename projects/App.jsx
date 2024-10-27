import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Todo List</h1>
        
        {/* Search bar (not functional in this code but for styling) */}
        <input 
          type="text" 
          placeholder="search todos" 
          className="w-full mb-6 p-3 rounded-lg text-blue-900 focus:outline-none"
        />

        {/* Todo items list */}
        <div className="bg-blue-800 p-4 rounded-lg shadow-inner">
          {todos.length === 0 && (
            <div className="text-center text-white py-2">No tasks available</div>
          )}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="flex justify-between items-center bg-blue-600 mb-3 p-4 rounded-lg shadow-md text-white">
                <div className="flex items-center">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="mr-3"
                  />
                  <span className={item.isCompleted ? "line-through" : ""}>{item.todo}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Add a new todo */}
        <div className="mt-6">
          <h2 className="text-lg text-white mb-2">Add a new todo...</h2>
          <div className="flex">
            <input
              type="text"
              value={todo}
              onChange={handleChange}
              placeholder="Add a task"
              className="w-full p-3 rounded-lg text-blue-900 focus:outline-none"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="ml-3 bg-white text-blue-900 p-3 rounded-lg hover:bg-gray-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
