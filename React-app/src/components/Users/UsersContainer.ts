import {getUsers} from "../../redux/actions/users";
import {Users} from "./Users";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../types/types";

type MapStatePropsType = {
    isFetching: boolean,
    users: UserType[],
    count: number
}

const mstp = ({users: {isFetching, users, count}}:AppStateType): MapStatePropsType => {
    return {
        isFetching, users, count
    }
}


export default withRouter(connect(mstp, {getUsers})(Users))