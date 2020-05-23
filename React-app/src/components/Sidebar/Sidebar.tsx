import React, {FC} from 'react'
import {NavLink} from "react-router-dom";

type PropsType = {
    isModal: boolean,
    setIsModalOpen?: (isOpen: boolean) => void
}

const Sidebar:FC<PropsType> = ({isModal, setIsModalOpen}) => {

    const toggleModal = () => {
        if(isModal) {
            setIsModalOpen(false)
        }
    }

    return (
        <div className={'sidebar'}>
            <NavLink to={'/profile'} onClick={toggleModal}> Profile </NavLink>
            <NavLink to={'/users'} onClick={toggleModal}> Users </NavLink>
            <NavLink to={'/friends'} onClick={toggleModal}> Friends </NavLink>
            <NavLink to={'/messages'} onClick={toggleModal}> Messages </NavLink>
        </div>
    )
}

export default Sidebar