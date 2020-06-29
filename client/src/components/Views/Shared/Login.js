import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import styled from 'styled-components';
import { Container, Row, Button, Col, Form } from 'react-bootstrap';

import AuthDataService from '../../../services/AuthService'
import { useFmState, useFmDispatch, hasType } from '../../../services/fm-context'

import Logo from '../../Logo/Logo.svg';

const UfmLogo = styled.img`
width: 14vw;
margin: auto !important;
`;
const CONTAINER = styled(Container)`
align-items: center;
background: ${props => props.theme.colors.background};
  height: auto;
  width: 45%;
  margin: auto;
  padding: 2em;

  .row {
      text-align: center;
  }
  
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;

  @media(min-width: 786px) {
    width: 60%;
  }

`;

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .max(25, "Password can't be longer than 20 characters")
        .required("Please enter password"),
    email: Yup.string()
        .email("Please enter a valid email address")
        .max(30, "Email must be less than 30 characters")
        .required("Email is required")
        .test('Unitec', 'A Unitec email address is required', function (email) { return email.includes('unitec.ac.nz') })
});

const Login = () => {

    //accessing global state and dispatcher
    const context = useFmState();
    const dispatch = useFmDispatch();
    const history = useHistory();

    const { user } = context
    //functions to call login action from dispatcher with data from local state

    return (
        //redirects to differentiated app homepages if user is logged in
        <>

            { hasType(user, ['Worker']) ? (<Redirect to="/worker" />) : (null) }
            { hasType(user, ['Requester']) ? (<Redirect to="/requester" />) : (null) }
            { hasType(user, ['Admin']) ? (<Redirect to="/admin" />) : (null) }

            <CONTAINER>
                <Row>
                    <UfmLogo src={ Logo } />
                </Row>

                <Formik
                    initialValues={ { email: "", password: "" } }
                    validationSchema={ validationSchema }
                    onSubmit={
                        (values, { setSubmitting }) => {
                            setSubmitting(true);
                            try {
                                const { email, password } = values
                                AuthDataService.postLogin({ email, password })
                                    .then(result => {
                                        if (result.status === 200) {
                                            dispatch({
                                                type: 'LOGIN',
                                                payload: result.data
                                            })
                                            const { user, token } = result.data
                                            localStorage.setItem("user", JSON.stringify(user));
                                            localStorage.setItem("token", token);
                                        } else {
                                            console.log('Error')
                                            history.push('/login')
                                        }
                                    }
                                    )
                                    .catch(e => {
                                        console.log(e)
                                    })
                            } catch (err) {
                                console.error('Auth error', err)
                            }
                        } }>
                    { ({ values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting }) => (
                            <Form onSubmit={ handleSubmit } >
                                <Form.Group controlId="loginEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Your Unitec email address"
                                        onChange={ handleChange }
                                        onBlur={ handleBlur }
                                        value={ values.email }
                                        className={ touched.email && errors.email ? "has-error" : null } />
                                    { touched.email && errors.email ? (
                                        <ErrorMessage>{ errors.email }</ErrorMessage>
                                    ) : null }
                                </Form.Group>
                                <Form.Group controlId="loginPassword">
                                    <Form.Label>Password :</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder=""
                                        onChange={ handleChange }
                                        onBlur={ handleBlur }
                                        value={ values.password }
                                        className={ touched.password && errors.password ? "has-error" : null } />
                                    { touched.email && errors.password ? (
                                        <ErrorMessage className="error-message">{ errors.password }</ErrorMessage>
                                    ) : null }
                                </Form.Group>

                                <Row>
                                    <Button
                                        onClick={ () => history.push('/register') }>
                                        Register
				</Button>
                                    <Button
                                        disabled={ isSubmitting }
                                        type="submit">
                                        Log In
				</Button>
                                </Row>
                            </Form>
                        ) }
                </Formik>
            </CONTAINER>
        </>
    )
}
export default Login;