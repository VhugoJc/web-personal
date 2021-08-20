import React from 'react';
import{Row,Col} from 'antd';

import './MainBanner.scss';

const MainContact = ({img, title, description, dark=true}) => {
    
    return (  
        <div className={`main-banner main-banner__${img}`} >
                {dark ?<div className="main-banner__dark" /> :null}
                <Row>
                    <Col lg={4}/>
                    <Col lg={16}>
                        <h2>
                            {title}
                        </h2>
                        <h3>
                            {description}
                        </h3>
                    </Col>
                    <Col lg={4}/>
                </Row>
            </div>
    );
}
 
export default MainContact;