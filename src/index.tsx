import * as React from 'react';
import './setup';
import {render} from 'react-dom';
import {Router} from './components/router';
import {Provider} from 'react-redux';
import {store, afterRehydrate} from './modules/store';

afterRehydrate.then(_ => {
    render((
        <Provider store={store}>
            <Router/>
        </Provider>
    ), document.getElementById('root'))
});
