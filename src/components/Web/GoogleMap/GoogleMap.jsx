import React from 'react'
import './GoogleMap.scss';

const GoogleMap = () => {
    return ( 
        <div className="google-map__iframe">
        <iframe style={{width:"100%", height:"100%", border:0}} title="TechFix" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14782.04708593537!2d-101.0174484!3d22.1445832!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcb17b438ab3cf5a7!2sTech%20Fix!5e0!3m2!1ses!2smx!4v1624313882099!5m2!1ses!2smx" loading="lazy" className="map"></iframe>
        </div>
     );
}
 
export default GoogleMap;