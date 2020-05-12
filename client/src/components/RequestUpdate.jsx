import React, { Component } from 'react'
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

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class RequestUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
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

    handleUpdateRequest = async () => {
        const { id, name, submitted, category } = this.state
        const payload = { name, submitted, category }

        await api.updateRequestById(id, payload).then(res => {
            window.alert(`Request updated successfully`)
            this.setState({
                name: '',
                submitted: '',
                category: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const request = await api.getRequestById(id)

        this.setState({
            name: request.data.data.name,
            submitted: request.data.data.rating,
            category: request.data.data.time.join('/'),
        })
    }

    render() {
        const { name, submitted, category } = this.state
        return (
            <Wrapper>
                <Title>Update Request</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

               <Label>Submitted: </Label>
                <InputText
                    type="text"
                    value={submitted}
                    onChange={this.handleChangeInputSubmitted}
                />

                <Label>Category: </Label>
                <InputText
                    type="text"
                    value={category}
                    onChange={this.handleChangeInputCategory}
                />

                <Button onClick={this.handleUpdateRequest}>Update Request</Button>
                <CancelButton href={'/requests/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default RequestUpdate