import {basePath} from './config';

export function sendConfirmWhatsappMessageApi(number, date, name){
    const url = `${basePath}/send-message-post`;
    const params ={
        method: 'POST',
        body: JSON.stringify({number:number, date:date, name:name}),
        headers:{
            'content-type':'application/json'
        }
    }

    return fetch(url,params).then(response=>{
        return response.json();
    }).then(results =>{
        return results;
    }).catch(err=>{
        return err
    })
}