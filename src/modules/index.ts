import {combineEpics} from 'redux-observable';
import {combineReducers} from 'redux';
import {textsEpics$, textsReducer as texts} from './texts/index';
import {authenticatorEpics$, authenticatorReducer as authenticator} from './authenticator/index';

export const epics = combineEpics(
    textsEpics$,
    authenticatorEpics$
);
export const reducer = combineReducers({
    texts,
    authenticator
});
