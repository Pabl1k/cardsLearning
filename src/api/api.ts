import axios from "axios"

const instance = axios.create({
    baseURL: "https://BaseULR/",
    withCredentials: true,
    headers: {
        "API-KEY": "someAPIKey"
    }
})

// api
/*export const todolistsAPI = {
    getTodolists() {
        return instance.get<ResponseType>("ULR")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{body: BodyType}>>("ULR", {item: item})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`ULR/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`ULR/${id}`, {item: item})
    }
}*/

// types
export type ResponseType<D = {}> = {
    data: D
}