import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro';


export const GlobalStyle = createGlobalStyle`

html {
width: 100%;
  height: 100%;
  
  background: #ECF0F3;
  font-size: 17px;
  
}
body {
    font-family: 'Roboto', sans-serif;
    background: #ECF0F3;
    
width: 100%;
  height: 100%;
  
    font-family: ${props => props.theme.fontFamily};
    margin: 0 auto;
  
}
#root, .App {
  height: 100%;
  
  background-color: #ECF0F3;
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
  margin: 1em;
}
h3 {
  font-size: 2rem;
  margin: 1em;
}
h4 {
  font-size: 2rem;
  margin: 1em;
}

  .btn,
  .btn-primary,
  .button {
    border: 0 !important;
    box-shadow: rgb(209, 217, 230) 18px 18px 30px 0px, rgb(255, 255, 255) -18px -18px 30px 0px;
    color: #666 !important;
    border: 0 !important;
    background-color: #ecf0f3 !important;
    border-color: #ecf0f3;

    :focus,
:active,
    :hover {
      background-color: #ecf0f3 !important;
      color: #666 !important;
      border: 0 !important;
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


