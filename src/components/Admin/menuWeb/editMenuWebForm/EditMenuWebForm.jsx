import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { getAccessToken } from '../../../../api/auth';
import {FontSizeOutlined,LinkOutlined} from '@ant-design/icons';
import {Button, Form, Input, notification} from 'antd';
import './EditMenuWebForm.scss';
const EditMenuWebForm = ({item, setReloadMenuWeb, setIsVisibleModal, title, updateMenuApi}) => {
   
    const [newMenuWeb, setNewMenuWeb] = useState({});
    
    useEffect(()=>{
        setNewMenuWeb({
            title:item.title,
            url:item.url
        })
    },[item]);

    
    const updateMenu= async(e)=>{
        e.preventDefault();
        const {url,title} = newMenuWeb;
        if(url.trim()===""||title.trim()===""){
            return notification["error"]({
                message: "no puede dejar campos vacíos"
            })
        };
        
        if(title<2){
            return notification["error"]({
                message: "El título está muy corto"
            });
        }
        const token = await getAccessToken();
        const result = await updateMenuApi(token,newMenuWeb,item._id);
        
        if(result){//     <-- si se actualizó, el backend manda una propiedad de saved=true
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
                title={title}
                newMenuWeb={newMenuWeb}
                setNewMenuWeb={setNewMenuWeb}
                updateMenu={updateMenu}
            />
        </div>
    );
}

function EditForm({newMenuWeb,setNewMenuWeb,updateMenu, title}){
    
    return(
        <Form>
            <Form.Item>
                <Input
                    prefix ={<FontSizeOutlined className="prefix"/>}
                    placeholder="titulo del menú"
                    name="title"
                    value={newMenuWeb.title}
                    onChange={e=>setNewMenuWeb({...newMenuWeb, title:e.target.value})}
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
                Actualizar {title}
            </Button>
        </Form.Item>
        </Form>
    );
}
 
export default EditMenuWebForm;