import React, {useEffect, useState} from 'react';
import {getServices, addService, updateService, deleteService} from '../../../api/servicesImg';
import MenuWebList from '../../../components/Admin/menuWeb/menuWebList';

const AdminServices = () => {
    const [menu, setMenu] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
    

    useEffect(()=>{
        const getMenu= async()=>{
            const result = await getServices();
            setMenu(result.services);
        }
        setReloadMenuWeb(false);
        getMenu();
    },[reloadMenuWeb]);

    return (  
        <MenuWebList 
            setReloadMenuWeb={setReloadMenuWeb} 
            showAvatar={true}
            menu={menu}
            addMenuApi={addService} 
            updateMenuApi={updateService} 
            deleteMenuApi = {deleteService}
            title="Servicio"
        />
        );
}
export default AdminServices;
