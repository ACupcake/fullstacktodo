import api from '../../services/api';
import Button from './Button';
import styles from './CreateTodo.module.css';

type createTodoType = {
    updateTodo: () => void;
}

function CreateTodo({ updateTodo }: createTodoType) {
    const addTodo = (e: any) => {
        e.preventDefault();
        const todo = e.target['todo'].value;

        api.post("/todo/", { title: todo })
            .then((res) => {
                updateTodo()
                e.target['todo'].value = "";
            })
            .catch(e => console.log(e))
    }

    return (
        <form method="post" onSubmit={addTodo} className={styles.container}>
            <div className={styles.buttonContainer}>
                <Button>add</Button>
            </div>
            <input
                className={styles.input}
                placeholder='Create a new todo...'
                id="todo"
            />
        </form>
    );
}

export default CreateTodo;
