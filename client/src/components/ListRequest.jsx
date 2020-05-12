import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { getRequest } from '../actions/requestActions';





class ListRequest extends Component {
  constructor(props) {
    super(props)
  }
  
  

    render(){
      const {request} = this.props

      return (
        <p>
      <Link to={`/requests/${request._id}`}> {request.name} | {request.category} | {request.priority} | {request.status} | {request.updatedAt}  </Link></p>
      )}
      
    
}



export default ListRequest