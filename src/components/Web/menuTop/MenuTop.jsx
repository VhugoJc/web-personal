import React,{useState, useEffect} from 'react';
import {Menu,Row,Col} from 'antd';
import {Link} from 'react-router-dom';
import Logo from '../../../assets/imagenes/png/logo-white.png';
import './MenuTop.scss';
import {getMenuApi} from '../../../api/Menu'
import { getSocialMediaApi } from '../../../api/MenuSM';
import {ReactComponent as Facebook} from '../../../assets/imagenes/svg/facebook.svg';
import {ReactComponent as Instagram} from '../../../assets/imagenes/svg/instagram.svg'
import {ReactComponent as Twitter} from '../../../assets/imagenes/svg/twitter.svg'
import {ReactComponent as LinkdIn} from '../../../assets/imagenes/svg/linkedin.svg';
import {ReactComponent as Youtube} from '../../../assets/imagenes/svg/youtube.svg'


const MenuTop = () => {
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
        <Row>  
        <Col lg={4}/>
        <Col  lg={16}>
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={"/"}>
                <img src={Logo}/>
                </Link>
            </Menu.Item>
            {menuData.map(item=>{
                const external = item.url.indexOf("http")>-1 ? true : false;//checar si es ruta externa
                
                if(external){
                    return(
                        <Menu.Item className="menu-item" key={item._id}>
                            <a href={item.url} target="_blank" >{item.title}</a>
                         </Menu.Item>
                    );
                }else{
                    return(
                    <Menu.Item className="menu-item" key={item._id}>
                        <Link to={item.url}>{item.title}</Link>
                    </Menu.Item>);
                }
            })}
           
                <div className="social-links">
                   {
                       menuSM.map(item=>{
                           switch(item.title){
                               case "Facebook":iconSocialMedia=<Facebook className="fb sm"/>;break;
                               case "Instagram":iconSocialMedia=<Instagram className="ig sm"/>;break;
                               case "LinkedIn":iconSocialMedia=<LinkdIn className="li sm"/>;break;
                               case "Twitter":iconSocialMedia=<Twitter className="tw sm"/>;break;
                               case "Youtube":iconSocialMedia=<Youtube className="yt sm"/>;break;
                           }
                           return (
                               <Menu.Item key={item._id}>
                                   <a href={item.url} target="_blank" >{iconSocialMedia}</a>
                               </Menu.Item>)
                       })
                   }
                </div>
            
        </Menu>
        </Col>
        <Col  lg={4}/>
      </Row>
        
    );
}
 
export default MenuTop;
