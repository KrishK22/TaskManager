import React, { useReducer, useRef, useState } from "react";
import { FaTasks, FaAlignLeft, FaFlag } from "react-icons/fa"; // Install react-icons if not already
import { useTaskStore } from '../store/useTaskStore'
import TaskManager from "../components/TaskManager";

const HomePage = () => {
    const [showForm, setShowForm] = useState(false);
    const titleRef = useRef()
    const descriptionRef = useRef()
    const priorityRef = useRef()

    const { addTask } = useTaskStore()


    const UpdateTask = () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const priority = priorityRef.current.value;

        const data = {
            title,
            description,
            priority
        }
        addTask(data)


    }



    return (
        <>

            <div className="p-6 w-full max-w-4xl mx-auto mt-14 ">
                {/* Add New Task Button */}
                <div className="flex justify-center mb-6">
                    <button
                        className="btn btn-primary btn-wide text-lg shadow-lg hover:scale-105 transition-transform"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Close Form" : "➕ Add New Task"}
                    </button>
                </div>

                {/* Task Form */}
                {showForm && (
                    <div className="card bg-base-100 shadow-xl p-8 animate-fadeIn rounded-2xl border border-primary/20">
                        <form className="flex flex-col gap-6">
                            {/* Title */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Title</span>
                                </label>
                                <div className="relative">
                                    <FaTasks className="absolute top-4 left-3 text-primary" />
                                    <input
                                        type="text"
                                        placeholder="Enter task title"
                                        className="input input-bordered w-full pl-10"
                                        ref={titleRef}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Description</span>
                                </label>
                                <div className="relative">
                                    <FaAlignLeft className="absolute top-4 left-3 text-primary" />
                                    <textarea
                                        className="textarea textarea-bordered w-full pl-10"
                                        placeholder="Enter task description"
                                        ref={descriptionRef}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6">


                                {/* Priority */}
                                <div className="flex-1">
                                    <label className="label">
                                        <span className="label-text font-semibold">Priority</span>
                                    </label>
                                    <div className="relative">
                                        <FaFlag className="absolute top-4 left-3 text-primary" />
                                        <select className="select select-bordered w-full pl-10" ref={priorityRef}>
                                            <option disabled selected>
                                                Select priority
                                            </option>
                                            <option className="text-green-500">Low</option>
                                            <option className="text-yellow-500">Medium</option>
                                            <option className="text-red-500">High</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button className="btn btn-accent mt-6 shadow-md hover:scale-105 transition-transform" onClick={UpdateTask}>
                                🚀 Add Task
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <TaskManager />


        </>
    );
}


export default HomePage;