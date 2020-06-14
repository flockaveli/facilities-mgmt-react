import React, { useEffect } from "react";
import RequestDataService from "../../../services/RequestService";
import { Link } from 'react-router-dom'
import { useFmState, useFmDispatch } from '../../../services/fm-context'


const WorkerDashboard = () => {

    const state = useFmState();
    const dispatch = useFmDispatch();
    const { requests } = state

    useEffect(() => {
        getAllRequests();
    }, [])

    const getAllRequests = () => {
        RequestDataService.getAll()
            .then(response => {
                dispatch({ type: 'GET_REQUESTS_SUCCESS', payload: response.data });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }



    return (
        <>


            <ul className={ "RequesterDashboardDisplay" }>
                { requests && requests.map((request, _id) => (
                    <li className={ "list-group-item" } key={ _id }  ><span className='listRequestDisplay'>
                        <button> <Link to={ `/requests/${request._id}` }>{ request.name }</Link> </button> <button> { request.category }</button> <button>{ request.priority } </button> <button>{ request.status }</button> <button> Updated: { request.updatedAt } </button> </span> </li>
                )) }
            </ul>
        </>
    );
};

export default WorkerDashboard;
