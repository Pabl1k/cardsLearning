import axios from "axios"

// createdAcc:
// email: poiumazaya@gmail.com
// password: piatnicaTest
// id: 60fd99dcc6db2000047c6c7d

const instance = axios.create({
    // baseURL: "https://neko-back.herokuapp.com/2.0",
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
    headers: {}
})

// api
export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>("auth/login", {email, password, rememberMe})
    },
    restorePassword(email: string) {
        return instance.post<RestorePasswordResponseType>(`auth/forgot`, {
            email: email,
            from: `test-front-admin <ai73a@yandex.by>`,
            message: `<div style="background-color: lime; padding: 15px">	
                            password recovery link: 
                        <a href='http://localhost:3000/it-incubator-friday-project#/updatePassword/$token$'>link</a>
                      </div>`
        })
    },
}

// types
export type ResponseType<D = {}> = {
    data: D
}

export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number

    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean

    error?: string
}

type RestorePasswordResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}
