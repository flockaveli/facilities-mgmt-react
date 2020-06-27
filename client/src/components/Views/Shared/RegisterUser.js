import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro'
import { Redirect, useHistory } from 'react-router-dom'
import { Row, Container, Col, Button, Form } from 'react-bootstrap'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'

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

const RegisterUser = () => {
    const state = useFmState();
    const dispatch = useFmDispatch()
    const history = useHistory()

    const { user } = state






    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, "Your name must be at least 5 characters")
            .max(25, "No more than 25 characters please")
            .required("Please enter your name"),
        password: Yup.string()
            .min(5, "Password must be at least 5 characters")
            .max(25, "Password can't be longer than 20 characters")
            .required("Please enter password"),
        email: Yup.string()
            .email("Please enter a valid email address")
            .max(30, "Email must be less than 30 characters")
            .required("Email address is required")
            .test('Unitec', 'A Unitec email address is required', function (email) { return email.includes('unitec.ac.nz') })
    });


    return (

        <CONTAINER>
            <Row>
                <UfmLogo src={ Logo } />
            </Row>
            { hasType(user, ['Worker']) ? (<Redirect to="/worker" />) : (null) }
            { hasType(user, ['Requester']) ? (<Redirect to="/requester" />) : (null) }
            { hasType(user, ['Admin']) ? (<Redirect to="/admin" />) : (null) }

            <Formik
                initialValues={ { name: "", email: "", password: "" } }
                validationSchema={ validationSchema }
                onSubmit={
                    (values, { setSubmitting }) => {
                        setSubmitting(true);
                        AuthDataService.registerAccount(values)
                            .then(result => {
                                if (result.status === 200) {
                                    dispatch({
                                        type: 'REGISTER',
                                        payload: result.data
                                    })
                                    const { user, token } = result.data
                                    localStorage.setItem("user", JSON.stringify(user));
                                    localStorage.setItem("token", token);
                                } else {
                                    console.log('Error')
                                }
                            }).catch(e => {
                                console.log(e)
                            })
                    } }
            >
                { ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                        <Form onSubmit={ handleSubmit } >
                            <Form.Group controlId="nameRegistration">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Please enter your full name"
                                    onChange={ handleChange }
                                    onBlur={ handleBlur }
                                    value={ values.name }
                                    className={ touched.name && errors.name ? "has-error" : null } />
                                { touched.name && errors.name ? (
                                    <ErrorMessage>{ errors.name }</ErrorMessage>
                                ) : null }
                            </Form.Group>
                            <Form.Group controlId="registerEmail">
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
                                    <div className="error-message">{ errors.email }</div>
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
                                    <div className="error-message">{ errors.password }</div>
                                ) : null }
                            </Form.Group>
                            <Row><Button onClick={ () => history.push('/login') }>
                                Already have an account?
                            </Button><Button
                                    disabled={ isSubmitting }
                                    type="submit">
                                    Register
				</Button>
                            </Row>  </Form>
                    ) }
            </Formik>

        </CONTAINER >
    )

}

export default RegisterUser;