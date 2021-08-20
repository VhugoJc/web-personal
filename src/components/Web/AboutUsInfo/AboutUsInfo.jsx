import React from 'react';
import{Row, Col} from 'antd';
import './AboutUs.scss';

import TeamBanner from './TeamBanner';

const AboutUs = ({users}) => {
    return (  
        <>
        
            <Row>
                <Col span={1}/>
                <Col span={22}>
                <div>
                    <div className="about-us-div">
                            <h2>Nuestro Objetivo</h2>
                            <h3>
                            Lorem Ipsum is simply dummy text of
                            the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's
                             standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of
                             type and scrambled it to make 
                            </h3>
                    </div>
                    <div className="about-us-div">
                            <h2>Nuestra Misión</h2>
                            <h3>
                            Lorem Ipsum is simply dummy text of
                            the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's
                             standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of
                             type and scrambled it to make 
                            </h3>
                    </div>
                    <div className="about-us-div about-us-div__why-choose-us">
                    <h2>¿Por qué elegirnos?</h2>
                            <h3>
                            Lorem Ipsum is simply dummy text of
                            the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's
                             standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of
                             type and scrambled it to make 
                            </h3>
                    </div>
                </div>
                </Col>
                <Col span={1}/>
        </Row>
        { users ?<TeamBanner    users={users}/> :null}
        </>
    );
}
 
export default AboutUs;