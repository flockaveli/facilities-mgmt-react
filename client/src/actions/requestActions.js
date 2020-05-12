import axios from 'axios';
import { GET_REQUESTS, ADD_REQUEST, GET_REQUEST, REQUESTS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { push } from 'connected-react-router';

export const getRequests = () => dispatch => {
    dispatch(push('/'), setRequestsLoading());
    axios.get('/api/requests')
    .then(res=> 
        dispatch({
        type: GET_REQUESTS,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const getRequest = _id => dispatch => {
    axios.get(`/api/requests/${_id}`)
    .then(res=> 
        dispatch({
        type: GET_REQUEST,
        payload: res.data,
        
    }
    ))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const addRequest = request => (dispatch, getState) => {
    
    axios
    .post('/api/requests/', request, tokenConfig(getState))
    .then(res => dispatch({
        type: ADD_REQUEST,
        payload: res.data
    }),
    dispatch(push('/'))
    )  .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
    )
}


export const setRequestsLoading = () => {
    return {
        type: REQUESTS_LOADING
    }
}