import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${props => props.theme['background']};
    color: ${props => props.theme['text-primary']};
    -webkit-font-smoothing: antialiased;
    font-family: Roboto;
  }
`;