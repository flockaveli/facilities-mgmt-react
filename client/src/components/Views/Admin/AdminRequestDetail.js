
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'





const AdminRequestDetail = () => {
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
        dispatch({ type: 'SELECTED_REQUEST', payload: response.data });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }



  return (
    <Container fluid="lg">
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
          <Row><Col>Requested by:</Col><Col>{ SelectedRequest.requester }</Col></Row>
          <Row><Col>    Priority:</Col><Col><DropdownButton id="dropdown-basic-button" title={ SelectedRequest.priority }>
            <Dropdown.Item href="#/action-1">Low</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
            <Dropdown.Item href="#/action-3">High</Dropdown.Item>
          </DropdownButton>
          </Col></Row>
        </Col>



        {/* </Row><Row><Col></Col><Col></Col></Row>
          </Row><Row><Col></Col><Col></Col></Row> */}





        <Col>
          <p>Location: { SelectedRequest.location }</p>
        </Col>
      </Row>


      <button> <Link to={ `/assign/${SelectedRequest._id}` }>Assign</Link> </button>
      <button> <Link to={ `/moderate/${SelectedRequest._id}` }>Decline</Link> </button>

    </Container>
  );
}

export default AdminRequestDetail;
