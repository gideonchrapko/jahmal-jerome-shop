import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navbar.css';

const Navbar = () => {
    return (
        <Container fluid className="nav_master_container">
            <Row>
                <Col lg={12} className="d-xs-none d-none d-lg-block d-md-block">
                    <ul className="nav-container">
                        <li><Link className="nav_text" to="/">COURT</Link></li>
                        <li><Link className="nav_text" to="/commissary">COMMISSARY</Link></li>
                        <li><Link className="nav_text" to="/slot-time">SLOT TIME</Link></li>
                        <li><Link className="nav_text" to="/law-library">LAW LIBRARY</Link></li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default Navbar