import * as React from 'react';
import {App} from './app.container';
import {HashRouter, Route} from 'react-router-dom';
import {Authenticator} from './authenticator';

export class Router extends React.Component<null, null> {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/" component={Authenticator}/>
                    <Route path="/" component={App}/>
                </div>
            </HashRouter>
        );
    }
}
