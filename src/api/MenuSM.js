import {basePath} from './config.js';

export function getSocialMediaApi(){
    const url = `${basePath}/get-social-media-menu`;
    const params={
        method: "GET",
        headers:{
            "Content-Type":"application/json"
        }
    }
    return fetch(url,params).then(response=>{
        return response.json();
    }).then(result=>{
        
        return result;
    })
}
export function updateSocialMediaApi(token,SocialMediaData,idSocialMedia){
    const url = `${basePath}/update-social-media-menu/${idSocialMedia}`;
    const params={
        method: "PUT",
        headers:{
            "Content-Type" : "application/json",
            Authorization: token
        },
        body: JSON.stringify(SocialMediaData)
    };

    return fetch(url,params).then( response=>{
        return response.json()
    }).then(result=>{
       
        return result
    }).catch(err=>{
        return {message: "Error en la conexión"}
    })
}