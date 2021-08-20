import React,{useEffect} from 'react';
import * as Scroll from 'react-scroll';
import { Result, Button } from 'antd';
import {Link} from 'react-router-dom';

import '../components/Web/AboutUsInfo/AboutUs.scss';

const Error404 = () => {

    useEffect(()=>{
        Scroll.animateScroll.scrollToTop();
    },[]);

    return (  
        <div className="team-banner team-banner__error">
            <Result
                status="404"
                title={<h1>Página no encontrada</h1>}
                subTitle={<h3>Una disculpa, la pagina que buscas no existe.</h3>}
               // extra={<Link to="/"><Button type="primary">Home</Button></Link>}
            />,
        </div>
    );
}
 
export default Error404;