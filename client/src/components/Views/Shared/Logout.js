import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { useFmDispatch } from '../../../services/fm-context'


const LogoutButton = styled(Button)`
    
box-shadow: 0px 0px 0px 0px #D1D9E6 !important;
text-decoration: italic;
`

const Logout = () => {

    const dispatch = useFmDispatch()

    const logOutUser = () => {
        dispatch({ type: 'LOGOUT' })
    }


    return (
        <LogoutButton onClick={ logOutUser } href="/">
            Logout
        </LogoutButton>
    )

}

export default Logout;