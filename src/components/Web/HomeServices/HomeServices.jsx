import React from 'react';
import {Row, Col, Card, Button} from 'antd';
import{Link} from 'react-router-dom'
import img1 from '../../../assets/imagenes/jpg/ensamble.jpg';
import img2 from '../../../assets/imagenes/jpg/iphone_Batery.jpg';
import img3 from '../../../assets/imagenes/jpg/test.jpg';
import img4 from '../../../assets/imagenes/jpg/software.jpg';
import './HomeServices.scss'


const HomeServices = () => {

    return (  
        <Row className="home-services">
            <Col lg={24} className="home-services__title">
                <h2>Nuestros Servicios</h2>
            </Col>
            <Col lg={4}/>
            <Col lg={16}>
                <Row className="row-services">
                    <Col md={6}>
                        <CardCourse
                            image={img1}
                            title="GAMING"
                            subtitle="Techfix"
                            link="https://www.facebook.com/TechFixSLP/photos/127443959416883"
                            />
                    </Col> <Col md={6}>
                        <CardCourse
                            image={img2}
                            title="MÓVILES"
                            subtitle="Techfix"
                            link="https://www.facebook.com/TechFixSLP/photos/123656433128969"
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse
                            image={img3}
                            title="HARDWARE"
                            subtitle="tECHFIX"
                            link="https://www.facebook.com/TechFixSLP/photos/127156662778946"
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse
                            image={img4}
                            title="SOFTWARE"
                            subtitle="Techfix"
                            link = "https://www.facebook.com/TechFixSLP/photos/a.108637654630847/123377139823565/?type=3&theater"
                        />
                    </Col>
                </Row>  
             </Col>
             <Col lg={4}/>
             <Col log={24} className="home-services__more">
                <Link to ="/services">
                    <Button>Ver Servicios </Button>
                </Link>
            </Col>   
        </Row>
    );
}
 
export default HomeServices;


function CardCourse(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;
  
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Card
          className="home-services__card"
          cover={<img src={image} alt={title} />}
          //actions={[<Button>Ver más</Button>]}
        >
          <Meta 
                title={title} 
                //description={subtitle} 
        />

        </Card>
      </a>
    );
  }