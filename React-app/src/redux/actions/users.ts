import {UserType} from "../../types/types";
import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";

export enum ActionsType {
    SET_USERS_DATA = 'users/SET_USERS_DATA',
    TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
}

type SetUserDataAction = {
    type: ActionsType.SET_USERS_DATA,
    users: UserType[],
    count: number
}

type ToggleIsFetchingAction = {
    type: ActionsType.TOGGLE_IS_FETCHING,
    isFetching: boolean
}

const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingAction => ({
    type: ActionsType.TOGGLE_IS_FETCHING, isFetching})
const setUsersData = (users: UserType[], count: number): SetUserDataAction => ({
    type: ActionsType.SET_USERS_DATA, users, count})

export const getUsers = (page: number) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch(toggleIsFetching(true))
        const data = await usersAPI.getUsers(page)
        console.log(data)
        dispatch(toggleIsFetching(false))
        if(data.status === 'success') {
            const payload = data.data
            dispatch(setUsersData(payload.users, payload.count))
        }
    }
}

export type Action = SetUserDataAction | ToggleIsFetchingAction