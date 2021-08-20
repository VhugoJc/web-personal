import React,{useState} from 'react'
import './NewsLetter.scss';
import {Form,Input,notification, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import { addEmailNewsLetterApi } from '../../../../api/NewsLetter';

const NewsLetter = () => {
    const [emailNewsletter, setEmailNewsletter] = useState("");
    
    const onSubmit=async e=>{
        e.preventDefault();
        // eslint-disable-next-line
        if(emailNewsletter.length<=4|| !/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(emailNewsletter)){
            return notification["error"]({
                message:"El correo no es válido"
            });
        }
        const resultado= await addEmailNewsLetterApi(emailNewsletter);
        
        if(!resultado.status){
            return notification["warning"]({
                message: resultado.message
            })
        }
        setEmailNewsletter("");
        return notification["success"]({
            message: resultado.message
        })


    }

    return (  
        <div className="newsletter">
                <h3>Newsletter</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Correo Electrónico"
                            value={emailNewsletter}
                            onChange={(e)=>setEmailNewsletter(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onSubmit}>¡Me suscribo!</Button>
                    </Form.Item>
                </Form>
        </div>
    );
}
 
export default NewsLetter;