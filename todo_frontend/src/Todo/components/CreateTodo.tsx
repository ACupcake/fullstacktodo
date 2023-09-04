import { useToastContext } from '../../components/notification/notification';
import api from '../../services/api';
import Button from './Button';
import styles from './CreateTodo.module.css';

type createTodoType = {
    updateTodo: () => void;
}

function CreateTodo({ updateTodo }: createTodoType) {
    const { addToast } = useToastContext();

    const addTodo = async (e: any) => {
        e.preventDefault();
        const todo = e.target['todo'].value;

        try {
            await api.post("/todo/", { title: todo })
            updateTodo()
            e.target['todo'].value = "";
        } catch (e) {
            addToast("Erro ao editar todo.")
        }
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
