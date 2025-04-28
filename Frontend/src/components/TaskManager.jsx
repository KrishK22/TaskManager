import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useTaskStore } from "../store/useTaskStore"; // adjust path accordingly
import { toast } from "react-hot-toast"; // assuming you are using react-hot-toast
const TaskManager = () => {
    const { Tasks, getTask, deleteTask } = useTaskStore();
    const [filterPriority, setFilterPriority] = useState("All");

    useEffect(() => {
        getTask();
    }, [getTask]);

    const filteredTasks = filterPriority === "All" ? Tasks : Tasks.filter((task) => task.priority === filterPriority);

    const handleDelete = async (id) => {
        await deleteTask(id);
    };

    return (
        <div className="p-6 w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">📋 Task Manager</h1>
                {/* Filter Dropdown */}
                <select
                    className="select select-bordered"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                >
                    <option>All</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>

            {/* Task List */}
            <div className="grid gap-4">
                {filteredTasks.length === 0 ? (
                    <p className="text-center text-gray-400">No tasks available.</p>
                ) : (
                    filteredTasks.map((task) => (
                        <div
                            key={task._id}
                            className="card bg-base-100 shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                        >
                            <div className="flex flex-col gap-2">
                                <h2 className="text-lg font-bold">{task.title}</h2>
                                <p className="text-sm text-gray-500">{task.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span
                                        className={`badge ${task.priority === "High"
                                            ? "badge-error"
                                            : task.priority === "Medium"
                                                ? "badge-warning"
                                                : "badge-success"
                                            }`}
                                    >
                                        {task.priority}
                                    </span>
                                    <span className="badge badge-outline">
                                        {new Date(task.createdAt).toLocaleDateString()}{" "}
                                        {new Date(task.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                    <span
                                        className={`badge ${task.completed ? "badge-success" : "badge-ghost"
                                            }`}
                                    >
                                        {task.completed ? "Completed" : "Incomplete"}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 mt-4 md:mt-0">
                                {/* Toggle Completed (Optional future feature) */}
                                {/* <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task._id)}
                /> */}

                                {/* Delete */}
                                <button
                                    className="btn btn-sm btn-error btn-outline"
                                    onClick={() => handleDelete(task._id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


export default TaskManager;
