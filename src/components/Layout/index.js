import React from "react";
import { createGlobalStyle } from "styled-components";
import { Menu } from '../../components';

const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'Open Sans', sans-serif;
    line-height: 1.2;
    margin: 0 auto;
    padding: 20px;
    max-width: 1000px;
  }
  h1{
    font-size: 2em;
  }
`;

export const Layout = ({ children }) => {
    return (
        <div>
            <GlobalStyle />
            <section>
              <Menu/>
              {children}
            </section>
        </div>
    );
};
