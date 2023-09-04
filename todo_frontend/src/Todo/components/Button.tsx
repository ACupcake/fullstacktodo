import styles from "./Button.module.css";

function Button({ children, ...params }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button {...params} className={styles.container}>{children}</button>
    )
}

export default Button;
