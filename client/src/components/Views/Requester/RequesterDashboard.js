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
`
const ListRequest = styled.div`
background: ${props => props.theme.colors.background};
padding: 1em;
margin: 2em 1em 1em 0em;
border: 0;
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
`
const DashboardDisplay = styled.div`
align-items: center;
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

	const itemsPerPage = 2
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
					<ListRequest key={ request._id }>
						<Row>
							<Col><Button onClick={ () => history.push(`/myrequests/${request._id}`) } >{ request.name }</Button>
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
