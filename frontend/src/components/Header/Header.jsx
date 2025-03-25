import Menu from "../Menu/Menu";
import styles from "./header.module.css";
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.titleContainer}>
                    <Link to={"/"} className={styles.title}>
                        <h3>
                            Kylie&rsquo;s Photography
                        </h3>
                    </Link>
                </div>
                <div className={styles.menuContainer}>
                    <Menu />
                </div>
            </div>
        </header>
    );
}
