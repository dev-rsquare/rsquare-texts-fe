import * as React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Wrapper} from "../components/wrapper.container";
import {Login} from '../components/login';
import {connect} from 'react-redux';

export const Routes = connect(s => s)(
    class extends React.Component<any, any> {
        render() {
            return(
                <Router>
                    <div>
                        <Route path="/" component={Login as any}/>
                        <Route path="/" component={Wrapper as any}/>
                    </div>
                </Router>
            );
        }
    }
);
