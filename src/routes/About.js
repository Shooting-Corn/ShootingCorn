import React from "react";
import "./About.css";

function About(props) {

  return (

    <div className="background">


    <div className="text__container">
      <h2 className="text__guideline">How we start?</h2>
      <div>As the number of video screening media is increasing, the need to provide users with detailed video information and ratings is 
        being emphasized. It is necessary to provide stimulation information (selection, violence) of videos 
        for managing and classifying videos and to provide information to determine whether individuals watch them in advance. 
        It is necessary to have an expanded new video rating system that can combine various videos, not limited to existing TV and 
        movie theater videos. New measures are needed to protect teenagers from harmful images that have become less accessible. 
        It is necessary to provide objective information to determine whether to watch autonomously, not to grade video clips of censorship.
      </div>
    </div>




    <div className="text__container2">
      <h2 className="text__guideline">How we work?</h2>
      <div>It provides information on each movie to prevent exposure to scenes that are difficult to watch depending on individuals and presents a timeline for scenes that show high sensitivity and violence.
In order to improve the current video rating, which is being directly deployed to watch and decide videos, a model is developed to automatically track scenes corresponding to the representative stimulant element sensitivity and violence of images by utilizing deep learning to help consistent judgment methods.
By tracking provocative scenes, we use the status of video viewing harmful factors exposure in adolescents to improve.
Through the participation of youth team members, it is used to limit only videos with reasonable stimuli that do not have the meaning of censorship for teenagers, and to guarantee freedom of appreciation of other works of art.
The purpose is not to unilaterally force video ratings on users, but to provide information that can respect individual judgment.
      </div>
    </div>




   
    <div className="about__container">
      <h2 className="title__guideline">Sexuality guideline</h2>
      <span>Stage1: Kiss</span>
      <span>Stage2: Nudity is shown(Sexual way)</span>
      <span>Stage3: Having sex(or implied)</span>
    </div>

    <div className="about__container">
      <h2 className="title__guideline">Violence guideline</h2>
      <span>Stage1: Scenes with blood</span>
      <span>Stage2: Attack, violent, wound is seen</span>
      <span>Stage3: Someone is killed, several gore scenes</span>
    </div>
    <div className="about__container">
      <h2 className="title__guideline">Profanity guideline</h2>
      <span>F word, axx, moxxxx, shxx, bixxx(used frequently)</span>
    </div>
    <div className="about__container">
      <h2 className="title__guideline">Alcohol and smoking guideline</h2>
      <span>People drink beer, smoke in several scenes, (prisoners) deal cigarettes secretly</span>
    </div>
    </div>
  );
}

export default About;