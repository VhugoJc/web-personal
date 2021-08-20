import {basePath} from './config.js';

export function addService(token, serviceData){
    const url = `${basePath}/add-service`;

    const params ={
        method: "POST",
        headers: {"Content-type": "application/Json",
        Authorization:token}, 
        body: JSON.stringify(serviceData)
    }

    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
            return result
        }
    ).catch(err=>{
        return err;
    });
}

export function getServices(){
    const url = `${basePath}/get-service`;
    
    return fetch(url).then(response=>{
        return response.json()
    }).then(result =>{
        return result
    }).catch(err=>{
        return err.message
    })
}

export function deleteService(token,idService){
    const url = `${basePath}/delete-service/${idService}`;
    const params ={
        method: "DELETE",   
        headers: {
            "Content-type":"application/Json",
            Authorization:token
        }
    }

    return fetch(url, params).then(
        response =>{
            return response;
        }
    ).then( result=>{
        return result
    }).catch(err=>{
        return err
    })
}

export function updateService(token,serviceData,menuId){
    const url = `${basePath}/update-service/${menuId}`;

    const params ={
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        },
        body: JSON.stringify(serviceData)
    }

    return fetch(url,params).then(response=>{
        return response.json();
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })

}