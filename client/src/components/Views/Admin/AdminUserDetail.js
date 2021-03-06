
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import RequestList from '../Shared/RequestList'

import AuthDataService from "../../../services/AuthService";
import RequestDataService from "../../../services/RequestService";

import { useFmState, useFmDispatch } from '../../../services/fm-context'


const AdminUserDetail = () => {
  const context = useFmState();
  const dispatch = useFmDispatch();
  const history = useHistory();

  let { _id } = useParams()
  const { SelectedUser, requests, isFetching } = context


  useEffect(() => {
    getUserDetail(_id)
    getThisUsersRequests(_id)
  }, [])

  const getUserDetail = _id => {
    dispatch({ type: 'FETCHING' })
    AuthDataService.getUser(_id)
      .then(response => {
        dispatch({ type: 'SELECTED_USER', payload: response.data });
      })
      .catch(e => {
        console.log(e);
      })
  }

  const getThisUsersRequests = _id => {

    dispatch({ type: 'FETCHING' })
    RequestDataService.getMyRequests(_id)
      .then(response => {
        dispatch({ type: 'GET_REQUESTS_SUCCESS', payload: response.data });
      })
      .catch(e => {
        console.log(e);
      })
  }

  const changeUserType = (e) => {
    AuthDataService.changeUserType(SelectedUser._id, { type: e.target.value })
    getUserDetail(SelectedUser._id)
  }

  const ableUser = (e) => {
    AuthDataService.updateUser(SelectedUser._id, { enabled: e.target.checked });
    getUserDetail(SelectedUser._id)
  }

  const back = () => {
    history.goBack()
  }

  return (
    <Container fluid="lg">

      <Row><Button onClick={ back }>Back</Button></Row>
      <Row>
        <Col sm={ 7 }>
          <h1>{ SelectedUser.name }</h1>
        </Col>
        <Col sm={ 3 }><p>Created: { SelectedUser.createdAt }</p>
          <p>Last Updated: { SelectedUser.updatedAt }</p>
        </Col>
      </Row>

      <Row>
        <Col><h4>{ SelectedUser.name }</h4></Col>
      </Row>
      <Row>
        <Col>
          <Row><Col>Type:</Col><Col> <Form.Control as="select" onChange={ changeUserType } value={ SelectedUser.type }>
            <option value={ 'Requester' }>Requester</option>
            <option value={ 'Admin' }>Admin</option>
            <option value={ 'Worker' }>Worker</option>
          </Form.Control></Col></Row>
          <Row><Col>Status:</Col><Col><Form>
            <Form.Check type="switch"
              onChange={ ableUser }
              checked={ SelectedUser.enabled }
              label="Allow Requests"
              id="disabled-custom-switch" /></Form> </Col></Row>
        </Col>
      </Row>


      <RequestList requests={ requests } isFetching={ isFetching } />

    </Container>
  );
}

export default AdminUserDetail;
