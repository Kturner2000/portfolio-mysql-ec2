import { useState, useRef } from "react";
import { usePhotoStore } from "../store/usePhotoStore";
import styles from "./styles/upload.module.css";
import { Plus, X, Image } from "lucide-react";
import toast from "react-hot-toast";

export default function Create_article() {
    const [files, setFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [alts, setAlts] = useState([]);
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);
    const { uploadPhotos } = usePhotoStore();

    function handleImageChange(e) {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => file.type.startsWith("image/"));

        if (validFiles.length !== selectedFiles.length) {
            toast.error("Some selected files are not images");
        }

        setFiles(prevFiles => [...prevFiles, ...validFiles]);
        setAlts(prevAlts => [...prevAlts, ...Array(validFiles.length).fill("")]);
        setCategories(prevCategories => [...prevCategories, ...Array(validFiles.length).fill("")]);

        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prevPreviews => [...prevPreviews, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    }

    function removeImage(index) {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
        setAlts(prevAlts => prevAlts.filter((_, i) => i !== index));
        setCategories(prevCategories => prevCategories.filter((_, i) => i !== index));
    }

    function handleAltChange(index, value) {
        setAlts(prevAlts => {
            const newAlts = [...prevAlts];
            newAlts[index] = value;
            return newAlts;
        });
    }

    function handleCategoryChange(index, value) {
        setCategories(prevCategories => {
            const newCategories = [...prevCategories];
            newCategories[index] = value;
            return newCategories;
        });
    }

    async function handleSubmit(e) {
      e.preventDefault();

      


      const photoData = files.map((file, index) => {
        if (!alts[index] || !categories[index]) {
          toast('All inputs need to be filled');
          return null; // or handle this case as needed
        }
        return {
          file,
          alt: alts[index],
          category: categories[index],
        };
      });
      
    
      try {
        const formattedData = await Promise.all(
          photoData.map(async (item) => ({
            src: await fileToBase64(item.file),
            alt: item.alt,
            category: item.category,
          }))
        );
        console.log("Formatted data:", formattedData);
    
        await uploadPhotos(formattedData);
        // Reset form state
        setFiles([]);
        setImagePreviews([]);
        setAlts([]);
        setCategories([]);
      } catch (error) {
        console.error("Failed to upload photos:", error);
      }
    }

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.imageGrid}>
                    
                    {imagePreviews.map((preview, index) => (
                    <div className={styles.previewContainer}>
                        <div key={index}>
                            <div key={index} className='relative'>
                                <img src={preview} alt={`Preview ${index + 1}`} className={styles.preview} />
                                <button className={styles.removeButton} onClick={() => removeImage(index)} type='button'>
                                    <X className='size-3' />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Alt text"
                                    value={alts[index]}
                                    onChange={(e) => handleAltChange(index, e.target.value)}
                                    className={styles.input}
                                />
                              <div className={styles.categoryGroup}>
                                <label>Category</label>
                                <select
                                    aria-label='Category select'
                                    value={categories[index]}
                                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                                >
                                    <option>Select a category</option>
                                    <option value='animals'>Animals</option>
                                    <option value='portraits'>
                                        Portraits
                                    </option>
                                    <option value='travel'>Travel</option>
                                    <option value='nature'>Nature</option>
                                </select>
                            </div>
                                
                       </div>
                       </div>
                       </div>
                    ))}
                    <input
                        type='file'
                        accept='image/*'
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        multiple
                        hidden
                    />
                    <button
                        type='button'
                        className={styles.addButton}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <button type="submit" className={styles.submitButton}>
                    Upload Photos
                </button>
            </form>
        </div>
    );
}
