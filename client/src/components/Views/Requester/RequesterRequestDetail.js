
import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap";
import style from "styled-components/macro";
import RequestDataService from "../../../services/RequestService"
import { useFmState, useFmDispatch } from '../../../services/fm-context'

import LocationView from '../Shared/LocationView'
import UploadedImage from '../Shared/UploadedImage'
import Message from '../Shared/Message'


const RequesterRequestDetail = () => {
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


  const addMessage = () => {
    history.push(`/addmessage/${SelectedRequest._id}`)
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

        { (SelectedRequest.status === 'New' || SelectedRequest.status === 'Awaiting Info') && <Col><Button onClick={ addMessage } > Add Info </Button></Col> }
      </Row>
    </Container >
  );
}



export default RequesterRequestDetail;
