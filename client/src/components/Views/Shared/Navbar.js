import React, { useEffect, useReducer } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Logout from './Logout'

import Logo from '../../Logo/Logo.svg';

import { useFmState, useFmDispatch, hasType } from '../../../services/fm-context'

const Nav = styled(Navbar)`
background-color: #ECF0F3;
padding: 1em;
display: flex;
flex-direction: horizontal;
justify-content: space-between;
box-shadow: 18px 18px 30px 0px #D1D9E6;
`;

const NavLink = styled.div`
text-decoration: none;
padding: 1em;
`;

const UfmLogo = styled.img`
width: 9vw;
padding: 0em 0em 0em 1em;
`;

const FmNav = () => {

  const context = useFmState();
  const dispatch = useFmDispatch();
  const { user } = context;

  return (<Nav>
    <UfmLogo src={ Logo } />



    { hasType(user, ['Requester']) && <>
      <Link to={ "/requester" } className="nav-link">
        Requests
              </Link>
      <Link to={ "/add" } className="nav-link">
        New
              </Link>
      <div>{ user.name } </div>
      <Logout />
    </>
    }
    { hasType(user, ['Admin']) && <>
      <Link to={ "/admin" } >
        Dashboard
              </Link>
      <Link to={ "/archive" } >
        Archive
              </Link>
      <Link to={ "/users" } >
        Users
              </Link>
      <div> Welcome, { user.name } </div>
      <Logout />
    </>
    }
    { hasType(user, ['Worker']) && <>
      <Link to={ "/Worker" } >
        Dashboard
              </Link>
      <Link to={ "/Map" } className="nav-link">
        Map
              </Link>
      <div> Welcome, { user.name } </div>
      <Logout />
    </>
    }

    <NavLink> <Link to={ "/login" }>
      Login </Link>
    </NavLink>

    <NavLink><Link to={ "/register" } >
      Register
              </Link>
    </NavLink>



  </Nav>

  )
}

export default FmNav