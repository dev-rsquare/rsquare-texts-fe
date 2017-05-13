import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {getDataSource} from '../env';

const networkInterface = createNetworkInterface({uri: getDataSource()});
networkInterface.use([{
    applyMiddleware (req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        if (localStorage.getItem('id_token')) {
            req.options.headers.authorization = `Bearer ${localStorage.getItem('id_token')}`;
        }
        next();
    }
}]);

export const client = new ApolloClient({networkInterface});
