import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getRequests} from '../actions/requestActions';
import PropTypes from 'prop-types';
import ListRequest from './ListRequest';

class RequestList extends Component {
  
    componentDidMount() {
        this.props.getRequests();

    }


    render() {
        const { requests } = this.props.request;
        return (
            <>
            {requests.map(request => 
        <ListRequest key={request._id} request={request} />
        )}
        </>
        );
    }
}


RequestList.propTypes = {
    getRequests: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    request: state.request
});

export default connect(mapStateToProps, { getRequests })(RequestList);