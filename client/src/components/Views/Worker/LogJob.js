import React, { useState, useEffect } from "react";
import styled from 'styled-components/macro';
import { Formik, ErrorMessage } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Container, Row, Button, Col, Form, DropdownButton, Dropdown } from 'react-bootstrap';

import StyledDropzone from '../Shared/StyledDropzone.js';

import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'


const CONTAINER = styled.div`
background: ${props => props.theme.colors.background};
  height: auto;
  width: 80%;
  margin: 5em auto;
  padding: 2em;
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
  .error {
    border: 2px solid #FF6565;
  }
  .error-message {
    color: #FF6565;
    margin: 1em;
    height: 1em;
    position: absolute;
    font-size: .8em;
  }
`;

const LogJob = () => {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
    ];
    const context = useFmState();
    const dispatch = useFmDispatch();
    const history = useHistory();

    const back = () => {
        history.goBack()
    }



    let { _id } = useParams()

    useEffect(() => {
        getRequestDetail(_id)
    }, [])

    const getRequestDetail = _id => {
        RequestDataService.getDetail(_id)
            .then(response => {
                dispatch({ type: 'SELECTED_REQUEST', payload: response.data });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const { user, SelectedRequest } = context;




    const validationSchema = Yup.object().shape({
        message: Yup.string()
            .max(100, "Message must be less than 300 characters")
            .required("Message text is required"),
        photos: Yup.array().of(Yup.mixed()
            .test(
                "fileSize",
                "Image File too large",
                value => value && value.size <= FILE_SIZE
            )
            .test(
                "fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            )
        )
            .nullable(),
        resolution: Yup.string()
            .required("Please select a response type for your log"),
    });

    return (
        <CONTAINER>
            <Button
                onClick={ back }
            >Back
            </Button>
            <Formik
                initialValues={ {
                    message: "",
                    sender: {},
                    photos: {},
                    resolution: ""
                } }
                validationSchema={ validationSchema }
                onSubmit={
                    (values, { setSubmitting }) => {
                        setSubmitting(true);
                        try {
                            const messageData = new FormData()
                            messageData.append('resolution', values.resolution)
                            if (values.resolution === 'Actioned') {
                                messageData.append('status', 'Pending Review')
                            } else { messageData.append('status', 'Unresolved') }

                            messageData.append('message', values.message)
                            messageData.append('sender', user.name)
                            for (var x = 0; x < values.photos.length; x++) {
                                messageData.append('photos', values.photos[x])
                            }
                            RequestDataService.logJob(SelectedRequest._id, messageData)
                                .then(result => {
                                    if (result.status === 200) {
                                        dispatch({
                                            type: 'JOB_LOGGED'
                                        })
                                        console.log(result.data)
                                        history.goBack()
                                    } else {
                                        console.log('Error')
                                    }
                                })
                        } catch (err) {
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
                            <Form.Group>
                                <Form.Label>Resolution status</Form.Label>
                                <Form.Control as="select"
                                    name="resolution"
                                    onChange={ handleChange }
                                    value={ values.resolution }>
                                    <option defaultvalue key='Resolved' value='Actioned'>Actioned</option>
                                    <option key='Unresolved' value='Unresolved'>Unable to resolve</option>
                                </Form.Control>
                                { touched.resolution && errors.resolution ? (
                                    <ErrorMessage>{ errors.resolution }</ErrorMessage>
                                ) : null }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Log Job</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    type="text"
                                    name="message"
                                    onChange={ handleChange }
                                    onBlur={ handleBlur }
                                    value={ values.message }
                                    placeholder="Add your message here" />
                                { touched.message && errors.message ? (
                                    <ErrorMessage>{ errors.message }</ErrorMessage>
                                ) : null }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Attach Photos</Form.Label>
                                <StyledDropzone setFieldValue={ setFieldValue } />
                                { touched.photos && errors.photos ? (
                                    <ErrorMessage>{ errors.photos }</ErrorMessage>
                                ) : null }
                            </Form.Group>
                            <Button
                                disabled={ isSubmitting }
                                type="submit">
                                Submit Log
							</Button>
                        </Form >
                    ) }
            </Formik>
        </CONTAINER>
    );
}

export default LogJob;
