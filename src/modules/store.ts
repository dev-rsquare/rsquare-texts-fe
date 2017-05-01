import {compose, createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {reducer, epics} from './index';

const dev = true;

const composeEnhancers = (dev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(createEpicMiddleware(epics)))
);

if (!dev) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
}
