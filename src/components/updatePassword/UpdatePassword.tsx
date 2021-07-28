import React, {useCallback} from "react"
import {Redirect, useParams} from "react-router-dom";
import style from "./UpdatePassword.module.scss"
import {InputText} from "../common/inputText/InputText";
import {Button} from "../common/button/Button";
import {useFormik} from "formik";
import {updatePasswordTC} from "../../redux/reducers/updatePassword-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";

type UpdatePasswordPropsType = {}

export const UpdatePassword = React.memo(function (props: UpdatePasswordPropsType) {
    // const {token} = useParams<Record<string, string | undefined>>();
    const {token} = useParams<any>();
    const dispatch = useDispatch()

    const isSuccess = useSelector<AppRootStateType, boolean>(state => state.updatePasswordReducer.isSuccess)

    console.log(`token: ` + token)
    type FormikErrorType = {
        newPassword?: string
    }
    const formik = useFormik({
        initialValues: {
            newPassword: "",
        },
        validate: (values) => {
            const error: FormikErrorType = {}
            if (!values.newPassword) {
                error.newPassword = 'Required';
            } else if (values.newPassword.length < 8) {
                error.newPassword = 'Must be at least 8 characters';
            }
            return error
        },
        onSubmit: values => {
            debugger
            dispatch(updatePasswordTC(values.newPassword, token))
            formik.resetForm()
        }
    })

    if (isSuccess) {
        return <Redirect to={'/login'} />
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            It-incubator
            <br/>
            <br/>
            Create a new password
            <br/>
            <br/>
            <InputText
                style={{width: 250, height: 50}}
                placeholder={'Password'}
                type={'password'}
                {...formik.getFieldProps('newPassword')}
            />
            {formik.touched.newPassword && formik.errors.newPassword &&
            <div style={{color: 'red'}}>{formik.errors.newPassword}</div>}

            <br/>
            <br/>
            Create new password and we will send you further instructions to email
            <br/><br/><br/>
            <Button
                type={'submit'}
                style={{width: 250, height: 50}}>Create new password</Button>
        </form>
    )
})