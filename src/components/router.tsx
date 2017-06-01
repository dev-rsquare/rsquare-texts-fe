import * as React from 'react';
import * as qs from 'querystring';
import {App} from './app.container';
import {BrowserRouter, Route} from 'react-router-dom';
import {Authenticator} from './authenticator';

export class Router extends React.Component<null, null> {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={App}/>
                    <Route path="/authorized" render={({location}) => {
                        const search = qs.parse(location.search.slice(1));
                        return <Authenticator auth={search}/>
                    }}/>
                </div>
            </BrowserRouter>
        );
    }
}
