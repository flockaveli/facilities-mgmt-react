import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterUser from './auth/Login';
import CreateRequest from './CreateRequest';
import Logout from './auth/Logout';
import Login from './auth/RegisterUser';
import {Link} from 'react-router-dom';


class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    // static propTypes = {
    //     auth: this.PropTypes.object.isRequired
    // }



    toggle = () => {
        this.setState({
            isOpen: !this.state,
            auth: this.state.auth
        });
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;


        const authLinks = (
            <>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{ user ? '${user.name}' : ''}</strong>
                </span>
            </NavItem>
            <Logout />
            </>

            
        )
        const guestLinks = (
            <>
            <NavItem>
                        <Link to={"/register"}>Register</Link>
                    </NavItem>
                    <NavItem>
                    <Link to={"/login"}>Login</Link>
                    </NavItem>

            </>
        )
        return (
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Facilities Management</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar/>
                    <Nav className="ml-auto" navbar />
                    <NavItem>
                    <Link to={"/createrequest"}>Create Request</Link>
                    </NavItem>
                    { isAuthenticated ? authLinks : guestLinks}
                    
                    
                </Container>
            </Navbar>
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavBar);