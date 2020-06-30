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
            
            <LandingBody>
                <div>Welcome to the Unitec Facilities Management Service Request App</div>


                <div><p>To get started please create an account</p></div>
                <div><p>Or for testing, please log in with one of the following:</p></div>
                <div><p>Admin - email: admin@unitec.ac.nz password: admin</p></div>
                <div><p>Worker - email: worker@unitec.ac.nz password: worker</p></div>
                <div><p>Requester - email: requester@unitec.ac.nz password: requester</p></div>

            </LandingBody>
        </>)

}



export default Landing