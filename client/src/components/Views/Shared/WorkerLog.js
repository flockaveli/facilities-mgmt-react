import React, { useState, useEffect } from "react";
import styled from 'styled-components/macro';
import { Container, Row, Button, Col } from 'react-bootstrap'
import moment from 'moment'

import UploadedImage from "./UploadedImage";

import requestDataService from "../../../services/RequestService";
import { useFmState, useFmDispatch } from '../../../services/fm-context'

const getColor = (props) => {
    if (props.category === 'Security') {
        return '#FFA500';
    }
    if (props.category === 'Cleaning & Waste') {
        return '#00BFFF';
    }
    if (props.category === 'Signage') {
        return '#3CB371';
    }
    if (props.category === 'Building Maintenance') {
        return '#FF5733';
    }
    if (props.category === 'Exterior') {
        return '#8B008B';
    }
    return '#eeeeee';
}
const MessageContainer = styled(Container)`
background: ${props => props.theme.colors.background};
margin: 2em 1em 1em 0em;
padding: 0.5em;
height: auto;
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;
`
const CategoryMark = styled.div`
background-color: ${props => getColor(props)};
margin: 1em;
height: 1.5em;
width: 1.5em;
border-radius: 50%;
`

const Message = ({ message }) => {

    return (
        <div>
            { message &&
                <MessageContainer key={ message }  >
                    <Row>
                        <Col>
                            <Row>{ message.sender }</Row>
                            <Row>{ message.resolution }</Row>
                        </Col>
                        <Col>{ moment(message.updatedAt).format("L LT") }
                        </Col>
                    </Row><Row>
                        <Col>{ message.message }
                        </Col>
                    </Row>
                    <Row>
                        { message.messagePhotos && message.messagePhotos.map((photo) => <UploadedImage props={ photo } />) }
                    </Row>
                </MessageContainer>
            }
        </div>
    )
}

export default Message