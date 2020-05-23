import {Action, ActionsType} from "../actions/profile";
import {PostType} from "../../types/types";

export type State = {
    username: null | string,
    isFetching: boolean,
    posts: PostType[],
    role: null | 'Owner' | 'User',
    status: null | string,
    deletingPostIds: string[]
}

const initialState: State = {
    username: null,
    isFetching: true,
    posts: [],
    role: null,
    status: null,
    deletingPostIds: []
}

export const profileReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case ActionsType.SET_USER_DATA:
            return {
                ...state,
                ...action.userData
            }
        case ActionsType.ADD_POST:
            console.log(action.post)
            return {
                ...state,
                posts: [action.post, ...state.posts]
            }
        case ActionsType.DELETE_POST:
            console.log(state.posts)
            return {
                ...state,
                posts: state.posts.filter(p => p._id != action.postId)
            }
        case ActionsType.TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case ActionsType.CHANGE_STATUS:
            return {
                ...state,
                status: action.status
            }
        case ActionsType.ADD_DELETING_POST_ID:
            return {
                ...state,
                deletingPostIds: [...state.deletingPostIds, action.id]
            }
        case ActionsType.REMOVE_DELETING_POST_ID:
            return {
                ...state,
                deletingPostIds: state.deletingPostIds.filter(id => id != action.id)
            }
        default:
            return {
                ...state
            }
    }
}