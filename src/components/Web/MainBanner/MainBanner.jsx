import React from 'react';
import {Col,Row} from 'antd';
import './MainBanner.scss';
import Typed from 'react-typed';
const MainBanner = () => {

    return (  
        <div className="main-banner">
            <div className="main-banner__dark"/>

            <Row>
                <Col lg={4}/>
                <Col lg={16}>
                    <h2>
                    <Typed
                    strings={[
                    'Desarrollamos sitios web',
                    'Desarrollamos aplicaciones de escritorio',
                    'Desarrollamos aplicaciones móviles',
                    'Desarrollamos aplicaciones web',
                    'Desarrollamos Tecnología.']}
                    typeSpeed={35}
                    backSpeed={35}
                    loop
                />
                    </h2>
                    <h3>
                        Potencializamos tu negocio <br/>con la mejor tecnología.
                    </h3>
                </Col>
                <col lg={4}/>
            </Row>
        </div>
    );
}
 
export default MainBanner;