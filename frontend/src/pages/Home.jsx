import { useState, useRef, useCallback, useEffect } from "react";
import { usePhotoStore } from "../store/usePhotoStore";
import MasonryGallery from "../components/MasonryGallery/MasonryGallery"; // Import the MasonryGallery component

export default function Home() {
  const { getAllPhotos, photos, isPhotoLoading, error } = usePhotoStore();

  const loader = useRef(null);

  

 

  useEffect(() => {
    getAllPhotos();
  }, [getAllPhotos]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!photos || photos.length === 0) {
    return <div>No photos found.</div>;
  }

  return (
    <div>
      <MasonryGallery photos={photos} />
      {isPhotoLoading && <div>Loading more photos...</div>}
      <div ref={loader} />
    </div>
  );
}
