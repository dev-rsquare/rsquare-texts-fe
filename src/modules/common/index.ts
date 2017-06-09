import {Observable} from 'rxjs/Observable';
import {getDataSource} from '../../env';
import {ActionsObservable} from 'redux-observable';
import {Action, Store} from 'redux';

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
export const convertModel = model => item => new model(item);
export const convertViaResponse = converter => payload$ => {
    payload$.response.items = payload$.response.items.map(converter);
    return payload$;
};
export const sortViaResponse = property => payload$ => {
    payload$.response.items.sort((prev, curr) => curr[property] - prev[property]);
    return payload$;
};

export const createIdMethodActionEpic$ = ({method, pending, ok, err, nextActions = []}: CreateIdMethodActionEpic$Args) =>
    (action$: ActionsObservable<any>, store: Store<RootState>): Observable<any> => {

        return action$
            .ofType(pending)
            .flatMap(({payload: {url, id, ...rest}}) => {
             const state = store.getState();
                const token = state.auth.token;
                if (!token) {
                    //todo
                    console.log('no token');
                }
                return Observable.ajax({
                    method,
                    headers: {
                        Authorization: token
                    },
                    url : url || [getDataSource(), id].join('/'),
                    body: JSON.stringify(rest)

                })
            })
            .mergeMap(payload => [{type: ok, payload: payload.response}, ...nextActions])
            .catch(_ => err);
    };
