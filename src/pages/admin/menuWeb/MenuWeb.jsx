import React, { useEffect } from 'react'
import {addMenuApi, getMenuApi, updateMenuApi, deleteMenuApi} from '../../../api/Menu';
import { useState } from 'react';
import MenuWebList from '../../../components/Admin/menuWeb/menuWebList';
import { getSocialMediaApi } from '../../../api/MenuSM';

const MenuWeb = () => {
    const [menu, setMenu] = useState([]);
    const [socialMedia, setSocialMedia] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
    

    useEffect(()=>{
        const getMenu= async()=>{
            const result = await getMenuApi();
            const result2= await getSocialMediaApi();
            setSocialMedia(result2.socialMediaMenu);
            setMenu(result.menu);
        }
        setReloadMenuWeb(false);
        getMenu();
    },[reloadMenuWeb]);

    return (  
        <MenuWebList 
            title={"Menú"}
            setReloadMenuWeb={setReloadMenuWeb} 
            menu={menu} 
            socialMedia={socialMedia}
            addMenuApi={addMenuApi}
            updateMenuApi={updateMenuApi} 
            deleteMenuApi = {deleteMenuApi}
            />
    );
}
 
export default MenuWeb;