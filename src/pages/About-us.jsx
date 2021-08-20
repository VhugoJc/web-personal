import React, { useEffect, useState } from 'react';
import * as Scroll from 'react-scroll';

import MainContact  from '../components/Web/MainBanner/MainContact';
import AboutUsInfo from '../components/Web/AboutUsInfo';

//api

import {getUsersDataApi} from '../api/user';

const AboutUs = () => {
    const [users, setUsers] = useState([]);
    const [checked, setChecked]=useState(false);

    useEffect(()=>{
        Scroll.animateScroll.scrollToTop();
        const users = async()=>{
            const results = await getUsersDataApi();
            if(!results.message){
                setUsers(results.usersData);
            }
            setChecked(true);
            
        }
        users();
    },[]);

    return (  
        <>
        <MainContact     title="Sobre Nosotros" description="Conocenos un poco más." img="about-us" dark={false}/>
        {checked ?<AboutUsInfo    users={users}/> :null}
        </>
    );
}
 
export default AboutUs;