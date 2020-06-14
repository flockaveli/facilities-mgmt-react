 import http from "../http-common";


 const postLogin = loginData => {
    return http.post("/auth", loginData);
  };

 const registerAccount = registrationData => {
    return http.post("/users", registrationData);
  };

// // export const loadUser = () => (dispatch, getState) => {
// //     dispatch({ type: USER_LOADING });
// //     isLoading: true
// // case USER_LOADED:
// //     return {
// //         ...state,
// //         isAuthenticated: true,
// //         isLoading: false,
// //         user: action.payload
// //     }
// // case LOGIN_SUCCESS:
// // case REGISTER_SUCCESS:
// // localStorage.setItem('token', action.payload.token);
// // return {
// //     ...state,
// //     ...action.payload,
// //     isAuthenticated: true,
// //     isLoading: false,
// //     }
// // case AUTH_ERROR:
// // case LOGIN_FAIL:
// // case LOGOUT_SUCCESS:
// // case REGISTER_FAIL:
// // localStorage.removeItem('token');
// // return {
// //     ...state,
// //     token: null,
// //     user: null,
// //     isAuthenticated: false,
// //     isLoading: false
// // }
// // default:
// // return state;
// // }

//     http.get('/auth/user', tokenConfig(getState) )
//     .then(res => dispatch({
//         type: USER_LOADED,
//         payload: res.data
//     }, push('/')))
//     .catch(err => {
//         dispatch(returnErrors(err.response.data, err.response.status));
//         dispatch({
//             type: AUTH_ERROR
//         })
//     })
// }

// // Register User
// export const register = ({ name, email, password }) => dispatch => {
//     const config = {
//         headers: {
//             "Content-type": "application/json"
//         }
//     }

//     const body = JSON.stringify({ name, email, password });

//     axios.post('/users', body, config)
//     .then(res => dispatch({ 
//         type: REGISTER_SUCCESS,
//         payload: res.data
//      }, push('/')))
//      .catch(err => {
//         dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
//          dispatch({
//              type: REGISTER_FAIL
//          })
//      })

// }

// // Login

// export const login = ({ email, password }) => dispatch => {
//     const config = {
//         headers: {
//             "Content-type": "application/json"
//         }
//     }

//     const body = JSON.stringify({ email, password });

//     axios.post('/auth', body, config)
//     .then(res => dispatch({ 
//         type: LOGIN_SUCCESS,
//         payload: res.data
//      }, push('/')))
//      .catch(err => {
//         dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
//          dispatch({
//              type: LOGIN_FAIL
//          })
//      })

// }

// // Logout
// export const logout = () => {
//     return {
//         type: LOGOUT_SUCCESS
//     }
// }


// export const tokenConfig = getState => {
//     const token = getState().auth.token;
//     const config = {
//         headers: {
//             "Content-type": "application/json"
//         }
//     }
//     if(token) {
//         config.headers['x-auth-token'] = token;
//     }
//     return config;
// }

export default {
  postLogin,
  registerAccount
}