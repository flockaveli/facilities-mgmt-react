import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Container, Row, Button, Col, Form, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import styled from 'styled-components/macro';

import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'
import RequestList from "../Shared/RequestList";
import FmFilter from "../Shared/Filters";

const getColor = (props) => {
	if (props.category === 'Security') {
		return '#FFA500';
	}
	if (props.category === 'Cleaning & Waste') {
		return '#00BFFF';
	}
	if (props.category === 'Signage') {
		return '#3CB371';
	}
	if (props.category === 'Building Maintenance') {
		return '#FF5733';
	}
	if (props.category === 'Exterior') {
		return '#8B008B';
	}
	return '#eeeeee';
}

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
const CategoryButtonWrapper = styled(Container)`
padding: 0.2em;
border: 0px;
border-radius: 30px;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
`
const CategoryButton = styled(Button)`
font-family: sans-serif;
color: black;
border: 0px;
font-size: 1em;
margin: 1em;
background: transparent;
padding: 0em 1em 0em 1em;

`

const CategoryMark = styled.div`
background-color: ${props => getColor(props)};
height: 1em;
width: 1em;
border-radius: 50%;
`
const PriorityTag = styled.div`
background-color: darkred;
padding: 1em;
`


// const REQUEST_FILTERS = {
// 	// [SHOW_ALL]: () => true,
// 	// [SHOW_ACTIVE]: request => request.category
// 	// [SHOW_COMPLETED]: todo => todo.completed
// }

//   const { filter } = this.state

//   const filteredRequests = requests.filter(REQUEST_FILTERS[filter])


//functional component declaration
const AdminDashboard = () => {
	const state = useFmState();
	const dispatch = useFmDispatch();
	const { categories, requests, isFetching } = state

	//filter functions
	const [searchTerm, setSearchTerm] = useState('');
	const [filterCategory, setFilterCategory] = useState(null);
	const [filterPriority, setFilterPriority] = useState(null);
	const [filterStatus, setFilterStatus] = useState(null);

	const searchInput = event => {
		setSearchTerm(event.target.value);
	};
	const categorySelect = (category) => {
		setFilterCategory(category);
	};
	const priorityInput = event => {
		setFilterPriority(event.target.value);
	};
	const statusInput = event => {
		setFilterStatus(event.target.value);
	};
	const clearFilters = () => {
		setFilterStatus('');
		setFilterCategory('');
		setFilterPriority('');
		setSearchTerm('');
	};

	const statusdropdown = [{ "value": 'New', "display": 'New' }, { "value": 'Awaiting Requester', "display": 'Awaiting Requester' }, { "value": 'Delayed', "display": 'Delayed' }, { "value": 'Assigned', "display": 'Assigned' }, { "value": 'Closed', "display": 'Closed' }]
	const prioritydropdown = [{ "value": "Low", "display": "Low" }, { "value": "Medium", "display": "Medium" }, { "value": "High", "display": "High" }]

	//setting filter using local state
	//lifecycle hook to retrieve latest data upon component rendering
	useEffect(() => {
		getAllRequests();
		getCategoryDetails()
	}, [])
	//request retrieval function declaration
	const getAllRequests = () => {
		dispatch({ type: 'FETCHING' })
		RequestDataService.getAll()
			.then(response => {
				dispatch({ type: 'GET_REQUESTS_SUCCESS', payload: response.data });
			})
			.catch(e => {
				console.log(e);
			})
	}
	//category stats retrieval function declaration
	const getCategoryDetails = () => {
		RequestDataService.getCategoryCount()
			.then(response => {
				dispatch({ type: 'GET_CATEGORIES', payload: response.data });
			})
			.catch(e => {
				console.log(e);
			})
	}

	//returning JSX to render
	return (
		<AdminDashboardWrapper>
			<CategoryButtonWrapper>
				<Row>
					{ categories && categories.map((category, _id) => (
						<Col>
							<CategoryButton key={ _id } onClick={ () => setFilterCategory(category._id.category) }> <Row><CategoryMark category={ category._id.category } /></Row><Row> { category._id.category } </Row><Row>{ category.count } Active Requests</Row></CategoryButton>
						</Col>
					)) }
				</Row>
			</CategoryButtonWrapper>
			<FilterBar>
				<Row>
					<Col>
						<Form>
							<Form.Row>
								<Col>
									<Form.Group >
										<Form.Label>Keyword Search</Form.Label>
										<Form.Control type='text'
											value={ searchTerm }
											className='center-block'
											placeholder='Filter here…'
											onChange={ searchInput }
										/>
									</Form.Group>
								</Col><Col>
									<Form.Group controlId="createRequestFormCategory">
										<Form.Label>Priority</Form.Label>
										<Form.Control as="select"
											name="priorityFilterSelect"
											value={ filterPriority }
											onChange={ priorityInput }	>
											<option selected key={ 0 } value={ '' }>-</option>
											{ prioritydropdown.map((category) => <option key={ category.value } value={ category.value }>{ category.display }</option>) }
										</Form.Control>
									</Form.Group>
								</Col><Col>
									<Form.Group controlId="createRequestFormCategory">
										<Form.Label >Status</Form.Label>
										<Form.Control as="select"
											name="statusFilterInput"
											value={ filterStatus }
											onChange={ statusInput } >
											<option selected key={ 0 } value={ '' }>-</option>
											{ statusdropdown.map((category) => <option key={ category.value } value={ category.value }>{ category.display }</option>) }
										</Form.Control>
									</Form.Group>
								</Col>
								<Col>
									<Button onClick={ clearFilters }>clear filters</Button>
								</Col>
							</Form.Row>
						</Form>
					</Col>
				</Row>
			</FilterBar>


			<AdminDashboardDisplay>
				< FmFilter
					requests={ requests }
					isFetching={ isFetching }
					searchTerm={ searchTerm }
					filterCategory={ filterCategory }
					filterPriority={ filterPriority }
					filterStatus={ filterStatus }
				/>
			</AdminDashboardDisplay>
		</AdminDashboardWrapper>
	);
};


export default AdminDashboard;
