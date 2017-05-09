import * as React from 'react';
import './setup';
import {render} from 'react-dom';
import {Wrapper} from './components/wrapper.container';
import {ApolloProvider} from 'react-apollo';
import {store} from './modules/store';
import {client} from './modules/apollo-client';

render((
    <ApolloProvider client={client} store={store}>
        <Wrapper/>
    </ApolloProvider>
), document.getElementById('root'));
