import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles';

const ContactForm = ()=>(
    <form method="post" action="#">
            <div className="contact_section">
                <input type="text"arua-label='name' name="name" id="name" placeholder='Your Name' />
                <input type="email" arua-label='email'name ="email" id="email" placeholder='Email' />
            </div>
            <input type="text" arua-label='subject'name ="subject" id="subject" placeholder='Subject' />
            <textarea type="text" arua-label='message' name ="message" id="message" rows="5" placeholder='Your Message' />
            <button className="submit_btn" type="submit">Submit</button>
    </form>
)

const Styles = styled.div`
    width: 100%;
    max-width: 600px;

    form{
        color: inherit;
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;

        .contact_section {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            max-width: 600px;

        input#name, input#email{
            max-width: 250px;
        }

        input#subject, input#message {
            width: 100%;
        }
        }
    
        input {
            margin: 10px 0px;
            border-top-style: hidden;
            border-right-style: hidden;
            border-left-style: hidden;
            background-color: inherit;
            height: 35px;
            width:100%;
            color: inherit;
            font-size: var(--fz-md);

        }

        textarea {
            background-color: inherit;
            color: ${({theme})=> theme.colors.highlight};
            font-size: var(--fz-md);
            width:100%;
        }

        textarea::placeholder{
            color: ${({theme})=> theme.colors.highlight};
            font-family: var(--font);
            font-size: var(--fz-md);
        }
       
        input::placeholder{
            color: ${({theme})=> theme.colors.highlight};
            font-family: var(--font);
            font-size: var(--fz-md);
        }

        .submit_btn {
            ${({theme})=> theme.mixins.button};
            width: 125px;
            color:  ${({theme})=> theme.colors.light};
            border-color: ${({theme})=> theme.colors.body};
            margin-top: 25px;
            font-size: var(--fz-lg);
        }

}

    
`

const StyledContactForm = () =>(
    <Styles>
        <ContactForm />
    </Styles>
)

export default StyledContactForm;