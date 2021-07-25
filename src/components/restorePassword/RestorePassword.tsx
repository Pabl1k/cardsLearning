import React, {useEffect} from "react"
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {restorePasswordTC} from "../../redux/reducers/restorePassword-reducer";
import {InputText} from "../common/inputText/InputText";
import {Button} from "../common/button/Button";

type RestorePasswordPropsType = {}

type FormikErrorType = {
    email?: string
}

export const RestorePassword = React.memo(function (props: RestorePasswordPropsType) {
    const dispatch = useDispatch();

    // createdAcc:
    // email: poiumazaya@gmail.com
    // password: piatnicaTest
    // id: 60fd99dcc6db2000047c6c7d

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const error: FormikErrorType = {};
            if (!values.email) {
                error.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = 'Invalid email address';
            }
            return error;
        },
        onSubmit: values => {
            dispatch(restorePasswordTC(values.email))
            formik.resetForm();
        },
    })
    return (
        <div style={{margin: 10}}>
            <form onSubmit={formik.handleSubmit}>
                <p>It-incubator</p>
                <br/>
                <p>Forgot your password?</p>
                <br/>
                <InputText
                    style={{width:250, height: 50}}
                    placeholder='Email'
                    {...formik.getFieldProps('email')}/>

                {formik.touched.email && formik.errors.email &&
                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <br/><br/><br/>
                <p>Enter your email address and we will send you a further instructions</p>
                <br/><br/>
                <Button
                    type={'submit'}
                    style={{width:150, height: 50}}>Send instructions</Button>
                <br/><br/>
                <p>Did you remember your password?</p>
                <br/>
                <NavLink to={'/login'}>Try logging in</NavLink>
            </form>
        </div>
    )
})