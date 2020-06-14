
import React, {  useEffect } from 'react';
import RequestDataService from "../../../services/RequestService";
import {Link, useParams} from "react-router-dom";
import { useFmState, useFmDispatch } from '../../../services/fm-context'


const WorkerRequestDetail = () => {
  const context = useFmState();
  const dispatch = useFmDispatch();

  let { _id } = useParams()
const { SelectedRequest } = context
  
  useEffect(() => {
    getRequestDetail(_id)
  }, [])

  const getRequestDetail = _id => {
    RequestDataService.get(_id)
      .then(response => {
        dispatch({ type: 'SelectedRequest', payload: response.data});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  

  return (

    <div className={ "requestDetailWrapper" }>
      <h1>{ SelectedRequest.name }</h1>
      <div className="requestDetailCard">
        <h4>Category: { SelectedRequest.category }</h4>
        <h4>Requested by: { SelectedRequest.requester }</h4>
        <p>Location: { SelectedRequest.location }</p>
        <p>Priority: { SelectedRequest.priority }</p>
        <p>Status: { SelectedRequest.status }</p>
        <h4>{ SelectedRequest.description }</h4>
        <p>Submitted: { SelectedRequest.createdAt }</p>
        <p>Last update: { SelectedRequest.updatedAt }</p>
        <button> <Link to={`/moderate/${SelectedRequest._id}`}>Edit</Link> </button>
        <button> <Link to={`/assign/${SelectedRequest._id}`}>Assign</Link> </button>
        <button> <Link to={`/assign/${SelectedRequest._id}`}>Decline</Link> </button>
        <button> <Link to={`/assign/${SelectedRequest._id}`}>Respond</Link> </button>
      </div>

    </div>
  );
}

export default WorkerRequestDetail;
