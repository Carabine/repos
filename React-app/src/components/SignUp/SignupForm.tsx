import {Field, Form, Formik} from "formik";
import {renderInput} from "../../utils/formControls/formControls";
import React, {FC, useState} from "react";
import {signupValidate} from "../../utils/validations/validations";
import Button from "@material-ui/core/Button";
import {authAPI} from "../../api/api";

type PropsType = {
    successAuth: () => void
}

export const SignupForm:FC<PropsType> = ({successAuth}) => {
    const [isFetching, setIsFetching] = useState(false)

    return (
        <Formik onSubmit={async (values, actions) => {
            setIsFetching(true)
            const data = await authAPI.signup(values)
            console.log(data)
            if(data.status === 'success') {
                localStorage.setItem('token', data.data.token)
                successAuth()
            } else {
                if(data.field && data.message) {
                    actions.setFieldError(data.field, data.message)
                }
            }
        }} validate={signupValidate} initialValues={{username: '', password: '', email: ''}}>
            <Form>
                <Field placeholder={"username"} name={"username"} component={renderInput} /> <br />
                <Field placeholder={"password"} type={'password'} name={"password"} component={renderInput} /> <br />
                <Field placeholder={"email"} name={"email"} component={renderInput} /> <br />
                <Button type={"submit"}> {isFetching ? 'LOADING...' : 'SIGN UP'} </Button>
            </Form>
        </Formik>)
}