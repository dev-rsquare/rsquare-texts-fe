import * as React from 'react';
import './setup';
import {render} from 'react-dom';
import {Router} from './components/router';
import {Provider} from 'react-redux';
import {store} from './modules/store';

render((
    <Provider store={store}>
        <Router/>
    </Provider>
), document.getElementById('root'));
