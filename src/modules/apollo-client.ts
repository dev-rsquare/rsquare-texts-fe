import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {getDataSource} from '../env';

const networkInterface = createNetworkInterface({uri: getDataSource()});

export const client = new ApolloClient({
    networkInterface
});


