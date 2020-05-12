import React from 'react';

import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore, { history } from "./store";

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();


ReactDOM.render(
<Provider store={store}>
        <App history={history}/>
</Provider>,
document.getElementById('root')
        ); 


