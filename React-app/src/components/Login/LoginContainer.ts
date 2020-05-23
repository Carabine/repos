import {connect} from 'react-redux'
import {successAuth} from "../../redux/actions/auth"
import Login from './Login'
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = ({auth: {isAuth}}:AppStateType):MapStateToPropsType => {
    return {
        isAuth
    }
}

export default connect(mapStateToProps, {successAuth})(Login)
