import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useFmState } from '../../services/fm-context'

function PrivateRoute({ component: Component, ...rest }) {
    const state = useFmState()
  return(
    <Route 
    {...rest} 
    render={(props) => (
        state.user.token ? (
<Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/login" }} />
        )      
    )}
    />
  );
}


export default PrivateRoute;