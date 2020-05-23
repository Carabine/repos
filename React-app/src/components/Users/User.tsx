import React, {FC} from "react";
import {NavLink} from "react-router-dom";

type PropsType = {
    username: string,
    userId: number
}

export const User:FC<PropsType> = ({username, userId}) => {
    const link = '/profile/' + userId
    return (
        <div className="item">
            <div className="ava-bg">
                <div className="ava" style={{background: 'url("https://www.iconninja.com/files/980/515/831/warrior-ninja-avatar-samurai-icon.svg")'}} />
            </div>
            <div className="username">{username}</div>
            <NavLink to={link}>PROFILE</NavLink>
        </div>
    )
}