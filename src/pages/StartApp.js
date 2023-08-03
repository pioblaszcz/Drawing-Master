import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import TrainingComponent from '../components/StartApp/TrainingComponent';
import MultiplayerComponent from '../components/StartApp/MultiplayerComponent';
import HowToPlay from '../components/StartApp/HowToPlayComponent';
import Footer from '../components/StartApp/Footer';

import logo from '../images/logotran2.png';

const StartApp = () => {
    const [playOption, setPlayOption] = useState(1);
    const [language, setLanguage] = useState('EN');
    const handleChose = (option) => setPlayOption(option);

    const play = playOption ? <TrainingComponent /> : <MultiplayerComponent />;

    const handleChangeLanguage = () => {
        if (language === 'EN') setLanguage('PL');
        else setLanguage('EN');
    }

    return (
        <div className="startPage">
            <div className="startPage__lang" onClick={handleChangeLanguage}>
                <FontAwesomeIcon icon={faGlobe} className="lang__globe" />
                <p className="lang__p">{language}</p>
            </div>
            <div className="startPage__logo">
                <img src={logo} alt="" className="startPage__logo-image" draggable="false" />
            </div>
            <div className="startPage__main">
                <div className="startPage__play">
                    <button className={`startPage__chose ${playOption ? 'button--active' : 'button--unactive'}`} onClick={() => handleChose(1)}>Training</button>
                    <button className={`startPage__chose  ${!playOption ? 'button--active' : 'button--unactive'}`} onClick={() => handleChose(0)}>Play With Friends</button>
                    <div className={`space ${!playOption && 'space--second'}`}></div>
                    {play}
                </div>
                <HowToPlay />
            </div>
            <Footer />
        </div>
    );
};

export default StartApp;