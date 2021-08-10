import axios from "axios"

//id="60fdcc41c6db2000047c6c84"
// createdAcc:
// email: poiumazaya@gmail.com
// password: newPiatnicaTest

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

export const packsListAPI = {
    getPacks(packName: string, min: number, max: number, sortPacksOrder: number, sortPacksFilter: string, page: number, pageCount: number, user_id: string) {
        return instance.get<GetPacksResponseType>(`/cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacksOrder}${sortPacksFilter}&page=${page}&pageCount=${pageCount}&user_id=${user_id}`)
    },
    addPack(packName: string) {
        return instance.post(`cards/pack`, {cardsPack: {name: packName}})
    },
    updatePack(packName: string, packId: string) {
        return instance.put(`cards/pack`, {cardsPack: {_id: packId, name: packName}})
    },
    deletePack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`)
    }
}



export const cardsAPI = {
    getCards(packId: string, page: number, pageCount: number, question?: string, sortCardsOrder?: number, sortCardsFilter?: string, answer?: string, min?: number, max?: number) {
        return instance.get<GetCardsResponseType>(`/cards/card?cardQuestion=${question}&cardsPack_id=${packId}&page=${page}&pageCount=${pageCount}&sortCards=${sortCardsOrder}${sortCardsFilter}`,)
    },
    addCard(packId: string, question?: string, answer?: string) {
        return instance.post(`/cards/card`, {card: {cardsPack_id: packId, question, answer,}})
    },
    updateCard(cardId: string, question: string, answer: string) {
        return instance.put(`/cards/card`, {card: {_id: cardId, question, answer}})
    },
    deleteCard(cardId: string) {
        return instance.delete(`/cards/card?id=${cardId}`)
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

    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean

    error?: string
}

export type GetPacksResponseType = {
    cardPacks: Array<CardPacksResponseType>
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number

    user_id: string
}

export type CardPacksResponseType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type GetCardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

// {
//
//     params: {
//         cardAnswer: answer,
//             cardQuestion: question,
//             cardsPack_id: packId,
//             min,
//             max,
//             sortCards,
//             page,
//             pageCount
//     }
// }