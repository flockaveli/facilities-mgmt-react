import { combineReducers } from 'redux';
import requestReducer from './requestReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { connectRouter } from 'connected-react-router';

import { history } from '../store' ;

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    request: requestReducer,
    auth: authReducer,
    error: errorReducer
});

export default rootReducer;