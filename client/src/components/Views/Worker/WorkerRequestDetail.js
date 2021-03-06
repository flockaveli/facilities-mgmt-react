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


const WorkerRequestDetail = () => {
  const context = useFmState();
  const dispatch = useFmDispatch();

  const { _id } = useParams()
  const history = useHistory()
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

  const logJob = () => {
    history.push(`/logjob/${SelectedRequest._id}`)
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
          <Row><Col>Priority:</Col><Col>{ SelectedRequest.priority }</Col>
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
        { SelectedRequest.photos[0] ? <> <Row><h4>Images</h4></Row> { SelectedRequest.photos.map((photo) => <Col><UploadedImage props={ photo } /></Col>) } </> : null }
      </Row>
      { SelectedRequest.messages[0] ? <> <Row><h4>Messages</h4></Row> { SelectedRequest.messages.map((message) => <Row><Col> <Message message={ message } key={ message } /></Col></Row>) } </> : null }

      { SelectedRequest.assignment ? <> <Row><h4>Assignment</h4></Row> <Row> <AssignmentDetails assignment={ SelectedRequest.assignment } /></Row> </> : null }

      { SelectedRequest.workerLog[0] ? SelectedRequest.workerLog.map((log) => <Row><h4>Workers Log</h4></Row> && <Row><WorkerLog message={ log } /></Row>) : null }

      <Row>

        { SelectedRequest.status === 'Assigned' && <Col>
          <Button onClick={ logJob }> Log Job </Button>
        </Col> }


      </Row>
    </Container >
  );
}

export default WorkerRequestDetail;
