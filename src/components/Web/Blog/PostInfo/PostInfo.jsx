import React, { useEffect, useState } from 'react'
import './PostInfo.scss';
import {getPostApi} from '../../../../api/Post';
import Error404 from '../../../../pages/Error404';
import {Spin, notification} from 'antd';
import moment from 'moment';

const PostInfo = ({url}) => {
    const [postData, setPostData] = useState(null);


    useEffect(()=>{
        getPostApi(url).then(result=>{
            if(result.message){
                setPostData("error");
            }else{
                setPostData(result.post);
            }
        }).catch(()=>{
                notification["error"]({
                    message: "Error en el servidor"
                })
        });
    },[]);

    return (  
        <div className="post-info">
            {
                postData
                ?
                (
                    postData!=="error"
                    ?
                    <>
                    <h1 className="post-info__title">{postData.title}</h1>
                    <div className="post-info__creation-date">
                        {moment(postData.date).local("es").format("LL")}
                    </div>
                    <div
                     className="post-info__description"
                     dangerouslySetInnerHTML={{__html: postData.description}}
                    />
                    </>
                    :<Error404 />  )
                :<Spin tip="Cargando" style={{width:"100%", padding:"200px 0"}}/>
            }
        </div>
    );
}
 
export default PostInfo;