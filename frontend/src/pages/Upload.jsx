import React, { useState } from 'react';
import { usePhotoStore } from '../store/usePhotoStore';
import toast from 'react-hot-toast';

export default function uploadPhotoPage() {
  const [files, setFiles] = useState([]);
  const { uploadPhotos, isPhotoLoading, error } = usePhotoStore();

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const processFiles = async () => {
    return Promise.all(
      files.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          src: base64,
          alt: file.name,
          category: 'default' // You can add a category input if needed
        };
      })
    );
  };

  const handleUpload = async () => {
    try {
      const processedFiles = await processFiles();
      await uploadPhotos(processedFiles);
      toast.success("Photos uploaded successfully");
      setFiles([]); // Clear the file input
    } catch (err) {
      toast.error("Failed to upload photos");
    }
  };

  return (
    <div>
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        accept="image/*"
      />
      <button 
        onClick={handleUpload} 
        disabled={isPhotoLoading || files.length === 0}
      >
        {isPhotoLoading ? 'Uploading...' : 'Upload Photos'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

