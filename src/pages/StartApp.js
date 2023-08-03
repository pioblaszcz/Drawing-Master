import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

import TrainingComponent from '../components/StartApp/TrainingComponent';
import MultiplayerComponent from '../components/StartApp/MultiplayerComponent';
import HowToPlay from '../components/StartApp/HowToPlayComponent';
import Footer from '../components/StartApp/Footer';

import logo from '../images/logotran2.png';

const StartApp = () => {
    const { t, i18n } = useTranslation();

    const [playOption, setPlayOption] = useState(1);
    const [language, setLanguage] = useState('EN');
    const handleChose = (option) => setPlayOption(option);

    const play = playOption ? <TrainingComponent /> : <MultiplayerComponent />;

    const handleChangeLanguage = () => {
        if (language === 'EN') {
            setLanguage('PL');
            i18n.changeLanguage('pl');
        }
        else {
            setLanguage('EN');
            i18n.changeLanguage('en');
        }
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
                    <button className={`startPage__chose ${playOption ? 'button--active' : 'button--unactive'}`} onClick={() => handleChose(1)}>{t('startApp.training')}</button>
                    <button className={`startPage__chose  ${!playOption ? 'button--active' : 'button--unactive'}`} onClick={() => handleChose(0)}>{t('startApp.playWFriends')}</button>
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