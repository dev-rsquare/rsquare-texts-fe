import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {decodeToken, saveToken} from '../modules/auth/index';
import * as qs from 'querystring';
import {isError} from '../modules/common';

interface StateProps extends AuthState {
}
interface Props {
}
interface DispatchProps {
    decodeToken(token: string);
    saveToken(token: string, payload);
}
const state2props = (state: RootState): AuthState => {
    return state.auth;
};
const dispatch2props = dispatch => bindActionCreators({
    decodeToken,
    saveToken
}, dispatch);

type AuthenticatorProps = RouteComponentProps<any> & StateProps & DispatchProps & Props;

export const Authenticator = connect<StateProps, DispatchProps, Props>(state2props, dispatch2props)(
    class extends React.Component<AuthenticatorProps, undefined> {
        render() {
            return null;
        }
        componentDidMount() {
            const {token} = qs.parse(this.props.location.search.slice(1));
            const result = this.props.decodeToken(token);
            if (!isError(result)) {
                this.props.saveToken(token, result.payload);
            }
        }
        componentWillReceiveProps(props) {
            if ((this.props.token !== props.token) && props.token) {
                this.props.history.push('/');
            }
        }
    }
);