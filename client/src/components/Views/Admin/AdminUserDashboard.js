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
background: ${props => props.theme.colors.background};

padding: 1.25em;
border-radius: 30px !important;
margin: auto;
margin-top: 2em;
width: auto;
border: 0 !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
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
	justifyContent: '',
	width: 'auto'
}



const AdminUserDashboard = () => {
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
		AuthDataService.getUserList()
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

			{ users && users.map((user, _id) => (<Row>
				<ListRequest style={ listStyle } onClick={ () => userPage(user._id) } key={ _id } value={ user._id }  >
					<Row >
						<Col style={ nameStyle }>{ user.name }
						</Col>
						<Col style={ nameStyle }>{ user.email }
						</Col>
						<Col style={ emailStyle }>{ user.type }
						</Col>
						<Col style={ emailStyle }>{ (user.enabled) ? <span>Enabled</span> : <span>Disabled</span> }
						</Col>
					</Row>
				</ListRequest>
			</Row>
			)) }
		</AdminDashboardWrapper>
	);
};


export default AdminUserDashboard;
