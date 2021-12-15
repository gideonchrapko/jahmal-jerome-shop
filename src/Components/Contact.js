import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap'

import phone from '../Assets/phone.png';
import background from '../Assets/Wall-01min.png'

import { motion } from 'framer-motion'

const Contact = () => {
const [hovered, setHovered] = useState(false)

    return (
        <Container fluid style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center", width: "100vw", height: "100vh" }}>
            <motion.img 
                src={phone} 
                className="contact-phone" 
                // style={{ marginBottom: '-50vh' }} 
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  onPointerEnter={() => setHovered(true)}
                  onPointerLeave={() => setHovered(false)}
            />
            {hovered ? 
            <h1>Contact us</h1>
            :
            <span></span>
            }

        </Container>
    )
}

export default Contact