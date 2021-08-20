import React,{useEffect} from 'react';
import{Card, Row, Col} from 'antd';
import * as Scroll from 'react-scroll';

import MainContact from '../../components/Web/MainBanner/MainContact';
import NoticeMessage from '../../components/Web/NoticeMessage';
import GoogleMap from '../../components/Web/GoogleMap';
import ContactForm from '../../components/Web/ContactForm';

import './Contact.scss';

const Contact = () => {//contact-banner
    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
      }, [])

    return (
        <div className="contact">
            <NoticeMessage/> 
            <MainContact img={"contact"} title={"Ponte en contacto con nuestros expertos"} description={"Con gusto resolveremos tus dudas."}/>
            <Row>
                <div className="contact-header">
                    <h1>
                        <strong>¿Cómo podemos ayudarte?</strong>
                    </h1>
                </div>
            </Row>
            <Row>
                <Col span={1}/>
                <Col span={22}>
                <Card bordered={false} className="contact-card">
                    <Card.Grid  className="contact-card__grid"  hoverable={false} >
                    <ContactForm/>
                    </Card.Grid>
                    <Card.Grid   className="contact-card__grid map" hoverable={false}>
                    <GoogleMap/>
                    </Card.Grid>
                </Card>
                </Col>
                <Col span={1}/>
            </Row>
        </div>
      );
}
 //            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="1920" height="1080" title="TechFix" style={{border:"none",overflow:"hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

export default Contact;

