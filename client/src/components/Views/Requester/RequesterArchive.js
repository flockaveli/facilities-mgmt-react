import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
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
const ListRequest = styled(Container)`
background: ${props => props.theme.colors.background};

margin: 2em 1em 1em 0em;
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
`
const DashboardDisplay = styled.div`
align-items: center;
margin: 1em 0em ;
`

const RequesterArchive = () => {

	const state = useFmState();
	const dispatch = useFmDispatch();

	const { requests, isFetching, user } = state

	//setting filter using local state
	//lifecycle hook to retrieve latest data upon component rendering
	useEffect(() => {
		getAllRequests();
	}, [])

	//request retrieval function declaration
	const getAllRequests = () => {
		dispatch({ type: 'FETCHING_REQUESTS' })
		RequestDataService.getMyArchivedRequests()
			.then(response => {
				dispatch({ type: 'GET_REQUESTS_SUCCESS', payload: response.data });
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			})
	}

	if (isFetching) {
		return <Spinner animation="border" variant="primary" />
	}

	const itemsPerPage = 2
	const [currentPage, setCurrentPage] = useState(1);

	const maxPage = Math.ceil(requests.length / itemsPerPage);
	const end = currentPage * itemsPerPage
	const begin = end - itemsPerPage;

	const currentData = requests.slice(begin, end);

	const paginate = (pageNumber) => { setCurrentPage(pageNumber) }
	console.log(requests)
	console.log('current', currentData)

	const next = () => {
		setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
	}

	const prev = () => {
		setCurrentPage(Math.max(currentPage - 1, 1));
	}

	return (
		<div>
			<Pagination itemsPerPage={ itemsPerPage }
				totalRequests={ requests.length }
				currentPage={ currentPage }
				paginate={ paginate }
				next={ next }
				prev={ prev }
			/>

			{ currentData && currentData.map((request) => (
				<Row>
					<ListRequest key={ request._id }  >
						<Row>
							<Col><Link to={ `/myrequests/${request._id}` }>{ request.name }</Link>
							</Col>
							<Col>{ request.category }
							</Col>
							<Col>Last updated: { moment(request.updatedAt).format("L LT") }
							</Col>
						</Row>
					</ListRequest>
				</Row>

			)) }
		</div>
	)


}

export default RequesterArchive;
