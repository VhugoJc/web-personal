import React from 'react';
import './HowIWork.scss';
import {Row, Col, Card} from 'antd'
import {ClockCircleOutlined, LockOutlined, 
        LaptopOutlined,FireOutlined, 
        CheckCircleOutlined, DollarCircleOutlined} from '@ant-design/icons'

const HowIWork = () => {
    return (
        <Row className="how-i-work">
          <Col lg={24} className="how-i-work__title">
            <h2>¿Por qué elegirnos?</h2>
            <h3>
              Trabajamos con cada dispositivo como si fuera nuestro,
               con los más altos estandares de calidad.
            </h3>
          </Col>
    
          <Col lg={4} />
          <Col lg={16}>
            <Row className="row-cards">
              <Col md={8}>
                <CardInfo
                  icon={<ClockCircleOutlined />}
                  title="Optimización"
                  description="Entendemos que el tiempo es primordial. Realizamos mantenimientos en tiempo y forma."
                />
              </Col>
              <Col md={8}>
                <CardInfo
                  icon={<LockOutlined />}
                  title="Seguridad"
                  description="Tenga la certeza que sus equipos están en manos expertas responsables y con principios."
                />
              </Col>
              <Col md={8}>
                <CardInfo
                  icon={<LaptopOutlined />}
                  title="Tecnología"
                  description="Contamos con tecnología y las herramientas necesarias para brindarle la mejor atención."
                />
              </Col>
            </Row>
            <Row className="row-cards">
              <Col md={8}>
                <CardInfo
                  icon={<FireOutlined />}
                  title="Experiencia"
                  description="Somos especialistas altamente capacitados en reparar todos sus dispositivos electrónicos."
                />
              </Col>
              <Col md={8}>
                <CardInfo
                  icon={<DollarCircleOutlined />}
                  title="El mejor precio"
                  description="Buscamos brindar la mejor atención y ofrecer el mejor precio relacionado con la calidad."
                />
              </Col>
              <Col md={8}>
                <CardInfo
                  icon={<CheckCircleOutlined />}
                  title="La mejor opción"
                  description="Somos la mejor opción en lo que sabemos hacer. Confía en los expertos...Confía en Techfix."
                />
              </Col>
            </Row>
          </Col>
          <Col lg={4} />
        </Row>
      );
}
 
export default HowIWork;



function CardInfo(props) {
    const { icon, title, description } = props;
    const { Meta } = Card;
  
    return (
      <Card className="how-i-work__card">
        {icon} 
        <Meta title={title} description={description} />
      </Card>
    );
  }