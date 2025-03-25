import { useEffect } from "react";
import { useParams } from "react-router-dom"

import { usePhotoStore } from "../store/usePhotoStore";
import MasonryGallery from "../components/MasonryGallery/MasonryGallery";

export default function CategoryPage() {
    const { category } = useParams();

    const {getPhotosByCategory, photos, isPhotoLoading, error} = usePhotoStore();

    useEffect(() => {
        getPhotosByCategory(category)
    }, [category, getPhotosByCategory])

    console.log(photos)

    return (
        <div>
            
            <MasonryGallery photos={photos} />
        </div>
    )
}