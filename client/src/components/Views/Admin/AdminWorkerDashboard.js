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
height: 100;
background: ${props => props.theme.colors.background};
margin: auto;
`
const ListRequest = styled.button`
padding: 1.5em;
background: ${props => props.theme.colors.background};
margin: auto;
margin-top: 2em;
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
align-items: center;
border: 0 !important;
width: 'auto';
`
const AdminDashboardDisplay = styled.div`
align-items: center;
`
const FilterBar = styled.div`
align-items: center;
margin: 2em 1em 2em;
`

const nameStyle = {
	flex: 6,
	width: 'auto'
}
const emailStyle = {
	flex: 4,
	width: 'auto'
}
const listStyle = {
	width: '-webkit-fill-available'
}

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
				<Row style={ listStyle }>
					<input type='text'
						placeholder='Search for a User…'
					/>
					<Button>Clear search</Button>
				</Row>
			</FilterBar>


			<AdminDashboardDisplay>
				{ users && users.map((user, _id) => (
					<ListRequest style={ listStyle } onClick={ () => userPage(user._id) } key={ _id } value={ user._id }  >
						<Row>
							<Col style={ nameStyle }>{ user.name }
							</Col >
							<Col style={ nameStyle }>{ user.email }
							</Col>
							<Col style={ emailStyle }>{ user.type }
							</Col>
							<Col style={ emailStyle }>{ moment(user.updatedAt).format("L LT") }
							</Col>
							<Col style={ emailStyle }>{ (user.enabled) ? <span>Enabled</span> : <span>Disabled</span> }
							</Col>
						</Row>
					</ListRequest>
				)) }
			</AdminDashboardDisplay>
		</AdminDashboardWrapper>
	);
};


export default AdminWorkerDashboard;
