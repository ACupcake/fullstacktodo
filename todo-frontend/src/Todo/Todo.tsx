import styles from './Todo.module.css';
import { useEffect, useState } from "react";
import api from "../services/api";
import TodoComponent from "./components/TodoComponent";
import CreateTodo from './components/CreateTodo';
import TodoEdit from './TodoEdit';
import { todoType } from './types';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

type todoParams = {
    logout: () => void;
}


function Todo({ logout }: todoParams) {
    const [todoList, setTodoList] = useState<todoType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<todoType | null>(null);

    function getRandomInt(max: number): number {
        // TODO: this function should not be necessary for proper working of dnd
        return Math.floor(Math.random() * max);
    }

    const getTodoList = async (link?: string | null) => {
        setTodoList([])
        try {
            const res = await api.get(link || "/todo/")
            const sorted_data = res.data.sort((item1: todoType, item2: todoType) => item1.order < item2.order ? -1 : 1)
            setTodoList(sorted_data)
        }
        catch (e) {
            console.log(e)
        }
    }

    const updateDone = async (todoId: number, done: boolean, index: number) => {
        await api.patch(`/todo/${todoId}/`, { done: !done })
            .then((res) => {
                setTodoList((todoList) => {
                    todoList[index].done = !done;
                    return todoList;
                })
            })
            .catch(e => console.log(e))
    }

    const deleteTodo = async (todoId: number) => {
        await api.delete(`/todo/${todoId}/`)
            .then((res) => {
                getTodoList()
            })
            .catch(e => console.log(e))
    }

    const openModal = (todo: todoType) => {
        setModalData(todo);
        setIsModalOpen(true);
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(todoList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodoList(items);

        const sorted_items = items.map((item, index) => { return { ...item, order: index } })

        const sorted_ids = [...sorted_items.map(item => item.id)]

        api.post("/todo/order/", { new_order: sorted_ids })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getTodoList();
    }, [])

    return (
        <div className={styles.container}>
            {/* TODO: fix shadow not in hole screen */}
            {isModalOpen ?
                <TodoEdit
                    todo={modalData}
                    updateList={() => getTodoList()}
                    closeModal={() => setIsModalOpen(false)} />
                :
                null
            }
            <div className={styles.logoutContainer}>
                <button onClick={() => logout()} className={styles.logout}>
                    logout
                </button>
            </div>

            <div className={styles.titleContainer}>
                <div className={styles.titleHeader}>
                    <h1 className={styles.title}>todo</h1>
                    <div className={styles.title}>ICON</div>
                </div>
            </div>

            <div className={styles.createContainer}>
                <CreateTodo updateTodo={getTodoList} />
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.middleContainer}>
                    <Droppable droppableId={`column-${getRandomInt(10)}`}>
                        {(provided) => (
                            <div className={styles.todoContainer} ref={provided.innerRef} {...provided.droppableProps}>
                                {todoList.map((todo: todoType, index: number) => {
                                    return (
                                        <TodoComponent
                                            key={todo.id}
                                            title={todo.title}
                                            priority={todo.priority}
                                            checked={todo.done}
                                            updateDone={() => updateDone(todo.id, todo.done, index)}
                                            deleteTodo={() => deleteTodo(todo.id)}
                                            onClick={() => openModal(todo)}
                                            id={todo.id}
                                            index={index}
                                        />
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
}

export default Todo;
