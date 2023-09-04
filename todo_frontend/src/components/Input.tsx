import style from "./Input.module.css"

interface InputInterface extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    wrong: boolean;
}

function Input({ wrong, ...args }: InputInterface) {
    let conditionalStyle = wrong ? { border: "solid red 1px" } : {};

    return (
        <input {...args} className={style.input} style={conditionalStyle} />
    );
}

export default Input;
