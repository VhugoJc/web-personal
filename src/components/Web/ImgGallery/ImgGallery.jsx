import React from 'react';
import {ImageGroup, Image} from 'react-fullscreen-image';

import './ImgGallery.scss';


const ImgGallery = ({images, title}) => {
    return (
        <div className="img-gallery">
            <h3 className="title">{title}</h3>
            <ImageGroup>
                <ul className="images">
                    {images.map(img => (
                        <li key={img.title}>
                        <Image src={img.url} alt={img.title} />
                        </li>
                    ))}
                </ul>
          </ImageGroup>
        </div>
    );
}
 
export default ImgGallery;