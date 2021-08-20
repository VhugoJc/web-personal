import React, {useEffect, useState} from 'react';
import {Affix, Button} from 'antd';
import {CalendarOutlined} from '@ant-design/icons'
 
import {ReactComponent as Messenger} from '../../../assets/imagenes/svg/messenger.svg';
import {ReactComponent as Whatsapp} from '../../../assets/imagenes/svg/whatsapp.svg';
import {ReactComponent as Telegram} from '../../../assets/imagenes/svg/telegram.svg';

//api
import {getSocialMediaApi} from '../../../api/MenuSM';

import Modal from '../../modal';
import OnlineBook from '../OnlineBook';

import './FloatingButtons.scss';

const FloatingButtons = () => {
    const [isVisible, setisVisible] = useState(false);
    const [socialMediaData, setSocialMediaData] = useState([])
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const getSocialMediaData=async()=>{
            const results = await getSocialMediaApi(); 
            if(results.socialMediaMenu){
                results.socialMediaMenu.forEach(item=>{
                    if(item.contact===true &&   item.active===true){
                        setSocialMediaData(arr => [...arr,item]);
                    }
                });
            }
        }
        getSocialMediaData();
        setReload(true);
    }, [])

    return (  
        <div className="affix">
            <Affix offsetTop={120} >
                <div style={{width:"50px"}}>
            {
                reload===true
                ?
                (socialMediaData.map(item=>{
                    let icon = <Whatsapp/>
                    switch(item.title){
                        case "Whatsapp":
                            icon = <Whatsapp className="btnSM-icon animationBTN" />
                            break;
                        case "Messenger":
                            icon = <Messenger className="btnSM-icon animationBTN" />
                            break;
                        case "Telegram":
                            icon = <Telegram className="btnSM-icon animationBTN" />
                            break;
                        default:
                            break;
                    }
                    
                    return(<a key={item.title} href={`${item.url}`} target="_blank" rel="noopener noreferrer">
                        {icon}
                   </a>)
                })
                )
                
                :null
            }
                <div className="animationBTN">
                        <Button shape="circle" className="btnSM-bookIcon" onClick={()=>{setisVisible(!isVisible)}}>
                            <CalendarOutlined className="bookIcon"/>
                    </Button>
                </div>
                </div>
            </Affix>
            <Modal
                isVisible={isVisible}
                setIsVisible={setisVisible}
                title={"Cita Online"}
            >
                {<OnlineBook setisVisible={setisVisible}/>}
            </Modal>
      </div>
    );
}
 
export default FloatingButtons;