import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

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
      <Row><Button onClick={ back() } >Back </Button>
      </Row>
      <Row>
        <Col sm={ 7 }>
          <h1>{ SelectedRequest.name }</h1>
        </Col>
        <Col sm={ 3 }><p>Submitted: { SelectedRequest.createdAt }</p>
          <p>Last update: { SelectedRequest.updatedAt }</p>
        </Col>
      </Row>
      <Row>
        <Col><h4>{ SelectedRequest.description }</h4></Col>
      </Row>
      <Row>
        <Col>
          <Row><Col>Category:</Col><Col> { SelectedRequest.category }</Col></Row>
          <Row><Col>Status:</Col><Col> { SelectedRequest.status }</Col></Row>
          <Row><Col>Requested by:</Col><Col>{ SelectedRequest.requester.name }</Col></Row>
          <Row><Col>Priority:</Col><Col><Form.Control as="select" id="dro" title='priority' onChange={ changePriority } value={ SelectedRequest.priority } >
            <option value={ '-' }>-</option>
            <option value={ "Low" }>Low</option>
            <option value={ "Medium" }>Medium</option>
            <option value={ "High" }>High</option>
          </Form.Control></Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row><Col>Location: </Col> <Col>{ SelectedRequest.location.building }</Col> </Row>
          <Row><Col> { SelectedRequest.location.building === 'Exterior' && <LocationView lat={ SelectedRequest.location.lat } lng={ SelectedRequest.location.lng } /> } </Col> </Row>
        </Col>
      </Row>


      <Row>
        { SelectedRequest.photos && SelectedRequest.photos.map((photo) => <Col><UploadedImage props={ photo } /></Col>) }
      </Row>

      { SelectedRequest.messages && SelectedRequest.messages.map((message) => <Row><Col> <Message message={ message } key={ message } /></Col></Row>) }

      <Row>
        { SelectedRequest.assignment.assignmentMessage && <Row><AssignmentDetails message={ SelectedRequest.assignment } /></Row> }
      </Row>
      <Row>
        { SelectedRequest.workerLog.message && <h4>Workers Log</h4> && <Row><WorkerLog message={ SelectedRequest.workerLog } /></Row> }
      </Row>

      <Row><Col>
        <Button onClick={ respond() }> Respond To Requester </Button>
      </Col>
        <Col>
          <Button onClick={ assign() } > Assign </Button></Col>
        <Col><Button onClick={ closeRequest() }> Decline </Button></Col>
      </Row>
    </Container >
  );
}

export default AdminRequestDetail;
