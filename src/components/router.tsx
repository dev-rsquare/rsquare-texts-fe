import * as React from 'react';
import {App} from './app.container';
import {HashRouter} from 'react-router-dom';

export class Router extends React.Component<null, null> {
    render() {
        return (
            <HashRouter>
                <App/>
            </HashRouter>
        );
    }
}
