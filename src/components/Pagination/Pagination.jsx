import React from 'react'
import './Pagination.scss';
import {Pagination as PaginationAntd} from 'antd';
import { parse } from 'ipaddr.js';


const Pagination = ({posts, location, history}) => {
    const current=parseInt(posts.page);

    const onChange= newPage =>{
        history.push(`${location.pathname}?page=${newPage}`)//navegar a otra pagina
    }
   
    return (
    
    <PaginationAntd 
    defaultCurrent={current}
    className="pagination"    
    total={posts.total}
    pageSize={posts.limit}
    onChange={newPage => onChange(newPage)}
    />

    );
}
 
export default Pagination;