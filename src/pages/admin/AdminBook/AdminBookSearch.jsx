import React,{useEffect, useState} from 'react';
import AdminBookList from './AdminBookList';
import {DatePicker, Empty, Radio} from 'antd';

//apis
import{getAccessToken} from '../../../api/auth';
import {getBooksForDayApi} from '../../../api/books';
import moment from 'moment';


const AdminBookSearch = ({setbooksData,setBookOption, bookOption}) => {
    const [date, setdate] = useState(moment().format("MM/DD/YYYY"));
    const [token, settoken] = useState();

    useEffect(()=>{
        const changeDate =async () =>{
            const token = await getAccessToken();
            settoken(token);
            const results = await getBooksForDayApi(date, token);
            setbooksData(results.dates);
        }
        changeDate();
    },[]);

    

    const onChange =async(e)=>{
        if(e!==null){
            setdate(moment(e).format('MM/DD/YYYY'));
            const results = await getBooksForDayApi(moment(e).format('MM/DD/YYYY'), token);
            setbooksData(results.dates)
        }
    }
    return (  
        <>
        <div>
            <h2>ASearcher</h2>
            <Radio.Group style={{width:"100%"}} value={bookOption} onChange={e=>setBookOption(e.target.value)}>

                <Radio value={true}  style={{width:"50%",justifyContent:"center"}}>
                próximas citas
                </Radio>
                <Radio value={false} style={{width:"40%",right:"0"}}>
                    Fecha en específico: <DatePicker onChange={e=>onChange(e)} disabled={bookOption} />
                </Radio>
            </Radio.Group>
            <br/>
            {bookOption
                ?null
                :<h2>  <strong>{date}</strong></h2>}
            
        </div>
        </>

    );
}
 
export default AdminBookSearch;