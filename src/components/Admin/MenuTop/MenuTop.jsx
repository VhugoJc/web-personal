import React from 'react';
import './MenuTop.scss';
import {Button} from 'antd';
import { MenuUnfoldOutlined, LoginOutlined, MenuFoldOutlined } from '@ant-design/icons';
import logo from '../../../assets/imagenes/png/logo-white.png';//logo para el top main
import {logOut} from '../../../api/auth';

const MenuTop = ({setmenuColapsed, menuColapsed}) => {
    const LoginOut = () =>{
        logOut();
        window.location.href ='/admin/login';
    }
    
    return (  
        <div className= "menu-top">
            <div className = "menu-top__left">
                <img className="menu-top__left-logo"
                src= {logo}
                alt="Victor Hugo Jimenez"
                />
                <Button type= "link" onClick = {() => setmenuColapsed(!menuColapsed)} >
                    {menuColapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
                   
                </Button>
            </div>
            <div className = "menu-top__right">
              <Button type= "link"  onClick = {LoginOut} ><LoginOutlined /></Button>  
            </div>
        </div>
    );
}
 
export default MenuTop;