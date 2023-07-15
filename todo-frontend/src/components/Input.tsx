import style from "./Input.module.css"

function Input({ wrong, ...args }: any) {
    let conditionalStyle = wrong ? { border: "solid red 1px" } : {};

    return (
        <input {...args} className={style.input} style={conditionalStyle} />
    );
}

export default Input;
