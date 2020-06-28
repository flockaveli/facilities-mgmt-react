import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Row, Col, DropdownButton, Dropdown, Form, FormCheck, Button } from 'react-bootstrap'
import styled from 'styled-components/macro'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import RequestDataService from "../../../services/RequestService";
import AuthDataService from "../../../services/AuthService";
import { useFmState, useFmDispatch } from '../../../services/fm-context';


const TeamWorker = styled(Container)`
padding: 1em;
margin: 1em;
border: 0px;
border-radius: 30px;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
`

const AssignRequest = () => {
    const context = useFmState()
    const dispatch = useFmDispatch()
    const history = useHistory()


    const { SelectedRequest } = context
    const [availableWorkers, setAvailableWorkers] = useState([])
    const [workersAssignments, setWorkersAssignments] = useState([])


    let { _id } = useParams()

    useEffect(() => {
        getRequestDetail(_id)
        getWorkerDetails()
    }, [])

    useEffect(() => {
        getWorkerAssignments()
    }, [availableWorkers])

    //iterating over the returned worker records and getting the number of requests assigned to each from db
    const getWorkerAssignments = () => {
        for (let i = 0; i < availableWorkers.length; i++) {
            RequestDataService.getWorkload(availableWorkers[i]._id)
                .then(response => {
                    //setting new array with aggregated worker info for use in frontend
                    if (response.data[0] === undefined) {
                        setWorkersAssignments(workersAssignments => [...workersAssignments, { _id: availableWorkers[i]._id, name: availableWorkers[i].name, assignedJobs: '0' }])
                    }
                    else {
                        setWorkersAssignments(workersAssignments => [...workersAssignments, { _id: availableWorkers[i]._id, name: availableWorkers[i].name, assignedJobs: response.data[0].assignedJobs }])

                    }
                })
        }
    }

    //getting a list of workers from 'user' database
    const getWorkerDetails = () => {
        AuthDataService.getWorkerList()
            .then(response => {
                console.log(response.data)
                setAvailableWorkers(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const getRequestDetail = _id => {
        RequestDataService.getDetail(_id)
            .then(response => {
                dispatch({ type: 'SELECTED_REQUEST', payload: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }
    //function for back button
    const back = () => {
        history.goBack()
    }




    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .max(300, "Message must be less than 300 characters"),
        workers: Yup.array()
            .min(1, "Please select a worker to assign")
    });

    return (
        <div>
            <Row>
                <Button onClick={ back }>Back</Button>
            </Row>
            <Row>
                <Formik
                    initialValues={ {
                        assignmentMessage: "",
                        workers: [],
                    } }
                    validationSchema={ validationSchema }
                    onSubmit={
                        (values, { setSubmitting }) => {
                            setSubmitting(true);
                            try {


                                RequestDataService.assignRequest(_id, values)
                                    .then(response => {
                                        console.log(response.data);
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    })
                                history.goBack()
                            }
                            catch (err) {
                                console.error('error', err)
                            }
                        } }>
                    { ({ values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                    }) => (
                            <Form onSubmit={ handleSubmit } >

                                <h4>{ SelectedRequest.category } Team</h4>


                                { workersAssignments && workersAssignments.map((worker) => (<Row key={ worker.name } id={ worker.name }>

                                    <Col>
                                        <TeamWorker key={ worker._id }> { worker.name }    { worker.assignedJobs } Active Requests </TeamWorker>
                                    </Col>
                                    <Col>
                                        <Field type='checkbox' key={ worker._id } name='workers' id={ worker._id } value={ worker._id }
                                        // checked={ values.workers.includes(worker._id) } 
                                        // onChange={ e => {
                                        //     if (e.target.checked) arrayHelpers.push(worker._id);
                                        //     else {
                                        //         const idx = values.workers.indexOf(worker._id);
                                        //         arrayHelpers.remove(idx);
                                        //     }
                                        // } } 
                                        />
                                    </Col></Row>
                                )) }

                                <Form.Group controlId="addMessageFormMessage">
                                    <Form.Label>Assignment Details</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        type="text"
                                        name="assignmentMessage"
                                        onChange={ handleChange }
                                        onBlur={ handleBlur }
                                        value={ values.message }
                                        placeholder="Add message for worker" />
                                    { touched.message && errors.message ? (
                                        <div className="error-message">{ errors.assignmentMessage }</div>
                                    ) : null }
                                </Form.Group>

                                <Button
                                    disabled={ isSubmitting }
                                    type="submit">
                                    Submit Request
							</Button>
                            </Form >
                        ) }
                </Formik>
            </Row>



        </div>

    )
}

export default AssignRequest