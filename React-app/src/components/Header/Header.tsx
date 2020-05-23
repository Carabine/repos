import React, {FC, useState} from 'react'
import { NavLink } from 'react-router-dom'
import {IconButton} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Sidebar/Sidebar";

type PropsType = {
	isAuth: boolean,
	logout: () => void
}

const Header:FC<PropsType> = ({isAuth, logout}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	if (!isAuth) {
		return <div className={'header-wrapper'}>
			<div className={'header'}>
				<NavLink to="/signup"> Sign Up </NavLink>
				<NavLink to="/login"> Login </NavLink>
			</div>
		</div>
	} else {
		return <div className={'header-wrapper'}>
			<div className={'header'}>
				<IconButton className={'nav-toggle'} onClick={() => setIsModalOpen(true)} edge="start" color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Drawer
					open={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				>
					<Sidebar isModal={true} setIsModalOpen={setIsModalOpen} />
				</Drawer>
				<a onClick={logout}> Logout </a>
			</div>
		</div>
	}
	
}

export default Header