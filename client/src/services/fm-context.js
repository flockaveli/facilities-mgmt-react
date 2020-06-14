import React, { createContext, useReducer } from "react";

const FmStateContext = createContext()
const FmDispatchContext = createContext()

let initialState = {
  user: JSON.parse(window.localStorage.getItem("user")) || {
    email: "",
    password: "",
    type: "",
  },
  token: window.localStorage.getItem("token") || null,
  isAuthenticated: false,
  requests: [],
  requestFilter: '',
  categories: [],
  SelectedRequest: {},
  isLoading: false,
  errors: []
}

export const FmReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: {
          email: "",
          password: "",
          type: "",
        },
        token: null,
        isAuthenticated: false,
        requests: [],
        categories: [],
        SelectedRequest: {},
        isLoading: false,
        errors: []
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    // case "ERROR":
    //   localStorage.clear();
    //   return {
    //     ...state,
    //     error: "Error",
    //     isAuthenticated: false,
    //     user: null,
    //     isLoading: false,
    //     password: ''
    //   };
    case "FETCHING_REQUESTS":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "GET_REQUESTS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        requests: action.payload
      };
    case "GET_REQUESTS_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    case "SELECTED_REQUEST":
      return {
        ...state,
        SelectedRequest: action.payload,
        isFetching: false
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        isFetching: false
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
};

function FmProvider({ children }) {
  const [state, dispatch] = useReducer(FmReducer, initialState)
  return (
    <FmStateContext.Provider value={ state }>
      <FmDispatchContext.Provider value={ dispatch }>
        { children }
      </FmDispatchContext.Provider>
    </FmStateContext.Provider>
  )
}

function useFmState() {
  const context = React.useContext(FmStateContext)
  if (context === undefined) {
    throw new Error('useFmState must be used within a FmProvider')
  }
  return context
}

function useFmDispatch() {
  const context = React.useContext(FmDispatchContext)
  if (context === undefined) {
    throw new Error('useFmDispatch must be used within a FmProvider')
  }
  return context
}


export const hasType = (user, type) =>
  type.some(type => user.type.includes(...type));

export { useFmState, useFmDispatch, FmProvider }