"use client";
import React from "react";
import Masonry from "react-masonry-css";
import styles from "./masonry.module.css"; // Import the global CSS


// Memoized MasonryGallery component
export default function MasonryGallery({ photos }) {
    // Define the breakpoint for responsive columns
    const breakpointColumnsObj = {
        default: 4, // Changed from 4 to 3
        1100: 3,    // Changed from 3 to 2
        700: 2,
        500: 1,
      };
      

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={styles.masonry_grid} // Use global CSS class
                columnClassName={styles.masonry_grid_column} // Use global CSS class
            >
                {photos.map((photo, index) => (
                    <div key={index} className={styles.masonry_item}>
                        <img className={styles.masonry_item_img}
                            src={
                                photo.src
                                    ? photo.src
                                    : "https://placehold.co/600x400"
                            }
                            alt={photo.alt || `Photo ${index + 1}`}
                            
                        />
                    </div>
                ))}
            </Masonry>
        </>
    );
}
