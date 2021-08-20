import React, { useEffect, useState } from 'react';
import {Spin, List, notification} from 'antd';
import {Link} from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '../../../Pagination';
import {getPostsApi} from '../../../../api/Post';
import 'moment/locale/es'//para que moment sea en español


import './PostListWeb.scss';


const PostListWeb = ({location, history}) => {

    const [posts, setPosts] = useState(null);
    const {page = 1}= queryString.parse(location.search)//saber pagina actual

    useEffect(()=>{
        getPostsApi(5,page).then(response=>{
            if(response.posts){
                setPosts(response.posts)
            }else{
                notification["warning"]({
                    message: "Error al cargar los posts"
                })
            }
        }).catch(()=>{
            notification["error"]({
                message: "Error en el servidor"
            })
        })
    },[page]);
    if(!posts){
        return <Spin tip="Cargando" style={{width:"100%", padding:"200px 0"}}/>
    }
    return (  
        <div className="posts-list-web">
            <h1>Blog</h1>
            <List
                dataSource={posts.docs}
                renderItem = {post => <Post post={post}/>}
                />
            <Pagination posts={posts} location={location} history={history}/>
        </div>
    );
}

export default PostListWeb;


function Post({post}){
    const {date} = post;
    const day= moment(date).format("DD");
    const month = moment(date).format("MMMM");
    const year = moment(date).format("YYYY");

    return (
        <List.Item
            className="post"
        >
            <div className="post__date">
                <span>{day}</span>
                <span>{month}</span>
            </div>

            <Link to={`/blog/${post.url}`} className="post__title">
                <List.Item.Meta title={post.title}/>
            </Link>
        </List.Item>
    )
}