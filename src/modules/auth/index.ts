import {combineEpics} from 'redux-observable';
import {error} from '../common';
import * as decode from 'jwt-decode';

const DECODE_ID_TOKEN = 'DECODE_ID_TOKEN';
const SAVE_ID_TOKEN   = 'SAVE_ID_TOKEN';

export const decodeToken = (token: string) => {
    try {
        const payload = decode(token);
        if (!payload) {
            throw 'invalid token';
        }
        return {type: DECODE_ID_TOKEN, payload};
    } catch (ex) {
        return error(DECODE_ID_TOKEN);
    }
};
export const saveToken = (payload: DecodedToken) => {
    return {type: SAVE_ID_TOKEN, payload};
};

export const authEpics$ = combineEpics(
);
export const authReducer       = (state: AuthState = {} as AuthState, action) => {
    switch (action.type) {
        case SAVE_ID_TOKEN: {
            return {...state, token: action.payload};
        }
        default:
            return state;
    }
};