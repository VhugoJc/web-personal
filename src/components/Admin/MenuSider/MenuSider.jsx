import React from 'react'
import {Link, withRouter} from 'react-router-dom';//withRouter para menu seleccionado (export withRouter y se obtiene la location)
import {Layout, Menu} from 'antd';
import {HomeOutlined, 
        UserOutlined, 
        MenuOutlined,
        FormOutlined,
        CommentOutlined,
        NotificationOutlined,
        ScheduleOutlined,
    }
from '@ant-design/icons';

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
                <Menu.Item key ="/admin/blog">
                    <Link to={"/admin/blog"}>
                    <FormOutlined />
                        <span className = "nav-text"> blog </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/contact">
                    <Link to={"/admin/contact"}>
                        <CommentOutlined/>
                        <span className ="nav-text"> Contacto</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/services">
                    <Link to={"/admin/services"}>
                        <NotificationOutlined/>
                        <span className="nav-text">Servicios</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/book">
                    <Link to={"/admin/book"}>
                        <ScheduleOutlined />
                        <span className="nav-text"> Agenda</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
 
export default withRouter(MenuSider)
;