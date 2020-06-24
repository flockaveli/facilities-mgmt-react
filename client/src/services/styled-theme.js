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
  padding: 0.5em;
}
h2 {
  font-size: 2.5rem;
  padding: 2em;
}
h3 {
  font-size: 2rem;
  padding: 2em;
}
h3 {
  font-size: 4rem;
  padding: 2em;
}
  body {
    font-family: ${props => props.theme.fontFamily};
  }
Button {
  padding: 2em;
}
Row {
  padding: 1.5em;
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


