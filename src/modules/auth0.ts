import Auth0Lock from 'auth0-lock'

export default class Auth0 {
    private lock;
    constructor(clientId, domain) {
        this.lock = new Auth0Lock(clientId, domain, {
            auth: {
                redirectUrl: 'http://localhost:3000',
                responseType: 'token'
            }
        });
        this.lock.on('authenticated', this._doAuthentication.bind(this));
        this.login = this.login.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
    }

    _doAuthentication(authResult) {
        this.setToken(authResult.idToken)
        //todo: redirect
        // browserHistory.replace('/home')
    }

    login() {
        this.lock.show()
    }

    loggedIn() {
        return !!this.getToken()
    }

    setToken(idToken) {
        // Saves user token to local storage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from local storage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from local storage
        localStorage.removeItem('id_token');
    }
}
