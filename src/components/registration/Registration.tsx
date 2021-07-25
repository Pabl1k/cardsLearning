import React from "react"
import {useFormik} from "formik"
import style from "./Registration.module.scss"
import {Redirect} from "react-router-dom";

type LoginPropsType = {}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Registration = React.memo(function (props: LoginPropsType) {

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

            formik.resetForm()
        }
    })

    // if (isSignUp) {
    //     return <Redirect to={"/login">
    // }

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
                    formik.touched.password && formik.errors.password
                        ? <div>{formik.errors.password}</div>
                        : null
                }
                <input
                    type="password"
                    placeholder="Repeat Password"
                    {...formik.getFieldProps("password")}
                />
                <button type={"submit"}>Sign Up</button>
            </form>
        </>
    )
})
