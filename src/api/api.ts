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
        return instance.post<LoginUserResponseType>("auth/login", {email, password, rememberMe})
    },
    me() {
        return instance.post<UserDataType>("auth/me", {})
    },
    restorePassword(email: string) {
        return instance.post<RestorePasswordResponseType>(`auth/forgot`, {
            email: email,
            from: `test-front-admin <ai73a@yandex.by>`,
            message: ''
            // message: `<div style="background-color: lime; padding: 15px">
            //                 Click <a href='http://localhost:3000/it-incubator-friday-project#/updatePassword/$token$'>here</a> to recover your password
            //           </div>`
        })
    },
    signUp(email: string, password: string) {
        return instance.post<ResponseSignUpType>(`auth/register`, {email, password})
    },
    logout() {
        return instance.delete("auth/me", {})
    },
}

export const profileAPI = {
    updateUserData(name: string, avatar: string | undefined | null) {
        return instance.put<UpdateUserDataResponseType>("auth/me", {name, avatar})
    }
}

// types
export type ResponseType<D = {}> = {
    data: D
}

export type LoginUserResponseType = UserDataType

export type UpdateUserDataResponseType = {
    token: string
    tokenDeathTime: number
    updatedUser: UserDataType
}

export type ResponseSignUpType = {
    addedUser: any
    error?: string
}

type RestorePasswordResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}

export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar: string | undefined | null
    publicCardPacksCount: number

    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean

    error?: string
}