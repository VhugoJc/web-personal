import React from 'react'
import {Carousel} from 'antd';
import MainContact from '../../../components/Web/MainBanner/MainContact';

import './CarouselServices.scss';
  
const CarouselServices = () => {
    const services = [
        {
            img: "services",
            title: "Reparación de Equipos",
            description: "¿Tiene alguna falla? Dejalo en nuestras manos y nosotros nos hacemos cargo"
        },
        {
            img: "services2",
            title: "Mantenimiento Preventivo",
            description: "Dale más vida a tu equipo o mejora su rendimiento con nosotros."
        },
        {
            img: "services1",
            title: "Venta de accesorios",
            description: "Tenemos fundas, micas de cristal y muchos otros accesorios. Pregunta por el modelo de tu celular."
        }
    ]
    return (  
        <>
         <Carousel autoplay>
             {
                 services.map(service=>(
                    <div className="carousel-services">
                        <MainContact img={service.img} title={service.title} description={service.description}/>
                    </div>
                 ))
             }
         </Carousel>
        </>
    );
}
 
export default CarouselServices;