import React from "react"
import {useFormik} from "formik"
import style from "./Registration.module.scss"
import {SignUpTC} from "../../redux/reducers/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";

type LoginPropsType = {}

type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}

export const Registration = React.memo((props: LoginPropsType) => {
    const dispatch = useDispatch()
    const isSignUp = useSelector<AppRootStateType, boolean>(state => state.registrationReducer.isSignUp)

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
            repeatPassword: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "Required."
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address."
            }
            if (!values.newPassword) {
                errors.password = "Required."
            } else if (values.newPassword.length < 6) {
                errors.password = `Password must be more than six characters.`
            }
            if (!values.repeatPassword) {
                errors.repeatPassword = 'Required';
            } else if (values.newPassword !== values.repeatPassword) {
                errors.repeatPassword = 'Passwords are not equal';
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(SignUpTC(values.email, values.newPassword))
            formik.resetForm()
        }
    })

    if (isSignUp) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <div>
                It-Incubator
            </div>
            <div>
                Sign Up
            </div>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                />
                {
                    formik.touched.email && formik.errors.email
                        ? <div>{formik.errors.email}</div>
                        : null
                }
                <input
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                />
                {
                    formik.touched.newPassword && formik.errors.newPassword
                        ? <div>{formik.errors.newPassword}</div>
                        : null
                }
                <input
                    type="password"
                    placeholder="Repeat Password"
                    {...formik.getFieldProps("repeatPassword")}
                />
                <button type={"submit"}>Sign Up</button>
            </form>
        </>
    )
})