import { useEffect } from "react";
import api from "../services/api";
import Button from "./components/Button";
import styles from "./TodoEdit.module.css";
import { todoType } from "./types";
import { useToastContext } from "../components/notification/notification";

type todoEditType = {
    todo: todoType | null;
    updateList: () => any;
    closeModal: () => any;
}

function TodoEdit({ todo, updateList, closeModal }: todoEditType) {
    const { addToast } = useToastContext();

    const editTodo = async (e: any) => {
        e.preventDefault()

        if (!todo) {
            return
        }

        let checkInput = e.target['done'].checked;


        const title = e.target['title'].value || todo.title;
        const description = e.target['description'].value || todo.description;
        const done = checkInput === null || checkInput === undefined ? todo.done : checkInput;
        const priority = e.target['priority'].value || todo.priority;

        try {
            await api.patch(`/todo/${todo.id}/`, { ...todo, title, description, done: done, priority })
            updateList();
        } catch (e) {
            addToast("Erro ao editar todo.")
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    }, [closeModal])

    function formatDate(date: string) {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("BR")
    }


    if (todo === null) {
        closeModal();
        return null;
    }
    return (
        <form method="post" onSubmit={editTodo} className={styles.container}>
            <div className={styles.popupContainer}>
                <div className={styles.exitContainer}>
                    <button className={styles.exit} onClick={closeModal}>X</button>
                </div>

                <h1 className={styles.textInfo}>Todo Editor</h1>

                <div className={styles.mainContent}>
                    <div className={styles.forms}>
                        <p className={styles.textInfo}>Title</p>
                        <input id="title" placeholder="Type your title" defaultValue={todo?.title} />
                        <p className={styles.textInfo}>Description</p>
                        <input className={styles.description} id="description" placeholder="Type your description" defaultValue={todo.description ? todo.description : undefined} />
                        <div className={styles.priority}>
                            <p className={styles.textInfo}>Priority</p>
                            <input id="priority" type="number" defaultValue={todo.priority} />
                        </div>
                    </div>
                    <div className={styles.editData}>
                        <div className={styles.userData}>
                            <p className={styles.editInfo}>Created at {formatDate(todo.created_at)}</p>
                            <p className={styles.editInfo}>Created by {todo.created_by_name}</p>
                        </div>
                        <div className={styles.userData}>
                            <p className={styles.editInfo}>Modified at {formatDate(todo.modified_at)}</p>
                            <p className={styles.editInfo}>Modified by {todo.modified_by_name}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerContainer}>
                        <div className={styles.done}>
                            <input id="done" type="checkbox" defaultChecked={todo.done}></input>
                            <p className={styles.textInfo}>done</p>
                        </div>

                        <Button>Save</Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default TodoEdit;
