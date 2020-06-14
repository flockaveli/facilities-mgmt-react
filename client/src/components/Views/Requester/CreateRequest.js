import React, { useState } from "react";
import moment from 'moment'
import styled from 'styled-components/macro';
import { Container, Row, Button, Col, Form, DropdownButton, Dropdown } from 'react-bootstrap';

import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'


const CreateRequest = () => {
	const initialRequestState = {
		_id: null,
		name: "",
		description: "",
		category: "",
	};

	const [request, setRequest] = useState(initialRequestState);
	const categorydropdown = [{ "value": "Signage", "display": "Signage" }, { "value": "Security", "display": "Security" }, { "value": "Cleaning & Waste", "display": "Cleaning & Waste" }, { "value": "Building Maintenance", "display": "Building Maintenance" }, { "value": "Exterior", "display": "Exterior" },]
	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setRequest({ ...request, [name]: value });
	};

	const saveRequest = () => {
		var data = {
			name: request.name,
			description: request.description,
		};


		RequestDataService.createRequest(data)
			.then((response) => {
				setRequest({
					_id: response.data._id,
					name: response.data.name,
					description: response.data.description,
					requester: response.data.requester,
					category: response.data.category,
					priority: response.data.priority,
					status: response.data.status,
				});
				setSubmitted(true);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const newRequest = () => {
		setRequest(initialRequestState);
		setSubmitted(false);
	};


	// { submitted ? (
	// 	<div>
	// 		<h4>Request Created</h4>
	// 		<Button className="btn btn-success" onClick={ newRequest }>
	// 			Create Request
	// 	</Button>
	// 	</div>
	// ) :
	return (
		<Form>
			<Form.Group controlId="createRequestFormTitle">
				<Form.Label>Title</Form.Label>
				<Form.Control placeholder="Up to 70 chars" />
			</Form.Group>
			<Form.Group controlId="createRequestFormDesc">
				<Form.Label>Description</Form.Label>
				<Form.Control as="textarea" rows="3" placeholder="Up to 300 chars" />
			</Form.Group>
			<Form.Group controlId="createRequestFormCategory">
				<Form.Label>Category</Form.Label>
				<Form.Control as="select">
					{ categorydropdown.map((team) => <option key={ categorydropdown.value } value={ categorydropdown.value }>{ categorydropdown.display }</option>) }
				</Form.Control>
			</Form.Group>
			<Form.Group>
				<Form.File
					className="position-relative"
					required
					name="file"
					label="File"
					id="validationFormik107"
				/>
			</Form.Group>

			<Button
				onClick={ saveRequest }
				color="dark"
				style={ { marginTop: "2rem" } }
				className="btn btn-success">
				Submit Request
				</Button>
		</Form >
	);
}

export default CreateRequest;
