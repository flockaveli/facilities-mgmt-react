import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addRequest } from '../actions/requestActions';

class CreateRequest extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newRequest = {
            name: this.state.name
        }

        this.props.addRequest(newRequest);
        this.toggle();
    }

    render() {
        return(
            <div>
                <Button color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >Create A Request</Button>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >

                    <ModalHeader toggle={this.toggle}>Create A Request</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="request">Title</Label>
                                <Input 
                                type="text"
                                name="name"
                                id="request"
                                placeholder="Request Title"
                                onChange={this.onChange}
                                />
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block>Submit Request</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    request: state.request
})

export default connect(mapStateToProps, { addRequest })(CreateRequest);