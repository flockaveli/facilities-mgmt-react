import React, { Component } from 'react';
import api from '../api'

import styled from 'styled-components'

class RequestInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            submitted: '',
            category: '',
        }
    }


    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getRequestById().then(requests => {
            this.setState({
                request: requests.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { requests, isLoading } = this.state
        
        return (
            <div className="from-wrapper"></div>
        )
    }
}

export default RequestDetail