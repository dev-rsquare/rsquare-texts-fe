import {combineEpics} from 'redux-observable';
import {convertModel, convertViaResponse, createIdMethodActionEpic$, pendingOkErr, sortViaResponse} from '../common/index';
import {Observable} from 'rxjs';
import {getDataSource} from '../../env';
import {MText} from '../../models/index';

const [PEND_GET_TEXTS, OK_GET_TEXTS, ERR_GET_TEXTS]       = pendingOkErr('GET_TEXTS');
const [PEND_CREATE_TEXT, OK_CREATE_TEXT, ERR_CREATE_TEXT] = pendingOkErr('CREATE_TEXT');
const [PEND_UPDATE_TEXT, OK_UPDATE_TEXT, ERR_UPDATE_TEXT] = pendingOkErr('UPDATE_TEXT');
const [PEND_DELETE_TEXT, OK_DELETE_TEXT, ERR_DELETE_TEXT] = pendingOkErr('DELETE_TEXT');
const [PEND_DEPLOY_JSON, OK_DEPLOY_JSON, ERR_DEPLOY_JSON] = pendingOkErr('DEPLOY_JSON');
const [CREATE_INTL, CREATED_INTL]                         = ['CREATE_INTL', 'CREATED_INTL'];
const [CAN_UPDATE, RESET_CAN_UPDATE]                      = ['CAN_UPDATE', 'RESET_CAN_UPDATE'];

export const convertTextModel    = convertModel(MText);
const convertTextModelViaRespons = convertViaResponse(convertTextModel);
const sortViaUpdatedAt           = sortViaResponse('updatedAt');

const canUpdate         = () => ({type: CAN_UPDATE});
const resetCanUpdate    = () => ({type: RESET_CAN_UPDATE});

export const getTexts   = () => ({type: PEND_GET_TEXTS});
export const createText = (id, text) => ({type: PEND_CREATE_TEXT, payload: {id, text}});
export const updateText = (id, text) => ({type: PEND_UPDATE_TEXT, payload: {id, text}});
export const deleteText = (id) => ({type: PEND_DELETE_TEXT, payload: {id}});
export const deployJson = () => ({type: PEND_DEPLOY_JSON});

const GQL_ALL_TEXTS = 'GQL_ALL_TEXTS';
const gqlAllTexts$ = (action$, store) =>
    action$
        .ofType(GQL_ALL_TEXTS)
        .map(sortViaUpdatedAt)
        .map(convertTextModelViaRespons)
        .mergeMap(payload => [
            {type: OK_GET_TEXTS, payload: payload.response},
            {type: CREATE_INTL, payload: payload.response}
        ])
        .catch(_ => ERR_GET_TEXTS);
const texts$      = (action$, store) =>
    action$
        .ofType(PEND_GET_TEXTS)
        .flatMap(_ => Observable.ajax(getDataSource()))
        .map(sortViaUpdatedAt)
        .map(convertTextModelViaRespons)
        .mergeMap(payload => [
            {type: OK_GET_TEXTS, payload: payload.response},
            {type: CREATE_INTL, payload: payload.response}
        ])
        .catch(_ => ERR_GET_TEXTS);
const intl$       = (action$, store) =>
    action$
        .ofType(CREATE_INTL)
        .map(response =>
            response.payload.items.reduce((result, curr) => {
                result[curr.getTextId()] = curr.getText();
                return result;
            }, {}))
        .map(payload => ({type: CREATED_INTL, payload}));
const createText$ = createIdMethodActionEpic$({
    method:      'post',
    pending:     PEND_CREATE_TEXT,
    ok:          OK_CREATE_TEXT,
    err:         ERR_CREATE_TEXT,
    nextActions: [getTexts(), canUpdate()]
});
const updateText$ = createIdMethodActionEpic$({
    method:      'put',
    pending:     PEND_UPDATE_TEXT,
    ok:          OK_UPDATE_TEXT,
    err:         ERR_UPDATE_TEXT,
    nextActions: [getTexts(), canUpdate()]
});
const deleteText$ = createIdMethodActionEpic$({
    method:      'delete',
    pending:     PEND_DELETE_TEXT,
    ok:          OK_DELETE_TEXT,
    err:         ERR_DELETE_TEXT,
    nextActions: [getTexts(), canUpdate()]
});
const deployJson$ = (action$, store) =>
    action$
        .ofType(PEND_DEPLOY_JSON)
        .flatMap(_ => Observable.ajax.post([getDataSource(), 'json'].join('/')))
        .mergeMap(_ => [
            {type: OK_DEPLOY_JSON},
            resetCanUpdate(),
        ])
        .catch(_ => ({type: ERR_DEPLOY_JSON}));

export const textsEpics$  = combineEpics(
    texts$,
    intl$,
    createText$,
    updateText$,
    deleteText$,
    deployJson$
);
export const textsReducer = (state = {fetching: 0}, action) => {
    switch (action.type) {
        case OK_GET_TEXTS:
            return {...state, ...action.payload, fetching: --state.fetching};
        case OK_CREATE_TEXT:
            return {...state, ...action.payload, fetching: --state.fetching};
        case OK_DELETE_TEXT:
            return {...state, fetching: --state.fetching};
        case OK_UPDATE_TEXT:
            return {...state, fetching: --state.fetching};
        case CREATED_INTL:
            return {...state, messages: action.payload};
        case CAN_UPDATE:
            return {...state, canUpdate: true};
        case RESET_CAN_UPDATE:
            return {...state, canUpdate: false};

        case PEND_GET_TEXTS:
        case PEND_CREATE_TEXT:
        case PEND_UPDATE_TEXT:
        case PEND_DELETE_TEXT:
            return {...state, fetching: ++state.fetching};
        case ERR_GET_TEXTS:
        case ERR_CREATE_TEXT:
        case ERR_UPDATE_TEXT:
        case ERR_DELETE_TEXT:
            return {...state, fetching: --state.fetching};
        default:
            return state;
    }
};

