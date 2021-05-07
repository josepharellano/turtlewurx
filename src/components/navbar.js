import React, { useEffect, useState } from 'react';
import {Link, useStaticQuery, graphql} from 'gatsby';
import styled, {css} from 'styled-components';
import { navLinks } from '../config';
import { StaticImage } from 'gatsby-plugin-image';
import { useScrollDirection } from './hooks'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Logo = ()=>(
        <div className="logo" tabIndex="-1">
            <a href="/" aria-label="home">
                <StaticImage
                src = "../images/logo_fixed.png"
                alt='Studio Turtlewurx'
                placeholder="blurred"
                layout="fixed"
                width = {300}
                height = {100}
                />
            </a>
        </div>
)



const StyledHeader = styled.header`
    ${({theme})=> theme.mixins.flexBetween};
    background-color: ${({theme})=> theme.colors.body};
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 11;
    padding: 0px 50px;
    height: var(--nav-height);
    backdrop-filter: blur(10px);
    filter: none !important;
    pointer-events: auto !important;
    user-select: auto !important;
    backdrop-filter: blur(10px);
    transition: var(--transition);

    
     ${props =>
        props.scrollDirection === 'up' && !props.scrolledToTop &&
        css`
            height: var(--nav-scroll-height);
            transform: translateY(0px);
            background-color: ${({theme})=> theme.colors.navBar};
            box-shadow: 0 10px 30px -10px var(--nav-border-box);
        `};

    ${props =>
        props.scrollDirection === 'down' && !props.scrolledToTop &&
        css`
            height: var(--nav-scroll-height);
            transform: translateY(calc(var(--nav-scroll-height)* -1));
            background-color: ${({theme})=> theme.colors.navBar};
            box-shadow: 0 10px 30px -10px var(--nav-border-box);
        `};

    @media (max-width: 1080px) {
        padding: 0 40px;
    };
    
    @media (max-width: 768px) {
        padding: 0 25px;
    };
`;

const StyledNav = styled.nav`
    ${({theme})=> theme.mixins.flexBetween};
    position: relative;
    width: 100%;
    z-index: 12;

    a {
        color: ${({theme})=> theme.colors.text};
    }
`

const StyledLinks = styled.div`
    
    display: flex;
    align-items: center;
    font-family: var(--font);

    @media (max-width: 768px){
        display: none;
    }

    ol {
        ${({ theme })=> theme.mixins.flexBetween};
        padding: 0;
        margin: 0;
        list-style: none;
        li {
            margin: 0 5px;
            position: relative;
            font-size: var(--fz-lg);
            font-weight: 600;
            
            a{
                padding: 10px;
                display: inline-block;

                &:hover,
                &:focus {
                    color: ${({theme})=> theme.colors.highlight};
                }
            }
        }
    }

`;

const NavBar = ({isHome})=> {
    const [isNavMounted, setNavMounted] = useState(!isHome)
    const [scrolledToTop, setScrolledToTop] = useState(true)
    const scrollDirection = useScrollDirection('down');

    const handleScroll = () => {
        setScrolledToTop(window.pageYOffset < 100)
    }
    
    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);

        const timeout = setTimeout(()=>{
            setNavMounted(true);
        }, 100);

        return ()=> {
            clearTimeout(timeout)
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fadeClass = isHome ? 'fade' : '';
    const fadeDownClass = isHome ? 'fadedown' : '';
    const timeout = isHome ? 2000 : 0;
    console.log(`fadedownClass = ${fadeDownClass}`)
    
    return (
        <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
            <StyledNav>
                <Logo />
                <StyledLinks>
                    <ol>
                        <TransitionGroup component={null}>
                        {isNavMounted &&
                                navLinks && navLinks.map(({ url, name }, i)=> (
                                    <CSSTransition key={i} classNames={fadeDownClass} timeout = {timeout}>
                                        <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                                         <Link to={url}>{name}</Link>
                                        </li> 
                                    </CSSTransition>      
                            ))}
                        </TransitionGroup>
                    </ol>  
                </StyledLinks>
            </StyledNav>
        </StyledHeader>
    )
}

export default NavBar