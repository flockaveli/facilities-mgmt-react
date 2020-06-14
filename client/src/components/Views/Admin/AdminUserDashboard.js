import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import moment from 'moment'
import styled from 'styled-components/macro';

import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'

//styling of components with CSS-in-JS
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
const FilterBar = styled.div`
align-items: center;
margin: 2em 1em 2em;
`

const AdminDashboard = () => {
	const state = useFmState();
	const dispatch = useFmDispatch();
	const { requests, categories } = state


	const statusdropdown = [{ "value": 'New', "display": 'New' }, { "value": 'Awaiting Requester', "display": 'Awaiting Requester' }, { "value": 'Delayed', "display": 'Delayed' }, { "value": 'Assigned', "display": 'Assigned' }, { "value": 'Closed', "display": 'Closed' }]
	const prioritydropdown = [{ "value": "Low", "display": "Low" }, { "value": "Medium", "display": "Medium" }, { "value": "High", "display": "High" }]

	//setting filter using local state

	//lifecycle hook to retrieve latest data on component rendering
	useEffect(() => {
		getAllRequests();
		getCategoryDetails()
	}, [])
	//request retrieval function declaration
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
	//category/stats retrieval function declaration
	const getCategoryDetails = () => {
		RequestDataService.getCategoryCount()
			.then(response => {
				dispatch({ type: 'GET_CATEGORIES', payload: response.data });
			})
			.catch(e => {
				console.log(e);
			})
	}

	// const filterRequests = (e) => {
	// 	updatedList = requests.filter((item => {
	// 		return item.toLowerCase().search(
	// 			e.target.value.toLowerCase()) !== -1;
	// 	}));
	// 	setState({
	// 		todos: updatedList,
	// 	});
	// 	if (updatedList == 0) {
	// 		this.setState({
	// 			message: true,
	// 		});
	// 	} else {
	// 		// this.setState({ 
	// 		// message: false,
	// 		// });


	// 	}
	// }

	//returning JSX to render
	return (

		<AdminDashboardWrapper>


			<FilterBar>
				<input type='text'
					className='center-block'
					placeholder='Filter here…'
				// onChange={ filterRequests() }
				/>
				<input type='text'
					className='center-block'
					placeholder='Filter here…'
				// onChange={ filterRequests() }
				/>
				<input type='text'
					className='center-block'
					placeholder='Filter here…'
				// onChange={ filterRequests() }
				/>
				<button>clear filter</button>
			</FilterBar>


			<AdminDashboardDisplay>
				{ requests && requests.map((request, _id) => (
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
				)) }
			</AdminDashboardDisplay>
		</AdminDashboardWrapper>
	);
};


export default AdminDashboard;
