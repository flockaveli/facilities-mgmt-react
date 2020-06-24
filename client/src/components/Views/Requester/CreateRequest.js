import React, { useState, useEffect } from "react";
import styled from 'styled-components/macro';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Button, Col, Form, DropdownButton, Dropdown } from 'react-bootstrap';

import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'

import UniMap from '../Shared/UniMap.js'
import StyledDropzone from '../Shared/StyledDropzone.js';


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
    padding: .5em .2em;
    height: 1em;
    position: absolute;
    font-size: .8em;
  }


`;


const CreateRequest = () => {

	const FILE_SIZE = 160 * 1024;
	const SUPPORTED_FORMATS = [
		"image/jpg",
		"image/jpeg",
		"image/gif",
		"image/png"
	];

	const context = useFmState();
	const dispatch = useFmDispatch();

	const { user } = context;

	const categorydropdown = [{ "value": "Signage", "display": "Signage" }, { "value": "Security", "display": "Security" }, { "value": "Cleaning & Waste", "display": "Cleaning & Waste" }, { "value": "Building Maintenance", "display": "Building Maintenance" }, { "value": "Exterior", "display": "Exterior" },]
	const locationdropdown = [{ "value": "Signage", "display": "Signage" }, { "value": "Security", "display": "Security" }, { "value": "170", "display": "170" }, { "value": "183", "display": "183" }, { "value": "Exterior", "display": "Exterior" },]


	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(10, "Request title must be at least 10 characters")
			.max(70, "Cannot be longer than 70 characters")
			.required("Please enter a request title"),
		description: Yup.string()
			.min(20, "Your description must be at least 20 characters")
			.max(400, "Your description must be less than 400 characters")
			.required("A description of your request is required"),
		category: Yup.string()
			.required("Please select a category for your request"),
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

			{ user.enabled ?
				<Formik
					initialValues={ {
						name: "",
						description: "",
						category: "",
						requester: {},
						photos: {},
						location: { building: "", lat: "", lng: "" },
					} }
					validationSchema={ validationSchema }
					onSubmit={
						(values, { setSubmitting }) => {
							setSubmitting(true);
							try {
								const requestData = new FormData()
								requestData.append('name', values.name)
								requestData.append('description', values.description)
								requestData.append('category', values.category)
								requestData.append('requester', JSON.stringify(user))
								requestData.append('location', JSON.stringify(values.location))
								for (var x = 0; x < values.photos.length; x++) {
									requestData.append('photos', values.photos[x])
								}
								console.log()
								RequestDataService.createRequest(requestData)
									.then(result => {
										if (result.status === 200) {
											dispatch({
												type: 'CREATED_REQUEST'
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
						isSubmitting,
						setFieldValue
					}) => (
							<Form onSubmit={ handleSubmit } >
								<Form.Group controlId="createRequestFormTitle">
									<Form.Label>Title</Form.Label>
									<Form.Control
										type="text"
										name="name"
										placeholder="What is your request about?"
										onChange={ handleChange }
										onBlur={ handleBlur }
										value={ values.name }
									/>
									{ touched.name && errors.name ? (
										<div className="error-message">{ errors.name }</div>
									) : null }
								</Form.Group>
								<Form.Group controlId="createRequestFormDesc">
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										rows="3"
										type="text"
										name="description"
										onChange={ handleChange }
										onBlur={ handleBlur }
										value={ values.description }
										placeholder="Please give the full details of your request here" />
									{ touched.description && errors.description ? (
										<div className="error-message">{ errors.description }</div>
									) : null }
								</Form.Group>
								<Form.Group controlId="createRequestFormCategory">
									<Form.Label>Category</Form.Label>
									<Form.Control as="select"
										name="category"
										onChange={ handleChange }
										value={ values.category }>
										<option selected key={ 0 } value={ null }>-</option>
										{ categorydropdown.map((category) => <option key={ category.value } value={ category.value }>{ category.display }</option>) }
									</Form.Control>
									{ touched.category && errors.category ? (
										<div className="error-message">{ errors.category }</div>
									) : null }
								</Form.Group>
								<Form.Group controlId="createRequestFormLocation">
									<Form.Label>Location</Form.Label>
									<Form.Control as="select"
										name="location.building"
										onChange={ handleChange }
										value={ values.location.building }>
										<option selected key={ 0 } value={ null }>-</option>
										{ locationdropdown.map((category) => <option key={ category.value } value={ category.value }>{ category.display }</option>) }
									</Form.Control>
									{ (values.location.building === "Exterior") && <UniMap setFieldValue={ setFieldValue } /> }
								</Form.Group>
								<Form.Group>
									<Form.Label>Images</Form.Label>
									<StyledDropzone setFieldValue={ setFieldValue } />
									{ touched.photos && errors.photos ? (
										<div className="error-message">{ errors.photos }</div>
									) : null }
								</Form.Group>

								<Button
									disabled={ isSubmitting }
									type="submit">
									Submit Request
							</Button>
							</Form >
						) }
				</Formik> : <div> Sorry, your account is disabled. Please get in touch with Facilities Management if you thing this is an error. </div> }
		</CONTAINER>
	);
}

export default CreateRequest;
