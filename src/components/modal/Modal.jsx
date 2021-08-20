import React from 'react'
import {Modal as ModalAntDesign} from 'antd';


const Modal = (props) => {
    const {children, title, isVisible, setIsVisible, width} = props;


    return (  
        <ModalAntDesign
            title ={title}
            centered
            visible={isVisible}
            onCancel={()=>setIsVisible(false)}
            footer ={false}
            width= {width}
        >
            {children}
        </ModalAntDesign>
    );
}
 
export default Modal;