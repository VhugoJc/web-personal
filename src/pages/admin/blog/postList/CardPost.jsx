import React, { useState } from 'react'
import {Input, Modal as ModalAnt, Button, List, notification, Card} from 'antd'
import {EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import { deletePostApi } from '../../../../api/Post';
import {getAccessToken} from '../../../../api/auth';
import AddEditPostForm from '../../../../components/Admin/Blog/AddEditPostForm';


const {confirm} = ModalAnt;


const cardPost = ({post,setReloadPost, setIsVisible, setTitle,setContent}) => {
  
    
    const editPost =(post)=>{
        setIsVisible(true);
        setTitle("Editar Post");
        setContent(<AddEditPostForm
            setIsVisible={setIsVisible}
            setReloadPost={setReloadPost}
            post={post}
        />);
    }

    const deletePost=async (post)=>{ 

        
        confirm({
            title:"Eliminando usuario",
            content: `¿Seguro que quiere eliminar el post ${post.url}`,
            okText:"Eliminar",
            okType:"danger",
            okCancel:"Cancelar",
            onOk (){
               deletePost();
            }
       });

       const deletePost=async()=>{       
            const token = await getAccessToken();
           const result = await deletePostApi(post._id,token);
             if(result.code){
                setReloadPost(true);
                 return notification["success"]({
                     message: result.message
                 })
             }else{
                 return notification["error"]({
                     message: result.message
                 })
             }
    }


}

    return (  
        <List.Item
        actions ={[
            <Link to={`/blog/${post.url}`} target="_blank" rel="noopener referrer">
                <Button type="primary">
                    <EyeOutlined />
                </Button>
            </Link>,

            <Button type="primary" onClick={()=>editPost(post)} >
                <EditOutlined />
            </Button>,

            <Button type="danger" onClick={()=>deletePost(post)}>
                <DeleteOutlined />
            </Button>
        ]}
        >
            <List.Item.Meta title={post.title}/>
        </List.Item>
    );
}
 
export default cardPost;