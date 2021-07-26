import React from "react"
import {useDispatch} from "react-redux"
import {loginTC} from "../../redux/reducers/login-reducer"
import {useFormik} from "formik"
import {Checkbox} from "../common/checkbox/Checkbox"
import {InputText} from "../common/inputText/InputText";
import {Button} from "../common/button/Button"
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
                errors.password = "Password must be more than six characters."
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
                <InputText
                    type="text"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                    style={{width: 250, height: 50}}
                />
                {
                    formik.touched.email && formik.errors.email
                        ? <div>{formik.errors.email}</div>
                        : null
                }
                <InputText
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    style={{width: 250, height: 50}}
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
                <Button
                    type={"submit"}
                    style={{width: 150, height: 50}}
                >Login
                </Button>
            </form>
        </>
    )
})