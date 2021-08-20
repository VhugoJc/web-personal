import React from 'react'
import './MyInfo.scss';
import Logo from '../../../../assets/imagenes/png/logo-white.png';
import SocialMedia from '../../../../components/Web/menuTop/MenuTopMobile/SocialMedia';
const MyInfo = () => {
    return (  
        <div className="my-info">
            <img src={Logo} alt=""/>
            <h4>
                Creemos en el potencial que tiene tu empresa, crezcamos juntos y demos un paso al futuro.
            </h4>
            <div className ="social-media">
                <SocialMedia/><br/><br/>
            </div>
        </div>
    );
}
 
export default MyInfo;