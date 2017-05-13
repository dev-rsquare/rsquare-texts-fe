import * as React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Wrapper} from "../components/wrapper.container";
import {Login} from '../components/login';
import Auth0 from '../modules/auth0';

const auth = new Auth0('5DBnOwXqBPlDJUZiCJQNhT1DSMCy9lco', 'deptno.auth0.com');

export const Routes = props => {
    return (
        <Router>
            <div>
                <Route path="/login" children={_ => <Login auth={auth}/>}/>
                <Route path="/" component={Wrapper as any}/>
            </div>
        </Router>
    )
};
