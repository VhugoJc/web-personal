import React, { useState, Fragment } from 'react'
import { useEffect } from 'react';
import {Switch,List, Button, Modal as ModalAntd, notification} from 'antd';
import './MenuWebList.scss';
import {AppstoreAddOutlined} from '@ant-design/icons';
import Modal from '../../../modal';
// eslint-disable-next-line
import  DragSortableList from 'react-drag-sortable';
import {EditOutlined,DeleteOutlined, DownOutlined, UpOutlined} from '@ant-design/icons'
import { updateMenuApi, deleteMenuApi } from '../../../../api/Menu';
import { getAccessToken } from '../../../../api/auth';
import AddMenuWeb from '../addMenuWebForm';
import EditMenuWeb from '../editMenuWebForm';
//SOCIAL MEDIA
import EditMenuWebSM from '../editMenuWebForm/EditMenuWebSM';
import { updateSocialMediaApi } from '../../../../api/MenuSM';
import {ReactComponent as Facebook} from '../../../../assets/imagenes/svg/facebook.svg';
import {ReactComponent as Twitter} from '../../../../assets/imagenes/svg/twitter.svg';
import {ReactComponent as LinkedIn} from '../../../../assets/imagenes/svg/linkedin.svg';
import {ReactComponent as Youtube } from '../../../../assets/imagenes/svg/youtube.svg'
import {ReactComponent as Instagram} from '../../../../assets/imagenes/svg/instagram.svg'

/*
                NOTAAAA
                LA PARTE DE SOCIAL LA AGREGUÉ DESDE POSTMAN
*/


const {confirm} = ModalAntd;

