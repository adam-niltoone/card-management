import { useState } from "react";
import { Link } from "react-router-dom";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: "To Do" },
    { id: 2, title: "Task 2", status: "To Do" },
    { id: 3, title: "Task 3", status: "In Progress" },
    { id: 4, title: "Task 4", status: "In Progress" },
    { id: 5, title: "Task 5", status: "Done" },
    { id: 6, title: "Task 6", status: "Done" },
    { id: 7, title: "Daren", status: "Done" },
    { id: 8, title: "Daren2", status: "Done" },
    { id: 9, title: "Daren4", status: "To Do" },
  ]);

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    const taskId = event.currentTarget.dataset.id || "";
    event.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLUListElement>,
    status: string
  ) => {
    const taskId = parseInt(event.dataTransfer.getData("text/plain"));
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="flex justify-center space-x-4">
      <div className="w-1/3">
        <h2 className="text-lg text-center font-bold mb-2 text-gray-800">
          Start
        </h2>
        <ul
          className="bg-gray-100 p-2 rounded-lg"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, "To Do")}
        >
          {tasks
            .filter((task) => task.status === "To Do")
            .map((task) => (
              <li
                key={task.id}
                data-id={task.id}
                draggable
                onDragStart={handleDragStart}
                className="bg-white p-2 rounded-lg shadow mb-2 cursor-move"
              >
                {task.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="w-1/3">
        <h2 className="text-lg text-center font-bold mb-2 text-gray-800">
          In Progress
        </h2>
        <ul
          className="bg-gray-100 p-2 rounded-lg"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, "In Progress")}
        >
          {tasks
            .filter((task) => task.status === "In Progress")
            .map((task) => (
              <li
                key={task.id}
                data-id={task.id}
                draggable
                onDragStart={handleDragStart}
                className="bg-white p-2 rounded-lg shadow mb-2 cursor-move"
              >
                {task.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="w-1/3">
        <h2 className="text-xl text-center font-bold mb-2 text-gray-800">
          Done
        </h2>
        <ul
          className="bg-gray-100 p-2 rounded-lg"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, "Done")}
        >
          {tasks
            .filter((task) => task.status === "Done")
            .map((task) => (
              <li
                key={task.id}
                data-id={task.id}
                draggable
                onDragStart={handleDragStart}
                className="bg-white p-2 rounded-lg shadow mb-2 cursor-move"
              >
                {task.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="fixed top-64 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <button>
          <Link to="/">Back to Main Page</Link>
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
