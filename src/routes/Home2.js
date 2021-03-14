import React from 'react';

import classes from './BackgroundVideo.module.css';


import popping from './img/popping.mp4';
import popcorn from './img/film.jfif';

import apopcorn from './img/apopcorn.jpg';





const BackgroundVideo = () => {
    const videoSource = "./img/popping.mp4"
    return (
        <div className={classes.Container} >


    <video autoPlay loop muted poster={popcorn} className="video">
            <source src={popping} type='video/mp4' />
            <source src={popping} type="video/ogg" /> 
    </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                    <h1>Hello, we are the corns! nice to meet you</h1>
    
                    <button type="button" className="btn btn-outline-dark">pop your movie</button>
                    <img
                        src={apopcorn}
                        alt="profile" />
                </div>
            </div>
        </div>
    )
}

export default BackgroundVideo
