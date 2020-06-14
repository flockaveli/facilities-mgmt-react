import React from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import { Switch, Route } from 'react-router-dom'
import { hasType, useFmState } from './services/fm-context'
import { StyleProvider, GlobalStyle } from './services/styled-theme'
import 'bootstrap/dist/css/bootstrap.min.css';

import AdminRequestDetail from './components/Views/Admin/AdminRequestDetail';
import AdminUserDetail from './components/Views/Admin/AdminUserDetail';
import AdminDashboard from './components/Views/Admin/AdminDashboard'
import AdminUserDashboard from './components/Views/Admin/AdminUserDashboard'
import UpdateRequest from './components/Views/Admin/AdminUpdateRequest'
import AssignRequest from './components/Views/Admin/AssignRequest'
import ArchivedRequests from './components/Views/Admin/ArchivedRequests'

import CreateRequest from './components/Views/Requester/CreateRequest'
import RequesterDashboard from './components/Views/Requester/RequesterDashboard'
import RequesterRequestDetail from './components/Views/Requester/RequesterRequestDetail'

import WorkerDashboard from './components/Views/Worker/WorkerDashboard'
import WorkerRequestDetail from './components/Views/Worker/WorkerRequestDetail'
import WorkerUpdateRequest from './components/Views/Worker/WorkerRequestDetail'
import WorkerMap from './components/Views/Worker/WorkerMap'

import RegisterUser from './components/Views/Shared/RegisterUser'
import Landing from './components/Views/Shared/Landing'
import Login from './components/Views/Shared/Login'
import Logout from './components/Views/Shared/Logout'
import FmNav from './components/Views/Shared/Navbar'

import PrivateRoute from './components/functions/PrivateRoute'

const MainWrapper = styled.div`
background: ${props => props.theme.colors.background};
margin: 0;
padding: 0;
height: 100%;
`

function App() {

  const context = useFmState();
  const { user, isAuthenticated } = context

  return (
    <StyleProvider>
      <GlobalStyle />
      <MainWrapper />
      <FmNav />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={ Landing } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/logout" component={ Logout } />
          <Route exact path="/register" component={ RegisterUser } />
          {/* //protected routing using auth  */ }
          { hasType(user, ['Requester']) && <Route path='/requester' component={ RequesterDashboard } /> }
          { hasType(user, ['Requester']) && <Route path='/myrequests/:_id' component={ RequesterRequestDetail } /> }
          { hasType(user, ['Requester']) && <Route path='/add' component={ CreateRequest } /> }

          { hasType(user, ['Admin']) && <Route path='/admin' component={ AdminDashboard } /> }
          { hasType(user, ['Admin']) && <Route path='/users' component={ AdminUserDashboard } /> }
          { hasType(user, ['Admin']) && <Route path='/users/:_id' component={ AdminUserDetail } /> }
          { hasType(user, ['Admin']) && <Route path="/requests/:_id" component={ AdminRequestDetail } /> }
          { hasType(user, ['Admin']) && <Route path="/moderate/:_id" component={ UpdateRequest } /> }
          { hasType(user, ['Admin']) && <Route path="/assign/:_id" component={ AssignRequest } /> }
          { hasType(user, ['Admin']) && <Route path="/assign/:_id" component={ ArchivedRequests } /> }

          { hasType(user, ['Worker']) && <Route path='/worker' component={ WorkerDashboard } /> }
          { hasType(user, ['Worker']) && <Route path='/assignedrequests/:_id' component={ WorkerRequestDetail } /> }
          { hasType(user, ['Worker']) && <Route path='/Worker/map' component={ WorkerMap } /> }
          { hasType(user, ['Worker']) && <Route path='/Worker' component={ WorkerUpdateRequest } /> }

        </Switch>
      </div>
    </StyleProvider>

  )
}

export default App
