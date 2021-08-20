import React, { useState, useEffect, Fragment } from 'react';
import { getSocialMediaApi } from '../../../../api/MenuSM';
import {ReactComponent as Facebook} from '../../../../assets/imagenes/svg/facebook.svg';
import {ReactComponent as Instagram} from '../../../../assets/imagenes/svg/instagram.svg'
import {ReactComponent as Twitter} from '../../../../assets/imagenes/svg/twitter.svg'
import {ReactComponent as LinkdIn} from '../../../../assets/imagenes/svg/linkedin.svg';
import {ReactComponent as Youtube} from '../../../../assets/imagenes/svg/youtube.svg'


const SocialMedia = () => {
    let iconSocialMedia;
    const [menuSM, setmenuSM] = useState([]);//menu social media
    const [reload, setReload] = useState(false);

    useEffect(()=>{
        // eslint-disable-next-line
        const getMenu=async()=>{
            //Social media menu
            const resultado2=await getSocialMediaApi();

            resultado2.socialMediaMenu.forEach(itemSM=>{
                
                if(itemSM.contact===false && itemSM.active===true){
                        setmenuSM(oldArray => [...oldArray, itemSM]);
                }
            });
            setReload(true);
        }
        getMenu();
    },[]);
    return (  
        <Fragment>
            {
            reload
            ? menuSM.map(item=>{
                if(item.contact===true){
                    switch(item.title){
                        case "Facebook":iconSocialMedia=<Facebook className="fb sm"/>;break;
                        case "Instagram":iconSocialMedia=<Instagram className="ig sm"/>;break;
                        case "LinkedIn":iconSocialMedia=<LinkdIn className="li sm"/>;break;
                        case "Twitter":iconSocialMedia=<Twitter className="tw sm"/>;break;
                        case "Youtube":iconSocialMedia=<Youtube className="yt sm"/>;break;
                        default: break;
                    }
                    return(
                   <a key={item.url} className="menu-item" href={item.url} target="_blank" rel="noopener noreferrer" >{iconSocialMedia}</a>
                   );
                }else{
                    return null
                }
                })
                : null
            }
                
        </Fragment>
    );
}
 
export default SocialMedia;