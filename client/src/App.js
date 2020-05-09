import React, { Component } from 'react';
import  NavBar  from './components/AppNavBar';
import RequestList  from './components/RequestList';
import CreateRequest from './components/CreateRequest';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <NavBar />
        <Container>
        <CreateRequest/>
        <RequestList />
        </Container>
      </div>
      </Provider>
  )
}
}

export default App
