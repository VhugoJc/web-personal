import {basePath} from './config';

export function addNewBookApi(bookData){
   const url = `${basePath}/add-book-online`;

   const params ={
       method:"POST",
       headers:{
           'content-type': 'application/json'
       },
       body: JSON.stringify(bookData) 
   } ;

   return fetch(url,params).then(response=>{
       return response.json();
   }).then(result=>{
       return result;
   }).catch(err=>{
       return err;
   })
}

export function getBooksHoursForDayApi(day){
    const url =`${basePath}/get-books-hours-for-day?day=${day}`;

    const params ={
        method: "GET",
        headers:{
            "content-Type": "application/json"
        }
    }

    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    })
}

export function getBooksForDayApi(day,token){
    const url =`${basePath}/get-books-for-day?day=${day}`;
    
    const params ={
        method: "GET",
        headers:{
            "content-Type": "application/json",
            "Authorization": token
        }
    }

    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    })
}

export function getBooksApi(token){
    const url =`${basePath}/get-books`;
    
    const params ={
        method: "GET",
        headers:{
            "content-Type": "application/json",
            "Authorization": token
        }
    }

    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    })
}