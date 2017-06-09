import {Action} from 'redux';

export const action = (type: string): Action => ({type});
const ERROR = 'ERROR';
export const error = action => ({type: ERROR, payload: action});
export const isError = action => action.type === ERROR;
