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
import { clearErrors } from '../../actions/errorActions';
import { register } from '../../actions/authActions';

class RegisterUser extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg})
            } else {
                this.setState({ msg: null });
            }
        }
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const { name, email, password } = this.state;

        const newUser = {
            name,
            email,
            password
        }

        this.props.register(newUser);

    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">Register</NavLink>

                

                    <div>
                        { this.state.msg ? (
                        <Alert color="danger">{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                
                                <Input 
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Full name"
                                onChange={this.onChange}
                                />
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
                                block>Create Account</Button>
                            </FormGroup>
                        </Form>
                        </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterUser);