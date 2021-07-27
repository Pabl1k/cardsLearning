import React, {useState} from "react"
import {NavLink, Redirect} from "react-router-dom";
import {useFormik} from "formik";
import {AppRootStateType} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {restorePasswordTC} from "../../redux/reducers/restorePassword-reducer";
import s from "./RestorePassword.module.scss"
import {InputTextMUI} from "../common/inputText/InputTextMUI";

type RestorePasswordPropsType = {}

type FormikErrorType = {
    email?: string
}


export const RestorePassword = React.memo(function (props: RestorePasswordPropsType) {

    const dispatch = useDispatch()
    const errorMessage = useSelector<AppRootStateType, string | null>(message => message.restorePasswordReducer.errorMessage)


// временные стэйты для values инпутов нужно будет заменить на правильные из редакса
    const [email, setEmail] = useState<string>("");


    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const error: FormikErrorType = {}
            if (!values.email) {
                error.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Invalid email address"
            }
            return error
        },
        onSubmit: values => {
            dispatch(restorePasswordTC(values.email))
            formik.resetForm()
        }
    })

    if (errorMessage?.slice(0, 8) === 'Recovery') {
        return <Redirect to={'/login'}/>
    }

    return (


        <div className={s.forgot}>
            <form onSubmit={formik.handleSubmit}>
                <h1 className={s.title}>It-incubator</h1>

                <h2 className={s.caption}>Forgot your password?</h2>

                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"email"}
                        autoComplete='off'
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        label={"Email"}
                        helperText={formik.errors.email}
                    />
                </div>
                <p className={s.text}>
                    Enter your email address and we will send you further instructions
                </p>

                <button className={s.button}>Send Instructions</button>

                <p className={s.password}>Did you remember your password?</p>

               {/* <InputText
                    style={{width: 250, height: 50}}
                    placeholder='Email'
                    {...formik.getFieldProps('email')}/>

                {formik.touched.email && formik.errors.email &&
                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <br/>
                <p style={{color: 'red'}}>{errorMessage}</p>
                <br/><br/><br/>
                <p>Enter your email address and we will send you a further instructions</p>
                <br/><br/>
                <Button
                    type={'submit'}
                    style={{width: 150, height: 50}}>Send instructions</Button>
                <br/><br/>*/}

                <NavLink to={'/login'} className={s.try}>Try logging in</NavLink>
            </form>

        </div>


    )
})