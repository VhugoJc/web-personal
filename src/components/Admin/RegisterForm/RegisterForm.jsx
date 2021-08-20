import React, {useState} from 'react';
import './RegisterForm.scss';
import {Form, Input, Checkbox, Button, notification, Select} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import '../../../App.scss';
import {signUpApi} from '../../../api/user';
import { getAccessToken } from '../../../api/auth';

//PARA ADAPTARLO AL ADMIN:
/*
    SE AGREGÓ EL AUTH EN EL BACKEND
    SE ENVIO EL TOKEN PARA EL AUTH
    SE RECIBIÓ EL RELOADED PARA ACTUALIZAR LA LISTA
    SE OMITIO LA PARTE DE PRIVACIDAD (cambiar a false addUserFromAdmin para habilitar)
    
*/

const RegisterForm = ({setReloadUsers,setIsVisible}) => {
   const addUserFromAdmin = true;

   const{Option} = Select;
    const [newUser, setNewUser] = useState({
            email: "",  
            password: "",
            repeatPassword: "",
            name: "",
            lastName: "",
            role: "admin",
            privacyPolicy: addUserFromAdmin,
            job:"",
            description:""
    });

    const [status, setStatus] = useState({//estado de error o ssuccess
            email: "",  
            password: "",
            repeatPassword: "",
            name: "",
            lastName: "",
    });


    
    const {password, repeatPassword, name, lastName, email, privacyPolicy, role} = newUser;

    const onChange=(e)=>{
       
        if(e.target.name==="privacyPolicy"){
            setNewUser({
                ...newUser,
                [e.target.name]:e.target.checked
            });
        }else{
            setNewUser({
                ...newUser,
                [e.target.name]:e.target.value
            });
        }
        
    }

    const onSubmit = async () =>{
        let error= false;
        let work={
            password: "sucess",
            repeatPassword: "sucess",
            name:"sucess",
            lastName:"sucess",
            email:"success"
        }
        
        if(name.length<=4){work.name ="error";error=true}
        if(lastName.length<=4){work.lastName ="error";error=true}
        if(password.length<7){work.password ="error";error=true}
        if(password!==repeatPassword||repeatPassword.length<7){work.repeatPassword ="error";error=true}//eslint-disable-next-line
        if(email.length<=4|| !/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(email)){work.email = "error";error=true}

        

        if(email.trim()===''||
        password.trim()===''||
        repeatPassword.trim()===''||
        name.trim()===''||
        lastName.trim()===''){
            error =true;
            return notification["error"] ({
                message: "Por favor llene todos los espacios"
            })
        }
        
        if(!privacyPolicy){error = true; ( notification["error"] ({
            message: "Por favor acepte las politicas de privacidad"
        }));}

        if(error){
            setStatus({...status,
                email: work.email, 
                password: work.password,
                repeatPassword: work.repeatPassword,
                name: work.name,
                lastName: work.lastName,
            }
                );
            return null;
        }
        
        //validacion de email
        //endPoint
        
        if(work.email){
            const token = await getAccessToken();          
            const result = await signUpApi (token, newUser);  //<-----AQUI SE CONSULTA LA API
            
            if(!result.status){
                error = true;
                work.email="error";
                notification["error"] ({
                    message: `${result.message}`
                });
                
               
                
            }else{
                work.email="sucess";
                setReloadUsers(true);       //<-----SI NO DA ERROR
                setIsVisible(false);
            }
        }

        setStatus({...status,
            email: work.email, 
            password: work.password,
            repeatPassword: work.repeatPassword,
            name: work.name,
            lastName: work.lastName}
            );

        
        
    
            
        if(!error){
            notification["success"] ({
            message: `el usuario se ha creado exitosamente`
        });
        setNewUser({
            email: "",
            password: "",
            repeatPassword: "",
            name: "",
            lastName: "",
            role: "admin",
            privacyPolicy: addUserFromAdmin
        });
        setStatus({
            email: "",
            password: "",
            repeatPassword: "",
            name: "",
            lastName: "",
            privacyPolicy: addUserFromAdmin
        }); }   
        
    


    }

    return (  
      <Form className= "register-form">
         
          <Form.Item>
              <Input
              prefix = {<UserOutlined style={{color: "rgba(0,0,0,.25)" }}/>}
              type = "text"
              value = {name}
              name = 'name'
              placeholder = 'nombre(s)'
              className = {`register-form__input ${status.name}`}
              onChange={(e) => onChange(e)}
              />
          </Form.Item>
          <Form.Item>
              <Input
              prefix = {<UserOutlined style={{color: "rgba(0,0,0,.25)" }}/>}
              type = "text"
              value = {lastName}
              name = 'lastName'
              placeholder = 'apellidos'
              className = {`register-form__input ${status.lastName}`}
              onChange={(e) => onChange(e)}
              />
          </Form.Item>
          <Form.Item>
              <Input
              prefix = {<MailOutlined style={{color: "rgba(0,0,0,.25)" }}/>}
              type = "email"
              value = {email}
              name = 'email'
              placeholder = 'correo electrónico'
              className = {`register-form__input ${status.email}`}
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
              className = {`register-form__input ${status.password}`}
              onChange={(e) => onChange(e)}
              />
          </Form.Item>
          <Form.Item>
              <Input
              prefix = {<LockOutlined style={{color: "rgba(0,0,0,.25)" }}/>}
              type = "password"
              value = {repeatPassword}
              name = 'repeatPassword'
              placeholder = 'repita su contraseña'
              className = {`register-form__input ${status.repeatPassword}`}
              onChange={(e) => onChange(e)}
              />
          </Form.Item>
          {//Politicas de privacidad y select role
              addUserFromAdmin                                  //<---Si esta en la vista de admin
              ?(<Form.Item>
                <Select
                    className ="select"
                    placeholder = "Selecciona un rol "
                    onChange={(e)=>setNewUser({...newUser, role:e})}
                    value = {role}
                >
                    <Option value="admin">Administrador</Option>
                    <Option value="editor">Editor</Option>
                    <Option value="revisor">Revisor</Option>
                </Select>
            </Form.Item>)
              :(<Form.Item>
                <Checkbox name="privacyPolicy" checked ={newUser.privacyPolicy} onChange={(e) => onChange(e)}>
                    He leido y acepto las politicas de privacidad.
                </Checkbox>
            </Form.Item>)
          }
          <Form.Item>
              <Button htmlType="submit" className="register-form__button" onClick={(e)=>onSubmit()}>
                Crear Cuenta
              </Button>
          </Form.Item>
          
      </Form>
    );
}
 
export default RegisterForm;