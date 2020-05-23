import React, {FC, useState} from 'react'
import {renderTextarea} from "../../utils/formControls/formControls";
import {Formik, Field, Form} from "formik";
import Button from "@material-ui/core/Button";
import {postsAPI} from "../../api/api";
import {PostType} from "../../types/types";

type PropsType = {
    addPost: (post: PostType) => void,
}

const ProfileFrom:FC<PropsType> = ({addPost}) => {
    const [isFetching, setIsFetching] = useState(false)
    
    return (
        <div className={'post-form'}>
            <Formik onSubmit={async (values, {resetForm, setFieldError}) => {
                if(!values.postBody) {
                    setFieldError('postBody', 'Post is empty')
                    return
                }
                setIsFetching(true)
                try {
                    const data = await postsAPI.addPost(values.postBody)
                    console.log(data)
                    if(data.status === 'success') {
                        const payload = data.data
                        addPost(payload.post)
                    } else {
                        setFieldError('postBody', 'Sometimes went wrong')
                    }
                } catch(err) {
                    setFieldError('postBody', 'Sometimes went wrong')
                } finally {
                    setIsFetching(false)
                }
                resetForm()
            }} initialValues={{postBody: ''}}>
                <Form>
                    <Field name={"postBody"} placeholder={"Post"} component={renderTextarea} />
                    <Button type={"submit"}>{isFetching ? 'WAIT...' : 'SEND'}</Button>
                </Form>
            </Formik>
        </div>
    )
}

export default ProfileFrom