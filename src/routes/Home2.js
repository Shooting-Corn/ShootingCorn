import React from 'react';

//import classes from './BackgroundVideo.module.css';


//import popping from './img/popping.mp4';
//import popcorn from './img/apopcorn.jpg';

import apopcorn from './img/apopcorn.jpg';


import "./Home2.css";

function About(props) {

  return (

    <div className="background">

<div className="Content">
                <div className="SubContent" >
                    <h1>Hello, we are the corns! nice to meet you</h1>
    
                    <button type="button" className="btn btn-outline-dark">pop your movie</button>
                    <img
                        src={apopcorn}
                        alt="profile" />
                </div>
            </div>
        </div>

  
  );
}

export default About;