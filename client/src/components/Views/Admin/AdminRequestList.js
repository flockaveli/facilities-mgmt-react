import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import moment from 'moment'
import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'
import Pagination from '../Shared/Pagination.js'

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
const ListRequest = styled(Container)`
background: ${props => props.theme.colors.background};
margin: 2em 1em 1em 0em;
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
`
const CategoryMark = styled.div`
background-color: ${props => getColor(props)};
padding: 1em;
`
const PriorityTag = styled.div`
background-color: darkred;
padding: 1em;
`
const RequestList = ({ requests, isFetching }) => {

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
                <>
                    <Row>
                        <Col>
                            <ListRequest key={ request._id }  >
                                <Row>
                                    <Col><CategoryMark category={ request.category } /></Col>
                                    <Col><Link to={ `/requests/${request._id}` } className="request-link">{ request.name }</Link>
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
                        </Col>
                        <Col xs={ 2 }>
                            { (request.priority === 'High') && <PriorityTag /> }
                        </Col>
                    </Row>
                </>
            )) }
        </div>
    )
}

export default RequestList