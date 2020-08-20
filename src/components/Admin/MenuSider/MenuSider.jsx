import React from 'react'
import {Link, withRouter} from 'react-router-dom';//withRouter para menu seleccionado (export withRouter y se obtiene la location)
import {Layout, Menu} from 'antd';
import {HomeOutlined, UserOutlined, MenuOutlined}from '@ant-design/icons';
import './MenuSider.scss';



const MenuSider = (props) => {
    const {menuColapsed, location} = props;
    const {Sider} = Layout;

    return (  
        <Sider className = "admin-sider" collapsed = {menuColapsed}>
            <Menu theme="dark" mode= "inline" defaultSelectedKeys= {[location.pathname]}>
                <Menu.Item key ="/admin">
                    <Link to={"/admin"}>
                        <HomeOutlined/>
                        <span className = "nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key ="/admin/users">
                    <Link to={"/admin/users"}>
                    <UserOutlined />
                        <span className = "nav-text"> usuarios </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key ="/admin/menu">
                    <Link to={"/admin/menu"}>
                    <MenuOutlined />
                        <span className = "nav-text"> menu </span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
 
export default withRouter(MenuSider)
;