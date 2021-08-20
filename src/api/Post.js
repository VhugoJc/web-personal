import {basePath} from './config';

export function AddPostApi(post, token){
    const url =  `${basePath}/add-post/`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,

        },
        body : JSON.stringify(post)

    }

    return fetch (url, params)
    .then(response=>{
        return response.json();
        })
    .then(result =>{
            return result
    })
    .catch(err=>{
        return err
    })
}

export function getPostsApi(limit, page){
    const url = `${basePath}/get-posts?page=${page}&limit=${limit}`;
    
    
    return fetch(url).then(response =>{
        return response.json();
    }).then( result=>{
        return result;
    }).catch(err=>{
        return err.message;
    })

}

export function deletePostApi(id, token){
    const url =  `${basePath}/delete-post/${id}`;
    const params ={
        method: "DELETE",
        headers :{
            "Content-Type":"application/json",
            Authorization: token
        }
    }

    return fetch(url,params).then(response=>{
        return response.json();
    }).then( result=>{
        return result;
    }).catch( err=>{
        return err;
    });
    
}

export function UpdatePostApi(post, token){
    const url =  `${basePath}/update-post/${post._id}`;
    const params ={
        method: "PUT",
        headers :{
            "Content-Type":"application/json",
            Authorization: token
        },
        body : JSON.stringify(post)
    }
    
    return fetch(url,params).then(response=>{
        return response.json();
    }).then( result=>{
        return result;
    }).catch( err=>{
        return err;
    });
}

export function getPostApi(url){
    const urlBE = `${basePath}/get-post/${url}`;

    return fetch(urlBE).then(response =>{
        return response.json();
    }).then( result=>{
        return result;
    }).catch(err=>{
        return err.message;
    })
}