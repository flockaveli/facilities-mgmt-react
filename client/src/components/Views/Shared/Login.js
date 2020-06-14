import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import styled from 'styled-components';
import { Container, Row, Button, Col, Form } from 'react-bootstrap';

import AuthDataService from '../../../services/AuthService'
import { useFmState, useFmDispatch, hasType } from '../../../services/fm-context'

const CONTAINER = styled.div`
background: ${props => props.theme.colors.background};
  height: auto;
  width: 80%;
  margin: 5em auto;
  padding: 2em;
  
border-radius: 30px !important;
box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;

  @media(min-width: 786px) {
    width: 60%;
  }

  label {
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24B9B6;
    padding-top: .5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #FF6565;
  }

  .error-message {
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    position: absolute;
    font-size: .8em;
  }


`;

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(5, "*Password must be at least 5 characters")
        .max(100, "*Password can't be longer than 20 characters")
        .required("*Please enter password"),
    email: Yup.string()
        .email("*Please enter a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required")
});

const Login = () => {

    //accessing global state and dispatcher
    const context = useFmState();
    const dispatch = useFmDispatch();

    const { user } = context
    //functions to call login action from dispatcher with data from local state

    return (
        //redirects to differentiated app homepages if user is logged in
        <CONTAINER>

            { hasType(user, ['Worker']) ? (<Redirect to="/worker" />) : (null) }
            { hasType(user, ['Requester']) ? (<Redirect to="/requester" />) : (null) }
            { hasType(user, ['Admin']) ? (<Redirect to="/admin" />) : (null) }


            <Formik
                initialValues={ { email: "", password: "" } }
                validationSchema={ validationSchema }
                onSubmit={ (values, { setSubmitting }) => {
                    setSubmitting(true); try {
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
                        <Form onSubmit={ handleSubmit } className="mx-auto">
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
                            <Button
                                disabled={ isSubmitting }
                                type="submit">
                                Log In
				</Button>
                        </Form>
                    ) }
            </Formik>
        </CONTAINER>
    )
}
export default Login;