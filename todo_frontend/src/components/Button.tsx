import styles from "./Button.module.css"

function Button({ children, ...args }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button {...args} className={styles.button}>{children}</button>
    );
}

export default Button;
