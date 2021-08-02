import axios from "axios"

//id="60fdcc41c6db2000047c6c84"

const instance = axios.create({
    // baseURL: "https://neko-back.herokuapp.com/2.0",
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

// api
export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginUserResponseType>(`auth/login`, {email, password, rememberMe})
    },
    me() {
        return instance.post<UserDataType>(`auth/me`, {})
    },
    restorePassword(email: string) {
        return instance.post<RestorePasswordResponseType>(`auth/forgot`, {
            email: email,
            from: `test-front-admin <ai73a@yandex.by>`,
            message: `<div style="background-color: lime; padding: 15px">
                            Click <a href='http://localhost:3000/it-incubator-friday-project#/updatePassword/$token$'>here</a> to restore your password
                      </div>`
        })
    },
    signUp(email: string, password: string) {
        return instance.post<ResponseSignUpType>(`auth/register`, {email, password})
    },
    logout() {
        return instance.delete(`auth/me`, {})
    },
    setNewPassword(newPassword: string, resetPasswordToken: string) {
        return instance.post(`/auth/set-new-password`, {
            password: newPassword,
            resetPasswordToken
        })
    }
}

export const profileAPI = {
    updateUserData(name: string, avatar: string | undefined | null) {
        return instance.put<UpdateUserDataResponseType>(`auth/me`, {name, avatar})
    }
}

export const packsAPI = {
    addPack() {
        return instance.post(`cards/pack`, {cardsPack: {name: "NEW PACK"}})
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    updatePack(id: string) {
        return instance.put(`cards/pack`, {cardsPack: {_id: id, name: 'NewName'}})
    }
}
// types
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