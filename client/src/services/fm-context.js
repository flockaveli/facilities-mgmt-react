import React, { createContext, useReducer } from "react";

const FmStateContext = createContext()
const FmDispatchContext = createContext()

let initialState = {
  user: JSON.parse(window.localStorage.getItem("user")) || {
    _id: "",
    email: "",
    name: "",
    type: "",
    enabled: null
  },
  token: window.localStorage.getItem("token") || null,
  isAuthenticated: false,
  requests: [],
  categories: [],
  SelectedUser: [],
  SelectedRequest: {
    name: "",
    category: "",
    status: "",
    requester: {
      _id: "",
      email: "",
      name: ""
    },
    photos: [],
    priority: '',
    location: {
      building: "",
      lat: null,
      lng: null
    },
    assignment: {
      workers: [],
      assignmentMessage: "",
    },
    messages: [{
      sender: "",
      message: "",
      photos: []
    }],
    workerLog: [{
      sender: "",
      resolution: "",
      message: "",
      photos: []
    }]
  },
  isFetching: false,
  errors: []
}

export const FmReducer = (state, action) => {

  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: {
          _id: "",
          email: "",
          name: "",
          type: "",
          enabled: null
        },
        token: null,
        isAuthenticated: false,
        requests: [],
        categories: [],
        SelectedUser: [],
        SelectedRequest: {
          photos: [],
          location: {
            building: "",
            lat: null,
            lng: null
          },
          assignment: {
            workers: [],
            assignmentMessage: ''
          },
          messages: [{
            sender: "",
            message: "",
            photos: []
          }],
          workerLog: [{
            sender: "",
            resolution: "",
            message: "",
            photos: []
          }]
        },
        isFetching: false,
        errors: []
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      };
    case "FETCHING":
      return {
        ...state,
        isFetching: true
      };
    case "GET_REQUESTS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        requests: action.payload
      };
    case "FAILURE":
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
    case "SELECTED_USER":
      return {
        ...state,
        SelectedUser: action.payload,
        isFetching: false
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        isFetching: false
      };
    case "CREATED_REQUEST":
      return {
        ...state
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