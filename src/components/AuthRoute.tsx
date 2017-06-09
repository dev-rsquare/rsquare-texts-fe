import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {PATH_LOGIN} from '../constants/path';
import {RouteProps} from 'react-router';
import {connect} from 'react-redux';

interface PageRestrcition {
    restrict?: boolean;
}
type AuthRouteProps = RouteProps & PageRestrcition & AuthState;

const state2props = (state: RootState) => state.auth;

export const AuthRoute = connect(state2props)(
    (props: AuthRouteProps) => {
        const {restrict, token, component} = props;
        if (restrict) {
            if (!token) {
                return <Redirect to={PATH_LOGIN}/>;
            }
        }
        return <Route {...props} component={component}/>;
    }
);
