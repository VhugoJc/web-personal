import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import {Route, Switch} from 'react-router-dom';//Route System

import MenuTop from '../components/Web/menuTop/MenuTop';//Desktop Menu Bar
import MenuTopMobile from '../components/Web/menuTop/MenuTopMobile';//Mobile Menu Bar
import './LayoutBasic.scss';//styles

import Footer from '../components/Web/Footer';//Footer


import FloatingButtons from '../components/Web/FloatingButtons';//Floating buttons

const LayoutBasic = (props) => {
  //Sacar rutas de los props
  const {routes} = props;
  
  const w = window.innerWidth;

  return(
    <Fragment>
      {w<1024
        ? <MenuTopMobile/>
        :<MenuTop/>
      }
      <FloatingButtons/>
      <LoadRouters routes = {routes}/> 
      <Footer/>
    </Fragment>
  );

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