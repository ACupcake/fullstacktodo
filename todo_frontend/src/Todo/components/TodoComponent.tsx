import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Button from './Button';
import styles from './TodoComponent.module.css';

type params = {
    title: string;
    priority: number;
    checked: boolean;
    updateDone: () => any;
    deleteTodo: () => any;
    onClick: () => any;
    id: number;
    index: number;
}

function TodoComponent({ title, priority, checked, updateDone, deleteTodo, onClick, id, index }: params) {
    const [check, setCheck] = useState(checked)

    const checkInput = async () => {
        try {
            await updateDone();
            setCheck((check) => !check);
        } catch (e) {
            console.log(e);
        }
    }

    const handleContainerClick = (e: any) => {
        if (e.target.id.includes("container")) {
            onClick();
        }
    }

    // TODO: text must be selectable

    return (
        <Draggable key={id} draggableId={String(id)} index={index}>
            {(provided) => (
                <div
                    id="container"
                    className={styles.container}
                    onClick={handleContainerClick}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className={styles.titleContainer} id="container2">
                        <input className={styles.checkbox} type="checkbox" defaultChecked={check} onClick={() => checkInput()} />
                        <h2 id="title">{title}</h2>
                    </div>
                    <div className={styles.leftContainer} id="container3">
                        <Button onClick={deleteTodo}>delete</Button>
                        <p>{priority}</p>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default TodoComponent;
