import Auth0Lock from 'auth0-lock'

export default class Auth0 {
    private lock;
    constructor(clientId, domain, onAuthentication) {
        this.lock = new Auth0Lock(clientId, domain, {
            auth: {
                redirectUrl: 'http://localhost:3000/#/auth',
                responseType: 'token'
            }
        });
        this.lock.on('authenticated', this._doAuthentication.bind(this, onAuthentication));
        this.login = this.login.bind(this);
        this.getToken = this.getToken.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
        this.logout = this.logout.bind(this, onAuthentication);
    }

    _doAuthentication(listener, {idToken}) {
        this.setToken(idToken);
        this.lock.getProfile(idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error);
            } else {
                this.setProfile(profile);
            }
            listener(idToken, profile);
        });
    }

    login() {
        this.lock.show();
    }

    loggedIn() {
        return !!this.getToken();
    }

    setToken(idToken) {
        // Saves user token to local storage
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        // Retrieves the user token from local storage
        return localStorage.getItem('id_token');
    }

    setProfile(profile) {
        // Saves profile data to local storage
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    getProfile() {
        // Retrieves the profile data from local storage
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {};
    }

    logout(listener) {
        // Clear user token and profile data from local storage
        localStorage.removeItem('id_token');
        listener();
    }
}
