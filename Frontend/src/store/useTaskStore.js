import { create } from "zustand";
import { axiosInstance } from "../lib/utils";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({
    Tasks: [],
    getTask: async () => {
        try {
            const res = await axiosInstance.get('/task/gettask');
            set({ Tasks: res.data })
        } catch (error) {
            console.log(`${error} found in useTaskStore `)
            toast.error(`${error.message}`)
        }

    },
    deleteTask: async (userId) => {
        try {
            await axiosInstance.delete(`/task/deletetask/${userId}`)
            const tasks = get().Tasks;
            const updatedTasks = tasks.filter(task => task._id != userId)
            set({ Tasks: updatedTasks })
            toast.success("Task deleted Succesully")
        } catch (error) {
            console.log(`${error} found in deleteTask in useTaskStore`);
            toast.error("Failed to delete task");
        }


    },
    addTask: async (data) => {
        try {
            const res = await axiosInstance.post('/task/addtask', data)
            set({ Tasks: res.data })
            toast.success("task added successfully")
        } catch (error) {
            console.log(`${error} found in addTask in useTaskStore`)
            toast.error(`Failed`)
        }
    },

}))
