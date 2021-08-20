import React from 'react';
import {Input, Modal as ModalAnt, Button, List, notification, Card} from 'antd'
import './PostList.scss';
import CardPost from './CardPost';


const PostList = ({posts, setReloadPost, setIsVisible, setTitle,setContent}) => {
    
    return (  
        <div className="post-list">
            <List 

                dataSource={posts}
                renderItem={post=><CardPost post ={post} setReloadPost={setReloadPost} setIsVisible={setIsVisible}
                    setTitle = {setTitle} setContent = {setContent}
                />}
            />
        </div>
    );
}
 
export default PostList;