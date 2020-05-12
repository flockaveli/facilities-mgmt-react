import React from 'react'
import { Route, Switch } from 'react-router'
import AppNavBar from '../components/AppNavBar'
import RequestList from '../components/RequestList'
import CreateRequest from '../components/CreateRequest'
import RequestDetailContainer from '../components/RequestDetailContainer'
import RegisterUser from '../components/auth/RegisterUser'
import Login from '../components/auth/Login'

const routes = (
  <div>
    
    <Switch>
      <Route exact path="/" component={RequestList} />
      <Route path="/requests/:_id" component={RequestDetailContainer} />
      <Route path="/createrequest" component={CreateRequest} />
      <Route path="/register" component={RegisterUser} />
      <Route path="/login" component={Login} />
          
    </Switch>
  </div>
)

export default routes