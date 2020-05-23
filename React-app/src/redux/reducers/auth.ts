import {Action, ActionsType} from "../actions/auth";

export type State = {
    isAuth: boolean,
    initialized: boolean
}

const initialState: State = {
    isAuth: false,
    initialized: false
}

export const authReducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case ActionsType.SUCCESS_AUTH: {
            return {
                ...state,
                isAuth: true
            }
        }
        case ActionsType.INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case ActionsType.FAIL_AUTH:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuth: false
            }
        default:
            return state
    }
}