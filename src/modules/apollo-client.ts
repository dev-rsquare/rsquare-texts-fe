import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {getDataSource} from '../env';

export const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: getDataSource()
    }),
});


