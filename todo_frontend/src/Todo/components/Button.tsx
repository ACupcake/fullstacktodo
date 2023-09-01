import styles from "./Button.module.css";

function Button({ children, ...params }: any) {
    return (
        <button {...params} className={styles.container}>{children}</button>
    )
}

export default Button;
