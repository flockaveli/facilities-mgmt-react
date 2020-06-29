import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components/macro';
import { Spinner, Container, Row, Button, Col, DropdownButton, Dropdown } from 'react-bootstrap';

import Pagination from '../Shared/Pagination'
import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'

const DashboardWrapper = styled(Container)`
align-items: center;
padding: 1em 1em;
text-align: center;
margin: auto;
`
const ListRequest = styled(Button)`
background: ${props => props.theme.colors.background};
padding: 1em;
margin: 3em 3em 3em 3em;
border: 0 !important;
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
text-align: center;
margin: auto;
margin: auto;

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

const DashboardDisplay = styled.div`
margin: auto;
`

const RequesterDashboard = () => {

	const state = useFmState();
	const dispatch = useFmDispatch();
	const history = useHistory();

	const { requests, isFetching, user } = state

	//setting filter using local state
	//lifecycle hook to retrieve latest data upon component rendering
	useEffect(() => {
		getAllRequests();
	}, [user])

	//request retrieval function declaration
	const getAllRequests = () => {
		dispatch({ type: 'FETCHING' })
		RequestDataService.getMyRequests(user._id)
			.then(response => {
				dispatch({ type: 'GET_REQUESTS_SUCCESS', payload: response.data });
				console.log('response', response.data);
			})
			.catch(e => {
				console.log(e);
			})
	}

	const itemsPerPage = 4
	const [currentPage, setCurrentPage] = useState(1);

	const maxPage = Math.ceil(requests.length / itemsPerPage);
	const end = currentPage * itemsPerPage
	const begin = end - itemsPerPage;

	const currentData = requests.slice(begin, end);

	const paginate = (pageNumber) => { setCurrentPage(pageNumber) }

	const next = () => {
		setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
	}

	const prev = () => {
		setCurrentPage(Math.max(currentPage - 1, 1));
	}

	return (
		<DashboardWrapper>

			<Pagination itemsPerPage={ itemsPerPage }
				totalRequests={ requests.length }
				currentPage={ currentPage }
				paginate={ paginate }
				next={ next }
				prev={ prev }
			/>

			{ currentData && currentData.map((request) => (
				<Row>
					<ListRequest onClick={ () => history.push(`/myrequests/${request._id}`) } key={ request._id } style={ listStyle }>
						<Row>
							<Col>{ request.name }
							</Col>
							<Col>{ request.category }
							</Col>
							<Col>Last updated: { moment(request.updatedAt).format("L LT") }
							</Col>
							<Col>Status: { request.status }
							</Col>
						</Row>
					</ListRequest>
				</Row>
			))
			}
		</DashboardWrapper >
	)



}

export default RequesterDashboard;
