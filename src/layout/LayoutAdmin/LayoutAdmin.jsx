
import React, {useState, Fragment} from 'react';
import 'antd/dist/antd.css';
import './LayoutAdmin.scss';
import useAuth from '../../hooks/useAuth';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Layout} from 'antd';
import MenuTop from '../../components/Admin/MenuTop';
import MenuSider from '../../components/Admin/MenuSider';
import AdminSignIn from '../../pages/admin/singIn/SignIn';




const LayoutAdmin = (props) => {
    //Sacar rutas de los props
    const {routes} = props;
    const {Header, Content, Footer} = Layout;//Ant design

    const [menuColapsed, setmenuColapsed] = useState(true);
    //token:
    const {user, isLoading} = useAuth();
    
    if(!user && !isLoading){
        return (
            <Fragment>
                <Route path="/admin/login" component ={AdminSignIn}/>
                <Redirect to ="/admin/login"/>
            </Fragment>
        )
    }
    if(user&&!isLoading){
        return (  
            <Layout>
                
                <MenuSider menuColapsed = {menuColapsed}/> 
    
                <Layout className = "layout-admin" >
                    
                    <div>
                    <Header className ="layout-admin__header">
                        <MenuTop setmenuColapsed = {setmenuColapsed} menuColapsed ={menuColapsed} />
                    </Header>
                    </div>
                    <div>
                    <Content className="layout-admin__content"style = {{marginLeft: menuColapsed ?"80px" :"200px"}}>
                       <LoadRouters routes = {routes}/> 
                    </Content>
                    </div>
                    <Footer className="layout-admin__footer"  >Victor Hugo Jimenez</Footer>
                </Layout>
             </Layout>
        );
    }else{
        return null;
    }
    
}

function LoadRouters({routes}){
    
    return (
        <Switch>
            {routes.map((route, index) =>(
            <Route 
                key= {index}
                path = {route.path}
                exact = {route.exact}
                component = {route.component}//no se van a renderizar mas componentes mediante rutas
            />
            ))}
        </Switch>
    );
}
 
export default LayoutAdmin;
