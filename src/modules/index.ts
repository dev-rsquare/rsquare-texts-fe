import {combineEpics} from 'redux-observable';
import {combineReducers} from 'redux';
import {textsEpics$, textsReducer as texts} from './texts/index';
import {authEpics$, authReducer as auth} from './auth/index';

export const epics = combineEpics(
    textsEpics$,
    authEpics$
);
export const reducer = combineReducers({
    auth,
    texts
});
