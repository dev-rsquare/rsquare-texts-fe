import {combineEpics} from 'redux-observable';
import {combineReducers} from 'redux';
import {textsEpics$, textsReducer as texts} from './texts/index';

export const epics = combineEpics(
    textsEpics$
);
export const reducer = combineReducers({
    texts
});
