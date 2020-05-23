import React, {FC} from 'react';
import { Redirect } from 'react-router'
import {SignupForm} from "./SignupForm";

type PropsType = {
	isAuth: boolean,
	successAuth: () => void
}

const SignUp:FC<PropsType> = ({isAuth, successAuth}) => {
	if (isAuth) {
		return <Redirect to="/profile" />
	}


	return <div className={'content'}>
		<SignupForm successAuth={successAuth}/>
	</div>
	

}

export default SignUp