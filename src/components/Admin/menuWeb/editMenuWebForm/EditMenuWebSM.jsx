import React, { useState, useEffect } from 'react';
import {updateMenuApi} from '../../../../api/Menu';
import { getAccessToken } from '../../../../api/auth';
import {FontSizeOutlined,LinkOutlined} from '@ant-design/icons';
import {Button, Form, Input, notification} from 'antd';
import './EditMenuWebForm.scss';
import { updateSocialMediaApi } from '../../../../api/MenuSM';

const EditMenuWebSM = ({item, setReloadMenuWeb, setIsVisibleModal}) => {
   
    const [newMenuWeb, setNewMenuWeb] = useState({});
    
    useEffect(()=>{
        setNewMenuWeb({
            title:item.title,
            url:item.url
        })
    },[item]);

    
    const updateMenu= async(e)=>{
        e.preventDefault();
        const {url} = newMenuWeb;
        if(url.trim()===""){
            return notification["error"]({
                message: "no puede dejar campos vacíos"
            })
        };
        
        if(url<8){
            return notification["error"]({
                message: "El url está muy corto"
            });
        }
        const token = await getAccessToken();
        const result = await updateSocialMediaApi(token,newMenuWeb,item._id);
        
        if(result.saved){//     <-- si se actualizó, el backend manda una propiedad de saved=true
            setReloadMenuWeb(true);
            setIsVisibleModal(false);
            return notification["success"]({
                message: result.message
            });
        }else{
            return notification["error"]({
                message: result.message
            });
        }


    }

    return (  
        <div className="edit-menu-form">
            <EditForm
                newMenuWeb={newMenuWeb}
                setNewMenuWeb={setNewMenuWeb}
                updateMenu={updateMenu}
            />
        </div>
    );
}

function EditForm({newMenuWeb,setNewMenuWeb,updateMenu}){
    
    return(
        <Form>
            <Form.Item>
                <Input disabled 
                    prefix ={<FontSizeOutlined className="prefix"/>}
                    name="title"
                    value={newMenuWeb.title}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix ={<LinkOutlined className="prefix"/>}
                    placeholder="url"
                    name="url"
                    value={newMenuWeb.url}
                    onChange={e=>setNewMenuWeb({...newMenuWeb, url:e.target.value})}
                />
            </Form.Item>
            <Form.Item>
            <Button type="primary" 
                htmlType="submit" 
                className="btn-submit"
                onClick={updateMenu}>
                Actualizar
            </Button>
        </Form.Item>
        </Form>
    );
}
 
export default EditMenuWebSM;