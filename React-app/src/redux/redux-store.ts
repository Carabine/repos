import {combineReducers, createStore} from "redux";
import {authReducer} from "./reducers/auth";
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware } from "redux"
import { profileReducer } from "./reducers/profile";
import {usersReducer} from "./reducers/users";

const reducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer
})

type ReducersType = typeof reducers
export type AppStateType = ReturnType<ReducersType>

const store = createStore(reducers, applyMiddleware(thunkMiddleware))


export default store