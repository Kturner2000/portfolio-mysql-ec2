import { useState, useRef, useCallback, useEffect } from "react";
import { usePhotoStore } from "../store/usePhotoStore";
import MasonryGallery from "../components/MasonryGallery/MasonryGallery"; // Import the MasonryGallery component

export default function Home() {
  const { getAllPhotos, photos, isPhotoLoading, error } = usePhotoStore();

  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isPhotoLoading) {
      setPage((prev) => prev + 1);
    }
  }, [isPhotoLoading]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  useEffect(() => {
    getAllPhotos(page);
  }, [getAllPhotos, page]);

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
