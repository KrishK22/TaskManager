import { axiosInstance } from '../lib/utils.js'
import { create } from 'zustand'
import toast from 'react-hot-toast'



export const useAuthStore = create((set, get) => ({

    authUser: null,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/get')
            set({
                authUser: res.data
            })
        } catch (error) {
            console.log(`${error} found in checkAuth in authStore`)
            set({ authUser: null })
        }
    },
    signUp: async (data) => {
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success("Signup successfull")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(`${error} found in signup in authStore`)
        }
    },
    login: async (data) => {
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data })
        } catch (error) {
            console.log(`${error} found in login in authStore`)
            toast.error(error.response.data.message)
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success("Logged Out Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(`Error in loggingOut `, error)
        }
    },





}))