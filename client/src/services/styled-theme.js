import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro';


export const GlobalStyle = createGlobalStyle`

html {
background: '#ECF0F3';
}
body {
    font-family: 'Roboto', sans-serif;
    background: '#ECF0F3';

}

a {
    color: #666666;
    letter-spacing: 1px;
}

a:hover {
    color: #666666;
}

.navbar a {
    font-weight: bold;
}

.navbar a:hover {
    text-decoration: none;
}

.intro-text {
    text-align: center;
    font-size: 26px;
}

label.form-label {
    font-size: 20px;
}
 

.AdminDashboard__FilterBar{
  justify-content: space-evenly;
   .btn-primary {
    margin-top: 35px;
}
}
html {
  font-size: 17px;
}
@media (max-width: 900px) {
  html { font-size: 15px; }
}
@media (max-width: 400px) {
  html { font-size: 13px; }
}
h1 {
  font-size: 3rem;
  padding: 0.5em;
}
h2 {
  font-size: 2.5rem;
  margin: 2em;
}
h3 {
  font-size: 2rem;
  margin: 2em;
}
h4 {
  font-size: 4rem;
  margin: 2em;
}
  body {
    font-family: ${props => props.theme.fontFamily};
  }

  .btn,
  .btn-primary,
  button {
    border: 0;
    padding: 1em;
    margin: 2em;
    box-shadow: rgb(209, 217, 230) 18px 18px 30px 0px, rgb(255, 255, 255) -18px -18px 30px 0px;
    color: #666;
    background-color: #ecf0f3;
    border-color: #ecf0f3;

    :hover {
      background-color: #ecf0f3;
      color: #666;
    }


    :focus {
    color: #666;
    background-color: #ecf0f3;
    border-color: #ecf0f3;
    box-shadow: none;
    font-weight: bold;
}

  }

  



`

const theme = {
  colors: {
    main: '#f4f4f4',
    background: '#ECF0F3',
    backgrounddarkshadow: '#ECF0F3',
    backgroundlightshadow: '#FFF',
    security: '#FFA500',
    exterior: '#00BFFF',
    maintenance: '#3CB371',
    cleaning: '#FF5733',
    signage: '#8B008B',
  },
  mainfont: 'sans-serif',
  margin: 0,
  border: 0,
  fontFamily: 'Helvetica, sans-serif',
};

export function StyleProvider({ children }) {
  return (
    <ThemeProvider theme={ theme }>
      { children }
    </ThemeProvider>
  )
}


