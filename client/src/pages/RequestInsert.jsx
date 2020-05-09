import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/Button'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`



const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class RequestInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            submitted: '',
            category: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputSubmitted = async event => {
        const submitted = event.target.value
        this.setState({ submitted })
    }

    handleChangeInputCategory = async event => {
        const category = event.target.value
        this.setState({ category })
    }

    handleIncludeRequest = async () => {
        const { name, submitted, category } = this.state
        const payload = { name, submitted, category }

        await api.insertRequest(payload).then(res => {
            window.alert(`Request created successfully`)
            this.setState({
                name: '',
                submitted: '',
                category: '',
                requester: '',
                image: '',
        description: '',
        location: '',
        priority: '',
        status: '',
            })
        })
    }

    render() {
        return (
            <div className="from-wrapper">
                <Title>Create Request</Title>
                <Form onSubmit={this.onSubmit}>
                
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeRequestName}/>
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.description} onChange={this.onChangeRequestDescription}/>
        </Form.Group>

        <Form.Group controlId="Category">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={this.state.category} onChange={this.onChangeRequestCategory}/>
        </Form.Group>

        <Form.Group controlId="Priority">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={this.state.category} onChange={this.onChangeRequestCategory}/>
        </Form.Group>

        <Form.Group controlId="Location">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={this.state.category} onChange={this.onChangeRequestCategory}/>
        </Form.Group>

        <Form.Group controlId="Status">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={this.state.category} onChange={this.onChangeRequestCategory}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Request
        </Button>
                <Button href={'/requests/list'}>Cancel</Button>
                </Form>
                </div>
        )
    }
}

export default RequestInsert