const  MenuWebList= ({setReloadMenuWeb, menu, socialMedia}) => {
    //lists
    const [listItems, setListItems] = useState([]);
    const [socialMediaList, setSocialMediaList] = useState([]);

    //modal
   const [isVisibleModal, setIsVisibleModal] = useState(false);
   const [modalTitle, setModalTitle] = useState("");
   const [modalContent, setModalContent] = useState(null);

   //button 
   const [socialMediaButton, setSocialMediaButton] = useState(false);
   
   
    useEffect(()=>{         
        
        //Menu 
        const listItemsArray=[];
        menu.forEach(item=>{
            listItemsArray.push({
                content: (<MenuItem item ={item}            //<--Component
                     changeActive={changeActive}
                     editMenu={editMenu}
                     deleteMenu={deleteMenu}
                     />)                                
            })
        });

        setListItems(listItemsArray);
        // eslint-disable-next-line
    },[menu]);

    useEffect(()=>{         //<---SOCIAL MEDIA
        
        //Menu 
        let avatarSM=<Facebook/>;
        const listItemsArray1=[];
        socialMedia.forEach(item=>{
            
            
            switch(item.title){
                case "Facebook": avatarSM=<Facebook className="Facebook sm"/>;break;
                case "Instagram":avatarSM=<Instagram className="Instagram sm"/>;break;
                case "Twitter":avatarSM=<Twitter className="Twitter sm"/>;break;
                case "Youtube":avatarSM=<Youtube className="Youtube sm"/>;break;
                case "LinkedIn":avatarSM=<LinkedIn className="LinkedIn sm"/>;break;
            }

            listItemsArray1.push({
                content: (<MenuItem2 item ={item}            //<--Component
                    changeActive={changeActiveSM}
                    editMenu={editMenuSM}
                    AvatarSM={avatarSM}
                     />)                                
            })
        });

        setSocialMediaList(listItemsArray1);
        // eslint-disable-next-line
    },[socialMedia]);

    const changeActive=async(item)=>{   //when is neccessary to change the menu status
        
        const token = await getAccessToken();
        const resultado = await updateMenuApi(token,item,item._id);
        
    }
    const onSort=async(sortedList, dropEvent)=>{
        const token = await getAccessToken();

        sortedList.forEach(item=>{
            const {_id} = item.content.props.item;
            const order=item.rank;//al hacer {order} estamos mandando un objeto donde order:rank
            updateMenuApi(token,{order},_id);
        })
        
    }
    const onSortSM=async(sortedList, dropEvent)=>{//social media
        const token = await getAccessToken();

        sortedList.forEach(item=>{
            const {_id} = item.content.props.item;
            const order=item.rank;//al hacer {order} estamos mandando un objeto donde order:rank
            updateSocialMediaApi(token,{order},_id);
        })
        
    }
    const changeActiveSM=async(item)=>{   //Social Media
        
        const token = await getAccessToken();
        const resultado = await updateSocialMediaApi(token,item,item._id);
        
    }
    const editMenuSM=(item)=>{
        setIsVisibleModal(true);
        setIsVisibleModal(true);
        setModalTitle(`editando ${item.title}`);
        setModalContent(<EditMenuWebSM                
            item={item}
            setReloadMenuWeb={setReloadMenuWeb} 
            setIsVisibleModal={setIsVisibleModal} 

        />
        );

    }

    const editMenu=(item)=>{
        setIsVisibleModal(true);
        setIsVisibleModal(true);
        setModalTitle(`editando ${item.title}`);
        setModalContent(<EditMenuWeb                
            item={item}
            setReloadMenuWeb={setReloadMenuWeb} 
            setIsVisibleModal={setIsVisibleModal} 

        />
        );

    }
    const addMenuModalWebModal =()=>{
        setIsVisibleModal(true);
        setModalTitle("nuevo Menu");
        setModalContent(<AddMenuWeb 
            setReloadMenuWeb={setReloadMenuWeb} 
            setIsVisibleModal={setIsVisibleModal} 
            />);
        console.log("aquitoy");
        
    }

    const deleteMenu=  (idItem,titleItem)=>{
        
        confirm({
            title:"Eliminando Menú",
            content: `¿Seguro que quiere eliminar el menú ${titleItem}?`,
            okText:"Eliminar",
            okType:"danger",
            okCancel:"Cancelar",
            onOk (){
               deleteU();
            }
        })

        const deleteU=async ()=>{
            const token = await getAccessToken();
            const result = await deleteMenuApi(token,idItem);
            
            if(result.status===200){
                notification["success"]({
                    message: "Se ha eliminado correctamente el menú"
                });
                setReloadMenuWeb(true);
            }else{
                notification["error"]({
                    message: "Error al eliminar el menú"
                });
            }
        }
        
    }


    return ( 
    <Fragment>
        <div className ="menu-web-list">
            <div className = "menu-web-list__header">
                <Button type="primary" onClick= {addMenuModalWebModal}>
                <AppstoreAddOutlined /> agregar menú
                </Button>
            </div>
            <div className ="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
            </div>
            <br/>
            <br/>

                {/*SOCIAL MEDIA SPACE*/}
            <Button type="primary" onClick={()=>setSocialMediaButton(!socialMediaButton)}>
                Redes Sociales {socialMediaButton ?<UpOutlined /> :<DownOutlined />}
            </Button>

            <br/>
            <br/>
           
               {socialMediaButton
                ? ( <div className ="menu-web-list__items">
                     <DragSortableList items={socialMediaList} onSort={onSortSM} type="vertical"/>
                     </div>)
                :null
            } 
                      
        </div>
        <Modal
            title = {modalTitle}
            isVisible = {isVisibleModal}
            setIsVisible = {setIsVisibleModal}
        >
            {modalContent}        
         </Modal>

    </Fragment>
    );
}


function MenuItem({item, changeActive,editMenu,deleteMenu,socialM}){
    
    return(
        <List.Item 
        actions={[
            <Fragment>
            <Switch defaultChecked={item.active} 
            onClick={item.active=!item.active,()=>changeActive(item)}/>
            <Button type="primary"
                onClick={()=>editMenu(item)}
            >
                <EditOutlined/>
           </Button>
           {socialM
           ? null
           : <Button type="danger"
                onClick={()=>deleteMenu(item._id,item.title)}
            >
                <DeleteOutlined /> 
            </Button>}
            </Fragment>
        ]}>
            <List.Item.Meta title={item.title} description={item.url}>

            </List.Item.Meta>
        </List.Item>
    );
}

//REDES SOCIALES
function MenuItem2({item, changeActive,editMenu,deleteMenu,AvatarSM}){
    
    return(
        <List.Item
        
        actions={[
            <Fragment>
            <Switch defaultChecked={item.active} 
            onClick={item.active=!item.active,()=>changeActive(item)}/>
            <Button type="primary"
                onClick={()=>editMenu(item)}
            >
                <EditOutlined/>
           </Button>
           
            </Fragment>
        ]}>
            <List.Item.Meta 
            avatar={AvatarSM} 
            title={item.title} description={item.url}>

            </List.Item.Meta>
        </List.Item>
    );
}
 

export default MenuWebList ;