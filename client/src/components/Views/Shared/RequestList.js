import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Button, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import moment from 'moment'
import RequestDataService from "../../../services/RequestService";
import { hasType, useFmState, useFmDispatch } from '../../../services/fm-context'
import Pagination from './Pagination.js'

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
const ListRequest = styled(Button)`
background: ${props => props.theme.colors.background};
margin: 2em 1em 1em 0em;
padding: 0.5em;
border-radius: 30px !important;
border: 0 !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
text-align: center;

justify-content: space-evenly;
`
const RequestListContainer = styled.div`
margin: auto;
vertical-align: center;
justify-content: space-evenly;
`
const CategoryMark = styled.div`
background-color: ${props => getColor(props)};
margin: 1em;
height: 1.5em;
width: 1.5em;
border-radius: 50%;
`
const PriorityTag = styled.div`
background-color: darkred;
padding: 1em;
color: white;
border-radius: 30px;
margin: 2.5em 0em 0em 0em;
font-weight: bold; 
text-align: center;
`
const RequestList = ({ requests, isFetching }) => {

    if (isFetching) {
        return <Spinner animation="border" variant="primary" />
    }

    const state = useFmState()

    const { user } = state

    const history = useHistory()
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

    const detailPage = (_id) => {
        { hasType(user, ['Admin']) && history.push(`/requests/${_id}`) }
        { hasType(user, ['Worker']) && history.push(`/assignedrequests/${_id}`) }
        { hasType(user, ['Requester']) && history.push(`/myrequests/${_id}`) }
    }

    return (
        <>
            <Row>

                <RequestListContainer>
                    <Pagination itemsPerPage={ itemsPerPage }
                        totalRequests={ requests.length }
                        currentPage={ currentPage }
                        paginate={ paginate }
                        next={ next }
                        prev={ prev }
                    />
                </RequestListContainer>

            </Row>

            { currentData && currentData.map((request) => (

                <Row>
                    <Col>
                        <ListRequest key={ request._id } onClick={ () => { detailPage(request._id) } } >
                            <Row>
                                <Col><CategoryMark category={ request.category } /></Col>
                                <Col> { request.name }
                                </Col>
                                <Col>{ request.category }
                                </Col>
                                { request.requester && <Col> { request.requester.name }
                                </Col> }
                                <Col>{ moment(request.updatedAt).format("L LT") }
                                </Col>
                                <Col>{ request.status }
                                </Col>
                            </Row>
                        </ListRequest>
                    </Col>
                    <Col xs={ 2 }>
                        { request.priority === "High" ? <PriorityTag>High</PriorityTag> : null }
                    </Col>
                </Row>

            ))
            }
        </>
    )
}

export default RequestList