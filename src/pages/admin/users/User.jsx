import React, {useState} from 'react';
import {getAccessToken} from '../../../api/auth';//obtener el token
import {getUserActiveApi} from '../../../api/user';//obtener los usuarion
import { useEffect } from 'react';
import ListUser from '../../../components/Admin/listUser/';

const User = () => {
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessToken();
    

    useEffect(() => {
        setReloadUsers(false);
        const getUsers= async ()=>{
            const result = await getUserActiveApi(token,true);
            if(result.message){//si el servidor encontró algún error
                console.log(result.message);
            }else{
                setUsersActive(result.users);
            }
            const resultInactive = await getUserActiveApi(token,false);
            if(resultInactive.message){//si el servidor encontró algún error
                console.log(resultInactive.message);
            }else{
                setUsersInactive(resultInactive.users);
            }

       }

       getUsers();
       
    }, [token, reloadUsers]);

    return (  
        <div className="users">
            <ListUser usersActive = {usersActive} usersInactive = {usersInactive} setReloadUsers = {setReloadUsers}/>
        </div>
    );
}
 
export default User;