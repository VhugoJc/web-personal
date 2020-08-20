import React, { Fragment, useState, useEffect } from 'react';
import {slide as Menu} from 'react-burger-menu'
import'./MenuTopMobile.scss';
import {MenuOutlined} from '@ant-design/icons';
import {getMenuApi} from '../../../../api/Menu'
import { getSocialMediaApi } from '../../../../api/MenuSM';
import {ReactComponent as Facebook} from '../../../../assets/imagenes/svg/facebook.svg';
import {ReactComponent as Instagram} from '../../../../assets/imagenes/svg/instagram.svg'
import {ReactComponent as Twitter} from '../../../../assets/imagenes/svg/twitter.svg'
import {ReactComponent as LinkdIn} from '../../../../assets/imagenes/svg/linkedin.svg';
import {ReactComponent as Youtube} from '../../../../assets/imagenes/svg/youtube.svg'
import {Link} from 'react-router-dom';
import Logo from '../../../../assets/imagenes/png/logo-white.png';

const MenuTopMobile = () => {
    
    const [menuData, setMenuData] = useState([]);
    const [menuSM, setmenuSM] = useState([]);//menu social media
    let iconSocialMedia;
    
  
        useEffect(()=>{
        const getMenu=async()=>{
            const resultado=await getMenuApi();
            const arrayMenu = [];
            resultado.menu.forEach(item=>{
                if(item.active){
                    arrayMenu.push(item)
                }
            });
            setMenuData(arrayMenu);

            //Social media menu
            const resultado2=await getSocialMediaApi();
            const arrayMenuSM =[];
            resultado2.socialMediaMenu.forEach(itemSM=>{
                if(itemSM.active){
                    arrayMenuSM.push(itemSM);
                }
            });
            setmenuSM(arrayMenuSM);
        }
        getMenu();
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
                                <a  className="menu-item" href={item.url} target="_blank" >{item.title}</a>
                        );
                    }else{
                        
                        return(
                            
                            <Link  to={item.url}  className="menu-item">{item.title}</Link>
                            
                        );
                    }
                })}
                <div className="social-links-mobile">
                {menuSM.map(item=>{
                   switch(item.title){
                    case "Facebook":iconSocialMedia=<Facebook className="fb sm"/>;break;
                    case "Instagram":iconSocialMedia=<Instagram className="ig sm"/>;break;
                    case "LinkedIn":iconSocialMedia=<LinkdIn className="li sm"/>;break;
                    case "Twitter":iconSocialMedia=<Twitter className="tw sm"/>;break;
                    case "Youtube":iconSocialMedia=<Youtube className="yt sm"/>;break;
                }
                   return(
                   <a  className="menu-item" href={item.url} target="_blank" >{iconSocialMedia}</a>
                   );
                   
                })}
                </div>

            </Menu>
           </div>
           <div className="menu-top-mobile_right">
                <img src={Logo}/>
           </div>
       </div>
    );
}
 
export default MenuTopMobile;