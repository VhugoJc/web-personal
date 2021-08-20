import React from 'react';
import './Footer.scss';
import {Layout, Col, Row} from 'antd'
import MyInfo from './MyInfo';
import NavigationFooter from './NavigationFooter';
import NewsLetter from './NewsLetter';



const Footer = () => {
    const {Footer} = Layout;
    return ( 
        <Footer className="footer">
            <Row>
                <Col md={4}/>
                <Col md={16}>
                    <Row>
                    <Col md={8}>
                        <MyInfo/>
                    </Col>
                    <Col md={8}>
                    <NavigationFooter/>
                    </Col>
                    <Col md={8}>
                        <NewsLetter/>
                    </Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col md={12}>2020 ALL RIGHTS RESERVER -</Col>
                        <Col md={12}>-   Desarrollo web</Col>
                    </Row>
                </Col>
                <Col md={4}/>
            </Row>
        </Footer>
    );
}
 
export default Footer;