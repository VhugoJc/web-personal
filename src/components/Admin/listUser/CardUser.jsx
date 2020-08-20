import React, { Fragment, useEffect } from 'react';
import './ListUser.scss';
import {Button, notification, Modal as ModalAntd } from 'antd';
import noAvatar from '../../../assets/imagenes/png/no-avatar.png';
import {List} from 'antd'
import Avatar from 'antd/lib/avatar/avatar';
import {EditOutlined, StopOutlined, DeleteOutlined,CheckOutlined} from '@ant-design/icons';
import Modal from '../../modal';
import { useState } from 'react';
import EditUserForm from '../users/editUserForm';

import { getAvatarApi, activateUserApi, deleteUserApi } from '../../../api/user';
import { getAccessToken } from '../../../api/auth';

//aqui entra cada usuario en la lista y muestra sus datos... Llamado desde renderItem desde la lista
function User({user, editUser, activateUser, deleteUser}){

    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(()=>{
        if(user.avatar){
            const getAvatar=async()=>{
                const result = await getAvatarApi(user.avatar);
                setAvatarUrl(result);
            }
            getAvatar();
        }

    },[user]);

   return <List.Item 
            actions={[
                user.active
                ?(<Button 
                    type= "primary"
                    onClick={()=>editUser(user)}>
                        <EditOutlined />
                  </Button>)
                :(<Button 
                    type= "primary"
                    onClick={()=>activateUser(user)}>
                        <CheckOutlined />
                  </Button>)
                  ,
                  user.active
                  ?(<Button 
                        type= "danger"
                        onClick={()=>activateUser(user)}>
                            <StopOutlined />
                    </Button>)
                    :null
                    ,<Button 
                        type= "danger"
                        onClick={()=>deleteUser(user)}>
                         <DeleteOutlined />
                    </Button>
                    

            ]}>
                <List.Item.Meta
                avatar = {<Avatar src ={user.avatar ?avatarUrl: noAvatar}/>}
                title = {`${user.name} ${user.lastName}`}
                description = {user.email}

                />
            </List.Item>
}


const CardUser = ({users, setReloadUsers}) => {//recibe TODOS los usuarios y uno a uno lo manda a User
    
    const [isVisible, setIsVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const {confirm} =ModalAntd;

    const editUser=(user)=>{
        setModalTitle(`editando ${user.name} ${user.lastName}`);
        setModalContent(<EditUserForm user={user} setIsVisible={setIsVisible} setReloadUsers={setReloadUsers}/>);
        setIsVisible(true);

    }
    const deleteUser=async (user)=>{
            const token =await getAccessToken();
            const deleteU = async() =>{
                 
                const result= await deleteUserApi(token,user._id);
                if(result.status===200){
                    notification["success"]({
                        message: "Usuario eliminado"
                    });
                }else{
                    notification["warning"]({
                        message: "ocurrio un error"
                    });
                }
                
                setReloadUsers(true);
            }
            confirm({
                title:"Eliminando usuario",
                content: `¿Seguro que quiere eliminar a ${user.email}`,
                okText:"Eliminar",
                okType:"danger",
                okCancel:"Cancelar",
                onOk (){
                   deleteU();
                }
            })

    }

    const activateUser= async (user)=>{
        const token = await getAccessToken();
        if(token.message){
            return notification["error"]({
                message: token.message
            });
        }

        const result = await activateUserApi(token, !user.active, user._id);
        setReloadUsers(true);
        return notification["success"]({
            message: result.message
        });
    }

    
    return(
        <Fragment>
        <List
        className= "user-active"
        itemLayout="horizontal"
        dataSource={users}
        renderItem={user =>(
            <User user={user} editUser={editUser} activateUser={activateUser} deleteUser={deleteUser}/>
        )}
        />
        <Modal
            title = {modalTitle}
            isVisible = {isVisible}
            setIsVisible = {setIsVisible}
        >
            {modalContent}        
        </Modal>

        </Fragment>
    );
}



 
export default CardUser;



