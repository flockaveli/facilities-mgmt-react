import React, { useState, useEffect } from "react";

import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Button, Col, Form, DropdownButton, Dropdown } from 'react-bootstrap';

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

const AdminRespond = () => {

	const context = useFmState();
	const dispatch = useFmDispatch();


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

	const { SelectedRequest } = context;

	const validationSchema = Yup.object().shape({
		message: Yup.string()
			.min(20, "Message must be at least 20 characters")
			.max(100, "Message must be less than 300 characters")
			.required("Empty message"),
	});

	return (
		<CONTAINER>
			<Formik
				initialValues={ {
					description: ""
				} }
				validationSchema={ validationSchema }
				onSubmit={
					(values, { setSubmitting }) => {
						setSubmitting(true);
						try {
							RequestDataService.adminRespond(SelectedRequest._id, values)
								.then(result => {
									if (result.status === 200) {
										dispatch({
											type: 'MESSAGE_ADDED'
										})
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
					isSubmitting
				}) => (
						<Form onSubmit={ handleSubmit } >
							<Form.Group controlId="addMessageFormMessage">
								<Form.Label>Message</Form.Label>
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
							<Button
								disabled={ isSubmitting }
								type="submit">
								Add Message
							</Button>
						</Form >
					) }
			</Formik>
		</CONTAINER>
	);
}

export default AdminRespond;
