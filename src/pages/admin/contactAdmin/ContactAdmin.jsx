import React, { useEffect, useState } from 'react';
import {Input, Card, Button} from 'antd';
import {MailOutlined} from '@ant-design/icons';
import  DragSortableList from 'react-drag-sortable';

import Modal from '../../../components/modal';

import EditMenuWebSM from '../../../components/Admin/menuWeb/editMenuWebForm/EditMenuWebSM';

import { getSocialMediaApi }    from '../../../api/MenuSM';
import { getAccessToken } from '../../../api/auth';
import { updateSocialMediaApi } from '../../../api/MenuSM';

import MenuItem2 from '../../../components/Admin/menuWeb/menuWebList/MenuItem2';




import {ReactComponent as Messenger} from '../../../assets/imagenes/svg/messenger.svg';
import {ReactComponent as Telegram} from '../../../assets/imagenes/svg/telegram.svg';
import {ReactComponent as Whatsapp} from '../../../assets/imagenes/svg/whatsapp.svg';

import '../../../components/Admin/menuWeb/menuWebList/MenuWebList.scss';

const ContactAdmin = () => {
    const [SocialMedia, setSocialMedia] = useState([]);
    const [reloadContacts, setReloadContacts] = useState(false);

    useEffect(()=>{
        const getContacts= async()=>{

            const result2= await getSocialMediaApi();
            setSocialMedia(result2.socialMediaMenu);

        }
        setReloadContacts(false);
        getContacts();
    },[reloadContacts]);
    
    
    
    return (  
        <>
            <Card style={{textAlign:"center"}}>
                <h1 style={{marginBottom:"50px", marginTop:"50px"}}>
                Correo Electrónico:  &nbsp;
                <Input
                    style={{width:"30%"}}
                    prefix= {<MailOutlined />}
                    placeholder="ejemplo@correo.com"
                />
                <Button type="primary">Actualizar</Button>
                </h1>
                
            </Card>
            <ListContacts 
                setReloadContacts={setReloadContacts}
                socialMedia={SocialMedia}

            />
        </>
    );
}
 
export default ContactAdmin;

function ListContacts ({socialMedia, setReloadContacts}){
    const [socialMediaList, setSocialMediaList] = useState([]);

    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    
    const changeActiveSM=async(item)=>{   //Social Media
        
        const token = await getAccessToken();
        // eslint-disable-next-line 
        const resultado = await updateSocialMediaApi(token,item,item._id);
        
    }

    const editMenuSM=(item)=>{
        setIsVisibleModal(true);
        setIsVisibleModal(true);
        setModalTitle(`editando ${item.title}`);
        setModalContent(<EditMenuWebSM                
            item={item}
            setReloadMenuWeb={setReloadContacts} 
            setIsVisibleModal={setIsVisibleModal} 

        />
        );

    }

    const onSortSM=async(sortedList, dropEvent)=>{//social media
        const token = await getAccessToken();

        sortedList.forEach(item=>{
            const {_id} = item.content.props.item;
            const order=item.rank;//al hacer {order} estamos mandando un objeto donde order:rank
            updateSocialMediaApi(token,{order},_id);
        })
        
    }

    useEffect(()=>{
        let avatarSM=<Messenger/>;
        const listItemsArray1=[];
        socialMedia.forEach(item=>{
            if(item.contact){
                switch(item.title){
                    case "Whatsapp": avatarSM=<Whatsapp className="Whatsapp sm" />;break;
                    case "Telegram": avatarSM=<Telegram className="Telegram sm"/>;break;
                    case "Messenger": avatarSM=<Messenger className="Messenger sm"/>;break;

                    default: break;
                }
    
                listItemsArray1.push({
                    content: (<MenuItem2 item ={item}            //<--Component
                        changeActive={changeActiveSM}
                        editMenu={editMenuSM}
                        AvatarSM={avatarSM}
                         />)                                
                })
            }
            
            
        });

        setSocialMediaList(listItemsArray1);
    // eslint-disable-next-line
    },[socialMedia]);
    return(
        <>
        <Card className="menu-web-list__items">
            <DragSortableList items={socialMediaList} onSort={onSortSM} type="vertical"/>
        </Card>
        <Modal
            title = {modalTitle}
            isVisible = {isVisibleModal}
            setIsVisible = {setIsVisibleModal}
        >
            {modalContent}        
         </Modal>
        </>
    );
}