import React from "react";
import "./About.css";

function About(props) {

  return (
    <div>
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