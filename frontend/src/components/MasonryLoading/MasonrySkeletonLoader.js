import React from "react";
import Masonry from "react-masonry-css";
import styles from "./loading.module.css";

export default function MasonrySkeletonLoader() {
    const skeletonItems = Array(12).fill(null); // Adjust number based on your layout

    return (
        <Masonry
            breakpointCols={{
                default: 4,
                1100: 3,
                700: 2,
                500: 1,
            }}
            className={styles.masonry_grid}
            columnClassName={styles.masonry_grid_column}
        >
            {skeletonItems.map((_, index) => (
                <div key={index} className={`${styles.masonry_item} ${styles.skeleton_item}`}>
                    <div className={styles.skeleton_img}></div>
                </div>
            ))}
        </Masonry>
    );
}
