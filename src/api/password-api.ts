import {instance} from "./api";

export const PasswordAPI = {
    restorePassword(email: string) {
        return instance.post<RestorePasswordResponseType>(`auth/forgot`, {
            email: email,
            from: `test-front-admin <ai73a@yandex.by>`,
            message: `<div style="background-color: lime; padding: 15px">	
                            password recovery link: 
                        <a href='http://localhost:3000/it-incubator-friday-project#/updatePassword/$token$'>link</a>
                      </div>`
        })
    }
}

type RestorePasswordResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}
