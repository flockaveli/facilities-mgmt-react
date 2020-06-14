import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro';


export const GlobalStyle = createGlobalStyle`
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
}
h2 {
  font-size: 2.5rem;
}
h3 {
  font-size: 2rem;
}
  body {
    font-family: ${props => props.theme.fontFamily};
  }
`

const theme = {
  colors: {
    main: '#f4f4f4',
    secondary: 'mediumseagreen',
    background: '#ECF0F3',
    backgrounddarkshadow: '#ECF0F3',
    backgroundlightshadow: '#FFF',
    security: '',
    exterior: '',
    maintenance: '',
    cleaning: '',
    signage: '',
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

