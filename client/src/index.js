import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import history from './services/history';
import { FmProvider } from './services/fm-context'
import App from './App';

ReactDOM.render(
        <Router history={ history }>
                <FmProvider>
                        <App />
                </FmProvider>
        </Router>,
        document.getElementById('root')
);

