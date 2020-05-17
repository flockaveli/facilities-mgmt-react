
import React, { useState, useEffect } from 'react';
import RequestDataService from "../services/RequestService";

const RequestDetail = props => {
  const initialRequestState = {
    _id: null,
    name: "",
    description: "",
    requester: "",
    category: "",
    priority: "",
    status: "",
  }

  const [currentRequest, setCurrentRequest] = useState(initialRequestState)
  const [message, setMessage] = useState("")

  const getRequestDetail = _id => {
    RequestDataService.get(_id)
      .then(response => {
        setCurrentRequest(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(() => {
    getRequestDetail(props.match.params._id)
  }, [props.match.params._id])

  return (

    <div className={ "requestDetailWrapper" }>
      <h1>{ currentRequest.name }</h1>
      <div class="requestDetailCard">
        <h4>Category: { currentRequest.category }</h4>
        <h4>Requested by: { currentRequest.requester }</h4>
        <p>Location: { currentRequest.location }</p>
        <p>Priority: { currentRequest.priority }</p>
        <p>Status: { currentRequest.status }</p>
        <p><h4>{ currentRequest.description }</h4></p>
        <p>Submitted: { currentRequest.createdAt }</p>
        <p>Last update: { currentRequest.updatedAt }</p>
      </div>

    </div>
  );
}

export default RequestDetail;
