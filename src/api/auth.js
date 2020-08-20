import {basePath} from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';

export function getAccessToken(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if(!accessToken || accessToken === "null"){//si no hay
        return null;
    }

   return  willExpireToken(accessToken) ?null :accessToken;// si es true, expiró

    
}

export function getRefreshToken(){
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if(!refreshToken || refreshToken === "null"){//si no hay
        return null;
    }

   return  willExpireToken(refreshToken) ?null :refreshToken;// si es true, expiró

    
}

export function refreshAccessToken(refreshToken){
    const url = `${basePath}/refresh-access-token`;
    const bodyObj ={
        refreshToken: refreshToken
    };
    const params ={
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
            "content-Type": "application/json"
        }
    };

    fetch (url,params).then(response =>{
        if(response.status!==200){
            return null;
        }
        return response.json();
    })
    .then(result =>{
        if(!result){
            logOut(); 

        }else{
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN,refreshToken);
        }
    })
}

export function logOut (){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken (token){//verifica la fecha de expiración del token
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const {exp} = metaToken;
    const now = (Date.now() + seconds) / 1000;
    
    return now > exp;//en caso de que haya expirado manda un true
}
