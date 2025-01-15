import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isCheckingAuth: true,

    //checkAuth()
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            // similar when you use setState in useState
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

   

    login: async (data) => {
        set({ isLoggingIn: true });
        console.log("Login called with data:", data); // Debugging
        try {
            const res = await axiosInstance.post('/users/login', data);
            console.log("Login response:", res.data); // Debugging
            set({ authUser: res.data });
            toast.success('Logged in successfully');
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message); // Debugging
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred during login';
            toast.error(errorMessage);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    
    

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(err.response.data.message);
        }
    },

   
}));
