import * as React from 'react';
import Auth0 from '../modules/auth0';
import {graphql} from 'react-apollo';
import {queries} from '../graphql/queries/index';
import {mutations} from '../graphql/mutations/index';
import {connect} from 'react-redux';

interface P {
}
interface S {
    profile: any;
}
interface Q {
    user: any;
}
interface M {
    createUser({variables: any}): Promise<any>;
}
type Props = P & Partial<Q> & Partial<M>;

@graphql(queries.user, {name: 'user', options: {fetchPolicy: 'network-only'}})
@graphql(mutations.createUser, {name: 'createUser'})
class _Login extends React.Component<Props, S> {
    auth;
    constructor(props) {
        super(props);
        this.auth = new Auth0('5DBnOwXqBPlDJUZiCJQNhT1DSMCy9lco', 'deptno.auth0.com', this.handleAuthentication.bind(this));
    }
    render() {
        const {loggedIn, getProfile, login, logout} = this.auth;
        const {nickname} = getProfile();

        return (
            <div>
                {!loggedIn()
                    ? <a onClick={login}>Click to Login</a>
                    : <a onClick={logout}>Hello, <b>{nickname}</b> Click to Logout</a>}
            </div>
        );
    }
    async handleAuthentication(idToken, profile) {
        this.setState({profile});

        if (profile) {
            try {
                const user = await this.props.user.refetch();
                if (user.data && !user.data.user) {
                    try {
                        const {nickname, picture, email: emailAddress} = profile;
                        await this.props.createUser({variables: {idToken, nickname, emailAddress, picture}});
                    } catch (ex) {
                        console.error(ex);
                    }
                }
            } catch(ex) {
                console.error(ex);
            }
        }
    }
}
export const Login = connect(s => s)(_Login);
