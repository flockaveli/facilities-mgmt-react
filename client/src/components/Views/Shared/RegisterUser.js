import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom'
import AuthDataService from '../../../services/AuthService'
import { useFmState, useFmDispatch, hasType } from '../../../services/fm-context'


const RegisterUser = () => {
    const state = useFmState();
    const dispatch = useFmDispatch()
    const { errors, user, isAuthenticated, isSubmitting } = state
    const [data, setData] = useState({ name: '', email: '', password: '' });

    const registerUser = () => {
        const { name, email, password } = data
        try {
            AuthDataService.registerAccount({ name, email, password })
                .then(result => {
                    if (result.status === 200) {
                        dispatch({
                            type: 'REGISTER',
                            payload: result.data
                        })
                        const { user, token} = result.data
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
                    } else {
                        console.log('Error')
                    }
                }).catch(e => {
                    console.log(e)
                })
        } catch (err) {
            console.error('Auth error', err)
        }
    }

    // useEffect(() => {
    //     if (isSubmitting) {
    //         const noErrors = Object.keys(errors).length === 0
    //         if (noErrors) {
    //             registerUser()
    //         } else {
    //         }
    //     }
    // }, [errors])

    // const handleBlur = () => {
    //     const validationErrors = registerValidate(user)
    //     // = validationErrors
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        registerUser()
        //const validationErrors = registerValidate(user)
    }

    // const registerValidate = (user) => {
    //     let errors = {}
    //     if (!user.email) {
    //         errors.email = 'Email is Required'
    //     } else if (
    //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
    //         errors.email = 'Invalid email address';
    //     }

    //     if (!user.name) {
    //         errors.name = 'Name is Required'
    //     } else if (user.name.length < 6) {
    //         errors.name = 'Name must be at least 6 chars'
    //     }
    //     if (!user.password) {
    //         errors.password = 'Password is Required'
    //     } else if (user.password.length < 6) {
    //         errors.password = 'Password must be at least 6 chars'
    //     }
    //     return errors;
    // }

    return (
        <div>
        {hasType(user, ['Worker']) ? (<Redirect to="/worker" />) : ( null ) }
        {hasType(user, ['Requester']) ? (<Redirect to="/requester" />) : ( null ) }
        {hasType(user, ['Admin']) ? (<Redirect to="/admin" />) : ( null ) }

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    onChange={ (e) => {
                        setData({
                            ...data,
                            [e.target.name]: e.target.value
                          })
                    } }
                    // onBlur={ handleBlur }
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={ data.name }
                    placeholder="Your full name"

                />
                {/* { errors.name && <p className="error-text">{ errors.name }</p> } */}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    // onBlur={ handleBlur }
                    onChange={ (e) => {
                        setData({
                            ...data,
                            [e.target.name]: e.target.value
                          })
                    } }
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    required
                    placeholder="Your Unitec email address"
                    value={ data.email }
                />
                { errors.email && <p className="error-text">{ errors.email }</p> }
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    // onBlur={ handleBlur }
                    onChange={ (e) => {
                        setData({
                            ...data,
                            [e.target.name]: e.target.value
                          })
                    } }
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="Create a password"
                    value={ data.password }
                />
                { errors.password && <p className="error-text">{ errors.password }</p> }
            </div>
            <button
                disabled={ isSubmitting }
                onClick={ handleSubmit }
                color="dark"
                style={ { marginTop: "2rem" } }
                className="btn btn-success">
                Register
				</button>
            <p><button style={ { marginTop: "2rem" } }
                className="btn btn-success">
                <Link to="/login">
                    Already have an account?</Link>
            </button>
            </p>
        </div>
    )
}

export default RegisterUser;