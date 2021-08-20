import React, { useState, useEffect } from 'react';
import './Blog.scss';
import {Button,notification} from 'antd'
import Modal from '../../../components/modal';
import {PlusOutlined} from '@ant-design/icons';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';//engloba el componente
import { getPostsApi } from '../../../api/Post';
import PostList from './postList';
import Pagination from '../../../components/Pagination';
import AddEditPostForm from '../../../components/Admin/Blog/AddEditPostForm';


function Blog (props) {
    
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(null);
    const [posts, setPosts] = useState([]);
    const [reloadPost, setReloadPost] = useState(false);

    const {location, history} = props;
    const {page=1} = queryString.parse(location.search);//sacar del url}


    const newPost =()=>{
        setIsVisible(true);
        setTitle("Nuevo Post");
        setContent(<AddEditPostForm
            setIsVisible={setIsVisible}
            setReloadPost={setReloadPost}
            post={null}
        />);
    }

    useEffect(()=>{
        const getPosts=async()=>{
           const result= await getPostsApi(5,page);
           
           if(!result.posts){
               notification["error"]({
                   message : result.message
               })
           }else{ 

               setPosts(result.posts);
           }
        }
        getPosts();
        setReloadPost(false);
    },[page,reloadPost]);

    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary" onClick={newPost}><PlusOutlined /> Nuevo Post</Button>
            </div>
            <div className="blog__post-list">  
                <PostList posts={posts.docs} setReloadPost={setReloadPost}
                
                setIsVisible={setIsVisible}
                setTitle = {setTitle} setContent = {setContent}
                />
            </div>
            <div className="blog__pagination">
                {posts.page ?<Pagination posts={posts} location={location} history={history}/> :null}
            </div> 
            <Modal
                title={title}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                width = "75%"
            >{content}</Modal>

        </div>
        );
}
 
export default withRouter( Blog);