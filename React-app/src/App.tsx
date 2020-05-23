import React, {FC, useEffect} from "react";
import "./style.scss";
import { Route } from "react-router-dom";
import SignUpContainer from "./components/SignUp/SignUpContainer";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { auth } from "./redux/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import UsersContainer from "./components/Users/UsersContainer";
import {Preloader} from "./components/Common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";

type PropsType = {
    isAuth: boolean,
    initialized: boolean,
    auth: () => void
}

const App:FC<PropsType> = ({isAuth, initialized, auth}) => {

    useEffect(() => {
        auth()
    },[])

    if(!initialized) {
        return <div className="App initializing">
            <Preloader />
        </div>
    } else {
        if(!isAuth) {
            return <div className="App auth-page">
                        <HeaderContainer />
                        <div className="content-wrapper">
                            <Route exact path="/" render={() => <Redirect to="/login" />} />
                            <Route path="/signup" render={() => <SignUpContainer />} />
                            <Route path="/login" render={() => <LoginContainer />} />
                            <Route path="/profile/:id?" render={() => <Redirect to="/login" />} />
                            <Route path="/users/:id?" render={() => <Redirect to="/login" />} />
                            <Route path="/messages" render={() => <Redirect to="/login" />} />
                            <Route path="/friends" render={() => <Redirect to="/login" />} />
                        </div>
                    </div>
        }

        return <div className="App">
                    <HeaderContainer />
                    <div className={'content-wrapper'}>
                        <Sidebar isModal={false}/>
                        <div className="content">
                            <Route exact path="/" render={() => <ProfileContainer />} />
                            <Route path="/signup" render={() => <Redirect to="/profile" />} />
                            <Route path="/login" render={() => <Redirect to="/profile" />} />
                            <Route path="/profile/:id?" render={() => <ProfileContainer />} />
                            <Route path="/users/:page?" render={() => <UsersContainer />} />
                        </div>
                    </div>
                </div>
    }
};

type MSTPType = {
    isAuth: boolean,
    initialized: boolean
}

const mstp = ({auth:{isAuth, initialized}}: AppStateType):MSTPType => ({isAuth, initialized})
const mdtp = (dispatch: any) => ({auth: () => dispatch(auth())})

export const AppContainer = connect(mstp, mdtp)(App);
