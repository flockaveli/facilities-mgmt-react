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

justify-content: space-evenly;
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

const AddMessage = () => {
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

	const { _id } = useParams()

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
			.min(20, "Message must be at least 20 characters")
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
			.nullable()
	});

	return (
		<CONTAINER>
			<Row>
				<Button onClick={ back }>Back</Button>
			</Row>
			<Formik
				initialValues={ {
					message: "",
					sender: {},
					photos: {}
				} }
				validationSchema={ validationSchema }
				onSubmit={
					(values, { setSubmitting }) => {
						setSubmitting(true);
						try {
							const messageData = new FormData()
							messageData.append('message', values.message)
							messageData.append('sender', user.name)
							for (var x = 0; x < values.photos.length; x++) {
								messageData.append('photos', values.photos[x])
							}
							RequestDataService.addMessage(SelectedRequest._id, messageData)
								.then(result => {
									if (result.status === 200) {
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
							<Form.Group>
								<Form.Label>Images</Form.Label>
								<StyledDropzone setFieldValue={ setFieldValue } />
								{ touched.photos && errors.photos ? (
									<ErrorMessage>{ errors.photos }</ErrorMessage>
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

export default AddMessage;
