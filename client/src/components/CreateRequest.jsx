import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addRequest } from '../actions/requestActions';

class CreateRequest extends Component {
    state = {
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
    }

    render() {
        return(

                    <div>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Title</Label>
                                
                                <Input 
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Up to 70 chars"
                                onChange={this.onChange}
                                />
                                <Label for="desc">Description</Label>
                                <Input 
                                type="text"
                                name="description"
                                id="desc"
                                placeholder="Please describe your request. Up to 500 chars"
                                onChange={this.onChange}
                                />
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block>Submit Request</Button>
                            </FormGroup>
                        </Form>
                    </div>
            
        )
    }
}

const mapStateToProps = state => ({
    request: state.request
})

export default connect(mapStateToProps, { addRequest })(CreateRequest);