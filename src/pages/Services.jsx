import React,{useEffect, useState} from 'react';
import * as Scroll from 'react-scroll';
import { notification} from 'antd';

import CarouselServices from '../components/Web/CarouselServices';
import ImgGallery from '../components/Web/ImgGallery';
import ButtonBanner from '../components/Web/ButtonBanner';

//api
import {getServices} from '../api/servicesImg';
const Services = () => {
    const [imagesServices, setimagesServices] = useState([]);
    const [imagesWorks, setimagesWork]=useState([]);
    
    useEffect(()=>{
        Scroll.animateScroll.scrollToTop();
        const getServicesFunc=async()=>{
            const results = await getServices();
            
            if(results.services){//si se cargó exitosamente
                
                results.services.forEach(item=>{
                    if(item.active===true){
                        setimagesServices(oldArray => [...oldArray, item]);
                    }
                })
            }else{
                notification["error"]({
                    message: results.message
                })
            }
        }
        getServicesFunc();
        
        setimagesWork([
            {
                src:'https://scontent.fslp1-1.fna.fbcdn.net/v/t1.6435-9/161777805_112760447551901_5470183025710918832_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=a26aad&_nc_ohc=fhGAQrm6GAwAX-G7t4b&_nc_ht=scontent.fslp1-1.fna&oh=5441edf9a1b18bce6a443fdcbc3dfb2d&oe=60F6C3F3',
                title:"Limpieza"
            },{
                src:'https://scontent.fslp1-1.fna.fbcdn.net/v/t1.6435-9/170483775_123346963159916_1111348560981693868_n.png?_nc_cat=107&ccb=1-3&_nc_sid=730e14&_nc_ohc=1A1z3PexwrkAX9fxm8U&_nc_ht=scontent.fslp1-1.fna&oh=11e9f8f46ac2c920abc794d36e2086e3&oe=60F6AD8E',
                title:"Equipos mojados"
            },
            {
                src:'https://scontent.fslp1-1.fna.fbcdn.net/v/t1.6435-9/174302570_123642973130315_1706873235386629906_n.png?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=3I-Sq1nLKykAX_KmlK5&_nc_ht=scontent.fslp1-1.fna&oh=58c46d5df72adf591840715559527690&oe=60F7AE3E',
                title:"calentamiento"
            }
        ])

    },[]);

    return (  
        <>
        <CarouselServices/>
        {
            imagesServices ?<ImgGallery images={imagesServices} title={"nuestros servicios"}/> :null
        }

        {
            //imagesWorks ?<ImgGallery images={imagesWorks} title={"Alguno de nuestros trabajos"}/> :null
        } 
        <ButtonBanner/>
        </>
    );
}
 
export default Services;