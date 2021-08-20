import React,{useState} from 'react';
import {Button, Form, Input, Select, notification} from 'antd';
import {FontSizeOutlined} from '@ant-design/icons';
import './AddMenuWebForm.scss';

import { getAccessToken } from '../../../../api/auth';

const AddMenuWeb = ({addMenuApi, setReloadMenuWeb, setIsVisibleModal, title}) => {

   
    const [newMenuWeb, setNewMenuWeb] = useState({
        title:"",
        url:"",
        beforeUrl:"http://"
    });

    

    const addMenu=async(e)=>{
        e.preventDefault();
        const {url,title,beforeUrl}=newMenuWeb;
        const menuWebToAdd ={
            title: title,
            url: `${beforeUrl}${url}`,
            active:true
        }

        if(url===""||title===""){
            return notification["error"]({
                message: "Por favor llene todos los campos"
            });
        }
        if(url.length<=2){
            return  notification["error"]({
                message: "Url muy corta"
            });
        }
        if(title.length<2){
            return notification["error"]({
                message: "Titulo muy corto"
            });
            
        }
        const tokenv = await getAccessToken();
        const result = await addMenuApi(tokenv,menuWebToAdd);    //<---AQUI  AGREGA EL MENU
       
            setReloadMenuWeb(true);
            setIsVisibleModal(false);
            setNewMenuWeb({
                title:"",
                url:"",
                beforeUrl:"http://"
            });
           

            return notification["success"]({        //<---si se generó
                message: result.message
            });


       


    }

    
    return (  
        <div className ="add-menu-web-form">
            <AddForm 
                title={title}
                newMenuWeb={newMenuWeb} 
                setNewMenuWeb={setNewMenuWeb}
                addMenu={addMenu}/>
        </div>
    );
}
 
function AddForm ({newMenuWeb,setNewMenuWeb,addMenu, title}){
    const {Option} = Select;
   
   
    const selectBefore = (
        
        <Select
        defaultValue= {newMenuWeb.beforeUrl}
        onChange={(e)=>setNewMenuWeb({...newMenuWeb, beforeUrl:e})}
        style={{width: 90}}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>

    );
    return <Form>
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
            name="url"
            addonBefore={selectBefore}
            placeholder="url"
            value={newMenuWeb.url}
            onChange={(e)=>setNewMenuWeb({...newMenuWeb, url:e.target.value})}
            />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit" onClick={addMenu}>
                Crear {title}
            </Button>
        </Form.Item>
        
    </Form>
}
export default AddMenuWeb;