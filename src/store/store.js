import { createStore } from 'redux'
import { libReducer } from '../Reducers/libReducer'

export const store = createStore(libReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())