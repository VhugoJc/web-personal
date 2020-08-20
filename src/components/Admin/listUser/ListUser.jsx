import React, { useState } from 'react'
import { Switch, Button } from 'antd';
import './ListUser.scss';
import CardUser from './CardUser';
import Modal from '../../modal';
import RegisterForm from '../RegisterForm/RegisterForm';
import {UserAddOutlined} from '@ant-design/icons';



const ListUser = (props) => {
    const {usersInactive, usersActive, setReloadUsers} = props;
    const [viewUserActive, setviewUserActive] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    
    const newUser=(e)=>{//Cuando da clic en el botón de agregar
        e.preventDefault();
        setModalTitle("Nuevo user");
        setModalContent(<RegisterForm setReloadUsers={setReloadUsers} setIsVisible={setIsVisible}/>);
        setIsVisible(true);
    }
   
     
    return (  
        <div className="list-user">
            <div className = "list-user__header">
                <div className ="list-user__header-switch">
                    <Switch
                    defaultChecked
                    onChange = {() =>setviewUserActive(!viewUserActive)}/>
                    <span className="list-user__header-span">
                        {viewUserActive ? "usuarios Activos" : "Usuarios Inactivos"}
                    </span>
                </div>
                <Button type="primary" onClick={newUser}><UserAddOutlined />Nuevo</Button>
            </div>
            {viewUserActive ?<CardUser users={usersActive} setReloadUsers={setReloadUsers}/> 
            :<CardUser users={usersInactive} setReloadUsers={setReloadUsers}/>}
           <Modal
            title = {modalTitle}
            isVisible = {isVisible}
            setIsVisible = {setIsVisible}
        >
            {modalContent}        
        </Modal>
        </div>
    );
}

 
export default ListUser;