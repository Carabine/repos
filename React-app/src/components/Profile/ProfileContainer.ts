import {
    addPost,
    changeStatus,
    deletePost,
    setUserData
} from "../../redux/actions/profile";
import { Profile } from "./Profile";
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {PostType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    username: null | string,
    isFetching: boolean,
    posts: PostType[],
    role: null | 'Owner' | 'User',
    status: null | string,
    deletingPostIds: string[]
}

const mstp = ({profile:{username, isFetching, posts, role, status, deletingPostIds}}: AppStateType):MapStatePropsType => {
    return {
        username, isFetching, posts, role, status, deletingPostIds
    }
}

export default withRouter(connect(mstp, {setUserData, addPost, deletePost, changeStatus})(Profile))