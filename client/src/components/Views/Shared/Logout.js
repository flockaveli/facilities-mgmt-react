import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useFmDispatch } from '../../../services/fm-context'

const Logout = () => {

    const dispatch = useFmDispatch()

    const logOutUser = () => {
        dispatch({ type: 'LOGOUT' })
    }


    return (
        <Button onClick={ logOutUser } href="/">
            Logout
        </Button>
    )

}

export default Logout;