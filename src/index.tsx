import * as React from 'react';
import './setup';
import {render} from 'react-dom';
import {Wrapper} from './components/wrapper.container';
import {Provider} from 'react-redux';
import {store} from './modules/store';

render((
    <Provider store={store}>
        <Wrapper/>
    </Provider>
), document.getElementById('root'));
