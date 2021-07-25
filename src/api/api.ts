import axios from "axios"

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
    headers: {}
})

// api
export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType>("auth/login", {email, password, rememberMe})
    },
}

// types
export type ResponseType<D = {}> = {
    data: D
}