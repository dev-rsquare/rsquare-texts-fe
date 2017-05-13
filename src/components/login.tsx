import * as React from 'react';
import {RouterProps} from 'react-router';

interface P extends RouterProps {
    auth: any;
}
export class Login extends React.Component<P, any> {
    render() {
        const {loggedIn, getProfile, login, logout} = this.props.auth;
        const {nickname} = getProfile();

        return (
            <div>
                {!loggedIn()
                    ? <a onClick={login}>Click to Login</a>
                    : <a onClick={logout}>Hello, <b>{nickname}</b> Click to Logout</a>}
            </div>
        );
    }
}