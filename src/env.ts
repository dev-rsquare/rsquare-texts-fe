import * as packageInfo from '../package.json';
import {parse} from 'querystring';

const API_URL = packageInfo.texts.endpoint;
export const getDataSource = () => {
    const search = location.search.slice(1);
    const {endpoint} = parse(search);
    return endpoint || API_URL;
};
