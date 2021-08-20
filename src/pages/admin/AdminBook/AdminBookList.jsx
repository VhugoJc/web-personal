import React, { useEffect, useState } from 'react';


import moment from 'moment';

import { Table, Tag,    Spin } from 'antd';


const AdminBookList = ({booksData,complete}) => {
    const [data, setdata] = useState([]);

    useEffect(()=>{
        booksData.forEach(item=>{
            let tagColor;

            switch(item.status){//Tag status color: ;
                case 'Pendiente':
                    tagColor='geekblue';
                    break;
                case 'Confirmado':
                    tagColor='green';
                    break;
                case 'Cancelado':
                    tagColor='volcano';
                    break;
                default:
                    break;
            }

            let tagDate="";
            if(complete){
                var b = moment();
                var a = moment(item.date);
                
                if(a.diff(b, 'days')<=3 ){
                    tagDate=`${moment(item.date).calendar(null, {
                        sameDay: '[Hoy]',
                        nextDay: '[Mañana]',
                    })} `;
                }else{
                    tagDate=`${moment(item.date).format("DD MMMM YYYY")} `;
                }

                
            }
            setdata(oldArray=>[...oldArray, {
                key: item._id,
                name: item.name,
                message: item.message,
                whatsapp:item.whatsapp,
                created: moment(item.created).format("DD MMMM YYYY HH:mm"),
                date: <p><strong>{tagDate}</strong><Tag>{moment(item.date).format("HH:mm")}</Tag></p>,
                status: <Tag color={tagColor}
                >
                    {item.status}
                </Tag>,
            }]);
        });
    },[]);

    const columns = [
        {
          title: 'Nombre',
          width: 250,
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
        },
        
        { title: 'Whatsapp:', dataIndex: 'whatsapp', key: '1' },
        { title: 'Cita:', dataIndex: 'date', key: '2' },
        { title: 'status:', dataIndex: 'status', key: '3' }, 
        { title: 'Creado el:', dataIndex: 'created', key: '4' },
        {
          title: '',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: () => <a>Editar</a>,
        },
      ];
      


    return ( 
    <>
        {   data.length>0
            ?<Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
            :<div style={{textAlign:"center"}}><Spin  size="large" /></div>
        }
    </> 
    );
}
 
export default AdminBookList;