import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap'

import phone from '../Assets/phone.png';
import background from '../Assets/Wall-01min.png'
import Paper from '../Assets/Paper.svg'

import Navbar from './Navigation/Navbar';

const Contact = () => {
    return (
    <div>
        <Navbar />
        <Container fluid style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center", width: "100vw", height: "100vh" }}>
            <img 
                src={phone} 
                className="contact-phone" 
            />
            <a href="mailto:contact@test.com" >
                <img
                    src={Paper}
                    className="contact-paper"

                />
            </a>
        </Container>
    </div>       
    )
}

export default Contact