import styles from "./Header.module.css"

function Header() {
    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>to do</h1>
            <p className={styles.subTitle}>Reminds Everythings</p>
        </div>
    );
}

export default Header;