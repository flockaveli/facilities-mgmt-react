import React from 'react';
import styled from 'styled-components/macro';
import { Switch, Route } from 'react-router-dom'
import { hasType, useFmState, useFmDispatch } from './services/fm-context'
import { StyleProvider, GlobalStyle } from './services/styled-theme'
import 'bootstrap/dist/css/bootstrap.min.css';

import AdminRequestDetail from './components/Views/Admin/AdminRequestDetail'
import AdminUserDetail from './components/Views/Admin/AdminUserDetail'
import AdminDashboard from './components/Views/Admin/AdminDashboard'
import AdminUserDashboard from './components/Views/Admin/AdminUserDashboard'
import AdminWorkerDashboard from './components/Views/Admin/AdminWorkerDashboard'
import UpdateRequest from './components/Views/Admin/AdminUpdateRequest'
import AssignRequest from './components/Views/Admin/AssignRequest'
import AdminRespond from './components/Views/Admin/AdminRespond'
import AdminArchive from './components/Views/Admin/AdminArchive'

import CreateRequest from './components/Views/Requester/CreateRequest'
import RequesterDashboard from './components/Views/Requester/RequesterDashboard'
import RequesterArchive from './components/Views/Requester/RequesterArchive'
import RequesterRequestDetail from './components/Views/Requester/RequesterRequestDetail'
import AddMessage from './components/Views/Requester/AddMessage'

import WorkerDashboard from './components/Views/Worker/WorkerDashboard'
import WorkerRequestDetail from './components/Views/Worker/WorkerRequestDetail'
import LogJob from './components/Views/Worker/LogJob'

import RegisterUser from './components/Views/Shared/RegisterUser'
import Landing from './components/Views/Shared/Landing'
import Login from './components/Views/Shared/Login'
import Logout from './components/Views/Shared/Logout'
import FmNav from './components/Views/Shared/Navbar'


const MainWrapper = styled.div`
background: ${props => props.theme.colors.background};

background: '#ECF0F3';
margin: 0;
height: 100%;
`

function App() {

  const state = useFmState();
  const { user } = state;

  return (
    <StyleProvider>
      <GlobalStyle />
      <MainWrapper >
        <FmNav />
        <div>
          <Switch>

            <Route exact path="/" component={ Landing } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/logout" component={ Logout } />
            <Route exact path="/register" component={ RegisterUser } />

            {/* //protected routing using auth  */ }
            { hasType(user, ['Requester']) && <Route path='/requester' component={ RequesterDashboard } /> }
            { hasType(user, ['Requester']) && <Route path='/requesterarchive' component={ RequesterArchive } /> }
            { hasType(user, ['Requester']) && <Route path='/myrequests/:_id' component={ RequesterRequestDetail } /> }
            { hasType(user, ['Requester']) && <Route path='/add' component={ CreateRequest } /> }
            { hasType(user, ['Requester']) && <Route path='/addmessage/:_id' component={ AddMessage } /> }

            { hasType(user, ['Admin']) && <Route path='/admin' component={ AdminDashboard } /> }
            { hasType(user, ['Admin']) && <Route path='/archive' component={ AdminArchive } /> }
            { hasType(user, ['Admin']) && <Route path='/requesters' component={ AdminUserDashboard } /> }
            { hasType(user, ['Admin']) && <Route path='/workers' component={ AdminWorkerDashboard } /> }
            { hasType(user, ['Admin']) && <Route path="/userdetail/:_id" component={ AdminUserDetail } /> }
            { hasType(user, ['Admin']) && <Route path="/requests/:_id" component={ AdminRequestDetail } /> }
            { hasType(user, ['Admin']) && <Route path="/moderate/:_id" component={ UpdateRequest } /> }
            { hasType(user, ['Admin']) && <Route path="/assign/:_id" component={ AssignRequest } /> }
            { hasType(user, ['Admin']) && <Route path="/respond/:_id" component={ AdminRespond } /> }

            { hasType(user, ['Worker']) && <Route path='/worker' component={ WorkerDashboard } /> }
            { hasType(user, ['Worker']) && <Route path='/assignedrequests/:_id' component={ WorkerRequestDetail } /> }
            { hasType(user, ['Worker']) && <Route path='/logjob/:_id' component={ LogJob } /> }

          </Switch>
        </div>
      </MainWrapper>
    </StyleProvider>

  )
}

export default App
