import React, {useLayoutEffect, useState, FC, useEffect} from 'react';
import ProfileForm from "./ProfileForm";
import {Post} from "./Post";
import {Preloader} from "../Common/Preloader/Preloader";
import {Field, Form, Formik} from "formik";
import {renderInput} from "../../utils/formControls/formControls";
import Button from "@material-ui/core/Button";
import {PostType} from "../../types/types";

type PropsType = {
	deletePost: (id: string) => void,
	match: any,
	setUserData: (userId: number) => void,
	addPost: (post: PostType) => void,
	changeStatus: (status: string) => void,
	username: null | string,
	isFetching: boolean,
	posts: PostType[],
	role: null | 'Owner' | 'User',
	status: null | string,
	deletingPostIds: string[]
}

export const Profile: FC<PropsType> = ({posts, deletingPostIds, deletePost, role, username, match, setUserData,
	status, addPost, changeStatus, isFetching}) => {
	const [statusEditMode, setStatusEditMode] = useState(false)

	const JSXposts = posts.map((p: { _id: any; postBody: any; }) => <Post deletingPostIds={deletingPostIds} deletePost={deletePost} role={role} key={p._id} id={p._id}
																		  author={username} postBody={p.postBody} />)

	const [screenWidth, setScreenWidth] = useState(window.screen.width)

	useLayoutEffect(() => {
		setUserData(match.params.id)
	}, [match.params.id])

	useEffect(() => {
		window.addEventListener('resize', () => setScreenWidth(window.screen.width))
	}, [])

	console.log(window.screen.width)
	if(isFetching) {
		return <Preloader />
	}

	const profileData = () => {
		return <div className="profile-data">
			<div className="profile-name">
				{username}

			</div>

			{role === 'Owner' &&
			<div onClick={() => setStatusEditMode(true)} className="profile-status">
				{statusEditMode &&
				<Formik onSubmit={(values) => {
					console.log('submit')
					changeStatus(values.status)
					setStatusEditMode(false)
				}} initialValues={{status: status ? status : ''}} >
					<Form>
						<Field placeholder={"Status"} name={"status"} component={renderInput} />
						<Button className={'clickable'} type={"submit"}> {'SAVE'} </Button>
					</Form>
				</Formik>
				}

				{statusEditMode === false &&
				<p className={'clickable'}>{status ? status : 'Type status'}</p>
				}
			</div>
			}
			{!(role === 'Owner') &&
			<div className="profile-status">
				{status}
			</div>
			}
		</div>
	}

	return (
		<div className={'profile-wrapper'}>
			<div className="first-column">
				<div className="ava-bg">
					<div className="ava" style={{background: 'url("https://www.iconninja.com/files/980/515/831/warrior-ninja-avatar-samurai-icon.svg")'}} />
				</div>
				{screenWidth < 601 && profileData()}
			</div>
			<div className="second-column">
				{screenWidth >= 601 && profileData()}

				{role === 'Owner' && <ProfileForm addPost={addPost} />}
				<div className={'posts'}>
					{JSXposts.length ? JSXposts : <p className={'no-posts'}>No posts</p>}
				</div>
			</div>
		</div>
	)
}