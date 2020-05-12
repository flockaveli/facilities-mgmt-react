import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes'
import AppNavBar from './components/AppNavBar';


const App = ({history}) => {
  

return (
  
  <ConnectedRouter history={history}>
    <AppNavBar />
    { routes }
  </ConnectedRouter>
)
}

App.propTypes = {
  history: PropTypes.object
}

export default App
