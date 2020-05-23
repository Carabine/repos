import React, {FC, useEffect} from "react";
import {User} from "./User";
import {NavLink} from "react-router-dom";
import {Preloader} from "../Common/Preloader/Preloader";
import {UserType} from "../../types/types";

type PropsType = {
    isFetching: boolean,
    users: UserType[],
    count: number,
    getUsers: (page: number) => void,
    match: any
}

export const Users:FC<PropsType> = ({isFetching, users, count, getUsers, match}) => {
    useEffect(() => {
        getUsers(match.params.page)
    },[match.params.page])
    const usersList = users.map((u: UserType) => <User username={u.username} key={u.id} userId={u.id} />)
    const navLinks = []
    const currentPage = match.params.page === undefined ? 1 : match.params.page
    for(let i = 1; i <= Math.ceil(count / 9); i++) {
        const isActive = currentPage === i ? 'active' : ''
        navLinks.push(<NavLink className={'navigator-item ' + isActive} key={i} to={'/users/' + i}>{i}</NavLink>)
    }

    if(isFetching) {
        return <Preloader />
    }
    return (
        <div className={'users-page'}>
            <div className="navigator">
                {navLinks}
            </div>
            <div className={'users-wrapper'}>
                {usersList}
            </div>
            <div className="navigator">
                {navLinks}
            </div>
        </div>
    )
}
