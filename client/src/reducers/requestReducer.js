import {v1 as uuid} from 'uuid';
import { GET_REQUESTS, ADD_REQUEST, GET_REQUEST, REQUESTS_LOADING } from '../actions/types'

const initialState = {
    requests: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_REQUESTS:
            return {
                ...state,
                requests: action.payload,
                loading: false
            }
        case ADD_REQUEST:
            return {
                ...state,
                requests: [action.payload, ...state.requests]
            }
        case REQUESTS_LOADING:
            return {
                ...state,
                loading: true
            }
            default:
                return state;
    }
}

