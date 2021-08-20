import React,{useState,useEffect} from 'react';
import './AddEditPostForm.scss';
import {Row,Form,Input,Button,DatePicker,notification, Col} from 'antd';
import {FontSizeOutlined,LinkOutlined} from '@ant-design/icons'
import {Editor} from '@tinymce/tinymce-react';
import moment from 'moment';
import { getAccessToken } from '../../../../api/auth';
import {AddPostApi, UpdatePostApi} from '../../../../api/Post';



const AddEditPostForm = ({setIsVisible, setReloadPost, post}) => {

    const [postData, setpostData] = useState({
        title : "",
        url :"",
        date: null,
        description:""});
    useEffect(()=>{
        if(post){
            setpostData(post);
        }else{
            setpostData({});
        }
    },[post]);
    

    const processPost =async()=>{
        const {title, url, date, description} = postData;

        if(title === ""||url===""||date===null||description===""){
            return(notification["error"]({
                message: "No puede dejar campos vacíos"
            }))
        }
        

        const token = await getAccessToken();

        if(!post){//Add New Post
            await AddPostApi(postData, token).then(result=>{
                notification["success"]({
                    message: result.message
                });
                setReloadPost(true);
                setIsVisible(false);
            }).catch(()=>{
                notification["error"]({
                    message: "Ocurrió un error creando el Post"
                })
            })
            
        }else{
            //Update a Post
            await UpdatePostApi(postData, token).then(result=>{
                notification["success"]({
                    message: result.message
                });
                setReloadPost(true);
                setIsVisible(false);
            }).catch(()=>{
                notification["error"]({
                    message: "Ocurrió un error creando el Post"
                })
            })
            
        }
    }

    return (  
        <div className="add-edit-post-form">
          
               <AddEditForm 
                    postData={postData} 
                    setpostData={setpostData} 
                    post={post}
                    processPost = {processPost}
                    /> 
           
        </div>
    );
}
 
export default AddEditPostForm;

function AddEditForm({postData, setpostData, post, processPost}){
    
    return(
        <Form className="add-edit-post-form"
        layout="inline"
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Input
                        style={{width:"100%"}}
                        prefix ={<FontSizeOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                        placeholder="Título"
                        value={postData.title}
                        onChange={(e)=>setpostData({...postData, title:e.target.value})}
                    />    
                </Col>
                <Col span={8}>
                    <Input
                            style={{width:"100%"}}
                            prefix ={<LinkOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                            placeholder="url del post"
                            value={postData.url}
                            onChange={e=>setpostData({...postData, url:e.target.value})}
                            
                        />    
                </Col>
                <Col span={8}>
                    <DatePicker
                        style={{width:"100%"}}
                        format="DD/MM/YYYY HH:mm:ss"
                        placeholder="Fecha de publicación"
                        showTime={{defaultValue: postData.date ?moment(postData.date) :moment("00:00:00","HH:mm:ss")}}
                        value={postData.date ?moment(postData.date) :null}
                        //onChange={}
                        onChange={e=>setpostData({...postData, date:e})}
                    />
                </Col>
            </Row>
            {/*tinymce */}
            <br/>
            <br/>
            <br/>
            <Editor
            
         value={post ?postData.description :""}
         onEditorChange ={e=>setpostData({...postData, description:e})}
         init={{
           height: 400,
           width:"100%",
           menubar: true,//para agregar imagenes
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         //onEditorChange={this.handleEditorChange}
       />            
       
       <Button 
            type="primary"
            className="btn-submit"
            onClick={()=>processPost()}
            
        >
            {post ?"actualizar Post" :"Crear Post"}
       </Button>

        </Form>
    );
}