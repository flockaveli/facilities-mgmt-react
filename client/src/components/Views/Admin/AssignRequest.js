import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, DropdownButton, Dropdown, Form, FormCheck, Button } from 'react-bootstrap';
import styled from 'styled-components/macro';


import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context';


const TeamWorker = styled(Container)`
padding: 0.2em;
border: 0px;
border-radius: 30px;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
`

const AssignRequest = () => {
    const context = useFmState()
    const dispatch = useFmDispatch()
    const { SelectedRequest, categories } = context


    useEffect(() => {
        getWorkerDetails()
    }, [])

    const assignRequest = () => {
        RequestDataService.update(SelectedRequest._id, SelectedRequest)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const getWorkerDetails = () => {
        RequestDataService.getCategoryCount()
            .then(response => {
                dispatch({ type: 'GET_CATEGORIES', payload: response.data });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div>
            <Button>Back</Button>
            <h4>{ SelectedRequest.category } Team</h4>
            <Form>
                { categories && categories.map((category, _id) => (<Row>
                    <Col>
                        <TeamWorker key={ _id }> <Link to={ `/category/${category._id.category}` } > { category._id.category } <p>{ category.count } Active Requests</p></Link>   </TeamWorker>
                    </Col>
                    <Col><Form.Check type={ 'checkbox' } label={ '' } /></Col></Row>
                )) }
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button type="submit">Assign</Button>
            </Form>

        </div>

    )
}

export default AssignRequest