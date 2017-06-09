import {compose, createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {reducer, epics} from './index';
import {persistStore, autoRehydrate} from 'redux-persist';

const dev = true;

const composeEnhancers = (dev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducer,
    composeEnhancers(
        compose(
            applyMiddleware(createEpicMiddleware(epics)),
            autoRehydrate()
        )
    )
);

if (!dev) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
}

export const afterRehydrate = new Promise(resolve =>
    persistStore(store, {whitelist: ['authenticator']}, resolve)
);
