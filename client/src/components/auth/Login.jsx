import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions'

class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg})
            } else {
                this.setState({ msg: null });
            }
        }
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        this.props.login(user);

    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">Login</NavLink>

                

                    <div>
                        { this.state.msg ? (
                        <Alert color="danger">{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input 
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your Unitec email address"
                                onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input 
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.onChange}
                                />
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block>Log In</Button>
                            </FormGroup>
                        </Form>
                 
                
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(Login);