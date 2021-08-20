import React, {Fragment } from 'react';
import {Switch,List, Button} from 'antd';
import {EditOutlined} from '@ant-design/icons';

const MenuItem2 = ({item, changeActive,editMenu,AvatarSM}) => {
    return(
        <List.Item
        
        actions={[
            <Fragment>
            <Switch defaultChecked={item.active} 
            // eslint-disable-next-line
            onClick={item.active=!item.active,()=>changeActive(item)}/>
            <Button type="primary"
                onClick={()=>editMenu(item)}
            >
                <EditOutlined/>
           </Button>
           
            </Fragment>
        ]}>
            <List.Item.Meta 
            avatar={AvatarSM} 
            title={item.title} description={item.url}>

            </List.Item.Meta>
        </List.Item>
    );
}
 
export default MenuItem2;