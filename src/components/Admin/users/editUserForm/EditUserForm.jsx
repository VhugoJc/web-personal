import React, {useState, useCallback} from 'react'
import {Avatar, Form, Select, Button, Row, Col, Input, notification} from 'antd';
import {useDropzone} from 'react-dropzone';
import  './EditUserForm.scss';
import noAvatar from '../../../../assets/imagenes/png/no-avatar.png';
import {UserOutlined, MailOutlined, LockOutlined,ThunderboltOutlined} from '@ant-design/icons';
import { useEffect } from 'react';
import { getAvatarApi, updateUserApi, uploadAvatarApi } from '../../../../api/user';
import { getAccessToken} from '../../../../api/auth';


const  EditUserForm= ({user, setIsVisible, setReloadUsers}) => {
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({});
    
    // eslint-disable-next-line
    useEffect(()=>{
        

        setUserData({       
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            job:user.job,
            description: user.description,
            avatar: user.avatar
        });
        // eslint-disable-next-line
    },[]);
    //para el avatar

    useEffect (() =>{
        if(user.avatar){
            const getAvatar=async()=>{
                const result = await getAvatarApi(user.avatar);
                setAvatar(result);
            }
            getAvatar();
        }else{
            setAvatar(null);
        }

        setUserData({
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            job:user.job,
            description:user.description,
            avatar: user.avatar
        });
        
    },[user]);

    useEffect(() => {
        
        if(avatar){
            setUserData({...userData, avatar:avatar.file})
        }
        // eslint-disable-next-line
    }, [avatar]);


    //para actualizar usuario
    const updateUser = async e =>{

        e.preventDefault();
        const userUpdate={
            id: userData.id,
            name: userData.name,
            lastName: userData.lastName,
            role: userData.role,
            job:userData.job,
            description: userData.description,
            avatar: userData.avatar
        }

        if(userData.email!==user.email){
            userUpdate.email = userData.email;
            // eslint-disable-next-line
            if(userUpdate.email.length<=4|| !/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(userUpdate.email)){
                return notification["error"] ({
                    message: "Dirección de correo Electrónico no válida"
                });
            }
        }

        const token = await getAccessToken();
        if(token.message){
            return (notification["error"] ({
                message: "Token Invalido"
            }));
        };

        

        if(userUpdate.email===""||userUpdate.name===""||userUpdate.lastName===""){
            return notification["error"] ({
                message: "Son requeridos los campos de texto"
            });
        }

        if(userData.password||userData.RepeatPassword){//password
            
            if(!userData.RepeatPassword||!userData.password){
                return (notification["error"] ({
                    message: "Por favor escriba dos veces la contraseña"
                }));
            }
            if(userData.password!==userData.RepeatPassword){
                return(notification["error"] ({
                    message: "Las contraseñas no son iguales"
                }));
            
            }     
            if(userData.password.length<7){
                return (notification["error"] ({
                    message: "La contraseña es muy corta"
                }));
            }
                    userUpdate.password=userData.password;
        }


        if(typeof userUpdate.avatar === "object"){
           
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(response=>{
                
               updateUserApi(token,userUpdate, user._id).then(result=>{
                  
                    (notification["success"] ({
                        message: "usuario actualizado"
                    }));
                    setIsVisible(false);
                    setReloadUsers(true);

                }).catch(err=>{
                    (notification["error"] ({
                        message: err.message
                    }));
                    
                })
            })
        }else{
            updateUserApi(token,userUpdate, user._id).then(result1=>{
                
                if(result1.error){
                    (notification["error"] ({
                        message: result1.message
                    }));
                }else{
                    (notification["success"] ({
                        message: result1.message
                    }));
                    setIsVisible(false);
                    setReloadUsers(true);
                }
            }).catch(err=>{
                    (notification["error"] ({
                        message: err.message
                    }));
                    
                })
        }

        
    }
    return (  
        <div>
            <UploadAvatar avatar ={avatar} setAvatar={setAvatar}/>
            <EditForm userData ={userData} setUserData={setUserData} updateUser={updateUser}/>
        </div>
    );
}

function UploadAvatar ({avatar, setAvatar}){

    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(()=>{
        if(avatar){
            if(avatar.preview){
                setAvatarUrl(avatar.preview)
            }else{
                setAvatarUrl(avatar)
            }
        }else{
            setAvatarUrl(null);
        }
    },[avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({file, preview: URL.createObjectURL(file)})
        },[setAvatar]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className ="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive 
            ? (<Avatar size={150} src={avatar}/>)
            : <Avatar size={150} src={avatarUrl ?avatarUrl :noAvatar}/>}
            
        </div>
    );
}
 
function EditForm({userData, setUserData, updateUser}){
    const {Option} = Select;

    return (
        <Form className = "form-edit" onSubmit ={updateUser}>
            
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e=>setUserData({...userData, name: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Apellido"
                            value={userData.lastName}
                            onChange={e=>setUserData({...userData, lastName: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
            <Col span={12}>
                    <Form.Item>
                        <Input
                            value={userData.job}
                            onChange={e=>setUserData({...userData, job: e.target.value})}
                            prefix={<ThunderboltOutlined/>}
                            placeholder="puesto"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input.TextArea
                            value={userData.description}
                            onChange={e=>setUserData({...userData, description: e.target.value})}
                            placeholder="Descripción"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="correo Electrónico"
                            value={userData.email}
                            onChange={e=>setUserData({...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Select
                            
                            placeholder = "Selecciona un rol "
                            onChange={(e)=>setUserData({...userData, role: e})}
                            value = {userData.role}
                        >
                            <Option value="admin">Administrador</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="revisor">Revisor</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                <Input
                            prefix={<LockOutlined />}
                            placeholder="repita Password"
                            type="password"
                            value={userData.password}
                            onChange={e=>setUserData({...userData, password: e.target.value})}
                        />
                </Col>
                <Col span={12}>
                <Input
                            prefix={<LockOutlined />}
                            placeholder="Repetir password"
                            type="Password"
                            value={userData.RepeatPassword}
                            onChange={e=>setUserData({...userData, RepeatPassword: e.target.value})}
                        />
                </Col>
            </Row>
            <br/>
            <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={updateUser} className="btn-submit">
                            Actualizar
                        </Button>
                </Form.Item>
        </Form>
    );
}
export default EditUserForm;