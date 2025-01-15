import { Link } from "react-router-dom";
import styles from "./menu.module.css";

export default function Menu() {
    return (
        <nav className={styles.menu}>
            <Link to={"/category/travel"} className={styles.menuItem}>
                Travel
            </Link>
            <Link to={"/category/nature"} className={styles.menuItem}>
                Nature
            </Link>
            <Link to={"/category/animals"} className={styles.menuItem}>
                Animals
            </Link>
            <Link to={"/category/portraits"} className={styles.menuItem}>
                Portraits
            </Link>
            <Link to={"/contact"} className={styles.menuItem}>
                Contact Me
            </Link>
        </nav>
    );
}
