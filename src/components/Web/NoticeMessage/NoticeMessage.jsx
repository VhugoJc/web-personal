import React from 'react';
import { Alert } from 'antd';
import TextLoop from 'react-text-loop';

const Oferta = () => {
    return (
        <>
        <Alert
        type="info"
        closable={true}
        banner
        message={
            <div style={{fontSize:"15px"}}>
                Recuerda que también puedes contactarnos por &nbsp; 
          <TextLoop mask >
            <div> Facebook </div>
            <div> Instagram </div>
            <div> Whatsapp</div>
          </TextLoop>
        </div>
        }
        />    
        </>
    );
}
 
export default Oferta;