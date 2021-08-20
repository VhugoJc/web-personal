import {basePath} from './config.js';

export function addEmailNewsLetterApi(email){
    const url = `${basePath}/suscribe-newsletter/${email}`;
    const params={
        method: "POST"
    }

    return fetch(url,params).then(Response=>{
        return Response.json();
    }).then(result=>{
        return result;
        
    })
}