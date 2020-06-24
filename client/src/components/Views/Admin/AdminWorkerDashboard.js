import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { Container, Row, Button, Col, Input } from 'react-bootstrap';
import moment from 'moment'
import styled from 'styled-components/macro';

import AuthDataService from "../../../services/AuthService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'

//styling of components with CSS-in-JS
const AdminDashboardWrapper = styled(Container)`
align-items: center;
padding: 1em 1em;
`
const ListRequest = styled.button`
padding: 4em;
background: ${props => props.theme.colors.background};
margin: 2em 1em 1em 0em;
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
text-align: center;
`
const AdminDashboardDisplay = styled.div`
align-items: center;
margin: 1em 0em ;
`
const FilterBar = styled.div`
align-items: center;
margin: 2em 1em 2em;
`

const AdminWorkerDashboard = () => {
	const state = useFmState();
	const dispatch = useFmDispatch();
	const history = useHistory();

	const [users, setUsers] = useState([])


	//lifecycle hook to retrieve latest data on component rendering
	useEffect(() => {
		getUsers();
	}, [])

	//request retrieval function declaration
	const getUsers = () => {
		AuthDataService.getWorkerList()
			.then(response => {
				setUsers(response.data)
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			})
	}

	const userPage = (_id) => {
		history.push(`/userdetail/${_id}`)
	}
	const filterUsers = () => {
		history.push(`/userdetail/`)
	}

	//returning JSX to render
	return (

		<AdminDashboardWrapper>
			<FilterBar>
				<input type='text'
					placeholder='Search for a User…'
				// onChange={ filterUsers() }
				/>
				<Button>Clear search</Button>
			</FilterBar>


			<AdminDashboardDisplay>
				{ users && users.map((user, _id) => (
					<ListRequest onClick={ () => userPage(user._id) } key={ _id } value={ user._id }  >
						<Row>
							<Col>{ user.name }
							</Col>
							<Col>{ user.email }
							</Col>
							<Col>{ user.type }
							</Col>
							<Col>{ moment(user.updatedAt).format("L LT") }
							</Col>
							<Col>{ (user.enabled) ? <span>Enabled</span> : <span>Disabled</span> }
							</Col>
						</Row>
					</ListRequest>
				)) }
			</AdminDashboardDisplay>
		</AdminDashboardWrapper>
	);
};


export default AdminWorkerDashboard;
