import api from "../services/api";

export const getTodoList = async (link?: string | null) => {
    return await api.get(link || "/todo/")
}

export const updateDone = async (todoId: number, done: boolean, index: number) => {
    return await api.patch(`/todo/${todoId}/`, { done: !done })
}

export const deleteTodo = async (todoId: number) => {
    return await api.delete(`/todo/${todoId}/`)
}

export const sortTodos = async (newOrder: number[]) => {
    return await api.post("/todo/order/", { new_order: newOrder });
}
