import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { getRequest } from "../actions/requestActions";
import RequestDetail from "./RequestDetail";

import PropTypes from "prop-types";

class RequestDetailContainer extends Component {
  componentDidMount() {
    let details = this.props.match.params._id;
    console.log("details:", details);
    this.props.getRequest(details);
  }
  render() {
    return <RequestDetail {...this.props.request.requestDetail} />;
  }
}

RequestDetailContainer.propTypes = {
  getRequest: PropTypes.func.isRequired,
  requestDetail: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  request: state.request,
});

export default connect(mapStateToProps, { getRequest })(RequestDetailContainer);
