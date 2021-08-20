import React from 'react';
import {Carousel, Avatar } from 'antd';
import noAvatar from '../../../assets/imagenes/png/no-avatar.png';
import './AboutUs.scss'; 
import {basePath} from '../../../api/config';

const TeamBanner = ({users}) => {
    return (  
        <div className="team-banner">
            <h1>Nuestro Equipo de Trabajo</h1>
            <Carousel autoplay>
            {
                users.map(item=>{
                    console.log(item._id)
                    return (
                        
                        <div className="team-banner__carousel">
                            <Partner 
                                key={item._id}
                                data = {item}
                            />
                        </div>
                    );
                })
            }
            </Carousel>
        </div>
    );
}
 
export default TeamBanner;

function Partner({data}){
    const { description, job, name, lastName} = data;
    const img = data.avatar;

    return(
        <div className="team-banner__carousel-partner">
             <Avatar size={128} 
                  src={img ? `${basePath}/get-avatar/${img}` :noAvatar }
              />
            <h3 className="team-banner__carousel-partner__text">
                {description}
            </h3>
            <h3 className="team-banner__carousel-partner__name">
                {`${name} ${lastName}`}
            </h3>
            <h3 className="team-banner__carousel-partner__job">
                {job}
            </h3>
        </div>
    );
}