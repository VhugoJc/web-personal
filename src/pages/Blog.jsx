import React,{useEffect} from 'react';
import {Row,Col} from 'antd';
import * as Scroll from 'react-scroll';
import {useParams} from 'react-router-dom';
import PostListWeb from '../components/Web/Blog/PostListWeb';
import PostInfo from '../components/Web/Blog/PostInfo';

const Blog = (props) => {
    const url = useParams().url;
    const {location, history} = props;
    

    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
      }, [])


    return (  
        <Row>
            <Col xs={4}/>
            <Col xs={16}>
                
            {
                url
                ?<PostInfo url={url}/>
                :<PostListWeb location = {location}     history={history}/>
            }
            </Col>
            <Col xs={4}/>
        </Row>
    );
}
 
export default Blog;