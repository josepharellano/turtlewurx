import { graphql, useStaticQuery } from 'gatsby'
import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import {ThreeDSlider, SlideData} from './threedslider';

const UpcommingTour = ({start_date, end_date, where, title, cover, external})=>{
    const logo = getImage(cover);
    return (
        <a href={external} aria-label={title} className= "tour_wrapper">
            <div className="logo_wrapper">
                <GatsbyImage image={logo} alt={title} /> 
            </div>
            <div className="title_wrapper">
                <h2>{title}</h2>  
            </div>
            <div className= "details_wrapper">
            <p>
                Dates: {start_date} - {end_date} <br/>
                Where: {where} <br/>
            </p> 
            </div>
        </a>
    )
    
}

const StyledToursSection = styled.section`
        display: flex;
        flex-direction: column;
        -webkit-box-align: center;
        align-items: center;
        overflow: hidden;
`

const StyledUpcommingTour = styled.li`
        position: relative;


    .logo_wrapper {
        margin-right: 1em;
        grid-row-start: 1;
        grid-row-end: 2;
        min-height: 150px;
        max-height: 150px;
    }

    .title_wrapper {
        display: flex;
        grid-row-start: 1;
        grid-row-end: 2;
    }

    .details_wrapper {
        display:flex;
        justify-content: center;
        grid-column-start: 1;
        grid-column-end: 3;
    }

    .tour_wrapper {
        display:grid; 
        background-color: ${({theme})=> theme.colors.footerBGColor};
        color: ${({theme})=> theme.colors.light};
        max-width: 460px;
        padding: 2rem 1.75rem;
        transition-delay: 0ms;
        visibility: visible;
        opacity: 1;
        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s, opacity 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s, transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        
        &:hover {
            transform: translateY(-7px);
        }
    
        a {
            max-width: 100px;
            padding: 10px;
            align-self: center;
        }

        p {
            font-size: var(--fz-md);
            display: flex;
            margin-top: 0px;
        }

        h2 {
            font-size: 22px;
            align-self: center;
        }
    }

    @media (min-width:500px){

        
        .logo_wrapper {
            grid-row-start: 1;
            grid-row-end: 3;
        }

        .title_wrapper {
            grid-column-start: 2;
            grid-column-end: 3;
        }

        .details_wrapper {
            font-size: var(--fz-lg);
            grid-column-start: 2;
            grid-column-end: 3;
        }
    }
`

const StyledTourContainer = styled.ul`
    list-style: none;
    padding: 0px;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    margin: 50px 0px 0px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 460px));
    gap: 15px;
    position: relative;
    width: 100%;
    justify-content: center;
`

const Tours = ()=>{
    const data = useStaticQuery(graphql`
    query {
        tours: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/tours/"}
            }
            sort: { fields: [frontmatter___start_date], order: DESC }
            ){
                edges {
                    node {
                        frontmatter {
                            date_published
                            start_date
                            end_date
                            where
                            title
                            cover {
                                childImageSharp {
                                    gatsbyImageData(
                                        width: 150
                                    )
                                }
                            }
                            external
                            pillaged
                            photo {
                                childImageSharp {
                                    gatsbyImageData(
                                        layout: CONSTRAINED
                                    )
                                }
                            }     
                        }
                    }
                }
            }
    }
    `);
    
    const upcomming = data.tours.edges.filter(edge => !edge.node.frontmatter.pillaged);
    const slides = data.tours.edges.filter(edge => edge.node.frontmatter.pillaged)
                    .map((edge)=>{
                        let info = edge.node.frontmatter;
                        return new SlideData({title:info.title, image:info.photo});
                    });

    return (
        <StyledToursSection>
            <ThreeDSlider slides={slides} />
            <h2>Coming soon to a Con near you!</h2>
            <StyledTourContainer>
                    {upcomming &&
                    upcomming.map((tour,i)=>(
                        <StyledUpcommingTour key={i}>
                            <UpcommingTour {...tour.node.frontmatter} />
                        </StyledUpcommingTour>
                    ))}
            </StyledTourContainer>
        </StyledToursSection>
    );
}


export default Tours