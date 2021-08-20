import React from 'react';
import {Col,Row} from 'antd';
import './MainBanner.scss';
import Typed from 'react-typed';
const MainBanner = () => {

    return (  
        <div className="main-banner main-banner__home">
            <div className="main-banner__dark"/>

            <Row>
                <Col lg={4}/>
                <Col lg={16}>
                    <h2>
                    <Typed

                    strings={[
                        'Reparamos Celulares',
                        'Reparamos Computadoras',
                        'Reparamos Tablets',
                        'Reparamos Todo.'                        
                ]}
                    typeSpeed={36}
                    backSpeed={40}
                    loop                    
                />
                    </h2>
                    <h3>
                        Buscamos darte la solución que necesitas.
                    </h3>
                </Col>
                <Col lg={4}/>
            </Row>
        </div>
    );
}
 
export default MainBanner;