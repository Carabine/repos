import { connect } from "react-redux";
import {successAuth} from "../../redux/actions/auth";
import SignUp from "./SignUp";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
  isAuth: boolean
}

const mapStateToProps = ({auth:{isAuth}}: AppStateType):MapStatePropsType => {
  return {
    isAuth
  }
}


export default connect(mapStateToProps, {successAuth})(SignUp)
