import * as React from 'react';
import {App} from './app.container';
import {HashRouter, Route} from 'react-router-dom';
import {Authenticator} from './authenticator';
import {AuthRoute} from './AuthRoute';
import {Login} from './Login';

export class Router extends React.Component<null, null> {
    render() {
        return (
            <HashRouter>
                <div>
                    <AuthRoute path="/" component={App} restrict/>
                    <Route path="/login" component={Login}/>
                    <Route path="/authorized" component={Authenticator}/>
                </div>
            </HashRouter>
        );
    }
}
