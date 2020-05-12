import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { routerMiddleware } from 'connected-react-router';

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const middleware = [thunk];


export default function configureStore(initialState) {
    const store = createStore(
    rootReducer(history),
    initialState, 
    compose(
    applyMiddleware(...middleware, routerMiddleware(history)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

return store
}
