import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {exchangeCodeForToken} from '../modules/authenticator/index';

interface P {
    google: {
        endpoint: string;
        clientId: string;
        responseType: string;
        scope: string;
        redirectUri: string;
    },
    auth: {
        authuser: number;
        code: string;
        hd: string;
        prompt: string;
        session_state: string;
    }
}
interface D {
    exchangeCodeForToken(code: string);
}
const state2props = (state: MasterState) => ({});
const dispatch2props = dispatch => bindActionCreators({
    exchangeCodeForToken
}, dispatch);

type Props = RouteComponentProps<P>&P&D;

export const Authenticator = connect<any, any, any>(state2props, dispatch2props)(
    class extends React.Component<RouteComponentProps<P>&P&D, null> {
        constructor(props) {
            super(props);
        }
        render() {
            return null;
        }
    }
);