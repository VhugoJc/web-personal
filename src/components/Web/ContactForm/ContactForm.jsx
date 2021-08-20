import React,{useState} from 'react';
import {Input, Button, notification} from 'antd';

import './ContactForm.scss';


const ContactForm = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phoneNumber, setphoneNumber] = useState();
    const [message, setmessage] = useState("");

    return (  
        <>
        <Input className="contact-form__input"  placeholder="Nombre*" value={name} onChange={(e)=>setname(e.target.value)}/>
        
        <Input className="contact-form__input"  placeholder="Correo Electrónico*" value={email} onChange={(e)=>setemail(e.target.value)}/>
        
        <Input className="contact-form__input"  placeholder="Número de telefono" value={phoneNumber} onChange={(e)=>setphoneNumber(e.target.value)}/>
        
        <Input.TextArea className="contact-form__input contact-form__textArea"   placeholder="Mensaje*" value={message} onChange={(e)=>setmessage(e.target.value)}/>
        
        <Button className="contact-form__btn" type="primary" >Contactar</Button>

        </>
    );
}
 
export default ContactForm;