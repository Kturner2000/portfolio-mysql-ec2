import { Link } from "react-router-dom";
import styles from "./menu.module.css";

export default function Menu() {
    return (
        <nav className={styles.menu}>
            <Link to={"/travel"} className={styles.menuItem}>
                Travel
            </Link>
            <Link to={"/nature"} className={styles.menuItem}>
                Nature
            </Link>
            <Link to={"/animals"} className={styles.menuItem}>
                Animals
            </Link>
            <Link to={"/portraits"} className={styles.menuItem}>
                Portraits
            </Link>
            <Link to={"/contact"} className={styles.menuItem}>
                Contact Me
            </Link>
        </nav>
    );
}
