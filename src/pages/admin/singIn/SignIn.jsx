import React, {Fragment} from 'react'
import './SignIn.scss';
import {Layout, Tabs} from 'antd'
import Logo from '../../../assets/imagenes/png/logo-white.png';
import LoginForm from '../../../components/Admin/LoginForm';
import useAuth from '../../../hooks/useAuth';
import Admin from '../admin';
import {Route, Redirect} from 'react-router-dom'

const SignIn = () => {
  const {user} = useAuth();

  if(user){
    return (
      <Fragment>
          <Route path="/admin" component ={Admin}/>
          <Redirect to ="/admin"/>
      </Fragment>
  )
  }
    return (
        <Layout className="sign-in">
          <Layout.Content className = "sign-in__content">
            <h1 className="sign-in__content-logo">
             <img src={Logo} alt="Victor Hugo Jimenez"/>
            </h1>

            <div className="sign-in__content-tabs">
              <Tabs type="card">
                <Tabs.TabPane tab={<span>Ingresar</span>} key="1">
                  <LoginForm/>
                </Tabs.TabPane>
                
              </Tabs>
            </div>
          </Layout.Content>

        </Layout>
      );
}
 
export default SignIn;