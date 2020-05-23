import React, {FC, useState} from 'react';
import { Redirect } from 'react-router';
import {loginValidate} from "../../utils/validations/validations";
import {Field, Formik, Form} from "formik";
import {renderInput} from "../../utils/formControls/formControls";
import Button from "@material-ui/core/Button";
import {authAPI} from "../../api/api";

type PropsType = {
	isAuth: boolean,
	successAuth: () => void
}

const Login:FC<PropsType> = ({isAuth, successAuth}) => {
	const [isFetching, setIsFetching] = useState(false)

	if (isAuth) {
		return <Redirect to="/profile" />
	}

 
	return <div className={'content'}>
		<Formik initialValues={{ username: '', password: '' }} validate={loginValidate}
				onSubmit={async (values, actions) => {
					setIsFetching(true)
					const data = await authAPI.login(values)
					console.log(data)
					if (data.status === 'success') {
						localStorage.setItem('token', data.data.token)
						successAuth()
					} else {
						if(data.field && data.message) {
							actions.setFieldError(data.field, data.message)
						}
					}
				}}
		>
			<Form>
				<Field placeholder={"username"} name={"username"} component={renderInput} /> <br/>
				<Field placeholder={"password"} type={'password'} name={"password"} component={renderInput} /> <br/>
				<Button type={"submit"}> { isFetching ? 'LOADING...' : 'LOGIN'} </Button>
			</Form>
		</Formik>
	</div>
	
}


export default Login
