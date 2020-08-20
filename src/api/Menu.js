import {basePath} from './config.js';

export function getMenuApi(){
    const url = `${basePath}/get-menu`;
   

    return fetch(url).then(response =>{
        return response.json();
    }).then( result=>{
        return result;
    }).catch(err=>{
        return err.message;
    })
}

export function updateMenuApi(token,menuData,menuId){
    const url = `${basePath}/update-menu/${menuId}`;

    const params ={
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        },
        body: JSON.stringify(menuData)
    }

    return fetch(url,params).then(response=>{
        return response.json();
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })

}

export function addMenuApi (token,menuData){

    const url= `${basePath}/add-menu`;
    const params={
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:token
        },
        body: JSON.stringify(menuData)
    };

    return fetch(url,params).then(response=>{
        return response.json()
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}

export function deleteMenuApi(token,idMenu){
    const url = `${basePath}/delete-menu/${idMenu}`;
    const params ={
        method: "DELETE",
        headers:{
            Authorization: token,
            "Content-Type":"application/json"
        }
    };

    return fetch(url,params).then(response=>{
        return response
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}