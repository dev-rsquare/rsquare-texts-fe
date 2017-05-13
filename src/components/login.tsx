import * as React from 'react';

interface P {
    auth: any;
}
export class Login extends React.Component<P, any> {
    render() {
        const {login, logout, loggedIn} = this.props.auth;
        return (
            <div>
                {!loggedIn()
                    ? <a onClick={login}>Click to Login</a>
                    : <a onClick={logout}>Click to Logout</a>}
            </div>
        );
    }
}