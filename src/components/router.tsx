import * as React from 'react';
import * as qs from 'querystring';
import {App} from './app.container';
import {HashRouter, Route} from 'react-router-dom';
import {Authenticator} from './authenticator';

export class Router extends React.Component<null, null> {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/" component={App}/>
                    <Route path="/authorized" render={({location}) => {
                        const search = qs.parse(location.search.slice(1));
                        return <Authenticator auth={search}/>
                    }}/>
                </div>
            </HashRouter>
        );
    }
}
