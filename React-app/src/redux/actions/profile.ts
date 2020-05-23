import {PostType, UserDataType} from "../../types/types";
import {Dispatch} from "redux";
import {postsAPI, profileAPI} from "../../api/api";


export enum ActionsType {
     SET_USER_DATA = "profile/SET_USER_DATA",
     ADD_POST = "profile/ADD_POST",
     TOGGLE_IS_FETCHING = 'profile/TOGGLE_IS_FETCHING',
     DELETE_POST = 'profile/DELETE_POST',
     CHANGE_STATUS = 'profile/CHANGE_STATUS',
     ADD_DELETING_POST_ID = 'profile/ADD_DELETING_POST_ID',
     REMOVE_DELETING_POST_ID = 'profile/REMOVE_DELETING_POST_ID'
}

type SetUserDataAction = {
    type: ActionsType.SET_USER_DATA,
    userData: UserDataType
}

type AddPostAction = {
    type: ActionsType.ADD_POST,
    post: PostType
}

type ToggleIsFetchingAction = {
    type: ActionsType.TOGGLE_IS_FETCHING,
    isFetching: boolean
}

type DeletePostAction = {
    type: ActionsType.DELETE_POST,
    postId: string
}

type ChangeStatusAction = {
    type: ActionsType.CHANGE_STATUS,
    status: string
}

type AddDeletingPostIdAction = {
    type: ActionsType.ADD_DELETING_POST_ID,
    id: string
}

type RemoveDeletingPostIdAction = {
    type: ActionsType.REMOVE_DELETING_POST_ID,
    id: string
}

const setUserDataAC = (userData: UserDataType):SetUserDataAction => ({type: ActionsType.SET_USER_DATA, userData})
export const addPost = (post: PostType):AddPostAction => ({type: ActionsType.ADD_POST, post})
const toggleISFetching = (isFetching: boolean):ToggleIsFetchingAction => ({
    type: ActionsType.TOGGLE_IS_FETCHING, isFetching})
const deletePostAC = (postId: string):DeletePostAction => ({type: ActionsType.DELETE_POST, postId})
const changeStatusAC = (status: string):ChangeStatusAction => ({type: ActionsType.CHANGE_STATUS, status})
export const addDeletingPostId = (id: string): AddDeletingPostIdAction => ({
    type: ActionsType.ADD_DELETING_POST_ID, id})
export const removeDeletingPostId = (id: string): RemoveDeletingPostIdAction => ({
    type: ActionsType.REMOVE_DELETING_POST_ID, id})



export const setUserData = (userId: number) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(toggleISFetching(true))

        const data = await profileAPI.getUserData(userId)
        dispatch(toggleISFetching(false))
        if(data.status === 'success') {
            let payload = data.data
            dispatch(setUserDataAC(payload))
        }

    }
}

export const deletePost = (postId: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(addDeletingPostId(postId))
        try {
            const data = await postsAPI.deletePost(postId)
            if(data.status === 'success') {
                dispatch(deletePostAC(postId))
            }
        }
        finally {
            dispatch(removeDeletingPostId(postId))
        }

    }
}


export const changeStatus = (status: string) => {
    return async (dispatch: Dispatch<Action>) => {
        const data = await profileAPI.changeStatus(status)
        if(data.status === 'success') {
            dispatch(changeStatusAC(status))
        }
    }
}

export type Action = SetUserDataAction | AddPostAction | ToggleIsFetchingAction | DeletePostAction |
    ChangeStatusAction | AddDeletingPostIdAction | RemoveDeletingPostIdAction