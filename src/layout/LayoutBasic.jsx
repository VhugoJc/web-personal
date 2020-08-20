import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import {Route, Switch} from 'react-router-dom';
import {Layout, Row,Col} from 'antd';
import MenuTop from '../components/Web/menuTop/MenuTop';
import MenuTopMobile from '../components/Web/menuTop/MenuTopMobile';
import './LayoutBasic.scss';



const LayoutBasic = (props) => {
  //Sacar rutas de los props
  const {routes} = props;
  const { Content, Footer} = Layout;//Ant design

  const w = window.innerWidth;

  return(
    <Fragment>
      
     {w<1024
     ? <MenuTopMobile/>
     :<MenuTop/>}
        


      <LoadRouters routes = {routes}/> 
      <Footer>Victor Hugo Jimenez</Footer>
    </Fragment>
  );

  /*return (  
      <Layout>
          <h2>Menu Basic</h2>
          <Layout>
             
              <Content>
                 <LoadRouters routes = {routes}/> 
              </Content>
              <Footer>Victor Hugo Jimenez</Footer>
          </Layout>
       </Layout>
  );*/
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
export default LayoutBasic;