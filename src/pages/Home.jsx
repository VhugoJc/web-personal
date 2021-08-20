import React, { Fragment, useEffect } from 'react';
import MainBanner from '../components/Web/MainBanner';
import HomeServices from '../components/Web/HomeServices';
import HowIWork from '../components/Web/HowIWork';
import * as Scroll from 'react-scroll';
//import ReviewsClients from '../components/Web/ReviewsClients';

const Home = () => {

    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
      }, [])


    return (  
        <Fragment>
            <MainBanner/>
            <HomeServices/>
            <HowIWork/>
            {/*<ReviewsClients/>*/}
        </Fragment>
    );
}
 
export default Home;