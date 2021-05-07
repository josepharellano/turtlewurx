import React from 'react'
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import config from '../config';
import { ContactForm } from './sections';

const BorderImage = ()=>(
        <div>
            <StaticImage
                src = "../images/footer_border.png"
                alt='Studio Turtlewurx'
                placeholder="blurred"
            />
        </div>
)

const FooterLogo = () => (
    <div className="logo">
        <StaticImage
            src = "../images/logo_footer.png"
            alt = 'Studio Turtlewurx'
            placeholder="blurred"
        />
    </div>
)

const FacebookIcon = () => (
    <a href = 'https://www.facebook.com/TurtlewurX/' aria-label= "Facebook">
        <StaticImage
            src = "../images/fbicon.png"
            alt = 'Facebook'
            placeholder = "blurred"
            width={75}
            />
    </a>
)

const CopyRightInfo = () => (
    <p>
        {config.copyRightInfo}
    </p>
)

const ContactInfo = () => (
        <p>{config.contactInfo.name}<br/>
            {config.contactInfo.addressLine}<br/>
            {config.contactInfo.city}, {config.contactInfo.state} {config.contactInfo.zip} <br/>            
            {config.contactInfo.phone}<br/>
            {config.contactInfo.email}<br/>
        </p>
)

const StyledContactInfor = styled.address`
    background-color: inherit;
    font-size: var(--fz-md);
`

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: row;
    background-color: ${({theme})=> theme.colors.footerBGColor};
    align-items: center;
    color: ${({theme}) => theme.colors.highlight};
    flex-wrap: wrap;
    justify-content: space-around;

    
    h2 {
            border-style: ridge;
            border-color: ${({theme})=> theme.colors.light};
            border-top-style: hidden;
            border-right-style: hidden;
            border-left-style: hidden;
            text-align: center;
            line-height: 1;
            width: 100%;
            font-weight: 400;
            font-size: 26px;
            padding: 0px 20px;
        }

    p {
       
        padding: 0px 25px;
        line-height: 1.3;
        max-width: 1240px;
    }

    p:nth-child(1){
        line-height:1;
    }

    .logo {
        max-width: 250px;
    }

    .contact_wrapper {
        width: 100%;
        max-width: 640px;
        display:flex;
        flex-direction:column;
        align-items: center;
        padding: 0px 20px;
        

        form {
            padding: 20px;
        }
    }

    .icons_wrapper {
        display: flex;
        justify-content: center;
    }

   
    @media (min-width: 768px){
        .info_wrapper {
            display:flex;
            width: 100%;
            max-width: 600px;
            justify-content: space-between;
            padding: 25px 40px;
            align-self: flex-start;
        }

        .contact_wrapper {
            padding: 25px 40px;
        }

    }

`


const StyledFooterBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: inherit;
    font-size: var(--fz-xs);

`

const Footer = ()=>(
    <StyledFooter>
            <FooterLogo />
            <div className="contact_wrapper">
                <h2>Get In Touch</h2>
                <ContactForm /> 
            </div>
            <div className="info_wrapper">
                <div>
                    <h2>Get Connected</h2>
                    <div className = "icons_wrapper">
                        <FacebookIcon  />  
                    </div>
                </div>
                <div>
                    <h2>Our Office</h2>
                    <ContactInfo /> 
                </div>
             
            </div>
        <StyledFooterBottom>
            <CopyRightInfo />
            <BorderImage />
        </StyledFooterBottom>
    </StyledFooter>
)

export default Footer