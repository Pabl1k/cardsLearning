import React from "react"
import {useDispatch} from "react-redux"
import {loginTC} from "../../redux/reducers/login-reducer"
import {useFormik} from "formik"
import {Checkbox} from "../common/checkbox/Checkbox"
import style from "./Login.module.scss"

type LoginPropsType = {}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = React.memo(function (props: LoginPropsType) {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "Required."
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address."
            }
            if (!values.password) {
                errors.password = "Required."
            } else if (values.password.length < 6) {
                errors.password = `Password must be more than six characters.`
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
            formik.resetForm()
        }
    })

    return (
        <>
            <div>
                It-Incubator
            </div>
            <div>
                Sign In
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
                    formik.touched.password && formik.errors.password
                        ? <div>{formik.errors.password}</div>
                        : null
                }
                <Checkbox
                    {...formik.getFieldProps("rememberMe")}
                >
                    Remember me
                </Checkbox>
                <button type={"submit"}>Login</button>
            </form>
        </>
    )
})