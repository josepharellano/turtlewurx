import { createGlobalStyle } from 'styled-components';
import { config } from '../config';
import "@fontsource/titillium-web";
import "@fontsource/titillium-web/600.css"
import TransitionStyles from './TransitionStyles';

const GlobalStyle = createGlobalStyle`
    :root {

        --font: "Titillium Web";
        --nav-scroll-height: 100px;
        --nav-height: 125px;
        --fz-xxs: 12px;
        --fz-xs: 13px;
        --fz-sm: 14px;
        --fz-md: 16px;
        --fz-lg: 18px;
        --fz-xl: 20px;
        --fz-xxl: 22px;
        --fz-heading: 32px;
        --nav-border-box: ${({theme}) => theme.colors.navBorder};
        --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
        --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

        --border-radius: 4px;

        --dark-navy: #020c1b;
        --navy: #0a192f;
        --light-navy: #112240;
        --lightest-navy: #233554;
        --navy-shadow: rgba(2, 12, 27, 0.7);
        --dark-slate: #495670;
        --slate: #8892b0;
        --light-slate: #a8b2d1;
        --lightest-slate: #ccd6f6;
        --white: #e6f1ff;
        --green: #64ffda;
        --green-tint: rgba(100, 255, 218, 0.1);
    }

    html {
        box-sizing: border-box;
        width: 100%;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    

    /* Scrollbar Styles */

    body::-webkit-scrollbar {
        height: 5px;
        width: 8px;
    }

    body::-webkit-scrollbar-track {
        background-color: ${({theme}) => theme.colors.scrollBarTrack};
    }

    body::-webkit-scrollbar-thumb{
        background-color: ${({theme}) => theme.colors.scrollBarTab};
        border: 3px solid ${({theme}) => theme.colors.scrollBarTab};
        border-radius: 10px;

    }

    body {
        margin: 0;
        width: 100%;
        min-height: 100%;
        overflow-x: hidden;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        background-color: ${({theme}) => theme.colors.body};
        line-height: 1.3;
        margin: 0;
        font-size: var(--fz-xl);
        font-family: var(--font);
    }

    a {
        text-decoration: none;
        text-decoration-skip-ink: auto;
        display: inline-block;
        color: inherit;
        position: relative;
    }

    section {
        margin: 0 auto;
        padding: 100px 0;
        max-width: 1000px;

        @media (max-width: 768px){
            padding: 80px 0;
        }
        @media (max-width: 480px){
            padding: 60px 0;
        }
    }

    ${TransitionStyles};
    `;

    export default GlobalStyle