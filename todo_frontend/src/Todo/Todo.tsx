import styles from './Todo.module.css';
import { useEffect, useState } from "react";
import TodoComponent from "./components/TodoComponent";
import CreateTodo from './components/CreateTodo';
import TodoEdit from './TodoEdit';
import { todoType } from './types';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import * as api from "./api"
import Toast from '../components/Toast';

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

    // TODO: api file 
    const getTodoList = async (link?: string | null) => {
        try {
            const res = (await api.getTodoList(link || "/todo/")) as any
            const sorted_data = res.data.sort((item1: todoType, item2: todoType) => item1.order < item2.order ? -1 : 1)
            setTodoList(sorted_data)
        } catch (e) {
            console.log(e)
        }
    }

    const updateDone = async (todoId: number, done: boolean, index: number) => {
        try {
            await api.updateDone(todoId, done, index)
            setTodoList((todoList) => {
                todoList[index].done = !done;
                return todoList;
            })
        } catch (e) {
            console.log(e);
        }
    }

    const deleteTodo = async (todoId: number) => {
        try {
            await api.deleteTodo(todoId)
            await getTodoList()
        } catch (e) {
            console.log(e);
        }
    }

    const openModal = (todo: todoType) => {
        setModalData(todo);
        setIsModalOpen(true);
    }

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(todoList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodoList(items);

        const sorted_items = items.map((item, index) => { return { ...item, order: index } })

        const sorted_ids = [...sorted_items.map(item => item.id)]

        try {
            // throw Error("ok")
            await api.sortTodos(sorted_ids)
        } catch (e: any) {
            // TODO: make hook to call message
            // <Toast text={e.message} />
            // TODO: undo if fail
            console.log(e.message);
        }
    }

    useEffect(() => {
        getTodoList();
    }, [])

    return (
        <div className={styles.container}>
            {/* TODO: fix shadow not in the entire screen */}
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
                        {(provided: DroppableProvided) => (
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
