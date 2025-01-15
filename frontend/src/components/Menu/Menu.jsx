import { Link } from "react-router-dom";
import styles from "./menu.module.css";
import { useAuthStore } from "../../store/useAuthStore";

export default function Menu() {
    const {authUser, logout} = useAuthStore()
    return (
        <nav className={styles.menu}>
            {authUser && (
                <>
                    <Link to="/admin">Upload Photo</Link>
                    <button onClick={logout}>Logout</button>
                </>
                ) }
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
