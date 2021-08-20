import React, {  useEffect, useState } from 'react';
import AdminBookList from './AdminBookList';
import AdminBookSearch from './AdminBookSearch';

import {Empty } from 'antd';

//api
import {getAccessToken} from '../../../api/auth';
import {getBooksApi} from '../../../api/books';


const AdminBook = () =>{
    const [booksData, setbooksData] = useState([]);
    const [bookOption, setBookOption]=useState(true);
    

    return(
        <>
            <AdminBookSearch setbooksData={setbooksData} bookOption={bookOption} setBookOption={setBookOption}/>
            {
                bookOption
                ?<AdminAllBooks booksData={booksData}/>
                :booksData.length>0 
                    ?<AdminBookList booksData={booksData}/>
                    :<Empty />    
            }
        </>
    );

}


export function AdminAllBooks({booksData}){//encontrar dee uno en uno
    const [allBooks, setallBooks] = useState();

    useEffect(()=>{
        const getBooks = async()=>{
            const token = await getAccessToken();
            const results = await getBooksApi(token);
            setallBooks(results.dates);
        }
        getBooks();

    },[]);

    return(
        <>
            {allBooks
                ?<AdminBookList booksData={allBooks} complete={true}/>
                :null
            }
        </>
    );
}

export default AdminBook;