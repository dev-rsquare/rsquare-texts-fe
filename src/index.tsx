import * as React from 'react';
import './setup';
import {render} from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import {store} from './modules/store';
import {client} from './modules/apollo-client';
import {Routes} from './modules/routes';

render((
    <ApolloProvider client={client} store={store}>
        <Routes/>
    </ApolloProvider>
), document.getElementById('root'));
