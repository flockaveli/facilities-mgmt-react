import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useFmState, hasType } from '../../../services/fm-context';


const LandingBody = styled.div`
padding: 5em 3em;
width: 100%;
display: grid;
align-items: center;
margin: 0 auto;
`

const Landing = () => {
    const context = useFmState()

    const { user } = context

    return (
        <>
            { hasType(user, ['Worker']) && (<Redirect to="/worker" />) }
            { hasType(user, ['Requester']) && (<Redirect to="/requester" />) }
            { hasType(user, ['Admin']) && (<Redirect to="/admin" />) }
            <LandingBody>
                <div>Welcome to the Unitec Facilities Management Service Request App</div><p>
                    <div>To get started please create an account</div></p></LandingBody>
        </>)

}



export default Landing