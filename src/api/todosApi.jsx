import axios from "axios"

const delay = () => new Promise(res => setTimeout(() => res(), 800))

const todosApi = axios.create({
    baseURL: "http://localhost:3500"
})

export const todosUrlEndpoint = '/todos'

export const getTodos = async () => {
    // await delay()
    const response = await todosApi.get(todosUrlEndpoint)
    return response.data
}

export const addTodo = async ({ userId, item, note, checked }) => {
    // await delay()
    const response = await todosApi.post(todosUrlEndpoint, { userId, item, note, checked })
    return response
}

export const updateTodo = async (todo) => {
    // await delay()
    const response = await todosApi.patch(`${todosUrlEndpoint}/${todo.id}`, todo)
    return response
}

export const deleteTodo = async (id) => {
    // await delay()
    const response = await todosApi.delete(`${todosUrlEndpoint}/${id}`)
    return response
}