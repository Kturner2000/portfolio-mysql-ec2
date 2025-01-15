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
      } catch (error) {
        console.error("Error in getPhotos: ", error.message);
        set({ error: error.message, isPhotoLoading: false });
      }
    },
      
    // get photo by category.

    getPhotosByCategory: async(category) => {
      set({ isPhotoLoading: true, error: null});
      
      try {
        const res = await axiosInstance.get(`/category/${category}`, category);
        set({photos : res.data, isPhotoLoading: false})
      } catch (error) {
       
          console.error("Error in getPhotos: ", error.message);
          set({ error: error.message, isPhotoLoading: false });
      }
    },

    // upload photo
    uploadPhotos: async (photoData) => {
      set({ isArticleLoading: true, error: null });
      try {
        const res = await axiosInstance.post("/photos'upload", { photos: [photoData] });
        set({ photos: res.data.photos });
      } catch (err) {
          console.error("Error creating article:", err);
          set({ error: err.message });
          toast.error("Failed to create article");
      } finally {
          set({ isArticleLoading: false });
          toast.success("Article created successfully");
      }
  },

}))