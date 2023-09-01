import styles from "./Button.module.css"

function Button({ children, ...args }: any) {
    return (
        <button {...args} className={styles.button}>{children}</button>
    );
}

export default Button;
