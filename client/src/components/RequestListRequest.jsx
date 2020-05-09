import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const request = props => (
    <tr>
        <td>{props.request.name}</td>
        <td>{props.request.category}</td>
        <td>{props.request.priority}</td>
        <td>
            <Link to={"/UpdateRequest/"+props.request._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/DeleteRequest/"+props.request._id}>Delete</Link>
        </td>
    </tr>
)