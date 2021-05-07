import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../styles';
import { Footer, NavBar } from '../components'

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin-top : var(--nav-height)
`

const Layout = ({children, location}) => {
    const isHome = location.pathname === '/';
    console.log(`isHome = ${isHome}`)
    return (
        <>
            <div id='root'>
                <ThemeProvider theme={theme} >
                    <GlobalStyle />
                    <StyledContent>
                        <NavBar isHome= {isHome}/>
                        <div id='content'>
                          {children}
                        </div>
                    </StyledContent>
                    <Footer />
                 
                </ThemeProvider>
            </div>
        </>
    )
};

export default Layout;