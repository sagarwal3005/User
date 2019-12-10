import React from 'react';
import BannerImage from '../../../assets/fyi-home-banner.jpg';

const Loading = props => {
    return (
        <div className={`loader-wrapper ${props.className}`}>
            <div className="loader">
                
            </div>
            <div className="image-loader">
                <img src={BannerImage}/>
            </div>
        </div>
    );
};

export default Loading;