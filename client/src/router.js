import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RequestList  from './components/RequestList';
import CreateRequest from './components/CreateRequest';
import RequestDetail from './components/RequestDetail';

export default (
    <Router>
        <Switch>
          <Route exact path="/" component={RequestList} />
          <Route path="/create" component={CreateRequest} />
          <Route path="/requests/detail" component={RequestDetail} />
        </Switch>
      </Router>
)