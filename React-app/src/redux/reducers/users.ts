import {UserType} from "../../types/types";
import {Action, ActionsType} from "../actions/users";

type State = {
    isFetching: boolean,
    users: UserType[],
    count: null | number
}

const initialState: State = {
    isFetching: false,
    users: [],
    count: null
}

export const usersReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionsType.TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case ActionsType.SET_USERS_DATA:
            return {
                ...state,
                users: action.users,
                count: action.count
            }
        default:
            return {
                ...state
            }
    }
}