import axios from 'axios';
import { GET_REQUESTS, ADD_REQUEST, GET_REQUEST, REQUESTS_LOADING } from './types';

export const getRequests = () => dispatch => {
    dispatch(setRequestsLoading());
    axios.get('/api/requests')
    .then(res=> 
        dispatch({
        type: GET_REQUESTS,
        payload: res.data
    }))
}

export const getRequest = request => {
    return {
        type: GET_REQUEST
    }
}

export const addRequest = request => dispatch => {
    axios
    .post('/api/requests/', request)
    .then(res => dispatch({
        type: ADD_REQUEST,
        payload: res.data
    })
    )  
}


export const setRequestsLoading = () => {
    return {
        type: REQUESTS_LOADING
    }
}