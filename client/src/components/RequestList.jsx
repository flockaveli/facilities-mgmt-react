import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import {getRequests} from '../actions/requestActions';
import PropTypes from 'prop-types';

class RequestList extends Component {
  
    componentDidMount() {
        this.props.getRequests();

    }


    render() {
        const { requests } = this.props.request;

        return (
            <Container>

                <ListGroup>
                    <TransitionGroup className="request-list">
                        {requests.map(({ _id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {name}
                                </ListGroupItem>
                        </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
                </Container>

        )
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