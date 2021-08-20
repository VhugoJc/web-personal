import React, { Fragment } from 'react';
import './NavigationFooter.scss';
import {Row, Col} from 'antd'
import {Link} from 'react-router-dom';
import {TeamOutlined, MessageOutlined, LaptopOutlined, WhatsAppOutlined} from '@ant-design/icons';
const NavigationFooter = () => {
    return (  
        <Fragment>
        <Row className="navigation-footer">
            <Col md={24}>
                <h3>Links Rápidos: </h3>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <RenderListLeft/>
            </Col>
            <Col md={12}>
                <RenderRight/>
            </Col>
        </Row>
        </Fragment>
    );
}
 
export default NavigationFooter;

export function RenderListLeft(){
    return(
        <ul>
        <li>
            <Link to="/about">
            <TeamOutlined /> Nosotros
            </Link>
        </li>
        <li>
            <Link to="/contact">
            <MessageOutlined /> Contacto
            </Link>
        </li>
        <li>
        <Link to="/services">
            <LaptopOutlined /> Servicios
        </Link>
        </li>
    </ul>
    );
}

export function RenderRight(){
    return(
    <ul>
        <li>
         {/*eslint-disable-next-line */}
            <a href="" target="_blank" rel="noopener referrer">
                <WhatsAppOutlined /> WhatsApp
            </a>
        </li>
    </ul>
    )
}