import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import * as qs from 'querystring';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {oAuthGoogleCode} from '../modules/authenticator/index';

interface P {
    google: {
        endpoint: string;
        clientId: string;
        responseType: string;
        scope: string;
        redirectUri: string;
    }
}
interface D {
    getOAuthGoogleCode(url: string);
}
const state2props = (state: MasterState) => ({});
const dispatch2props = dispatch => bindActionCreators({
    oAuthGoogleCode
}, dispatch);

type Props = RouteComponentProps<P>&P&D;

export const SignInWithGoogle = connect<any, any, any>(state2props, dispatch2props)(
    class extends React.Component<RouteComponentProps<P>&P&D, null> {
        static defaultProps = {
            google: {
                endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
                clientId: '252948504186-pkv75tpmam750310tkepo9h43rhqsuaa.apps.googleusercontent.com',
                responseType: 'code',
                scope: 'openid email profile',
                redirectUri: 'https://jwt.rsquare.co.kr/app/texts'
            }
        };

        constructor(props) {
            super(props);
        }
        render() {
            return <button onClick={() => this.signInGoogle()}>sign in with google</button>
        }
        signInGoogle() {
            const {endpoint, scope, clientId, responseType, redirectUri} = this.props.google;
            const param = qs.stringify({
                scope,
                client_id: clientId,
                response_type: responseType,
                redirect_uri: redirectUri
            });
            // location.href = [endpoint, param].join('?');
            location.href = 'https://jwt.rsquare.co.kr/app/texts';
            // this.props.getOAuthGoogleCode([endpoint, param].join('?'));
            // https://e829203a.ngrok.io/authorized?code=4/ibDuh-VP-3oRx4Xjod8u4UfRMpBcuiP0W3NtpEinsFw&authuser=2&hd=rsquare.co.kr&session_state=382f60df6c1792af393e1873e2cb456b0903c777..2bfb&prompt=consent#/
        }
    }
);