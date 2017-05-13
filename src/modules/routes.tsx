import * as React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Wrapper} from "../components/wrapper.container";
import {Login} from '../components/login';
import Auth0 from '../modules/auth0';
import {graphql} from 'react-apollo';
import {queries} from '../graphql/queries/index';
import {mutations} from '../graphql/mutations/index';

interface S {
    profile: any;
}

@graphql(queries.user, {name: 'user', options: {fetchPolicy: 'network-only'}})
@graphql(mutations.createUser, {name: 'createUser'})
export class Routes extends React.Component<any, S> {
    auth;
    constructor(props) {
        super(props);
        this.auth = new Auth0('5DBnOwXqBPlDJUZiCJQNhT1DSMCy9lco', 'deptno.auth0.com', this.handleAuthentication.bind(this));
    }
    render() {
        return(
            <Router>
                <div>
                    <Route path="/" component={props => <Login auth={this.auth} {...props}/>}/>
                    <Route path="/" component={Wrapper as any}/>
                </div>
            </Router>
        );
    }
    async handleAuthentication(idToken, profile) {
        this.setState({profile});

        if (profile) {
            //todo: query & createUser
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
