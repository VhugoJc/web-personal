import {basePath} from './config.js';

export function signUpApi (token, data)  {
    let action ={
        message:"",
        status: true
    };

    const url = `${basePath}/sing-up`;
    const params = {
        method : "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url,params).then(response =>{
        return response.json();
    }).then(result => {
        if(result.user){
            action.message="Se ha creado exitosamente";
            return action;
        }else{
            action.status=false;
            action.message= result.msg;
            
            return action;
        }
    })
    .catch(()=>{
        action.status=false;
        action.message= "error en el servidor";
        return action;
    })
}

export function signInApi(data){
    const url = `${basePath}/sign-in`;
    let action={
        status: false,
        message: ""
    };
    
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    };

    return fetch(url,params).then(response =>{
        return response.json();
    }).then (result =>{
       
        if(!result.accessToken){//si no se comprobó
            action.message = result.message;
        
            return action;
        }else{
            action.status=true;
            action.message = "Usuario Autenticado";
            action.accessToken = result.accessToken;
            action.refreshToken= result.refreshToken;
            return action;
        }
        
    }
    )
    .catch(err=>{
        action.message = "Error en el servidor";
        return action;
    })
}

export function getUserApi(token){
    const url = `${basePath}/users`;
    const errorServer ={
        message: "error al conectarse al servidor"
    }


    const params ={
        method: "GET",
        headers: {
            "Content-Type" : "application/JSON",
            "Authorization" : token
        }
    };

    return fetch(url, params).then(
        response => {
            return response.json();
        }
    ).then(result => {
        
        return result;
    }).catch(err=>{
        return errorServer;
    })
}

export function getUserActiveApi (token, status){
    const url = `${basePath}/users-active?active=${status}`;
    const errorServer ={
        message: "error al conectarse al servidor"
    }


    const params ={
        method: "GET",
        headers: {
            "Content-Type" : "application/JSON",
            "Authorization" : token
        }
    };

    return fetch(url, params).then(
        response => {
            return response.json();
        }
    ).then(result => {
        
        return result;
    }).catch(err=>{
        return errorServer;
    })
}
export function getUsersDataApi(){
    const url = `${basePath}/get-user-data?active=${true}`;

    return fetch(url).then(response=>{
        return response.json();
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}
export function uploadAvatarApi (token, avatar, userId){
    const url = `${basePath}/upload-avatar/${userId}`;

    const formData= new FormData();//cuando se manda imagenes por fetch
    formData.append("avatar", avatar, avatar.name);//key,avatar,nombre

    const params ={
        method:"PUT",
        body: formData,
        headers:{
            Authorization:token
        }
    };

    return fetch(url, params).then(response =>{
        return response.json()
    }).then(result =>{
        return result
    }).catch(err=>{
        return err;
    })


};

export function getAvatarApi (avatarName){
    const url =`${basePath}/get-avatar/${avatarName}`;

    return fetch(url).then(response =>{
        return response.url
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    })
}

export function updateUserApi (token, user, userId){
    
    const url = `${basePath}/update-user/${userId}`; 
    
    const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(user)
      };
    
      return fetch(url, params)
        .then(response => {
          return response.json();
        })
        .then(result => {
          return result;
        })
        .catch(err => {
          return err.message;
        });
}

export function activateUserApi(token,active,userId){
    const url = `${basePath}/activate-user/${userId}`;
    
    const user ={
        active:active
    };

    const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(user)
      };

      return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
      });
}

export function deleteUserApi (token,userId){
    const url = `${basePath}/delete-user/${userId}`;
    
    const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      };

      return fetch(url,params)
      .then(response => {
        return response;
      })
      .then(result => {
         
        return result;
      })
      .catch(err => {
        return err.message;
      });
}