import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePhotoStore = create((set, get) => ({
    photos: [],
    photo: null,
    isPhotoLoading: false,
    error: null,

    getAllPhotos: async (page) => {
      set({ isPhotoLoading: true, error: null });
      try {
        const res = await axiosInstance.get(`/photos?page=${page}`);
        set((state) => ({ 
          photos: page === 1 ? res.data : [...state.photos, ...res.data],
          isPhotoLoading: false 
        }));
      } catch (err) {
        console.error("Error in getPhotos: ", err.message);
        set({ error: err.message, isPhotoLoading: false });
      }
    },
      
    // get photo by category.

    

    // upload photo

}))