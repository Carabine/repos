import {FormikErrors} from "formik";

type LoginValuesType = {
    username: string,
    password: string,
}

export const loginValidate = (values: LoginValuesType) => {
    let errors:FormikErrors<LoginValuesType> = {}

    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length < 4) {
        errors.username = 'Must be 4 characters or more'
    } else if (values.username.length > 10) {
        errors.username = 'Must be 10 characters or less'
    }
    if (!values.password) {
        errors.password = 'Required'
    }

    return errors
}

type SignupValuesType = {
    username: string,
    password: string,
    email: string
}

export const signupValidate = (values: SignupValuesType) => {
    let errors:FormikErrors<SignupValuesType> = {}

    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length < 4) {
        errors.username = 'Must be 4 characters or more'
    } else if (values.username.length > 10) {
        errors.username = 'Must be 10 characters or less'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    if(!values.email) {
        errors.email = 'Required'
    } else if(!values.email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)) {
        errors.email = 'Incorrect email'
    }

    return errors
}


