import {combineEpics} from 'redux-observable';
import {createIdMethodActionEpic$, pendingOkErr} from '../common/index';

const [PEND_OAUTH_GOOGLE_CODE, OK_OAUTH_GOOGLE_CODE, ERR_OAUTH_GOOGLE_CODE] = pendingOkErr('OAUTH_GOOGLE_CODE');
const [PEND_EXCHANGE_CODE_FOR_TOKEN, OK_EXCHANGE_CODE_FOR_TOKEN, ERR_EXCHANGE_CODE_FOR_TOKEN] = pendingOkErr('EXCHANGE_CODE_FOR_TOKEN');

export const oAuthGoogleCode      = (url: string) => ({type: PEND_OAUTH_GOOGLE_CODE, payload: {url}});
export const exchangeCodeForToken = (code: string) => ({type: PEND_OAUTH_GOOGLE_CODE, payload: {
    url: `http://jwt.rsquare.co.kr/exchange?code=${code}`
}});

const oAuthGoogleCode$      = createIdMethodActionEpic$({
    method:      'get',
    pending:     PEND_OAUTH_GOOGLE_CODE,
    ok:          OK_OAUTH_GOOGLE_CODE,
    err:         ERR_OAUTH_GOOGLE_CODE,
    nextActions: []
});
const exchangeCodeForToken$  = createIdMethodActionEpic$({
    method:      'get',
    pending:     PEND_EXCHANGE_CODE_FOR_TOKEN,
    ok:          OK_EXCHANGE_CODE_FOR_TOKEN,
    err:         ERR_EXCHANGE_CODE_FOR_TOKEN,
    nextActions: []
});

export const authenticatorEpics$  = combineEpics(
    oAuthGoogleCode$,
    exchangeCodeForToken$
);
export const authenticatorReducer = (state = {fetching: 0}, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case OK_OAUTH_GOOGLE_CODE:
        case ERR_OAUTH_GOOGLE_CODE:
        default:
            return state;
    }
};
