import { connect } from 'react-redux'
import {failAuth} from "../../redux/actions/auth"
import Header from './Header'
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = ({auth:{isAuth}}: AppStateType):MapStateToPropsType => {
    return {
        isAuth
    }
}

export default connect(mapStateToProps, {logout: failAuth})(Header)
