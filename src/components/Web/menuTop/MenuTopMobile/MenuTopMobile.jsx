import React, {  useState, useEffect } from 'react';
import {slide as Menu} from 'react-burger-menu'
import'./MenuTopMobile.scss';
import {MenuOutlined} from '@ant-design/icons';
import {getMenuApi} from '../../../../api/Menu'
import {Link} from 'react-router-dom';
import Logo from '../../../../assets/imagenes/png/logo-white.png';
import SocialMedia from './SocialMedia';

const MenuTopMobile = () => {
    
    const [menuData, setMenuData] = useState([]);

    
  
        useEffect(()=>{
            let isMounted = true;//para que no de error

        const getMenu=async()=>{
            const resultado=await getMenuApi();
            const arrayMenu = [];
            resultado.menu.forEach(item=>{
                if(item.active){
                    arrayMenu.push(item)
                }
            });
            if(isMounted){
   
            setMenuData(arrayMenu);
            }
        }
        getMenu();
        // eslint-disable-next-line
    },[]);

   
    
        return (  
       <div className="menu-top-mobile">
           <div className="menu-top-mobile_left">
               
            <button className="menu-top-mobile-button">
                {<MenuOutlined className="icon" />}
            </button>
            <Menu left >
                
                {menuData.map(item=>{
                    const external = item.url.indexOf("http")>-1 ? true : false;//checar si es ruta externa
                    if(external){
                        return(
                                <a key={item.url} className="menu-item" href={item.url} target="_blank" rel="noopener noreferrer" >{item.title}</a>
                        );
                    }else{
                        
                        return(
                            
                            <Link  to={item.url} key={item.url} className="menu-item">{item.title}</Link>
                            
                        );
                    }
                })}
                {/* eslint-disable-next-line*/}
                    {/* eslint-disable-next-line*/}
                    <div className="social-links-mobile">
                        {/* eslint-disable-next-line*/}
                        <SocialMedia/>
                    </div>

            </Menu>
           </div>
           <div className="menu-top-mobile_right">
                <Link to="/"><img alt=""  src={Logo}/></Link>
           </div>
       </div>
    );
}
 
export default MenuTopMobile;