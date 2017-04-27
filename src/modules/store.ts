import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './index';

declare var dev;

const composeEnhancers = dev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || {};

export const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

if (dev) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
}
