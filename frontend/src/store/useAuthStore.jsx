import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isCheckingAuth: true,
    error: null,

    //checkAuth()
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            // similar when you use setState in useState
            set({ authUser: res.data });
        } catch (err) {
            console.log("Error in checkAuth:", err);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (err) {
            toast.error(err.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    },

    

    
}));