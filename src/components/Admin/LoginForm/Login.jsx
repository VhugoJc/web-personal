
import React, { useState } from 'react';
import {Form, Input, Button, notification} from 'antd';
import { MailOutlined, LockOutlined} from '@ant-design/icons';
import {signInApi} from '../../../api/user';
import "./loginForm.scss";
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../../utils/constants';
//import {getAccessToken, getRefreshToken} from '../../../api/auth';

const LoginForm = () => {
    
    
    const [user, setUser] = useState({
        email:"",
        password: ""
    })
    const {email, password} = user;

    const onChange = e =>{
        setUser({...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = async (e) =>{

        if(password.trim()===''||email.trim()===''){
            return notification["error"] ({
                message: "por favor llene los campos solicitados"
            });
        }
        // eslint-disable-next-line
        if(email.length<=4|| !/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(email)){
            return notification["error"] ({
                message: "Dirección de correo Electrónico no válida"
            });
        }
       
       const result= await signInApi(user);//ejecutar la Api

       
        if(!result.status){
            notification["error"] ({
                message: `${result.message}`
            });
        }else{
            localStorage.setItem(ACCESS_TOKEN,result.accessToken);
            localStorage.setItem(REFRESH_TOKEN,result.refreshToken);

            notification["success"] ({
                message: `${result.message}`
            });

            window.location.href ='/admin';

            setUser({email:"",password:""})
        }
        

    }
    return (  
        <Form className= "login-form">
             <Form.Item>
              <Input
              prefix = {<MailOutlined style={{color: "rgba(0,0,0,.25)" }}/>}
              type = "email"
              value = {email}
              name = 'email'
              placeholder = 'correo electrónico'
              className = "login-form__input" 
             onChange={(e) => onChange(e)}
              />
          </Form.Item>
          <Form.Item>
              <Input
              prefix = {<LockOutlined style={{color: "rgba(0,0,0,.25)" }}/>}
              type = "password"
              value = {password}
              name = 'password'
              placeholder = 'contraseña'
              className = "login-form__input" 
             onChange={(e) => onChange(e)}
              />
          </Form.Item>
          <Form.Item>
              <Button htmlType="submit" className="login-form__button" onClick={(e)=>onSubmit()}>
                Iniciar Sesión
              </Button>
          </Form.Item>
        </Form>
    );
}
 
export default LoginForm;