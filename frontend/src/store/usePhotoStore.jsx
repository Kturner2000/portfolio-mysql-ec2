import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePhotoStore = create((set, get) => ({
    photos: [],
    photo: null,
    isPhotoLoading: false,
    error: null,

    getAllPhotos: async () => {
      set({ isPhotoLoading: true, error: null });
      try {
        const res = await axiosInstance.get(`/photos`);
        set({photos : res.data, isPhotoLoading: false})
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
    uploadPhotos: async (formattedData) => {
      set({ isPhotoLoading: true, error: null });
      try {
        const res = await axiosInstance.post("/photos/upload", { photos: formattedData });
        set({ photos: res.data });
      } catch (error) {
        console.error("Error uploading photos:", error);
        set({ error: error.message });
        toast.error("Failed to upload photos");
      } finally {
        set({ isPhotoLoading: false });
        toast.success("Photos uploaded successfully");
      }
    },

}))