import {authAPI} from "../../api/api";
import {Dispatch} from "redux";

export enum ActionsType {
    SUCCESS_AUTH = 'auth/SUCCESS-AUTH',
    FAIL_AUTH = 'auth/FAIL-AUTH',
    INITIALIZE_SUCCESS = 'auth/INITIALIZE-SUCCESS'
}

type SuccessAuthAction = {
    type: ActionsType.SUCCESS_AUTH
}

type FailAuthAction = {
    type: ActionsType.FAIL_AUTH
}

type InitializeSuccessAction = {
    type: ActionsType.INITIALIZE_SUCCESS
}

export const successAuth = ():SuccessAuthAction => ({type: ActionsType.SUCCESS_AUTH})
export const failAuth = ():FailAuthAction => ({type: ActionsType.FAIL_AUTH})
export const initializeSuccess = ():InitializeSuccessAction => ({type: ActionsType.INITIALIZE_SUCCESS})

export const auth = () => {
    return async (dispatch: Dispatch<Action>) => {
        const data = await authAPI.auth()
        console.log(data)
        if(data.status === 'success') {
            dispatch(successAuth())
        } else {
            dispatch(failAuth())
        }
        dispatch(initializeSuccess())
    }
}

export type Action = SuccessAuthAction | FailAuthAction | InitializeSuccessAction