import {Observable} from 'rxjs/Observable';
import {getDataSource} from '../../env';
import {ActionsObservable} from 'redux-observable';
import {Action} from 'redux';
import {OperationOption} from "react-apollo/lib/graphql";

const PREFIX = {PENDING: 'PENDING', OK: 'OK', ERR: 'ERR'};

export const pendingOkErr = actionName => ([
    [PREFIX.PENDING, actionName].join('_'),
    [PREFIX.OK, actionName].join('_'),
    [PREFIX.ERR, actionName].join('_')
]);
interface CreateIdMethodActionEpic$Args {
    method: 'get'|'post'|'put'|'delete';
    pending: string;
    ok: string;
    err: string;
    nextActions?: Action[];
}

export const responseToModel    = (options: OperationOption, model) => {
    const prop = options.name;
    if (!prop) {
        throw new Error('options must have name property');
    }
    const converter = convertModel(model);
    options.props = props => {
        const data = props[prop][prop];
        if (data) {
            props[prop].data = data.map(converter);
        }
        return props;
    };
    return options;
};
export const convertModel       = model => item => new model(item);
export const convertViaResponse = converter =>
    payload$ => {
        payload$.response.items = payload$.response.items.map(converter);
        return payload$;
    };
export const sortViaResponse = property => payload$ => {
    payload$.response.items.sort((prev, curr) => curr[property] - prev[property]);
    return payload$;
};

export const createIdMethodActionEpic$ = ({method, pending, ok, err, nextActions = []}: CreateIdMethodActionEpic$Args) =>
    (action$: ActionsObservable<any>, store): Observable<any> =>
        action$
            .ofType(pending)
            .flatMap(({payload: {id, ...rest}}) => Observable.ajax({
                method,
                url : [getDataSource(), id].join('/'),
                body: JSON.stringify(rest)
            }))
            .mergeMap(payload => [{type: ok, payload: payload.response}, ...nextActions])
            .catch(_ => err);

