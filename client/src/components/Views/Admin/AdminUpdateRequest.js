
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import RequestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'

const AdminUpdateRequest = () => {
  const context = useFmState()
  const dispatch = useFmDispatch()
  const { SelectedRequest } = context
  const categorydropdown = [{ "value": "Signage", "display": "Signage" }, { "value": "Security", "display": "Security" }, { "value": "Cleaning & Waste", "display": "Cleaning & Waste" }, { "value": "Building Maintenance", "display": "Building Maintenance" }, { "value": "Exterior", "display": "Exterior" },]
  const statusdropdown = [{ "value": 'New', "display": 'New' }, { "value": 'Awaiting Requester', "display": 'Awaiting Requester' }, { "value": 'Delayed', "display": 'Delayed' }, { "value": 'Assigned', "display": 'Assigned' }, { "value": 'Closed', "display": 'Closed' }]
  const prioritydropdown = [{ "value": "Low", "display": "Low" }, { "value": "Medium", "display": "Medium" }, { "value": "High", "display": "High" }]
  // const workerdropdown = [{"value": "", "display": "Unassigned"}, {"value": "Test Worker", "display": "Test Worker"}, {"value": "Test Worker", "display": "Test Worker"},{"value": "Test Worker", "display": "Test Worker"}]
  const [workerdropdown, setWorkerdropdown] = useState([])

  const { _id } = useParams();

  useEffect(() => {
    getRequestDetail(_id)
  }, [])

  const getRequestDetail = _id => {
    RequestDataService.get(_id)
      .then(response => {
        dispatch({ type: 'SELECTED_REQUEST', payload: response.data });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }



  const getWorkerDetails = () => {
    RequestDataService.getWorkers()
      .then(response => {
        console.log(response.data);
        setWorkerdropdown(response.data.map(({ name }) => ({ label: name, value: name })))
          ;
        console.log(setWorkerdropdown);
      }).catch(error => {
        console.log(error);

      })
      .catch(e => {
        console.log(e);
      })
  }

  const updateRequest = () => {
    RequestDataService.update(SelectedRequest._id, SelectedRequest)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (

    <div>
      { SelectedRequest ? (
        <div className="edit-form">
          <h4>Request</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={ SelectedRequest.name }
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={ SelectedRequest.description }
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select>
                { categorydropdown.map((worker) => <option key={ worker.value } value={ worker.value }>{ worker.display }</option>) }
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={ SelectedRequest.location }
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select>
                { prioritydropdown.map((worker) => <option key={ worker.value } value={ worker.value }>{ worker.display }</option>) }
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select>
                { statusdropdown.map((worker) => <option key={ worker.value } value={ worker.value }>{ worker.display }</option>) }
              </select>
              <h4>Requested by: { SelectedRequest.requester }</h4>
              <p>Submitted: { SelectedRequest.createdAt }</p>
              <p>Last update: { SelectedRequest.updatedAt }</p>

            </div>
          </form>

          <div>
            <label htmlFor="priority">Assigned Worker</label>
            <select>
              { workerdropdown.map((worker) => <option key={ worker.value } value={ worker.value }>{ worker.display }</option>) }
            </select>
          </div>



          <button
            type="submit"
            className="badge badge-success"
            onClick={ updateRequest }
          ><Link to='/admin'>Update </Link>
          </button>



        </div>

      ) : (
          <div>
            <br />
            <p>Err: No request Selected</p>
          </div>
        ) }





    </div>

  )
}

export default AdminUpdateRequest;
