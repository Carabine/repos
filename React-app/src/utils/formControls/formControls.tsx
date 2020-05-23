import React, {FC} from 'react'


export const renderInput:FC<any> = ({field, form, ...props}) => {
    const meta = form
    const name = field.name
    return (
            <div className={'form-item-container'}>
                <div className={meta.touched[name] && meta.errors[name] ? 'input-container error' : 'input-container '}>
                    <input {...field} {...props} />
                </div>
                {meta.touched[name] && meta.errors[name] && (
                    <div className="error-message">{meta.errors[name]}</div>
                )}
            </div>

    )
}

export const renderTextarea:FC<any> = ({field, form, ...props}) => {
    const meta = form
    const name = field.name
    return (
        <div className={'textarea-container'}>
            <textarea {...field} {...props} />
            {meta.errors[name] && (
                <div className="error-message">{meta.errors[name]}</div>
            )}
        </div>
    )
}
