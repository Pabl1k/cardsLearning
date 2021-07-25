import axios from "axios"

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
    headers: {}
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