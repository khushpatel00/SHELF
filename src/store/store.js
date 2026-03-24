import { applyMiddleware, compose, createStore } from 'redux';
import { libReducer } from '../Reducers/libReducer';
import { thunk } from 'redux-thunk';

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    libReducer,
    composeEnhancers(applyMiddleware(thunk))
);