import React, { useEffect, useState, useDispatch } from "react";
import RequestDataService from "../services/RequestService";
import { Link } from 'react-router-dom'


const RequestList = () => {
	const [requests, setRequests] = useState([]);
	const [currentRequest, setCurrentRequest] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchId, setSearchId] = useState("");

	useEffect(() => {
		getAllRequests()
	}, [])

	const findIdDetail = () => {
		RequestDataService.findById(searchId)
			.then(response => {
				setRequests(response.data);
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	};




	const getAllRequests = () => {
		RequestDataService.getAll()
			.then(response => {
				setRequests(response.data);
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			})
	}

	const refreshList = () => {
		getAllRequests();
		setCurrentRequest(null);
		setCurrentIndex(-1);
	}

	const setActiveRequest = (request, index) => {
		setCurrentRequest(request);
		setCurrentIndex(index)
	}

	return (
		<ul className={ "requestListDisplay" }>
			{ requests && requests.map((request, index) => (

				<li className={ "list-group-item" } key={ index }  ><span className='listRequestDisplay'>
					<button> <Link to={ `/requests/${request._id}` }>{ request.name }</Link> </button> <button>  Category: { request.category }</button> <button>Priority: { request.priority } </button> <button>Status: { request.status }</button> <button> Updated: { request.updatedAt } </button> </span> </li>
			)) }
		</ul>
	);
};

export default RequestList;
