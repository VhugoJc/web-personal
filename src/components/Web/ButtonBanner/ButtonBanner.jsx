import React from 'react'
import {Button} from 'antd';
import {Link} from 'react-router-dom';

import './ButtonBanner.scss';


const ButtonBanner = () => {
    return (  
        <div className="button-Banner">
                <h1>¿Necesitas atención personalizada?</h1>
                <h2> Recuerda que tambien puedes contactarnos por nuestras redes sociales.</h2>
                <Link to="/contact">
                    <Button type="primary" className="button-Banner__btn">Contactar</Button>
                </Link>
        </div>
    );
}
 
export default ButtonBanner;