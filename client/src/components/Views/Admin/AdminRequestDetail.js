import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context';

import Message from '../Shared/Message'
import AssignmentDetails from '../Shared/AssignmentDetails';
import WorkerLog from '../Shared/WorkerLog';

import LocationView from '../Shared/LocationView';
import UploadedImage from '../Shared/UploadedImage'


const AdminRequestDetail = () => {
  const context = useFmState();
  const dispatch = useFmDispatch();

  const history = useHistory()

  const { _id } = useParams()
  const { SelectedRequest } = context

  useEffect(() => {
    getRequestDetail(_id)
  }, [])

  const getRequestDetail = _id => {
    RequestDataService.getDetail(_id)
      .then(response => {
        dispatch({ type: 'SELECTED_REQUEST', payload: response.data });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  const changePriority = (e) => {
    RequestDataService.changePriority(SelectedRequest._id, { priority: e.target.value })
  }
  const closeRequest = () => {
    RequestDataService.closeRequest(SelectedRequest._id)
    history.goBack()
  }
  const assign = () => {
    history.push(`/assign/${SelectedRequest._id}`)
  }
  const respond = () => {
    history.push(`/respond/${SelectedRequest._id}`)
  }
  const back = () => {
    history.goBack()
  }

  return (
    <Container>
      <Row><Button onClick={ back } >Back </Button>
      </Row>
      <Row>
        <Col sm={ 7 }>
          <h1>{ SelectedRequest.name }</h1>
        </Col>
        <Col sm={ 3 }><Row>Submitted: { SelectedRequest.createdAt }</Row><Row>
          Last update: { SelectedRequest.updatedAt }</Row>
        </Col>
      </Row>



      <Row>
        <Col>{ SelectedRequest.description }</Col>
        <Col>
          <Row><Col>Category:</Col><Col> { SelectedRequest.category }</Col></Row>
          <Row><Col>Status:</Col><Col> { SelectedRequest.status }</Col></Row>
          <Row><Col>Requested by:</Col><Col>{ SelectedRequest.requester.name }</Col>
            { SelectedRequest.status === 'New' && <Col> <Button onClick={ respond }> Message </Button></Col> }</Row>
          <Row><Col>Priority:</Col><Col><Form.Control as="select" id="dro" title='priority' onChange={ changePriority } value={ SelectedRequest.priority } >
            <option value={ '-' }>-</option>
            <option value={ "Low" }>Low</option>
            <option value={ "Medium" }>Medium</option>
            <option value={ "High" }>High</option>
          </Form.Control></Col>
          </Row>

          <Row>
            <Col>
              { SelectedRequest.location && SelectedRequest.location.building === 'Exterior' && <Row><Col> <LocationView lat={ SelectedRequest.location.lat } lng={ SelectedRequest.location.lng } />  </Col> </Row> || <Row><Col>Location: </Col> <Col>{ SelectedRequest.location.building }</Col> </Row>
              }
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        { SelectedRequest.photos[0] ? <> <Row><h4>Images</h4></Row> { SelectedRequest.photos.map((photo) => <Col><UploadedImage props={ photo } /></Col>) } </> : null }
      </Row>
      { SelectedRequest.messages[0] ? <> <Row><h4>Messages</h4></Row> { SelectedRequest.messages.map((message) => <Row><Col> <Message message={ message } key={ message } /></Col></Row>) } </> : null }

      { SelectedRequest.assignment ? <> <Row><h4>Assignment</h4></Row> <Row> <AssignmentDetails assignment={ SelectedRequest.assignment } /></Row> </> : null }

      { SelectedRequest.workerLog[0] ? SelectedRequest.workerLog.map((log) => <Row><h4>Workers Log</h4></Row> && <Row><WorkerLog message={ log } /></Row>) : null }


      <Row>

        { SelectedRequest.status === 'New' && <Col>
          <Button onClick={ assign } > Assign </Button></Col> }
        { SelectedRequest.status !== 'Assigned' &&
          <Col><Button onClick={ closeRequest }> Decline </Button></Col> }
        { SelectedRequest.status === 'Pending Review' &&
          <Col><Button onClick={ closeRequest }> Mark as completed </Button></Col> }
        { SelectedRequest.status === 'Unresolved' &&
          <Col><Button onClick={ closeRequest }> Archive Request </Button></Col> }
      </Row>
    </Container >
  );
}

export default AdminRequestDetail;
