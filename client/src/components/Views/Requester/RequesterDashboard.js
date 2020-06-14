import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components/macro';
import { Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';


import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'

const AdminDashboardWrapper = styled(Container)`
align-items: center;
padding: 1em 1em;
`
const ListRequest = styled(Container)`
background: ${props => props.theme.colors.background};

margin: 2em 1em 1em 0em;
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
`
const AdminDashboardDisplay = styled.div`
align-items: center;
margin: 1em 0em ;
`

const RequesterDashboard = () => {

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

		<AdminDashboardWrapper>
			<h4>Active Requests</h4>
			{
				requests && requests.map((request, _id) => (
					<ListRequest className={ "list-group-item" } key={ _id }  >
						<Row>
							<Col><Link to={ `/users/${request._id}` } className="request-link">{ request.name }</Link>
							</Col>
							<Col>{ request.category }
							</Col>
							<Col>{ request.priority }
							</Col>
							<Col>{ moment(request.updatedAt).format("L LT") }
							</Col>
							<Col>{ request.status }
							</Col>
						</Row>
					</ListRequest>
				))
			}

			<h4>Past Requests</h4>
			{
				requests && requests.map((request, _id) => (
					<ListRequest className={ "list-group-item" } key={ _id }  >
						<Row>
							<Col><Link to={ `/users/${request._id}` } className="request-link">{ request.name }</Link>
							</Col>
							<Col>{ request.category }
							</Col>
							<Col>{ request.priority }
							</Col>
							<Col>{ moment(request.updatedAt).format("L LT") }
							</Col>
							<Col>{ request.status }
							</Col>
						</Row>
					</ListRequest>
				))
			}

		</AdminDashboardWrapper>
	);
};

export default RequesterDashboard;
