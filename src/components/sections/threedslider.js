import React, {useReducer, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {StaticImage, getImage} from 'gatsby-plugin-image';
import {useTilt} from '../hooks';
import BackgroundImage from 'gatsby-background-image';
import { convertToBgImage} from 'gbimage-bridge';
import { CSSTransition, TransitionGroup } from 'react-transition-group';




class SlideData {
    constructor({title, subtitle, description, image} = {}) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.image = image;
    }
}

const Pillaged = ({children}) => (
    <div className = "pillaged">
        {children}
        <StaticImage
                src = "../../images/pillaged.png"
                alt=''
                placeholder="blurred"
                layout="constrained"  
                width={200}  
                objectFit='contain'    
                />
    </div>
)

const SlideBackground = ({className,image,children}) => {
    const bgImage = convertToBgImage(image);
    return (<BackgroundImage className={className} {...bgImage} alt="" >{children}</BackgroundImage>)
}


const Slide = ({slide, offset}) =>{
    const image = getImage(slide.image)
    const active = offset === 0 ? true : null;
    const ref = useTilt(active);

    return(
        <div  
            className="slide" 
            ref ={ref}
            data-active={active}
            style={{'--offset': offset, '--dir': offset === 0 ? 0 : offset > 0 ? 1 : -1}}
            >
            <div className="slideContent">
                <SlideBackground className="slideBackground" image={image} />
                <div className="slideContentInner">
                    <Pillaged>
                      <h2 className="slideTitle">{slide.title}</h2>
                    </Pillaged>       
                </div> 
            </div>
        </div>)
}


const SlidesContainer = ({state}) => (
    <div className= "slidesContainer">
                <Slide slide={state.prevSlide} offset = {-1} />
                <Slide slide={state.nextSlide} offset = {1} />
                <Slide slide={state.currentSlide} offset = {0} />
    </div>

)


const slideReducer = (slides) =>{ 
    return (
     (state, event) => {
        let len = slides.length;
        let activeIndex = state.slideIndex;
        
        if ( event.type === 'NEXT') {
            activeIndex = (state.slideIndex + 1) % len;
        }
        
        if ( event.type === 'PREV') {
                activeIndex = state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1;
        }   

        let prevSlide = activeIndex  - 1 >= 0 ? slides[activeIndex - 1] : slides[slides.length - 1];
        let currentSlide = slides[activeIndex];
        let nextSlide = activeIndex + 1 < slides.length ? slides[activeIndex + 1] : slides[0];

        return {
            prevSlide: prevSlide,
            currentSlide: currentSlide,
            nextSlide: nextSlide,
            slideIndex: activeIndex,
        }
    })
}

const initialState = (slides) => {
    return {
        prevSlide: slides[slides.length - 1],
        currentSlide: slides[0],
        nextSlide: slides[1],
        slideIndex: 0
    }
}

const StyledThreeDSlider = styled.div`

    display:flex;
    width: 100%;
    height: 100%;
    justify-content: center;


> button {
    appearance: none;
    background: #06150cba;
    border: none;
    color: ${({theme})=> theme.colors.highlight};
    border-radius: 50px;
    position: absolute;
    font-size: 5rem;
    width: 5rem;
    height: 5rem;
    top: 470px;
    transition: opacity 0.3s;
    opacity: 0.5;
    z-index: 5;
    text-align: center;
    padding: 0px;

    &:hover {
      opacity: 1;
    }

    &:focus {
      outline: none;
    }

    &:first-child {
      left: 50px;
    }
    &:last-child {
      right: 50px;
    }
  }


    .slidesContainer {
        transform: perspective(600px) translateX(calc(100% * var(--offset)))
        rotateY(calc(-45deg * var(--dir)));
        display: grid;


        > .slide {
            grid-area: 1 / -1;
        }

    }
    
    
    .slideBackground {
        display: grid;
        grid-template-columns: 65% minmax(350px, auto);
        grid-area: 1/1;

        z-index: -3;


    }

    .slideContent {
        height: 350px;
        width: 350px;
        display: grid;
        transform-style: preserve-3d;
        grid-template-columns: 65% minmax(300px, auto);
        grid-template-rows: 30%;
        
        transition: transform 1.5s ease-in-out;

        transform: perspective(600px) translateX(calc(100% * var(--offset)))
        rotateY(calc(-45deg * var(--dir)));
        

        > div {
            height: inherit;
            width: inherit;
        }

    }

    .slideContent::after{
        content: '';
        width: 100%;
        height: 100%;
        display: block;
        top: 0;
        left: 0;
        position: absolute;
        background: rgba(6, 21, 12, .8);
    }
    .slide {
        transform-style: preserve-3d;
        display:none;
        }
    
    [data-active] {
        z-index: 2;
        pointer-events: auto;

        display:flex;

        .slideContent{
                transform: none;
                opacity: 1;

                --x: calc(var(--px) - 0.5);
                --y: calc(var(--py) - 0.5);
                transform: perspective(1000px);
                
                &:hover {
                    transition: none;
                    transform: perspective(1000px) rotateY(calc(var(--x) * 45deg))
                    rotateX(calc(var(--y) * -45deg));
                }
            }

        .slideContent::after{
            background: rgba(0,0,0,0);
        }

        .slideContentInner{
            opacity: 1;
        }
    }

    .slideContentInner {
        width: inherit;
        position: relative;
        transform-style: preserve-3d;
        transform: translateZ(2rem);
        transition: opacity 0.3s linear;
        text-shadow: 0 0.1rem 1rem #000;
        opacity: 0;
        grid-area: 1/1/2;
        font-family: sans-serif;
        color: ${({theme})=> theme.colors.highlight};
        z-index: 1;

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 40% minmax(58px,auto);

        
    }

    .slideTitle {
        font-size: 2rem;
        font-weight: normal;
        letter-spacing: 0.2ch;
        text-transform: uppercase;
        margin: 0;
        grid-area: 1/2/2;
    }

    .pillaged {
        width: 100%;
        position: absolute;
        /* top: -100%;
        left: 95%; */
        min-width: 275px;

        flex-direction: column;
        display: flex;
        grid-area: 1/1/1;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 90%), 0 6px 20px 0 rgb(0 0 0 / 80%);
        padding: 10px;

        /* transform: perspective(1000px) translateX(calc(100% * var(--offset)))
        rotateY(calc(-45deg * 1)); */
    }


    

    .slidecontentInner::after {
            transform: translateZ(3rem);
    }

    @media (min-width: 768px){
        
        overflow: hidde;

        .slide {
            display: block;
        }

        button {
            display: flex;
            align-self: center;
            background: transparent;
            position:static;
            justify-content: center;
            align-self: flex-end;
            margin: 0px 50px;
        }

    }

    @media (min-width: 1000px){
        .pillaged {
            transform: perspective(1000px) translateX(calc(100% * var(--offset)))
            rotateY(calc(-45deg * 1));
            grid-area: 1/2/1;
        }
    }
    
`

const ThreeDSlider = ({slides}) => {
    
    const [state, dispatch] = useReducer(slideReducer(slides), initialState(slides));

    return(
            <StyledThreeDSlider>
                <button onClick= {()=> dispatch({type: 'PREV'})}>˂</button>
                <SlidesContainer state = {state} />
                <button onClick= {()=> dispatch({type: 'NEXT'})}>˃</button>
            </StyledThreeDSlider>
    )
}

export {ThreeDSlider, SlideData};